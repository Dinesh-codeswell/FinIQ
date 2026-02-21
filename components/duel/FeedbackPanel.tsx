import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    FadeInDown,
} from 'react-native-reanimated';

interface FeedbackPanelProps {
    isVisible: boolean;
    isCorrect: boolean;
    correctOptionText?: string;
    explanation: string;
    points: number;
}

export default function FeedbackPanel({
    isVisible,
    isCorrect,
    correctOptionText,
    explanation,
    points,
}: FeedbackPanelProps) {
    const translateY = useSharedValue(200);
    const iconScale = useSharedValue(0);

    useEffect(() => {
        translateY.value = withSpring(isVisible ? 0 : 200, {
            damping: 18,
            stiffness: 120,
        });
        if (isVisible) {
            iconScale.value = withSpring(1, { damping: 10, stiffness: 200 });
        } else {
            iconScale.value = 0;
        }
    }, [isVisible]);

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: iconScale.value }],
    }));

    const accentColor = isCorrect ? '#00D68F' : '#FF4757';

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <View style={[styles.accentStripe, { backgroundColor: accentColor }]} />

            <View style={styles.content}>
                <View style={styles.topRow}>
                    <View style={styles.leftSection}>
                        <Animated.View
                            style={[
                                styles.iconCircle,
                                { backgroundColor: accentColor },
                                iconStyle,
                            ]}
                        >
                            <Text style={styles.iconText}>{isCorrect ? '✓' : '✗'}</Text>
                        </Animated.View>
                        <Text style={[styles.statusText, { color: accentColor }]}>
                            {isCorrect ? 'CORRECT!' : 'NOT QUITE'}
                        </Text>
                    </View>

                    <View style={styles.rightSection}>
                        {!isCorrect && correctOptionText != null && (
                            <View style={styles.correctReveal}>
                                <Text style={styles.smallLabel}>Correct answer:</Text>
                                <Text style={styles.correctValue} numberOfLines={1}>
                                    {correctOptionText}
                                </Text>
                            </View>
                        )}
                        <View style={styles.explanationBox}>
                            <Text style={styles.explanationText} numberOfLines={3}>
                                💡 {explanation}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomRow}>
                    <Text style={styles.pointsText}>
                        {isCorrect
                            ? `+${points} POINT${points !== 1 ? 'S' : ''}`
                            : '0 POINTS'}
                    </Text>
                    <Text style={[styles.nextText, { color: accentColor }]}>NEXT →</Text>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 180,
        backgroundColor: '#141414',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1,
        borderTopColor: '#242424',
        zIndex: 100,
        overflow: 'hidden',
    },
    accentStripe: {
        height: 4,
        width: '100%',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    topRow: {
        flexDirection: 'row',
        flex: 1,
        gap: 16,
    },
    leftSection: {
        width: 100,
        alignItems: 'center',
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    iconText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    rightSection: {
        flex: 1,
        justifyContent: 'center',
    },
    correctReveal: {
        marginBottom: 8,
    },
    smallLabel: {
        fontSize: 11,
        color: '#9A9A9A',
    },
    correctValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    explanationBox: {
        flex: 1,
    },
    explanationText: {
        fontSize: 13,
        color: '#9A9A9A',
        lineHeight: 18,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    pointsText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    nextText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
