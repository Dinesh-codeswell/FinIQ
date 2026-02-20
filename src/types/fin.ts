export type FinExpression =
    | "EXCITED" | "THINKING" | "CELEBRATING"
    | "EMPATHETIC" | "CURIOUS" | "PROUD"
    | "CONCERNED" | "PLAYFUL";

export type TipCategory =
    | "compound_interest"
    | "investing_basics"
    | "behavioral_finance"
    | "market_mechanics"
    | "personal_finance_habits"
    | "banking_credit"
    | "taxation"
    | "mindset_money"
    | "fun_fact"
    | "common_mistake";

export interface FinTip {
    id: string;
    date_seed: number;
    category: TipCategory;
    expression: FinExpression;
    headline: string;
    body: string;
    tap_to_learn_more: boolean;
    expanded_content?: string;
    cta_label?: string;
    cta_action?: string;
}

export interface FinReaction {
    expression: FinExpression;
    messages: string[];
}

export interface UserPattern {
    consecutiveLosses: number;
    daysSinceLastPlay: number;
    weakTopics: string[];
    streakDays: number;
    totalDuels: number;
    lastDuelResult: 'win' | 'loss' | null;
    questCompletionRate: number;
}
