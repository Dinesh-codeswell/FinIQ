import { FIN_TIPS } from '@/src/data/fin/tips';
import { FinTip } from '@/src/types/fin';

export function getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

export function getTodaysTip(): FinTip {
    const today = new Date();
    const dayOfYear = getDayOfYear(today);
    const tipIndex = (dayOfYear - 1) % FIN_TIPS.length;
    return FIN_TIPS[tipIndex];
}

export function getCategoryStyles(category: string) {
    switch (category) {
        case 'investing_basics':
        case 'compound_interest':
            return { bg: '#0D2A1E', text: '#00D68F' };
        case 'mindset_money':
        case 'behavioral_finance':
            return { bg: '#1A1000', text: '#F5A623' };
        case 'market_mechanics':
            return { bg: '#0D0D2A', text: '#7B7BFF' };
        default:
            return { bg: '#1E1E1E', text: '#AAAAAA' };
    }
}
