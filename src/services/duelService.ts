import { supabase } from './supabase';
import { Question } from '@/types/game';

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
};
