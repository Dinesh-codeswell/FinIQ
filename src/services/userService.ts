import { supabase } from './supabase';
import { UserProfile } from '@/types/game';

export const userService = {
    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        return { data: data as UserProfile | null, error };
    },

    async updateProfile(userId: string, updates: Partial<UserProfile>) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        return { data: data as UserProfile | null, error };
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
