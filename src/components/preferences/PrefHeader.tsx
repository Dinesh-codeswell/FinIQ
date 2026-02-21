import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import Colors from '@/constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PrefHeaderProps {
    question: string;
    step: number;
    totalSteps: number;
}

export const PrefHeader: React.FC<PrefHeaderProps> = ({ question, step, totalSteps }) => {
    const bubbleScale = useSharedValue(0.7);
    const foxHeadPos = useSharedValue(0);
    const borderOpacity = useSharedValue(0.6);

    useEffect(() => {
        // Pop animation for bubble
        bubbleScale.value = withSequence(
            withSpring(1.05, { damping: 15, stiffness: 150 }),
            withSpring(1.0, { damping: 15, stiffness: 150 })
        );

        // Fox nod animation
        foxHeadPos.value = withSequence(
            withTiming(3, { duration: 200 }),
            withTiming(0, { duration: 200 })
        );
    }, [step]);

    const bubbleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: bubbleScale.value }],
    }));

    const foxStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: foxHeadPos.value }],
        borderColor: interpolateColor(borderOpacity.value, [0.6, 1], ['rgba(0, 214, 143, 0.6)', '#00D68F']),
    }));

    // Helper for color interpolation in reanimated is tricky with rgba strings sometimes, 
    // but the prompt specified a quick brightening of the border.

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Animated.View style={[styles.foxContainer, foxStyle]}>
                    <Text style={styles.foxEmoji}>🦊</Text>
                </Animated.View>

                <Animated.View style={[styles.bubble, bubbleStyle]}>
                    <View style={styles.bubbleTail} />
                    <Text style={styles.bubbleText}>{question}</Text>
                </Animated.View>
            </View>

            <View style={styles.meta}>
                <Text style={styles.stepLabel}>STEP {step} OF {totalSteps}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginTop: 16,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },
    foxContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#0D2018',
        borderWidth: 1,
        borderColor: '#00D68F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    foxEmoji: {
        fontSize: 24,
    },
    bubble: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        position: 'relative',
    },
    bubbleTail: {
        position: 'absolute',
        left: -8,
        top: 16,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 8,
        borderRightWidth: 10,
        borderBottomWidth: 8,
        borderLeftWidth: 0,
        borderTopColor: 'transparent',
        borderRightColor: '#FFFFFF',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    bubbleText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111111',
        lineHeight: 20,
    },
    meta: {
        marginTop: 12,
    },
    stepLabel: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.35)',
        letterSpacing: 1.5,
        fontWeight: '700',
    },
});

import { interpolateColor } from 'react-native-reanimated';
