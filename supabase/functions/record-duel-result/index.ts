// @ts-ignore
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Declare Deno as any to satisfy IDE without full Deno types
declare const Deno: any;

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Server-side ELO calculation — identical logic to client but TRUSTED
function calculateElo(
    playerRating: number,
    opponentRating: number,
    playerScore: number,
    opponentScore: number
): { newRating: number; delta: number } {
    const K = 32;
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const actualScore = playerScore > opponentScore ? 1 : playerScore === opponentScore ? 0.5 : 0;

    let delta = Math.round(K * (actualScore - expectedScore));

    // Apply caps
    if (actualScore === 1) delta = Math.max(8, Math.min(20, delta));
    if (actualScore === 0) delta = Math.min(0, Math.max(-15, delta));
    if (actualScore === 0.5) delta = Math.max(-5, Math.min(5, delta));

    const newRating = Math.max(0, playerRating + delta);
    return { newRating, delta };
}

function calculateXP(
    isWinner: boolean,
    playerScore: number,
    totalQuestions: number,
    duelMode: string,
    streakCount: number
): number {
    const modeMultipliers: Record<string, number> = {
        sprint: 1.0,
        scenario: 1.3,
        classical: 1.5,
        mental_math_flash: 1.0,
        mental_math_blitz: 1.5,
        mental_math_siege: 2.0,
    };

    const base = isWinner ? 30 : 15;
    const accuracy = playerScore / Math.max(totalQuestions, 1);
    const accuracyBonus = Math.round(accuracy * 20);
    const streakBonus = Math.min(streakCount * 2, 20);
    const multiplier = modeMultipliers[duelMode] ?? 1.0;

    return Math.round((base + accuracyBonus + streakBonus) * multiplier);
}

serve(async (req: any) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) throw new Error('No auth header')

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Verify the calling user's JWT
        const { data: { user }, error: authError } = await supabase.auth.getUser(
            authHeader.replace('Bearer ', '')
        )
        if (authError || !user) throw new Error('Unauthorized')

        const body = await req.json()
        const {
            duel_result_id,   // ID of the pending duel_results record
            player1_id,
            player2_id,
            player1_score,
            player2_score,
            duel_mode,
            total_questions,
            duration_seconds,
        } = body

        // Verify the requesting user is one of the players
        if (user.id !== player1_id && user.id !== player2_id) {
            throw new Error('User not part of this duel')
        }

        // --- ANTI-CHEAT CHECKS ---

        // 1. Verify scores are within possible range
        if (player1_score > total_questions || player2_score > total_questions) {
            throw new Error('Invalid scores: exceed total questions')
        }
        if (player1_score < 0 || player2_score < 0) {
            throw new Error('Invalid scores: negative values')
        }

        // 2. Verify duration is reasonable
        const minDuration = total_questions * 2   // Minimum 2s per question (liberal)
        const maxDuration = total_questions * 60  // Maximum 60s per question
        if (duration_seconds < minDuration || duration_seconds > maxDuration) {
            throw new Error('Suspicious duration detected')
        }

        // 3. Rate limiting: check recent duel count for this user
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
        const { count: recentDuels } = await supabase
            .from('duel_results')
            .select('*', { count: 'exact', head: true })
            .or(`player1_id.eq.${user.id},player2_id.eq.${user.id}`)
            .gte('created_at', fiveMinutesAgo)

        if ((recentDuels ?? 0) > 15) {
            throw new Error('Rate limit exceeded: too many duels in 5 minutes')
        }

        // --- FETCH CURRENT RATINGS ---
        const { data: players, error: fetchError } = await supabase
            .from('profiles')
            .select('id, rating, total_xp, tournament_xp, win_count, loss_count, current_streak')
            .in('id', [player1_id, player2_id])

        if (fetchError || !players || players.length !== 2) {
            throw new Error('Failed to fetch player profiles')
        }

        const p1 = players.find((p: any) => p.id === player1_id)!
        const p2 = players.find((p: any) => p.id === player2_id)!

        // --- CALCULATE NEW RATINGS ---
        const winner_id = player1_score > player2_score
            ? player1_id
            : player2_score > player1_score
                ? player2_id
                : null  // draw

        const p1Result = calculateElo(p1.rating, p2.rating, player1_score, player2_score)
        const p2Result = calculateElo(p2.rating, p1.rating, player2_score, player1_score)

        const p1IsWinner = winner_id === player1_id
        const p2IsWinner = winner_id === player2_id

        const p1XP = calculateXP(p1IsWinner, player1_score, total_questions, duel_mode, p1.current_streak)
        const p2XP = calculateXP(p2IsWinner, player2_score, total_questions, duel_mode, p2.current_streak)

        // --- UPDATE PLAYER 1 ---
        await supabase.from('profiles').update({
            rating: p1Result.newRating,
            previous_rating: p1.rating,
            total_xp: (p1.total_xp ?? 0) + p1XP,
            tournament_xp: (p1.tournament_xp ?? 0) + p1XP,
            win_count: p1IsWinner ? (p1.win_count ?? 0) + 1 : (p1.win_count ?? 0),
            loss_count: !p1IsWinner && winner_id !== null ? (p1.loss_count ?? 0) + 1 : (p1.loss_count ?? 0),
            current_streak: p1IsWinner ? (p1.current_streak ?? 0) + 1 : 0,
            last_active_at: new Date().toISOString(),
        }).eq('id', player1_id)

        // --- UPDATE PLAYER 2 ---
        await supabase.from('profiles').update({
            rating: p2Result.newRating,
            previous_rating: p2.rating,
            total_xp: (p2.total_xp ?? 0) + p2XP,
            tournament_xp: (p2.tournament_xp ?? 0) + p2XP,
            win_count: p2IsWinner ? (p2.win_count ?? 0) + 1 : (p2.win_count ?? 0),
            loss_count: !p2IsWinner && winner_id !== null ? (p2.loss_count ?? 0) + 1 : (p2.loss_count ?? 0),
            current_streak: p2IsWinner ? (p2.current_streak ?? 0) + 1 : 0,
            last_active_at: new Date().toISOString(),
        }).eq('id', player2_id)

        // --- MARK DUEL RESULT AS VERIFIED ---
        await supabase.from('duel_results').update({
            player1_rating_after: p1Result.newRating,
            player2_rating_after: p2Result.newRating,
            player1_xp_earned: p1XP,
            player2_xp_earned: p2XP,
            winner_id: winner_id,
            verified: true,
        }).eq('id', duel_result_id)

        return new Response(JSON.stringify({
            success: true,
            player1: { newRating: p1Result.newRating, delta: p1Result.delta, xpEarned: p1XP },
            player2: { newRating: p2Result.newRating, delta: p2Result.delta, xpEarned: p2XP },
            winner_id,
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
