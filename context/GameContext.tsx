import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createContextHook from '@nkzw/create-context-hook';
import { UserProfile, DuelResult } from '@/types/game';
import { getDivision, calculateElo, DAILY_QUESTS } from '@/constants/divisions';

const STORAGE_KEY = 'finiq_profile';

const defaultProfile: UserProfile = {
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
    const [lastDuelResult, setLastDuelResult] = useState<DuelResult | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
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
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['profile'], data);
        },
    });

    useEffect(() => {
        if (profileQuery.data) {
            setProfile(profileQuery.data);
            setIsReady(true);
        }
    }, [profileQuery.data]);

    const updateProfile = useCallback((updates: Partial<UserProfile>) => {
        setProfile(prev => {
            const updated = { ...prev, ...updates };
            saveMutation.mutate(updated);
            return updated;
        });
    }, [saveMutation]);

    const completeOnboarding = useCallback((
        username: string,
        avatar: string,
        difficulty: number,
        interests: string[],
        sessionLength: number,
    ) => {
        const today = getTodayString();
        setProfile(prev => {
            const updated: UserProfile = {
                ...prev,
                username,
                avatar,
                difficulty,
                interests,
                sessionLength,
                onboardingCompleted: true,
                lastPlayDate: today,
                streak: 1,
                duelsDateTracker: today,
                questsDate: today,
            };
            saveMutation.mutate(updated);
            return updated;
        });
    }, [saveMutation]);

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

    const recordDuelResult = useCallback((result: DuelResult) => {
        setLastDuelResult(result);
        const today = getTodayString();

        setProfile(prev => {
            const newRating = Math.max(0, prev.rating + result.ratingChange);
            const newXp = prev.xp + result.xpEarned;
            const newWins = result.won ? prev.wins + 1 : prev.wins;
            const newDuelsToday = (prev.duelsDateTracker === today ? prev.duelsPlayedToday : 0) + 1;
            const newWinsToday = (prev.duelsDateTracker === today ? prev.duelsWonToday : 0) + (result.won ? 1 : 0);

            const newBadges = [...prev.badges];
            if (result.won && !newBadges.includes('first_blood') && newWins === 1) {
                newBadges.push('first_blood');
            }
            if (result.playerScore >= 10 && !newBadges.includes('speed_demon')) {
                newBadges.push('speed_demon');
            }
            if (newWins >= 50 && !newBadges.includes('compound_king')) {
                newBadges.push('compound_king');
            }
            if (newRating >= 1200 && !newBadges.includes('wall_street_wolf')) {
                newBadges.push('wall_street_wolf');
            }
            if (prev.totalDuels + 1 >= 100 && !newBadges.includes('centurion')) {
                newBadges.push('centurion');
            }

            const newStreak = prev.lastPlayDate === today ? prev.streak : (prev.streak + 1);

            const updated: UserProfile = {
                ...prev,
                rating: newRating,
                xp: newXp,
                wins: newWins,
                totalDuels: prev.totalDuels + 1,
                badges: newBadges,
                lastPlayDate: today,
                streak: newStreak,
                longestStreak: Math.max(prev.longestStreak, newStreak),
                duelsPlayedToday: newDuelsToday,
                duelsWonToday: newWinsToday,
                duelsDateTracker: today,
            };
            saveMutation.mutate(updated);
            return updated;
        });
    }, [saveMutation]);

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
            saveMutation.mutate(updated);
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
        await AsyncStorage.removeItem(STORAGE_KEY);
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
        completeOnboarding,
        checkAndUpdateStreak,
        recordDuelResult,
        completeDailyChallenge,
        setLastDuelResult,
        resetProfile,
    };
});
