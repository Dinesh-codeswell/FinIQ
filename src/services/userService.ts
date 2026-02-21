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
        selectedFrame: 'selected_frame',
        isPro: 'is_pro',
        previousRating: 'previous_rating',
        totalXp: 'total_xp',
        tournamentXp: 'tournament_xp',
        globalRank: 'global_rank',
        rankChange: 'rank_change',
        winCount: 'win_count',
        lossCount: 'loss_count',
        currentStreak: 'current_streak',
        isOnline: 'is_online',
        lastActiveAt: 'last_active_at'
    };

    Object.keys(profile).forEach(key => {
        const snakeKey = keyMap[key] || key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        mapped[snakeKey] = (profile as any)[key];
    });

    return mapped;
};

const mapToCamelCase = (data: any): UserProfile | null => {
    if (!data) return null;
    return {
        ...data,
        lastPlayDate: data.last_play_date,
        totalDuels: data.total_duels,
        longestStreak: data.longest_streak,
        onboardingCompleted: data.onboarding_completed,
        sessionLength: data.session_length,
        selectedFrame: data.selected_frame,
        isPro: data.is_pro,
        previousRating: data.previous_rating,
        totalXp: data.total_xp,
        tournamentXp: data.tournament_xp,
        globalRank: data.global_rank,
        rankChange: data.rank_change,
        winCount: data.win_count,
        lossCount: data.loss_count,
        currentStreak: data.current_streak,
        isOnline: data.is_online,
        lastActiveAt: data.last_active_at
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
