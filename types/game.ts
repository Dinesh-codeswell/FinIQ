export type QuestionResult = {
    questionId: string;
    question: string;
    topic: string;
    difficulty: number;
    userAnswer: string | number | null;
    correctAnswer: string | number;
    isCorrect: boolean;
    timeTaken: number;
    explanation: string;
    options?: string[];
};

export type QuestionType = 'money-math' | 'scenario-mcq' | 'true-false' | 'daily-challenge';

export type Topic = 'investing' | 'personal-finance' | 'banking' | 'macroeconomics' | 'crypto' | 'mental-math';

export type Difficulty = 1 | 2 | 3;

export type DuelMode = 'sprint' | 'scenario' | 'memory' | 'classical';

export interface Question {
    id: string;
    type: QuestionType | string;
    topic: Topic | string;
    difficulty: number;
    question: string;
    options?: string[];
    answer: string | number;
    explanation?: string;
    minRating?: number;
    timeLimit?: number;
    isStarter?: boolean;
}

export interface UserProfile {
    username: string;
    avatar: string;
    rating: number;
    xp: number;
    coins: number;
    streak: number;
    lastPlayDate: string | null;
    totalDuels: number;
    wins: number;
    longestStreak: number;
    badges: string[];
    interests: string[];
    difficulty: number;
    sessionLength: number;
    onboardingCompleted: boolean;
    dailyChallengeCompleted: string | null;
    questsCompletedToday: string[];
    questsDate: string | null;
    duelsPlayedToday: number;
    duelsWonToday: number;
    duelsDateTracker: string | null;
    // Feature 3: Pro & Frames
    isPro: boolean;
    proExpiresAt: number | null;
    proStartedAt: number | null;
    selectedAvatarFrame: string;
    unlockedFrames: string[];
}

export interface DuelResult {
    duelId?: string;
    mode: DuelMode | string;
    won: boolean;
    playerScore: number;
    opponentScore: number;
    ratingChange: number;
    xpEarned: number;
    opponentName: string;
    opponentAvatar: string;
    opponentRating: number;
    timestamp?: number;
    accuracy?: number;
    avgTimeTaken?: number;
    questionLog?: any[];
}

export interface Division {
    name: string;
    title: string;
    minRating: number;
    maxRating: number;
    color: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface MockPlayer {
    id: string;
    username: string;
    avatar: string;
    rating: number;
    division: string;
}

export interface DailyQuest {
    id: string;
    title: string;
    description: string;
    target: number;
    xpReward: number;
    icon: string;
}
