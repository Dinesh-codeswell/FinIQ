import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FinTip, UserPattern } from '@/src/types/fin';

interface FinState {
    todaysTip: FinTip | null;
    tipLiked: Record<string, boolean>; // date string -> liked
    tourCompleted: boolean;
    lastProactiveMessageDate: string | null;
    userPattern: UserPattern;

    // Actions
    setTodaysTip: (tip: FinTip) => void;
    setTipLiked: (date: string, liked: boolean) => void;
    setTourCompleted: (completed: boolean) => void;
    setLastProactiveMessageDate: (date: string) => void;
    updateUserPattern: (update: Partial<UserPattern>) => void;
    recordDuelResult: (result: 'win' | 'loss', topic: string) => void;
}

const initialPattern: UserPattern = {
    consecutiveLosses: 0,
    daysSinceLastPlay: 0,
    weakTopics: [],
    streakDays: 0,
    totalDuels: 0,
    lastDuelResult: null,
    questCompletionRate: 0,
};

export const useFinStore = create<FinState>()(
    persist(
        (set) => ({
            todaysTip: null,
            tipLiked: {},
            tourCompleted: false,
            lastProactiveMessageDate: null,
            userPattern: initialPattern,

            setTodaysTip: (tip) => set({ todaysTip: tip }),
            setTipLiked: (date, liked) =>
                set((state) => ({
                    tipLiked: { ...state.tipLiked, [date]: liked }
                })),
            setTourCompleted: (completed) => set({ tourCompleted: completed }),
            setLastProactiveMessageDate: (date) => set({ lastProactiveMessageDate: date }),

            updateUserPattern: (update) =>
                set((state) => ({
                    userPattern: { ...state.userPattern, ...update }
                })),

            recordDuelResult: (result, topic) =>
                set((state) => {
                    const newConsecutiveLosses = result === 'loss'
                        ? state.userPattern.consecutiveLosses + 1
                        : 0;

                    return {
                        userPattern: {
                            ...state.userPattern,
                            consecutiveLosses: newConsecutiveLosses,
                            lastDuelResult: result,
                            totalDuels: state.userPattern.totalDuels + 1,
                        }
                    };
                }),
        }),
        {
            name: 'fin-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                tourCompleted: state.tourCompleted,
                tipLiked: state.tipLiked,
                userPattern: state.userPattern,
                lastProactiveMessageDate: state.lastProactiveMessageDate,
            }),
        }
    )
);
