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

export type QuestionType = 'money_math' | 'scenario_mcq' | 'true_false' | 'term_match' | 'daily_challenge' | 'mental_math';

export type MentalMathSubCategory =
    | 'number_series'
    | 'missing_number'
    | 'rapid_arithmetic'
    | 'logic_deduction'
    | 'pattern_recognition'
    | 'ratio_proportion'
    | 'clock_calendar'
    | 'odd_one_out'
    | 'number_properties'
    | 'chain_operations';

export interface MentalMathQuestion {
    id: string;
    type: 'mental_math';
    topic: string;
    difficulty: number;
    question: string;
    answer: string | number;
    options?: string[];
    explanation: string;
    feedbackCorrect: string;
    feedbackWrong: string;
    timeLimit: number;
    minRating?: number;
    subCategory?: MentalMathSubCategory;
    answerType?: 'number' | 'letter' | 'word';
    hint?: string;
    tags?: string[];
}

export type Topic =
    | 'investing'
    | 'personal_finance'
    | 'banking'
    | 'macroeconomics'
    | 'crypto'
    | 'mental_math'
    | 'equity_markets'
    | 'derivatives'
    | 'taxation'
    | 'insurance';

export type Difficulty = 1 | 2 | 3;

export type DuelMode = 'sprint' | 'scenario' | 'memory' | 'classical' | 'duel' | 'mental_math';

export interface Question {
    id: string;
    type: QuestionType | string;
    topic: Topic | string;
    difficulty: number;
    question: string;
    options?: string[];
    answer?: string | number;       // String answer (modern schema)
    correctAnswer?: number;         // Index-based answer (legacy format)
    explanation: string;
    feedbackCorrect?: string;
    feedbackWrong?: string;
    minRating?: number;
    timeLimit?: number;
    isStarter?: boolean;
    tags?: string[];
    // Mental Math specific fields
    subCategory?: MentalMathSubCategory;
    answerType?: 'number' | 'letter' | 'word';
    hint?: string;
}

export interface UserProfile {
    id: string; // Added id for comparisons
    username: string;
    avatar: string;
    rating: number;
    previous_rating?: number;
    xp: number;
    total_xp?: number;
    tournament_xp?: number;
    global_rank?: number;
    rank_change?: number;
    coins: number;
    streak: number;
    current_streak?: number;
    lastPlayDate: string | null;
    totalDuels: number;
    wins: number;
    win_count?: number;
    loss_count?: number;
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
    is_online?: boolean;
    last_active_at?: string;
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
