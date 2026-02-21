import { supabase } from './supabase'
import { RealtimeChannel } from '@supabase/supabase-js'

export interface LeaderboardEntry {
    id: string
    username: string
    avatar: string
    rating: number
    previous_rating: number
    rank_change: number       // +3 or -2 or 0
    total_xp: number
    tournament_xp: number
    global_rank: number
    win_count: number
    loss_count: number
    current_streak: number
    is_online: boolean
    division: string
    last_active_at: string
}

export const DIVISION_CONFIG: Record<string, { label: string; color: string; range: [number, number]; promotionZone: number | null }> = {
    bronze: { label: 'Bronze Analyst', color: '#CD7F32', range: [0, 999], promotionZone: 950 },
    silver: { label: 'Silver Analyst', color: '#C0C0C0', range: [1000, 1199], promotionZone: 1150 },
    gold: { label: 'Gold Analyst', color: '#FFD700', range: [1200, 1499], promotionZone: 1450 },
    platinum: { label: 'Platinum Trader', color: '#E5E4E2', range: [1500, 1799], promotionZone: 1750 },
    diamond: { label: 'Diamond Fund Mgr', color: '#B9F2FF', range: [1800, 2099], promotionZone: 2050 },
    elite: { label: 'Elite Quant', color: '#00D68F', range: [2100, 99999], promotionZone: null },
}

export function getDivision(rating: number): string {
    if (rating >= 2100) return 'elite'
    if (rating >= 1800) return 'diamond'
    if (rating >= 1500) return 'platinum'
    if (rating >= 1200) return 'gold'
    if (rating >= 1000) return 'silver'
    return 'bronze'
}

export async function fetchLeaderboard(
    division: string = 'all',
    type: 'rating' | 'weekly_xp' = 'rating',
    limit: number = 100,
): Promise<LeaderboardEntry[]> {
    let query = supabase
        .from('profiles')
        .select(`
      id, username, avatar, rating, previous_rating,
      total_xp, tournament_xp, global_rank, win_count, loss_count,
      current_streak, is_online, last_active_at
    `)
        .limit(limit)

    // Apply division filter
    if (division !== 'all') {
        const config = DIVISION_CONFIG[division]
        if (config) {
            const [min, max] = config.range
            query = query.gte('rating', min).lte('rating', max)
        }
    }

    // Sort by appropriate column
    if (type === 'weekly_xp') {
        query = query.order('tournament_xp', { ascending: false })
    } else {
        query = query.order('rating', { ascending: false })
    }

    const { data, error } = await query
    if (error) throw error

    // Add rank change calculation
    return (data ?? []).map((player: any) => ({
        ...player,
        rank_change: (player.previous_rating ?? player.rating) < player.rating ? 1 :
            (player.previous_rating ?? player.rating) > player.rating ? -1 : 0,
        division: getDivision(player.rating),
    }))
}

export async function fetchUserRank(userId: string): Promise<{
    rank: number
    totalPlayers: number
    nearbyPlayers: LeaderboardEntry[]
}> {
    // Fetch current user rating
    const { data: profile } = await supabase
        .from('profiles')
        .select('rating, global_rank')
        .eq('id', userId)
        .single()

    const userRating = profile?.rating ?? 1000

    // Get count of players with higher rating
    const { count: higherCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gt('rating', userRating)

    const { count: totalCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

    const userRank = (higherCount ?? 0) + 1

    // Fetch nearby players (2 above, self, 2 below)
    const { data: nearby } = await supabase
        .from('profiles')
        .select(`
      id, username, avatar, rating, previous_rating,
      total_xp, tournament_xp, global_rank, win_count, loss_count,
      current_streak, is_online, last_active_at
    `)
        .order('rating', { ascending: false })
        .range(Math.max(0, userRank - 3), userRank + 1)

    return {
        rank: userRank,
        totalPlayers: totalCount ?? 0,
        nearbyPlayers: (nearby ?? []).map((p: any) => ({ ...p, division: getDivision(p.rating) })),
    }
}

export function subscribeToLeaderboard(
    onUpdate: (updatedEntry: Partial<LeaderboardEntry>) => void
): RealtimeChannel {
    return supabase
        .channel('leaderboard-realtime')
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'profiles',
            },
            (payload) => {
                const updated = payload.new as any
                onUpdate({
                    id: updated.id,
                    rating: updated.rating,
                    previous_rating: updated.previous_rating,
                    tournament_xp: updated.tournament_xp,
                    total_xp: updated.total_xp,
                    win_count: updated.win_count,
                    current_streak: updated.current_streak,
                    is_online: updated.is_online,
                    global_rank: updated.global_rank,
                })
            }
        )
        .subscribe()
}

export function subscribeToPresence(
    currentUserId: string
): RealtimeChannel {
    const channel = supabase.channel('online-users', {
        config: {
            presence: {
                key: currentUserId,
            },
        },
    })

    channel
        .on('presence', { event: 'sync' }, () => {
            // Sync presence status here if needed
        })
        .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                const presenceTrackStatus = await channel.track({
                    online_at: new Date().toISOString(),
                })

                if (presenceTrackStatus === 'ok') {
                    await supabase.from('profiles').update({
                        is_online: true,
                        last_active_at: new Date().toISOString(),
                    }).eq('id', currentUserId)
                }
            }
        })

    return channel
}
