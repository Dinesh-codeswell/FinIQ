export type QuestionType =
    | "money_math"       // Pure calculation, numeric answer
    | "scenario_mcq"     // Market scenario, 4 options
    | "true_false"       // Statement, TRUE or FALSE
    | "term_match"       // Match term to definition (handled separately)
    | "mental_math"      // Mental math and logic puzzles
    | "daily_challenge"; // Special daily question, MCQ format

export type Topic =
    | "investing"
    | "personal_finance"
    | "banking"
    | "macroeconomics"
    | "crypto"
    | "mental_math"
    | "equity_markets"
    | "derivatives"
    | "taxation"
    | "insurance";

export interface Question {
    id: string;                    // Unique ID e.g. "MM_E_001" (type_difficulty_number)
    type: QuestionType;            // See types above
    topic: Topic;                  // See topics above
    difficulty: 0 | 1 | 2 | 3;    // 0=Starter, 1=Easy, 2=Medium, 3=Hard
    isStarter?: boolean;           // true only for difficulty:0 questions
    confidenceTag?: string;        // e.g. "quick_win", "everyday_money", "common_sense"
    minRating: number;             // Minimum player rating to see this question (0/1000/1300)
    question: string;              // The question text shown to player
    answer: string | number;       // Correct answer
    options?: string[];            // MCQ only: exactly 4 options, answer must be one of them
    explanation: string;           // Brief explanation shown post-answer (1-2 sentences)
    feedbackCorrect?: string;      // Motivational text for correct answer
    feedbackWrong?: string;        // Educational text for wrong answer
    timeLimit: number;             // Seconds allowed: 8 for sprint, 20 for scenario
    tags?: string[];               // e.g. ["rbi", "interest-rates", "bonds"] for filtering
}

export interface DailyChallenge extends Question {
    event_context: string;  // What real-world event this mirrors
    fun_fact: string;       // Extra learning after revealing answer
}

export interface TermPair {
    id: string;
    term: string;
    definition: string;
    topic: Topic;
    difficulty: 0 | 1 | 2 | 3;
}
