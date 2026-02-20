import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Rect, Line, Defs, RadialGradient, Stop } from 'react-native-svg';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    withSequence,
    withDelay,
    withSpring,
} from 'react-native-reanimated';
import { ONBOARDING_CONFIG } from '@/src/constants/onboardingConfig';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedView = Animated.createAnimatedComponent(View);

interface Props {
    isVisible: boolean;
}

export const DuelScene = ({ isVisible }: Props) => {
    const leftScale = useSharedValue(0);
    const rightScale = useSharedValue(0);
    const vsScale = useSharedValue(0);
    const auraLeftOpacity = useSharedValue(0);
    const auraRightOpacity = useSharedValue(0);
    const auraLeftScale = useSharedValue(1);
    const auraRightScale = useSharedValue(1);

    useEffect(() => {
        if (isVisible) {
            leftScale.value = withDelay(200, withSpring(1));
            rightScale.value = withDelay(300, withSpring(1));
            vsScale.value = withDelay(400, withSpring(1, { damping: 10, stiffness: 200 }));

            // Aura pulses
            auraLeftOpacity.value = withDelay(1000, withRepeat(withSequence(
                withTiming(0.3, { duration: 1000 }),
                withTiming(0, { duration: 1000 })
            ), -1));
            auraLeftScale.value = withDelay(1000, withRepeat(withSequence(
                withTiming(1.3, { duration: 1000 }),
                withTiming(1, { duration: 1000 })
            ), -1));

            auraRightOpacity.value = withDelay(1200, withRepeat(withSequence(
                withTiming(0.3, { duration: 1000 }),
                withTiming(0, { duration: 1000 })
            ), -1));
            auraRightScale.value = withDelay(1200, withRepeat(withSequence(
                withTiming(1.3, { duration: 1000 }),
                withTiming(1, { duration: 1000 })
            ), -1));
        }
    }, [isVisible]);

    const auraLeftStyle = useAnimatedStyle(() => ({
        opacity: auraLeftOpacity.value,
        transform: [{ scale: auraLeftScale.value }],
    }));

    const auraRightStyle = useAnimatedStyle(() => ({
        opacity: auraRightOpacity.value,
        transform: [{ scale: auraRightScale.value }],
    }));

    return (
        <View style={styles.container}>
            {/* Left Player (You) */}
            <AnimatedView style={[styles.playerContainer, { transform: [{ scale: leftScale }] }]}>
                <AnimatedView style={[styles.aura, styles.auraLeft, auraLeftStyle]} />
                <View style={[styles.card, styles.cardLeft]}>
                    <Text style={styles.monogram}>FQ</Text>
                </View>
                <Text style={styles.playerLabel}>You</Text>
            </AnimatedView>

            {/* VS Element */}
            <AnimatedView style={[styles.vsContainer, { transform: [{ scale: vsScale }] }]}>
                <Text style={styles.vsText}>VS</Text>
            </AnimatedView>

            {/* Right Player (Opponent) */}
            <AnimatedView style={[styles.playerContainer, { transform: [{ scale: rightScale }] }]}>
                <AnimatedView style={[styles.aura, styles.auraRight, auraRightStyle]} />
                <View style={[styles.card, styles.cardRight]}>
                    <View style={styles.silhouette} />
                </View>
                <Text style={styles.playerLabel}>?</Text>
            </AnimatedView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        gap: 30,
    },
    playerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardLeft: {
        borderColor: ONBOARDING_CONFIG.colors.slide1.accent,
        backgroundColor: 'rgba(0,214,143,0.1)',
    },
    cardRight: {
        borderColor: ONBOARDING_CONFIG.colors.slide1.opponentAccent,
        backgroundColor: 'rgba(255,71,87,0.1)',
    },
    monogram: {
        color: ONBOARDING_CONFIG.colors.slide1.accent,
        fontSize: 24,
        fontWeight: '900',
        fontFamily: 'BarlowCondensed_800ExtraBold',
    },
    silhouette: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    playerLabel: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
        marginTop: 8,
        fontWeight: '600',
    },
    vsContainer: {
        marginHorizontal: 10,
    },
    vsText: {
        color: '#FFFFFF',
        fontSize: 48,
        fontFamily: 'BarlowCondensed_800ExtraBold',
        letterSpacing: -1,
    },
    aura: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    auraLeft: {
        backgroundColor: ONBOARDING_CONFIG.colors.slide1.accent,
    },
    auraRight: {
        backgroundColor: ONBOARDING_CONFIG.colors.slide1.opponentAccent,
    },
});
