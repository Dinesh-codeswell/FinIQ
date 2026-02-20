export interface MentalMathMode {
    id: string;
    name: string;
    tagline: string;
    duration: number; // Total duel time in seconds
    questionCount: number;
    timePerQuestion: number;
    xpMultiplier: number;
    difficulty: string;
    color: string;
    glowColor: string;
    icon: string;
    badge: string;
}

export const MENTAL_MATH_MODES: MentalMathMode[] = [
    {
        id: 'flash',
        name: 'FLASH',
        tagline: 'Pure instinct. No second guessing.',
        duration: 60,
        questionCount: 8,
        timePerQuestion: 8,
        xpMultiplier: 1.0,
        difficulty: 'Quick Fire',
        color: '#00D68F',
        glowColor: 'rgba(0, 214, 143, 0.4)',
        icon: '⚡',
        badge: 'Flash Thinker'
    },
    {
        id: 'blitz',
        name: 'BLITZ',
        tagline: 'Pace yourself. Think fast.',
        duration: 120,
        questionCount: 15,
        timePerQuestion: 10,
        xpMultiplier: 1.5,
        difficulty: 'Balanced',
        color: '#F5A623',
        glowColor: 'rgba(245, 166, 35, 0.4)',
        icon: '🔥',
        badge: 'Blitz Mind'
    },
    {
        id: 'siege',
        name: 'SIEGE',
        tagline: 'Endurance meets intelligence.',
        duration: 300,
        questionCount: 30,
        timePerQuestion: 12,
        xpMultiplier: 2.0,
        difficulty: 'Elite',
        color: '#BB8FCE',
        glowColor: 'rgba(187, 143, 206, 0.4)',
        icon: '🧠',
        badge: 'Siege Analyst'
    }
];
