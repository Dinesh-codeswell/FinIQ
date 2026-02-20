export const TYPOGRAPHY = {
    fontFamily: 'Inter',
    weights: {
        thin: '300',      // Inter_300Light
        regular: '400',   // Inter_400Regular
        medium: '500',    // Inter_500Medium
        semibold: '600',  // Inter_600SemiBold
        bold: '700',      // Inter_700Bold
        extraBold: '800', // Inter_800ExtraBold
    },
    sizes: {
        hero: 52,
        greeting: 28,
        cardTitle: 20,
        sectionHeader: 17,
        modeName: 15,
        body: 14,
        meta: 12,
        pill: 11,
        tiny: 10,
    },
    letterSpacing: {
        tight: -2,
        narrow: -0.5,
        normal: 0,
        wide: 0.5,
        extraWide: 0.04 * 16, // 0.04em context depends on size
    }
};
