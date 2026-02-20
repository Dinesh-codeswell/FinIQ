import { MockPlayer } from '@/types/game';

export const MOCK_LEADERBOARD: MockPlayer[] = [
    { id: '1', username: 'QuantKing_42', avatar: 'wolf', rating: 2150, division: 'Elite Quant' },
    { id: '2', username: 'BullRunner_88', avatar: 'bull', rating: 2080, division: 'Diamond Fund Manager' },
    { id: '3', username: 'FoxTrader_11', avatar: 'fox', rating: 1980, division: 'Diamond Fund Manager' },
    { id: '4', username: 'BearWhale_33', avatar: 'bear', rating: 1850, division: 'Diamond Fund Manager' },
    { id: '5', username: 'OwlSage_77', avatar: 'owl', rating: 1750, division: 'Platinum Trader' },
    { id: '6', username: 'AlphaWolf_55', avatar: 'wolf', rating: 1680, division: 'Platinum Trader' },
    { id: '7', username: 'MarketMind_22', avatar: 'fox', rating: 1520, division: 'Platinum Trader' },
    { id: '8', username: 'CryptoFox_99', avatar: 'fox', rating: 1450, division: 'Gold Analyst' },
    { id: '9', username: 'SteadyBull_44', avatar: 'bull', rating: 1380, division: 'Gold Analyst' },
    { id: '10', username: 'WiseOwl_66', avatar: 'owl', rating: 1290, division: 'Gold Analyst' },
    { id: '11', username: 'RiskBear_21', avatar: 'bear', rating: 1220, division: 'Gold Analyst' },
    { id: '12', username: 'NightWolf_13', avatar: 'wolf', rating: 1180, division: 'Silver Analyst' },
    { id: '13', username: 'DayFox_87', avatar: 'fox', rating: 1120, division: 'Silver Analyst' },
    { id: '14', username: 'SmartOwl_45', avatar: 'owl', rating: 1050, division: 'Silver Analyst' },
    { id: '15', username: 'YoungBull_78', avatar: 'bull', rating: 980, division: 'Bronze Analyst' },
];

export const MOCK_FRIENDS: MockPlayer[] = [
    { id: 'f1', username: 'TraderAce', avatar: 'fox', rating: 1340, division: 'Gold Analyst' },
    { id: 'f2', username: 'CoinHunter', avatar: 'bull', rating: 1180, division: 'Silver Analyst' },
    { id: 'f3', username: 'BondKing', avatar: 'owl', rating: 1520, division: 'Platinum Trader' },
    { id: 'f4', username: 'CashFlow', avatar: 'wolf', rating: 1060, division: 'Silver Analyst' },
    { id: 'f5', username: 'EarlyBird', avatar: 'bear', rating: 890, division: 'Bronze Analyst' },
];

export const BOT_NAMES = [
    'AlgoBot_X1', 'MarketMaker_AI', 'QuickCalc_77', 'FinBrain_99',
    'RateRush_42', 'ValueBot_55', 'TrendRider_88', 'SharpMind_33',
];

export function getRandomBot(playerRating: number): MockPlayer {
    const ratingVariation = Math.floor(Math.random() * 200) - 100;
    const botRating = Math.max(500, playerRating + ratingVariation);
    const name = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
    const avatars = ['fox', 'bull', 'bear', 'owl', 'wolf'];
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];
    return {
        id: 'bot_' + Date.now(),
        username: name,
        avatar,
        rating: botRating,
        division: '',
    };
}

export const FINIQ_FACTS = [
    'Warren Buffett made 99% of his wealth after age 50 — the power of compounding.',
    'The S&P 500 has historically returned about 10% annually before inflation.',
    'Albert Einstein reportedly called compound interest the "eighth wonder of the world."',
    'The average millionaire has 7 streams of income.',
    'Only about 10% of actively managed funds beat their benchmark index over 15 years.',
    'The Rule of 72: divide 72 by interest rate to find how many years to double your money.',
    'Japan\'s stock market took 34 years to recover from its 1989 peak.',
    'The first stock exchange was established in Amsterdam in 1602.',
];

export const MASCOT_WIN_TIPS = [
    'Great job! As your rating grows, opponents will solve faster.',
    'That\'s the compound effect of practice. Keep stacking those wins!',
    'You\'re building real financial intuition. This stuff pays dividends — literally.',
    'Winner winner! Remember: in real markets, discipline beats intelligence.',
];

export const MASCOT_LOSS_TIPS = [
    'Close one. Study up and come back stronger.',
    'Even Buffett lost money sometimes. The key is learning from every trade.',
    'Losses are just tuition for the market. You\'re getting smarter.',
    'Don\'t worry — every expert was once a beginner. Review and rally!',
];
