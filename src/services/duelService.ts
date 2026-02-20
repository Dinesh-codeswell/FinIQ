import { supabase } from './supabase';
import { Question, DuelResult } from '@/types/game';

export const duelService = {
    async getQuestions(options: {
        count: number,
        difficulty: number,
        types?: string[],
        topics?: string[]
    }) {
        let query = supabase
            .from('questions')
            .select('*')
            .lte('difficulty', options.difficulty + 1)
            .gte('difficulty', options.difficulty - 1);

        if (options.types && options.types.length > 0) {
            query = query.in('type', options.types);
        }

        if (options.topics && options.topics.length > 0) {
            query = query.in('topic', options.topics);
        }

        const { data, error } = await query
            .limit(options.count * 2); // Fetch more to allow shuffling/filtering if needed

        if (error) return { data: null, error };

        // Basic shuffle and slice
        const shuffled = (data || []).sort(() => Math.random() - 0.5).slice(0, options.count);

        return { data: shuffled as any as Question[], error: null };
    },

    async recordDuel(player_id: string, result: DuelResult, ratingChange: number, xpEarned: number) {
        const { data: duelData, error: duelError } = await supabase
            .from('duels')
            .insert({
                player_id,
                opponent_id: result.opponentName,
                mode: result.mode || 'classical',
                won: result.won,
                player_score: result.playerScore,
                opponent_score: result.opponentScore,
                rating_change: ratingChange,
                xp_earned: xpEarned,
            })
            .select()
            .single();

        if (duelError) return { error: duelError };

        // Record individual question performance if available
        if (result.questionLog && result.questionLog.length > 0) {
            const logEntries = result.questionLog.map(q => ({
                duel_id: duelData.id,
                question_id: q.id,
                is_correct: q.isCorrect,
                time_taken: q.timeTaken,
                user_answer: q.userAnswer?.toString(),
            }));

            const { error: logError } = await supabase
                .from('duel_questions')
                .insert(logEntries);

            if (logError) console.error('Error logging duel questions:', logError);
        }

        return { data: duelData, error: null };
    }
};
