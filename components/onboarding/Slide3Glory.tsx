import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    useSharedValue,
    withDelay,
    withSpring,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import Svg, { Polygon, Text as SvgText } from 'react-native-svg';
import { LeaderboardStack } from './LeaderboardStack';
import { ONBOARDING_CONFIG, SLIDE_DATA } from '@/src/constants/onboardingConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
    isVisible: boolean;
    scrollX: SharedValue<number>;
    index: number;
}

export const Slide3Glory = ({ isVisible, scrollX, index }: Props) => {
    const data = SLIDE_DATA[2];
    const trophyY = useSharedValue(-100);
    const trophyScale = useSharedValue(1);
    const trophyGlowOpacity = useSharedValue(0.3);

    const float1Opacity = useSharedValue(0);
    const float1Y = useSharedValue(10);
    const float2Opacity = useSharedValue(0);
    const float2Y = useSharedValue(10);

    React.useEffect(() => {
        if (isVisible) {
            trophyY.value = withDelay(150, withSpring(0, { damping: 12, stiffness: 120 }));

            // Trophy glow pulse
            trophyGlowOpacity.value = withDelay(600, withRepeat(withSequence(
                withTiming(0.6, { duration: 400 }),
                withTiming(0.3, { duration: 400 })
            ), -1, true));

            // Floating elements stagger
            float1Opacity.value = withDelay(500, withTiming(1, { duration: 400 }));
            float1Y.value = withDelay(500, withSpring(0, { damping: 14, stiffness: 100 }));
            float2Opacity.value = withDelay(700, withTiming(1, { duration: 400 }));
            float2Y.value = withDelay(700, withSpring(0, { damping: 14, stiffness: 100 }));
        } else {
            // Reset for replay
            trophyY.value = -100;
            trophyGlowOpacity.value = 0.3;
            float1Opacity.value = 0;
            float1Y.value = 10;
            float2Opacity.value = 0;
            float2Y.value = 10;
        }
    }, [isVisible]);

    const trophyStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: trophyY.value },
            { scale: trophyScale.value }
        ],
    }));

    const glowStyle = useAnimatedStyle(() => ({
        opacity: trophyGlowOpacity.value,
        transform: [{ scale: interpolate(trophyGlowOpacity.value, [0.3, 0.6], [1, 1.1]) }],
    }));

    const float1Style = useAnimatedStyle(() => ({
        opacity: float1Opacity.value,
        transform: [{ translateY: float1Y.value }],
    }));
    const float2Style = useAnimatedStyle(() => ({
        opacity: float2Opacity.value,
        transform: [{ translateY: float2Y.value }],
    }));

    const parallaxStyle = useAnimatedStyle(() => {
        const inputValues = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];
        const translateX = interpolate(
            scrollX.value,
            inputValues,
            [-SCREEN_WIDTH * 0.15, 0, SCREEN_WIDTH * 0.15]
        );
        return { transform: [{ translateX }] };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.illustration, parallaxStyle]}>
                <Animated.View style={[styles.trophyContainer, trophyStyle]}>
                    <Animated.View style={[styles.trophyGlow, glowStyle]} />
                    <Svg width={80} height={80} viewBox="0 0 100 100">
                        <Polygon
                            points="50,5 95,25 95,75 50,95 5,75 5,25"
                            fill="#F5A623"
                            stroke="#FFD700"
                            strokeWidth="2"
                        />
                        <SvgText
                            x="50"
                            y="60"
                            textAnchor="middle"
                            fill="#000000"
                            fontSize="14"
                            fontWeight="800"
                            fontFamily="BarlowCondensed_800ExtraBold"
                        >
                            ELITE
                        </SvgText>
                    </Svg>
                </Animated.View>

                <LeaderboardStack isVisible={isVisible} />

                {/* Integrated Floating Elements — flanking the stack */}
                <Animated.View style={[styles.floating, { bottom: 200, left: 32 }, float1Style]}>
                    <View style={styles.streakBadge}>
                        <Animated.Text style={styles.fireEmoji}>🔥</Animated.Text>
                        <Text style={styles.streakText}>47-Day Streak</Text>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.floating, { bottom: 180, right: 32 }, float2Style]}>
                    <View style={styles.xpBadge}>
                        <Text style={styles.xpText}>+2.0× XP</Text>
                    </View>
                </Animated.View>
            </Animated.View>

            <View style={styles.textZone}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subtitle}>{data.subtitle}</Text>
                <Text style={styles.tertiary}>{data.tertiary}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        flex: 1,
        overflow: 'hidden',
    },
    illustration: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    trophyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        zIndex: 10,
    },
    trophyGlow: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(245,166,35,0.3)',
    },
    textZone: {
        paddingHorizontal: 24,
        paddingBottom: 180,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 52,
        fontFamily: 'BarlowCondensed_800ExtraBold',
        lineHeight: 56,
    },
    subtitle: {
        color: '#F5A623',
        fontSize: 52,
        fontFamily: 'BarlowCondensed_800ExtraBold',
        lineHeight: 56,
    },
    tertiary: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 36,
        fontFamily: 'BarlowCondensed_700Bold',
        lineHeight: 40,
        marginTop: 4,
    },
    floating: {
        position: 'absolute',
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 69, 58, 0.15)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 69, 58, 0.3)',
        gap: 6,
    },
    xpBadge: {
        backgroundColor: 'rgba(245, 166, 35, 0.15)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(245, 166, 35, 0.3)',
    },
    fireEmoji: {
        fontSize: 18,
    },
    streakText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '900',
        fontFamily: 'BarlowCondensed_700Bold',
    },
    xpText: {
        color: '#F5A623',
        fontSize: 14,
        fontWeight: '900',
        fontFamily: 'BarlowCondensed_700Bold',
    },
});
