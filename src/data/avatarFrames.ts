export type AvatarFrameId =
    | 'none'
    | 'grey_static'
    | 'green_pulse'
    | 'gold_circuit'
    | 'chart_line'
    | 'market_ticker'
    | 'diamond_spin';

export interface AvatarFrame {
    id: AvatarFrameId;
    name: string;
    description: string;
    isPro: boolean;
    previewColor: string;
    animationType: 'none' | 'pulse' | 'rotate' | 'scroll' | 'shimmer';
    borderColor: string;
    borderWidth: number;
    glowColor: string | null;
}

export const AVATAR_FRAMES: Record<AvatarFrameId, AvatarFrame> = {
    none: {
        id: 'none',
        name: 'No Frame',
        description: 'Clean, minimal look',
        isPro: false,
        previewColor: 'transparent',
        animationType: 'none',
        borderColor: 'transparent',
        borderWidth: 0,
        glowColor: null,
    },
    grey_static: {
        id: 'grey_static',
        name: 'Standard',
        description: 'Default frame for all players',
        isPro: false,
        previewColor: '#3A3A3A',
        animationType: 'none',
        borderColor: '#3A3A3A',
        borderWidth: 2,
        glowColor: null,
    },
    green_pulse: {
        id: 'green_pulse',
        name: 'Market Pulse',
        description: 'Animated green ring — Pro exclusive',
        isPro: true,
        previewColor: '#00D68F',
        animationType: 'pulse',
        borderColor: '#00D68F',
        borderWidth: 2.5,
        glowColor: 'rgba(0, 214, 143, 0.35)',
    },
    gold_circuit: {
        id: 'gold_circuit',
        name: 'Gold Circuit',
        description: 'Premium gold finish — Pro exclusive',
        isPro: true,
        previewColor: '#F5A623',
        animationType: 'shimmer',
        borderColor: '#F5A623',
        borderWidth: 2.5,
        glowColor: 'rgba(245, 166, 35, 0.4)',
    },
    chart_line: {
        id: 'chart_line',
        name: 'Bull Run',
        description: 'Chart line orbits your avatar — Pro exclusive',
        isPro: true,
        previewColor: '#00B4CC',
        animationType: 'rotate',
        borderColor: '#00B4CC',
        borderWidth: 2,
        glowColor: 'rgba(0, 180, 204, 0.3)',
    },
    market_ticker: {
        id: 'market_ticker',
        name: 'Market Ticker',
        description: 'Live ticker wraps your avatar — Pro exclusive',
        isPro: true,
        previewColor: '#FF6B4A',
        animationType: 'scroll',
        borderColor: '#FF6B4A',
        borderWidth: 2,
        glowColor: 'rgba(255, 107, 74, 0.3)',
    },
    diamond_spin: {
        id: 'diamond_spin',
        name: 'Diamond Elite',
        description: 'For the top 1% — Pro exclusive',
        isPro: true,
        previewColor: '#B47FFF',
        animationType: 'rotate',
        borderColor: '#B47FFF',
        borderWidth: 3,
        glowColor: 'rgba(180, 127, 255, 0.45)',
    },
};
