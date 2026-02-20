import { Division, Badge, DailyQuest } from '@/types/game';

export const DIVISIONS: Division[] = [
    { name: 'bronze', title: 'Bronze Analyst', minRating: 0, maxRating: 999, color: '#CD7F32' },
    { name: 'silver', title: 'Silver Analyst', minRating: 1000, maxRating: 1199, color: '#C0C0C0' },
    { name: 'gold', title: 'Gold Analyst', minRating: 1200, maxRating: 1499, color: '#FFD700' },
    { name: 'platinum', title: 'Platinum Trader', minRating: 1500, maxRating: 1799, color: '#E5E4E2' },
    { name: 'diamond', title: 'Diamond Fund Manager', minRating: 1800, maxRating: 2099, color: '#B9F2FF' },
    { name: 'elite', title: 'Elite Quant', minRating: 2100, maxRating: 99999, color: '#00D68F' },
];

export const BADGES: Badge[] = [
    { id: 'first_blood', name: 'First Blood', description: 'Won your first duel', icon: 'swords' },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Answered 10 questions in a Sprint Duel', icon: 'zap' },
    { id: 'market_oracle', name: 'Market Oracle', description: '7-day daily challenge streak', icon: 'eye' },
    { id: 'compound_king', name: 'Compound King', description: 'Won 50 duels', icon: 'crown' },
    { id: 'wall_street_wolf', name: 'Wall Street Wolf', description: 'Reached Gold division', icon: 'trending-up' },
    { id: 'black_swan', name: 'Black Swan', description: 'Won a duel from behind', icon: 'feather' },
    { id: 'streak_master', name: 'Streak Master', description: '30-day streak', icon: 'flame' },
    { id: 'centurion', name: 'Centurion', description: '100 duels played', icon: 'shield' },
];

export const DAILY_QUESTS: DailyQuest[] = [
    { id: 'win_2_sprints', title: 'Win 2 Sprint Duels', description: 'Victory in 2 Sprint matches', target: 2, xpReward: 50, icon: 'swords' },
    { id: 'daily_challenge', title: 'Market Mood', description: 'Answer today\'s Market Mood challenge', target: 1, xpReward: 30, icon: 'bar-chart-2' },
    { id: 'play_duel', title: 'Enter the Arena', description: 'Play any duel match', target: 1, xpReward: 20, icon: 'play' },
];

export const AVATARS = ['fox', 'bull', 'bear', 'owl', 'wolf'] as const;

export const AVATAR_EMOJIS: Record<string, string> = {
    fox: '🦊',
    bull: '🐂',
    bear: '🐻',
    owl: '🦉',
    wolf: '🐺',
};

export function getDivision(rating: number): Division {
    return DIVISIONS.find(d => rating >= d.minRating && rating <= d.maxRating) || DIVISIONS[0];
}

export function calculateElo(playerRating: number, opponentRating: number, won: boolean): number {
    const K = 32;
    const expected = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const actual = won ? 1 : 0;
    const change = Math.round(K * (actual - expected));
    if (won) return Math.max(8, Math.min(20, change));
    return Math.max(-15, Math.min(0, change));
}
