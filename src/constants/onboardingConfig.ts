export const ONBOARDING_CONFIG = {
    colors: {
        slide1: {
            bg: '#060E08',
            accent: '#00D68F',
            glow: 'rgba(0, 214, 143, 0.12)',
            opponentGlow: 'rgba(255, 71, 87, 0.08)',
            opponentAccent: '#FF4757',
        },
        slide2: {
            bg: '#071210',
            accent: '#00D68F',
            glow: 'rgba(0, 180, 130, 0.08)',
        },
        slide3: {
            bg: '#0E0C06',
            accent: '#F5A623',
            glow: 'rgba(245, 166, 35, 0.06)',
            greenGlow: 'rgba(0, 214, 143, 0.05)',
        },
        progress: {
            active: '#00D68F',
            upcoming: 'rgba(255, 255, 255, 0.15)',
        }
    },
    timing: {
        slideAnimationStagger: 100,
        fadeDuration: 400,
        springDamping: 15,
        springStiffness: 100,
    }
};

export const SLIDE_DATA = [
    {
        id: 'arena',
        title: 'Duel.',
        subtitle: 'Compete.',
        tertiary: 'Dominate.',
        subLabel: 'Finance. Knowledge. Victory.',
    },
    {
        id: 'weapon',
        title: 'Every answer',
        subtitle: 'makes you',
        tertiary: 'sharper.',
    },
    {
        id: 'glory',
        title: 'Rise.',
        subtitle: 'Be ranked.',
        tertiary: 'Leave your mark.',
    }
];
