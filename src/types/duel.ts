import { Topic } from '../data/questions/schema';

export interface QuestionResult {
    questionId: string;
    question: string;
    topic: Topic;
    difficulty: 1 | 2 | 3;
    userAnswer: string | number | null;
    correctAnswer: string | number;
    isCorrect: boolean;
    timeTaken: number; // in milliseconds
    explanation: string;
    options?: string[];
}

export interface DuelResult {
    duelId: string;
    mode: 'sprint' | 'scenario' | 'true_false' | 'classical' | 'memory';
    playerRating: number;
    opponentRating: number;
    playerScore: number;
    opponentScore: number;
    outcome: 'win' | 'loss' | 'draw';
    ratingChange: number;
    xpEarned: number;
    timestamp: number;
    questionLog: QuestionResult[];
    totalQuestions: number;
    correctCount: number;
    accuracy: number;
    avgTimeTaken: number;
}
