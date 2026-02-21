import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    withDelay,
    interpolate
} from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PrefLoadingTransitionProps {
    onComplete: () => void;
    topics: string[];
}

const LOADING_STEPS = [
    "Building your analyst profile...",
    "Calibrating your starting ELO...",
    "Mapping your interest graph...",
    "Setting up your first arena...",
    "Ready for the fight."
];

export const PrefLoadingTransition: React.FC<PrefLoadingTransitionProps> = ({ onComplete, topics }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const radarScale = useSharedValue(0);
    const radarOpacity = useSharedValue(0);
    const checkScale = useSharedValue(0);

    useEffect(() => {
        // Step timer
        const interval = setInterval(() => {
            setStepIndex(prev => {
                if (prev < LOADING_STEPS.length - 1) return prev + 1;
                return prev;
            });
        }, 1200);

        // Animations
        radarScale.value = withTiming(1, { duration: 1500 });
        radarOpacity.value = withTiming(1, { duration: 1000 });

        // Final completion logic
        const timer = setTimeout(() => {
            checkScale.value = withSpring(1, { damping: 12 });
            setTimeout(onComplete, 1000);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    const radarStyle = useAnimatedStyle(() => ({
        transform: [{ scale: radarScale.value }],
        opacity: radarOpacity.value,
    }));

    const checkStyle = useAnimatedStyle(() => ({
        transform: [{ scale: checkScale.value }],
    }));

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.container}
        >
            <View style={styles.center}>
                {/* Radar Chart Animation Placeholder */}
                <Animated.View style={[styles.radarContainer, radarStyle]}>
                    <View style={styles.radarCircle} />
                    <View style={[styles.radarCircle, { width: 140, height: 140, opacity: 0.2 }]} />
                    <View style={[styles.radarCircle, { width: 80, height: 80, opacity: 0.3 }]} />

                    {/* Pulsing effect */}
                    <PulseRing delay={0} />
                    <PulseRing delay={1000} />
                </Animated.View>

                {stepIndex === LOADING_STEPS.length - 1 ? (
                    <Animated.View style={[styles.checkContainer, checkStyle]}>
                        <Check size={40} color="#00D68F" />
                    </Animated.View>
                ) : null}

                <Text style={styles.loadingText}>{LOADING_STEPS[stepIndex]}</Text>
            </View>
        </Animated.View>
    );
};

const PulseRing = ({ delay }: { delay: number }) => {
    const scale = useSharedValue(0.5);
    const opacity = useSharedValue(0.5);

    useEffect(() => {
        scale.value = withDelay(delay, withRepeat(withTiming(1.5, { duration: 2000 }), -1));
        opacity.value = withDelay(delay, withRepeat(withTiming(0, { duration: 2000 }), -1));
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return <Animated.View style={[styles.pulseRing, style]} />;
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#060A0D',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
    },
    radarContainer: {
        width: 240,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48,
    },
    radarCircle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#00D68F',
        opacity: 0.1,
    },
    pulseRing: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#00D68F',
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 24,
    },
    checkContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(0, 214, 143, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 80,
    },
});

import { withSpring } from 'react-native-reanimated';
