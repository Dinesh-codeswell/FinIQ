import { FinExpression } from '@/src/types/fin';

export interface FinTourStep {
    id: string;
    target_element: string;
    expression: FinExpression;
    title: string;
    message: string;
    position: 'top' | 'bottom' | 'middle';
    action_label: string;
}

export const FIN_TOUR_STEPS: FinTourStep[] = [
    {
        id: "TOUR_01",
        target_element: "rating_hero_number",
        expression: "EXCITED",
        title: "This is your Rating",
        message: "Everyone starts at 1000. Win duels and it climbs. Lose and it drops a little. It's your financial intelligence score — protect it.",
        position: "bottom",
        action_label: "Got it!"
    },
    {
        id: "TOUR_02",
        target_element: "stats_panel_streak",
        expression: "PROUD",
        title: "Your Streak",
        message: "Play at least one duel every day to keep your streak alive. I'll remind you if you're about to lose it — that's what friends are for.",
        position: "bottom",
        action_label: "I'll protect it!"
    },
    {
        id: "TOUR_03",
        target_element: "daily_challenge_card",
        expression: "EXCITED",
        title: "Market Mood — Daily",
        message: "One premium question every day based on real financial events. Don't be the last one to answer.",
        position: "top",
        action_label: "Interesting!"
    },
    {
        id: "TOUR_04",
        target_element: "sprint_duel_card",
        expression: "PLAYFUL",
        title: "Sprint Duels — Your Arena",
        message: "Race a real opponent to solve the most finance questions in 60 seconds. Speed AND accuracy win.",
        position: "top",
        action_label: "Let's duel!"
    },
    {
        id: "TOUR_05",
        target_element: "bottom_nav_compete",
        expression: "CURIOUS",
        title: "The Leaderboard",
        message: "See how you rank against everyone in your Division. There are 6 divisions. Push as hard as you want.",
        position: "top",
        action_label: "I'll climb it"
    },
    {
        id: "TOUR_06",
        target_element: "bottom_nav_quests",
        expression: "THINKING",
        title: "Daily Quests = Fast XP",
        message: "Three quests reset every day. They're quick and the XP adds up faster than you'd think.",
        position: "top",
        action_label: "Smart move"
    },
    {
        id: "TOUR_07",
        target_element: "fin_tip_card",
        expression: "EMPATHETIC",
        title: "I'll Teach You Something Daily",
        message: "Every day I'll drop one financial concept here — short, concrete, useful. No fluff.",
        position: "bottom",
        action_label: "Deal!"
    },
    {
        id: "TOUR_08",
        target_element: "center_duel_nav_button",
        expression: "CELEBRATING",
        title: "Ready? Let's Go.",
        message: "Hit that button and find your first opponent. Win or lose, you'll learn something.",
        position: "top",
        action_label: "LET'S GO! 🔥"
    },
];
