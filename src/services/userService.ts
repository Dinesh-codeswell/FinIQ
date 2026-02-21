import { supabase } from './supabase';
import { UserProfile } from '@/types/game';

const mapToSnakeCase = (profile: Partial<UserProfile>) => {
    const mapped: any = {};
    const keyMap: Record<string, string> = {
        lastPlayDate: 'last_play_date',
        totalDuels: 'total_duels',
        longestStreak: 'longest_streak',
        onboardingCompleted: 'onboarding_completed',
        sessionLength: 'session_length',
        selectedAvatarFrame: 'selected_frame',
        isPro: 'is_pro',
        previous_rating: 'previous_rating',
        total_xp: 'total_xp',
        tournament_xp: 'tournament_xp',
        global_rank: 'global_rank',
        rank_change: 'rank_change',
        win_count: 'win_count',
        loss_count: 'loss_count',
        current_streak: 'current_streak',
        is_online: 'is_online',
        last_active_at: 'last_active_at'
    };

    // ONLY map keys that exist in the profiles table
    const validDbKeys = [
        'id', 'username', 'avatar', 'rating', 'xp', 'coins', 'streak',
        'last_play_date', 'total_duels', 'wins', 'longest_streak',
        'badges', 'interests', 'difficulty', 'is_pro', 'selected_frame',
        'onboarding_completed', 'session_length', 'tournament_xp', 'total_xp',
        'weekly_rank', 'global_rank', 'rank_change', 'previous_rating',
        'win_count', 'loss_count', 'current_streak', 'is_online', 'last_active_at'
    ];

    Object.keys(profile).forEach(key => {
        const snakeKey = keyMap[key] || key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        if (validDbKeys.includes(snakeKey)) {
            mapped[snakeKey] = (profile as any)[key];
        }
    });

    return mapped;
};

const mapToCamelCase = (data: any): UserProfile | null => {
    if (!data) return null;
    return {
        ...data,
        id: data.id,
        username: data.username ?? '',
        avatar: data.avatar ?? 'fox',
        rating: data.rating ?? 1000,
        xp: data.xp ?? 0,
        coins: data.coins ?? 0,
        streak: data.streak ?? 0,
        lastPlayDate: data.last_play_date,
        totalDuels: data.total_duels ?? 0,
        longestStreak: data.longest_streak ?? 0,
        onboardingCompleted: data.onboarding_completed ?? false,
        sessionLength: data.session_length ?? 5,
        selectedAvatarFrame: data.selected_frame ?? 'none',
        isPro: data.is_pro ?? false,
        previous_rating: data.previous_rating,
        total_xp: data.total_xp,
        tournament_xp: data.tournament_xp,
        global_rank: data.global_rank,
        rank_change: data.rank_change,
        win_count: data.win_count ?? 0,
        loss_count: data.loss_count ?? 0,
        current_streak: data.current_streak ?? 0,
        is_online: data.is_online ?? false,
        last_active_at: data.last_active_at,
        badges: data.badges ?? [],
        interests: data.interests ?? [],
        difficulty: data.difficulty ?? 1,
    } as UserProfile;
};

export const userService = {
    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        return { data: mapToCamelCase(data), error };
    },

    async updateProfile(userId: string, updates: Partial<UserProfile>) {
        const snakeUpdates = mapToSnakeCase(updates);
        const { data, error } = await supabase
            .from('profiles')
            .update(snakeUpdates)
            .eq('id', userId)
            .select()
            .single();

        return { data: mapToCamelCase(data), error };
    },

    async getLeaderboard(limit: number = 20) {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, username, avatar, rating, wins')
            .order('rating', { ascending: false })
            .limit(limit);

        return { data, error };
    },

    async getTopicStats(userId: string) {
        const { data, error } = await supabase
            .from('topic_stats')
            .select('*')
            .eq('user_id', userId);

        return { data, error };
    },

    async updateTopicStats(userId: string, topic: string, totalAnswered: number, totalCorrect: number) {
        const { data, error } = await supabase
            .from('topic_stats')
            .upsert({
                user_id: userId,
                topic,
                total_answered: totalAnswered,
                total_correct: totalCorrect,
                accuracy: totalAnswered > 0 ? totalCorrect / totalAnswered : 0,
                last_updated: new Date().toISOString(),
            }, { onConflict: 'user_id,topic' })
            .select();

        return { data, error };
    }
};
