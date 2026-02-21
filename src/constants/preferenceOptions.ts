import { Topic } from '@/types/game';

export interface PreferenceOption {
    id: string;
    label: string;
    description?: string;
    icon?: string;
    emoji?: string;
    accent?: string;
    gradient?: string[];
}

export const KNOWLEDGE_LEVELS: PreferenceOption[] = [
    {
        id: 'recruit',
        label: 'RECRUIT',
        description: 'Starting my financial journey',
        accent: '#CD7F32', // Bronze
    },
    {
        id: 'analyst',
        label: 'ANALYST',
        description: 'I know the basics — ready to compete',
        accent: '#C0C0C0', // Silver
    },
    {
        id: 'strategist',
        label: 'STRATEGIST',
        description: 'Deep market knowledge. Here for elite duels.',
        accent: '#F5A623', // Gold
    },
];

export const TOPIC_OPTIONS: (PreferenceOption & { topicId: Topic })[] = [
    {
        id: 'investing',
        topicId: 'investing',
        label: 'INVESTING',
        icon: 'trending-up',
        accent: '#00D68F',
        gradient: ['#0D2B1A', '#091A10'],
    },
    {
        id: 'personal_fin',
        topicId: 'personal_finance',
        label: 'PERSONAL FIN',
        icon: 'home',
        accent: '#4ECDC4',
        gradient: ['#1A1D2B', '#0D1018'],
    },
    {
        id: 'banking',
        topicId: 'banking',
        label: 'BANKING',
        icon: 'landmark',
        accent: '#45B7D1',
        gradient: ['#0D1D2B', '#091218'],
    },
    {
        id: 'macro',
        topicId: 'macroeconomics',
        label: 'MACROECONOMICS',
        icon: 'globe',
        accent: '#96CEB4',
        gradient: ['#1A1A0D', '#101009'],
    },
    {
        id: 'crypto',
        topicId: 'crypto',
        label: 'CRYPTO',
        icon: 'bitcoin',
        accent: '#F7DC6F',
        gradient: ['#1A1209', '#100A05'],
    },
    {
        id: 'mental_math',
        topicId: 'mental_math',
        label: 'MENTAL MATH',
        icon: 'hash',
        accent: '#BB8FCE',
        gradient: ['#1A0D1A', '#100910'],
    },
    {
        id: 'equity',
        topicId: 'equity_markets',
        label: 'EQUITY MARKETS',
        icon: 'bar-chart-2',
        accent: '#F0B27A',
        gradient: ['#0D1A1A', '#091010'],
    },
    {
        id: 'taxation',
        topicId: 'taxation',
        label: 'TAXATION',
        icon: 'file-text',
        accent: '#85C1E9',
        gradient: ['#0D1A0D', '#091009'],
    },
    {
        id: 'insurance',
        topicId: 'insurance',
        label: 'INSURANCE',
        icon: 'shield',
        accent: '#F1948A',
        gradient: ['#1A0D0D', '#100909'],
    },
    {
        id: 'derivatives',
        topicId: 'derivatives',
        label: 'DERIVATIVES',
        icon: 'zap',
        accent: '#F5A623',
        gradient: ['#1A1209', '#100A05'],
    },
];

export const PLAY_STYLE_OPTIONS: PreferenceOption[] = [
    {
        id: 'flash',
        label: 'FLASH',
        description: 'Pure speed.\nNo hesitation.',
        icon: 'zap',
        accent: '#00D68F',
        gradient: ['rgba(0,214,143,0.12)', 'rgba(0,214,143,0.04)'],
    },
    {
        id: 'precision',
        label: 'PRECISION',
        description: 'Accuracy first.\nEvery point counts.',
        icon: 'target',
        accent: '#45B7D1',
        gradient: ['rgba(69,183,209,0.12)', 'rgba(69,183,209,0.04)'],
    },
    {
        id: 'strategist',
        label: 'STRATEGIST',
        description: 'Deep thinking.\nOutwit the field.',
        icon: 'brain',
        accent: '#BB8FCE',
        gradient: ['rgba(187,143,206,0.12)', 'rgba(187,143,206,0.04)'],
    },
    {
        id: 'grinder',
        label: 'GRINDER',
        description: 'Volume wins.\nEndurance is my edge.',
        icon: 'flame',
        accent: '#F5A623',
        gradient: ['rgba(245,166,35,0.12)', 'rgba(245,166,35,0.04)'],
    },
];

export const MONEY_MISSION_OPTIONS: PreferenceOption[] = [
    { id: 'grow', label: 'Grow my money faster', emoji: '💰' },
    { id: 'understand', label: 'Understand why markets crash', emoji: '📉' },
    { id: 'crypto', label: 'Navigate crypto without getting wrecked', emoji: '₿' },
    { id: 'plan', label: 'Plan for a home / big purchase', emoji: '🏠' },
    { id: 'crush', label: 'Crush my friends in finance debates', emoji: '⚔️' },
    { id: 'career', label: 'Build career-ready financial skills', emoji: '🎓' },
];

export const COMMITMENT_OPTIONS = [
    { id: 'flash', label: 'FLASH', minutes: 5, accent: '#00D68F', mode: 'Quick & sharp', desc: 'Quick daily sharpening — 1-3 duels per session' },
    { id: 'blitz', label: 'BLITZ', minutes: 10, accent: '#F5A623', mode: 'The sweet spot', desc: 'The balanced grinder — 3-5 duels daily' },
    { id: 'siege', label: 'SIEGE', minutes: 20, accent: '#BB8FCE', mode: 'Elite grinder', desc: 'Elite practice — 5-8 duels, 2× XP bonus' },
];

export const SCREEN_ATMOSPHERES = {
    1: '#070C09', // Knowledge (growth)
    2: '#07090D', // Topics (depth)
    3: '#0D0709', // Play Style (competition)
    4: '#0A0A07', // Challenge (aspiration)
    5: '#07090D', // Commitment (time)
    6: '#060E08', // Reminder (activation)
};
