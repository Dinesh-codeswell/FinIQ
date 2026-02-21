import { supabase } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface PlatformMetrics {
    activePlayers: number;
    challengeParticipants: number;
}

export const metricsService = {
    /**
     * Fetch current live metrics
     */
    async fetchMetrics(): Promise<PlatformMetrics> {
        const today = new Date().toISOString().split('T')[0];

        // 1. Get online players count
        const { count: activeCount, error: activeError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('is_online', true);

        // 2. Get today's challenge participants count
        const { count: challengeCount, error: challengeError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('daily_challenge_completed', today);

        if (activeError || challengeError) {
            console.error('Error fetching metrics:', activeError || challengeError);
        }

        return {
            activePlayers: activeCount || 0,
            challengeParticipants: challengeCount || 0,
        };
    },

    /**
     * Subscribe to changes in the profiles table to update counts in real-time
     */
    subscribeToMetrics(onUpdate: (metrics: PlatformMetrics) => void): RealtimeChannel {
        const channel = supabase
            .channel('platform-metrics')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'profiles',
                },
                async () => {
                    // Refetch metrics on any relevant profile change
                    const latestMetrics = await this.fetchMetrics();
                    onUpdate(latestMetrics);
                }
            )
            .subscribe();

        return channel;
    }
};
