import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { TrendingUp, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { getDailyChallenge } from '@/constants/questions';

export default function DailyChallengeScreen() {
    const router = useRouter();
    const { completeDailyChallenge, profile } = useGame();
    const challenge = getDailyChallenge();

    const [answered, setAnswered] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);

    const fadeIn = useRef(new Animated.Value(0)).current;
    const resultScale = useRef(new Animated.Value(0)).current;
    const flashAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleAnswer = (index: number) => {
        if (answered) return;
        setAnswered(true);
        setSelectedOption(index);

        const correct = index === challenge.correctAnswer;
        setIsCorrect(correct);

        flashAnim.setValue(0.3);
        Animated.timing(flashAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();

        Animated.spring(resultScale, {
            toValue: 1,
            tension: 80,
            friction: 8,
            useNativeDriver: true,
        }).start();

        if (Platform.OS !== 'web') {
            if (correct) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
        }

        completeDailyChallenge(correct);
    };

    const todayStr = new Date().toISOString().split('T')[0];
    if (profile.dailyChallengeCompleted === todayStr && !answered) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.doneContainer}>
                        <Text style={styles.doneEmoji}>✅</Text>
                        <Text style={styles.doneTitle}>Already completed!</Text>
                        <Text style={styles.doneDesc}>Come back tomorrow for a new Market Mood challenge.</Text>
                        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                            <Text style={styles.backBtnText}>GO BACK</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.flashOverlay,
                    {
                        opacity: flashAnim,
                        backgroundColor: isCorrect ? Colors.accent : Colors.loss,
                    },
                ]}
                pointerEvents="none"
            />

            <SafeAreaView style={styles.safeArea}>
                <Animated.View style={[styles.content, { opacity: fadeIn }]}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backArrow}>
                            <AlertCircle {...({ size: 48, color: Colors.loss, style: { marginBottom: 16 } } as any)} />
                        </TouchableOpacity>
                        <View style={styles.headerCenter}>
                            <CheckCircle2 {...({ size: 48, color: Colors.accent, style: { marginBottom: 16 } } as any)} />                        <Text style={styles.headerLabel}>MARKET MOOD</Text>
                        </View>
                        <View style={{ width: 30 }} />
                    </View>

                    <View style={styles.challengeArea}>
                        <Text style={styles.challengeTitle}>TODAY'S CHALLENGE</Text>
                        <Text style={styles.challengeDate}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </Text>

                        <View style={styles.questionCard}>
                            <Text style={styles.questionText}>{challenge.question}</Text>
                        </View>

                        <View style={styles.optionsArea}>
                            {challenge.options.map((option, index) => {
                                const isSelected = selectedOption === index;
                                const isCorrectOption = index === challenge.correctAnswer;
                                const labels = ['A', 'B', 'C', 'D'];

                                let borderColor = Colors.border;
                                let bgColor = Colors.cardBackground;
                                if (answered) {
                                    if (isCorrectOption) {
                                        borderColor = Colors.accent;
                                        bgColor = Colors.accentDim;
                                    } else if (isSelected) {
                                        borderColor = Colors.loss;
                                        bgColor = Colors.lossDim;
                                    }
                                }

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.option, { borderColor, backgroundColor: bgColor }]}
                                        onPress={() => handleAnswer(index)}
                                        disabled={answered}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[
                                            styles.optionLabel,
                                            answered && isCorrectOption && { backgroundColor: Colors.accent },
                                            answered && isSelected && !isCorrectOption && { backgroundColor: Colors.loss },
                                        ]}>
                                            <Text style={[
                                                styles.optionLabelText,
                                                answered && (isCorrectOption || isSelected) && { color: Colors.background },
                                            ]}>
                                                {labels[index]}
                                            </Text>
                                        </View>
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {answered && (
                            <Animated.View style={[styles.resultCard, { transform: [{ scale: resultScale }] }]}>
                                <Text style={styles.resultEmoji}>{isCorrect ? '🎯' : '💡'}</Text>
                                <Text style={[styles.resultTitle, { color: isCorrect ? Colors.accent : Colors.xpGold }]}>
                                    {isCorrect ? 'CORRECT!' : 'NOT QUITE'}
                                </Text>
                                {challenge.explanation && (
                                    <Text style={styles.explanationText}>{challenge.explanation}</Text>
                                )}
                                <Text style={styles.xpGained}>
                                    +{isCorrect ? 30 : 5} XP earned
                                </Text>
                                <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
                                    <Text style={styles.doneBtnText}>CONTINUE</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    </View>

                    <Text style={styles.playersText}>492 players have answered today</Text>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    flashOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    backArrow: {
        padding: 4,
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    headerLabel: {
        color: Colors.accent,
        fontSize: 13,
        fontWeight: '700' as const,
        letterSpacing: 1.5,
    },
    challengeArea: {
        flex: 1,
        paddingTop: 16,
    },
    challengeTitle: {
        color: Colors.textPrimary,
        fontSize: 28,
        fontWeight: '900' as const,
        letterSpacing: 2,
    },
    challengeDate: {
        color: Colors.textSecondary,
        fontSize: 13,
        marginTop: 4,
        marginBottom: 24,
    },
    questionCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    questionText: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '600' as const,
        lineHeight: 26,
    },
    optionsArea: {
        gap: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1.5,
    },
    optionLabel: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: Colors.cardElevated,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    optionLabelText: {
        color: Colors.textSecondary,
        fontSize: 13,
        fontWeight: '700' as const,
    },
    optionText: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '500' as const,
        flex: 1,
    },
    resultCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    resultEmoji: {
        fontSize: 36,
        marginBottom: 8,
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: '800' as const,
        letterSpacing: 1,
        marginBottom: 8,
    },
    explanationText: {
        color: Colors.textSecondary,
        fontSize: 13,
        lineHeight: 19,
        textAlign: 'center',
        marginBottom: 12,
    },
    xpGained: {
        color: Colors.xpGold,
        fontSize: 14,
        fontWeight: '700' as const,
        marginBottom: 16,
    },
    doneBtn: {
        backgroundColor: Colors.accent,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
    },
    doneBtnText: {
        color: Colors.background,
        fontSize: 13,
        fontWeight: '800' as const,
        letterSpacing: 1,
    },
    playersText: {
        color: Colors.textTertiary,
        fontSize: 11,
        textAlign: 'center',
        paddingBottom: 16,
    },
    doneContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    doneEmoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    doneTitle: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: '700' as const,
        marginBottom: 8,
    },
    doneDesc: {
        color: Colors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
    },
    backBtn: {
        backgroundColor: Colors.cardBackground,
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    backBtnText: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '700' as const,
        letterSpacing: 1,
    },
});
