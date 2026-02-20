import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FinExpression } from '@/src/types/fin';
import Colors from '@/constants/colors';

// Fallback image source if Lottie is not available or assets are missing
// In a real app, these would be LottieView or specific PNG assets
const EXPRESSION_EMOJIS: Record<FinExpression, string> = {
    EXCITED: '🦊✨',
    THINKING: '🦊🤔',
    CELEBRATING: '🦊🎉',
    EMPATHETIC: '🦊❤️',
    CURIOUS: '🦊🧐',
    PROUD: '🦊😎',
    CONCERNED: '🦊😟',
    PLAYFUL: '🦊😉',
};

interface FinMascotProps {
    expression: FinExpression;
    size?: 'small' | 'medium' | 'large';
    animated?: boolean;
    showSpeechBubble?: boolean;
    message?: string;
    onPress?: () => void;
}

const SIZES = {
    small: 48,
    medium: 80,
    large: 160,
};

export default function FinMascot({
    expression,
    size = 'medium',
    animated = true,
    showSpeechBubble = false,
    message,
    onPress,
}: FinMascotProps) {
    const bounceAnim = useRef(new Animated.Value(40)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const wiggleAnim = useRef(new Animated.Value(0)).current;
    const bubbleScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrance animation
        Animated.parallel([
            Animated.spring(bounceAnim, {
                toValue: 0,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();

        if (showSpeechBubble) {
            Animated.spring(bubbleScale, {
                toValue: 1,
                tension: 100,
                friction: 8,
                delay: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [showSpeechBubble]);

    const handlePress = () => {
        if (onPress) onPress();

        // Wiggle animation
        Animated.sequence([
            Animated.timing(wiggleAnim, { toValue: 5, duration: 150, useNativeDriver: true }),
            Animated.timing(wiggleAnim, { toValue: -5, duration: 150, useNativeDriver: true }),
            Animated.timing(wiggleAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        ]).start();
    };

    const dimension = SIZES[size];

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={handlePress}
            style={[styles.container, { height: dimension + (showSpeechBubble ? 60 : 0) }]}
        >
            {showSpeechBubble && message && (
                <Animated.View style={[
                    styles.speechBubble,
                    { transform: [{ scale: bubbleScale }, { translateY: -10 }] }
                ]}>
                    <Text style={styles.bubbleText}>{message}</Text>
                    <View style={styles.bubbleTail} />
                </Animated.View>
            )}

            <Animated.View style={[
                styles.mascotContainer,
                {
                    width: dimension,
                    height: dimension,
                    transform: [
                        { translateY: bounceAnim },
                        {
                            rotate: wiggleAnim.interpolate({
                                inputRange: [-5, 5],
                                outputRange: ['-5deg', '5deg']
                            })
                        }
                    ],
                    opacity: fadeAnim,
                }
            ]}>
                {/* Replace with LottieView once JSON assets are provided */}
                <View style={[styles.mascotPlaceholder, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}>
                    <Text style={{ fontSize: dimension * 0.6 }}>{EXPRESSION_EMOJIS[expression]}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mascotContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mascotPlaceholder: {
        backgroundColor: '#2A2A2A',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.accent,
    },
    speechBubble: {
        backgroundColor: '#1E1E1E',
        padding: 12,
        borderRadius: 12,
        borderLeftWidth: 2,
        borderLeftColor: Colors.accent,
        maxWidth: 240,
        marginBottom: 8,
    },
    bubbleText: {
        color: '#FFFFFF',
        fontSize: 13,
        lineHeight: 18,
        fontFamily: 'Inter-Regular',
    },
    bubbleTail: {
        position: 'absolute',
        bottom: -8,
        left: 20,
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderLeftColor: 'transparent',
        borderRightWidth: 8,
        borderRightColor: 'transparent',
        borderTopWidth: 8,
        borderTopColor: '#1E1E1E',
    },
});
