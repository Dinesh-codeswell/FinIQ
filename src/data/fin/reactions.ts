import { FinReaction } from '@/src/types/fin';

export const FIN_REACTIONS: Record<string, FinReaction> = {
    VICTORY_DOMINANT: {
        expression: "CELEBRATING",
        messages: [
            "That wasn't even close! You made that look easy. Your opponent is probably Googling compound interest right now.",
            "Dominant. Absolute clinic. Next time they'll bring a calculator and it still won't help.",
            "Chef's kiss. You didn't just win — you taught someone something today.",
        ]
    },
    VICTORY_CLOSE: {
        expression: "PROUD",
        messages: [
            "That was close enough to give me a heart attack. But close only counts in horseshoes — you WON. Take it.",
            "Scraped it. But a win is a win and you earned every point of that rating.",
            "I was sweating. You probably were too. That's the best kind of win.",
        ]
    },
    VICTORY_COMEBACK: {
        expression: "CELEBRATING",
        messages: [
            "YOU CAME BACK FROM BEHIND. That's the Black Swan badge energy right there. I'm genuinely impressed.",
            "The comeback special! Markets do this too — stay in when everyone else panics, win when they fold.",
        ]
    },
    DEFEAT_CLOSE: {
        expression: "EMPATHETIC",
        messages: [
            "One point. That's it. I know that stings — it should. But you're right there. Come back and take it.",
            "That close and you still got 24 XP. The rating gap was tiny. One more duel.",
        ]
    },
    DEFEAT_BAD: {
        expression: "EMPATHETIC",
        messages: [
            "Rough one. Not every duel goes your way — this is how the learning actually happens. Check what you got wrong.",
            "I've had sessions like this. Review the questions you missed and sleep on it. It genuinely helps.",
        ]
    },
    PERFECT_SCORE: {
        expression: "CELEBRATING",
        messages: [
            "PERFECT. Every single one. I don't give this out often: you're officially a FINIQ legend in this moment.",
            "100%? In a live duel under time pressure? That's not beginner luck — that's mastery developing.",
        ]
    },
    STREAK_3: {
        expression: "PROUD",
        messages: ["Three days in a row. Habit formation is real — you're building something here."]
    },
    STREAK_7: {
        expression: "CELEBRATING",
        messages: [
            "One week straight. Statistically, people who hit 7-day streaks are 4x more likely to still be playing at 30 days.",
            "Seven days. Most people quit before this. You didn't. I noticed.",
        ]
    },
    STREAK_BROKEN: {
        expression: "EMPATHETIC",
        messages: [
            "Streak's gone. I know it hurts. But streaks are just one signal — your knowledge doesn't reset when streaks do.",
            "Life happened. That's okay. The people who rebuild streaks fastest are the ones who don't beat themselves up.",
        ]
    },
    QUEST_COMPLETE: {
        expression: "PROUD",
        messages: ["Quest done. Small wins compound too.", "That's the one. XP earned. Habits built. Keep going."]
    },
    DIVISION_PROMOTION: {
        expression: "CELEBRATING",
        messages: [
            "YOU'VE BEEN PROMOTED. This isn't luck — this is what consistent play looks like.",
            "New division. New competition. You wanted this — you earned it.",
        ]
    },
    USER_LOSING_STREAK_3: {
        expression: "EMPATHETIC",
        messages: [
            "Three in a row is tough. Try switching to Practice Mode for a few rounds — it resets the mental state.",
            "Losing in duels means you're being challenged at the right level. Easy wins teach you nothing.",
        ]
    }
};
