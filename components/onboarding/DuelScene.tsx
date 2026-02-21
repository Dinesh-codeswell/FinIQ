import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
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

            // Aura pulses — clamped to 1.15 to stay within container bounds
            auraLeftOpacity.value = withDelay(1000, withRepeat(withSequence(
                withTiming(0.25, { duration: 1200 }),
                withTiming(0, { duration: 1200 })
            ), -1));
            auraLeftScale.value = withDelay(1000, withRepeat(withSequence(
                withTiming(1.15, { duration: 1200 }),
                withTiming(1, { duration: 1200 })
            ), -1));

            auraRightOpacity.value = withDelay(1200, withRepeat(withSequence(
                withTiming(0.25, { duration: 1200 }),
                withTiming(0, { duration: 1200 })
            ), -1));
            auraRightScale.value = withDelay(1200, withRepeat(withSequence(
                withTiming(1.15, { duration: 1200 }),
                withTiming(1, { duration: 1200 })
            ), -1));
        } else {
            // Reset all animations so they replay on re-visit
            leftScale.value = 0;
            rightScale.value = 0;
            vsScale.value = 0;
            auraLeftOpacity.value = 0;
            auraLeftScale.value = 1;
            auraRightOpacity.value = 0;
            auraRightScale.value = 1;
        }
    }, [isVisible]);

    const leftScaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: leftScale.value }],
    }));
    const rightScaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: rightScale.value }],
    }));
    const vsScaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: vsScale.value }],
    }));

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
            {/* 
                Original VS and Player animations - Commented out for future use
                
            <Animated.View style={[styles.playerContainer, leftScaleStyle]}>
                <Animated.View style={[styles.aura, styles.auraLeft, auraLeftStyle]} />
                <View style={[styles.card, styles.cardLeft]}>
                    <Text style={styles.monogram}>FQ</Text>
                </View>
                <Text style={styles.playerLabel}>You</Text>
            </Animated.View>

            <Animated.View style={[styles.vsContainer, vsScaleStyle]}>
                <Text style={styles.vsText}>VS</Text>
            </Animated.View>

            <Animated.View style={[styles.playerContainer, rightScaleStyle]}>
                <Animated.View style={[styles.aura, styles.auraRight, auraRightStyle]} />
                <View style={[styles.card, styles.cardRight]}>
                    <View style={styles.silhouette} />
                </View>
                <Text style={styles.playerLabel}>?</Text>
            </Animated.View>
            */}

            {/* New VS Image Asset */}
            <Animated.Image
                source={require('../../assets/images/VS.png')}
                style={[styles.vsImage, vsScaleStyle]}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 240,
        width: '100%',
    },
    vsImage: {
        width: '100%',
        height: '100%',
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
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    auraLeft: {
        backgroundColor: ONBOARDING_CONFIG.colors.slide1.accent,
    },
    auraRight: {
        backgroundColor: ONBOARDING_CONFIG.colors.slide1.opponentAccent,
    },
});
