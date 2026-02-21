import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createContextHook from '@nkzw/create-context-hook';
import { UserProfile, DuelResult } from '@/types/game';
import { getDivision, calculateElo, DAILY_QUESTS } from '@/constants/divisions';
import { supabase } from '@/src/services/supabase';
import { userService } from '@/src/services/userService';
import { duelService } from '@/src/services/duelService';

const STORAGE_KEY = 'finiq_profile';

const defaultProfile: UserProfile = {
    id: '',
    username: '',
    avatar: 'fox',
    rating: 1000,
    xp: 0,
    coins: 0,
    streak: 0,
    lastPlayDate: null,
    totalDuels: 0,
    wins: 0,
    longestStreak: 0,
    badges: [],
    interests: [],
    difficulty: 1,
    sessionLength: 5,
    onboardingCompleted: false,
    dailyChallengeCompleted: null,
    questsCompletedToday: [],
    questsDate: null,
    duelsPlayedToday: 0,
    duelsWonToday: 0,
    duelsDateTracker: null,
    isPro: false,
    proExpiresAt: null,
    proStartedAt: null,
    selectedAvatarFrame: 'grey_static',
    unlockedFrames: ['none', 'grey_static'],
};

function getTodayString(): string {
    return new Date().toISOString().split('T')[0];
}

export const [GameProvider, useGame] = createContextHook(() => {
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);
    const [lastDuelResult, setLastDuelResult] = useState<any>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                const { data, error } = await userService.getProfile(session.user.id);
                if (data) return { ...defaultProfile, ...data, id: session.user.id };
            }

            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as UserProfile;
                return { ...defaultProfile, ...parsed };
            }
            return defaultProfile;
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (updated: UserProfile) => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                const { error } = await userService.updateProfile(session.user.id, updated);
                if (error) {
                    console.error('Supabase Profile Update Error:', error);
                    throw error;
                }
            } else {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            }
            return updated;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['profile'], data);
        },
        onError: (error) => {
            console.error('Save Mutation Failed:', error);
        }
    });

    useEffect(() => {
        if (profileQuery.data) {
            setProfile(profileQuery.data);
            setIsReady(true);
        }
    }, [profileQuery.data]);

    // REAL-TIME PROFILE SUBSCRIPTION
    useEffect(() => {
        if (!profile.id) return;

        const channel = supabase
            .channel(`user-profile-${profile.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                    filter: `id=eq.${profile.id}`,
                },
                (payload) => {
                    const updated = payload.new as any;
                    setProfile(prev => ({
                        ...prev,
                        username: updated.username ?? prev.username,
                        avatar: updated.avatar ?? prev.avatar,
                        rating: updated.rating ?? prev.rating,
                        previous_rating: updated.previous_rating ?? prev.previous_rating,
                        xp: updated.total_xp ?? prev.xp,
                        total_xp: updated.total_xp ?? prev.total_xp,
                        tournament_xp: updated.tournament_xp ?? prev.tournament_xp,
                        win_count: updated.win_count ?? prev.win_count,
                        loss_count: updated.loss_count ?? prev.loss_count,
                        current_streak: updated.current_streak ?? prev.current_streak,
                        global_rank: updated.global_rank ?? prev.global_rank,
                        rank_change: updated.rank_change ?? prev.rank_change,
                        onboardingCompleted: updated.onboarding_completed ?? prev.onboardingCompleted,
                    }));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [profile.id]);

    const updateProfile = useCallback((updates: Partial<UserProfile>) => {
        setProfile(prev => {
            const updated = { ...prev, ...updates };
            // Side effect moved outside of updater via useEffect or manual call
            return updated;
        });
        // Mutate outside of the profile updater to avoid React anti-pattern
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                const updated = { ...profile, ...updates };
                saveMutation.mutate(updated);
            }
        });
    }, [saveMutation, profile]);

    const addXP = useCallback((amount: number) => {
        setProfile(prev => {
            const updated = { ...prev, xp: prev.xp + amount };
            return updated;
        });
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                const updated = { ...profile, xp: profile.xp + amount };
                saveMutation.mutate(updated);
            }
        });
    }, [saveMutation, profile]);

    const completeOnboarding = useCallback((
        username: string,
        avatar: string,
        rating: number, // Correctly named as rating
        interests: string[],
        sessionLength: number,
    ) => {
        const today = getTodayString();
        const updated: UserProfile = {
            ...profile,
            username,
            avatar,
            rating,
            interests,
            sessionLength,
            onboardingCompleted: true,
            lastPlayDate: today,
            streak: 1,
            duelsDateTracker: today,
            questsDate: today,
        };

        setProfile(updated);
        saveMutation.mutate(updated);
    }, [saveMutation, profile]);

    const checkAndUpdateStreak = useCallback(() => {
        const today = getTodayString();
        setProfile(prev => {
            if (prev.lastPlayDate === today) return prev;

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            let newStreak = 1;
            if (prev.lastPlayDate === yesterdayStr) {
                newStreak = prev.streak + 1;
            }

            const updated: UserProfile = {
                ...prev,
                streak: newStreak,
                lastPlayDate: today,
                longestStreak: Math.max(prev.longestStreak, newStreak),
                duelsPlayedToday: prev.duelsDateTracker === today ? prev.duelsPlayedToday : 0,
                duelsWonToday: prev.duelsDateTracker === today ? prev.duelsWonToday : 0,
                duelsDateTracker: today,
                questsCompletedToday: prev.questsDate === today ? prev.questsCompletedToday : [],
                questsDate: today,
            };
            saveMutation.mutate(updated);
            return updated;
        });
    }, [saveMutation]);

    // UPDATED: SECURE SERVER-SIDE DUEL RECORDING
    const recordDuelResult = useCallback(async (
        opponentId: string,
        playerScore: number,
        opponentScore: number,
        duelMode: string,
        totalQuestions: number,
        durationSeconds: number,
    ) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return null;

        try {
            // 1. Insert pending duel record
            const { data: duelRecord, error: insertError } = await supabase
                .from('duel_results')
                .insert({
                    player1_id: session.user.id,
                    player2_id: opponentId,
                    player1_score: playerScore,
                    player2_score: opponentScore,
                    player1_rating_before: profile.rating,
                    player2_rating_before: 1000, // Ideally fetch opponent rating
                    player1_rating_after: 0,
                    player2_rating_after: 0,
                    duel_mode: duelMode,
                    total_questions: totalQuestions,
                    duration_seconds: durationSeconds,
                    verified: false,
                })
                .select()
                .single();

            if (insertError || !duelRecord) throw new Error('Failed to record duel result');

            // 2. Call Edge Function
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/record-duel-result`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        duel_result_id: duelRecord.id,
                        player1_id: session.user.id,
                        player2_id: opponentId,
                        player1_score: playerScore,
                        player2_score: opponentScore,
                        duel_mode: duelMode,
                        total_questions: totalQuestions,
                        duration_seconds: durationSeconds,
                    }),
                }
            );

            const result = await response.json();
            if (!response.ok) throw new Error(result.error);

            // 3. Update local state optimistically
            const today = getTodayString();
            const won = playerScore > opponentScore;
            const xpEarned = result.player1.xpEarned;
            const ratingChange = result.player1.delta;

            setProfile(prev => {
                const isSameDay = prev.duelsDateTracker === today;
                const newDuelsPlayed = isSameDay ? prev.duelsPlayedToday + 1 : 1;
                const newDuelsWon = isSameDay ? (won ? prev.duelsWonToday + 1 : prev.duelsWonToday) : (won ? 1 : 0);

                const newQuestsCompleted = prev.questsDate === today ? [...prev.questsCompletedToday] : [];

                // Track Quest Progress: "Play any duel"
                if (newDuelsPlayed >= 1 && !newQuestsCompleted.includes('play_duel')) {
                    newQuestsCompleted.push('play_duel');
                }
                // Track Quest Progress: "Win 2 Sprint Duels"
                if (newDuelsWon >= 2 && !newQuestsCompleted.includes('win_2_sprints')) {
                    newQuestsCompleted.push('win_2_sprints');
                }

                return {
                    ...prev,
                    xp: prev.xp + xpEarned,
                    rating: prev.rating + ratingChange,
                    totalDuels: prev.totalDuels + 1,
                    wins: won ? prev.wins + 1 : prev.wins,
                    duelsPlayedToday: newDuelsPlayed,
                    duelsWonToday: newDuelsWon,
                    duelsDateTracker: today,
                    questsCompletedToday: newQuestsCompleted,
                    questsDate: today,
                    lastPlayDate: today,
                };
            });

            setLastDuelResult({
                won,
                playerScore,
                opponentScore,
                ratingChange,
                xpEarned
            });

            // Invalidate queries to refresh leaderboard
            queryClient.invalidateQueries({ queryKey: ['leaderboard'] });

            return result;
        } catch (err) {
            console.error('Error recording duel:', err);
            return null;
        }
    }, [profile, queryClient, getTodayString]);

    const completeDailyChallenge = useCallback((correct: boolean) => {
        const today = getTodayString();
        setProfile(prev => {
            const xpGain = correct ? 30 : 5;
            const newQuestsCompleted = prev.questsDate === today ? [...prev.questsCompletedToday] : [];
            if (!newQuestsCompleted.includes('daily_challenge')) {
                newQuestsCompleted.push('daily_challenge');
            }

            let newStreak = prev.streak;
            if (prev.lastPlayDate !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];
                newStreak = prev.lastPlayDate === yesterdayStr ? prev.streak + 1 : 1;
            }

            if (newStreak >= 7 && !prev.badges.includes('market_oracle')) {
                prev.badges.push('market_oracle');
            }
            if (newStreak >= 30 && !prev.badges.includes('streak_master')) {
                prev.badges.push('streak_master');
            }

            const updated: UserProfile = {
                ...prev,
                dailyChallengeCompleted: today,
                xp: prev.xp + xpGain,
                questsCompletedToday: newQuestsCompleted,
                questsDate: today,
                lastPlayDate: today,
                streak: newStreak,
                longestStreak: Math.max(prev.longestStreak, newStreak),
            };

            // SYNC TO SUPABASE
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session?.user) {
                    userService.updateProfile(session.user.id, updated);
                } else {
                    saveMutation.mutate(updated);
                }
            });

            return updated;
        });
    }, [saveMutation]);

    const division = useMemo(() => getDivision(profile.rating), [profile.rating]);

    const todayQuests = useMemo(() => {
        const today = getTodayString();
        const isToday = profile.questsDate === today;
        const completedIds = isToday ? profile.questsCompletedToday : [];
        const duelsToday = profile.duelsDateTracker === today ? profile.duelsPlayedToday : 0;
        const winsToday = profile.duelsDateTracker === today ? profile.duelsWonToday : 0;
        const dailyDone = profile.dailyChallengeCompleted === today;

        return DAILY_QUESTS.map(quest => {
            let current = 0;
            if (quest.id === 'win_2_sprints') current = winsToday;
            else if (quest.id === 'daily_challenge') current = dailyDone ? 1 : 0;
            else if (quest.id === 'play_duel') current = Math.min(duelsToday, 1);

            return {
                ...quest,
                current,
                completed: completedIds.includes(quest.id) || current >= quest.target,
            };
        });
    }, [profile]);

    const resetProfile = useCallback(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            await AsyncStorage.removeItem(STORAGE_KEY);
        }
        setProfile(defaultProfile);
        setIsReady(true);
        queryClient.setQueryData(['profile'], defaultProfile);
    }, [queryClient]);

    return {
        profile,
        isReady,
        lastDuelResult,
        division,
        todayQuests,
        updateProfile,
        addXP,
        completeOnboarding,
        checkAndUpdateStreak,
        recordDuelResult,
        completeDailyChallenge,
        setLastDuelResult,
        resetProfile,
    };
});
