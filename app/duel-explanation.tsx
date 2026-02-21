import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check, X, Lightbulb, Clock, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { DuelResult, QuestionResult } from '@/types/game';
import { useGame } from '@/context/GameContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TOPIC_COLORS: Record<string, { bg: string; text: string }> = {
    investing: { bg: '#0D1F17', text: '#00D68F' },
    banking: { bg: '#0D1520', text: '#4A9EFF' },
    macroeconomics: { bg: '#1A1200', text: '#F5A623' },
    personal_finance: { bg: '#1A0D1A', text: '#B47FFF' },
    mental_math: { bg: '#1A1A0D', text: '#E8FF4A' },
    crypto: { bg: '#1A0D0D', text: '#FF6B4A' },
    equity_markets: { bg: '#0D1F17', text: '#00D68F' },
    taxation: { bg: '#1A0D1A', text: '#B47FFF' },
    insurance: { bg: '#0D1520', text: '#4A9EFF' },
};

export default function DuelExplanationScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ result?: string }>();
    const { lastDuelResult: contextResult } = useGame();

    let result: DuelResult | null = null;
    if (params.result) {
        try {
            result = JSON.parse(params.result) as DuelResult;
        } catch (_) {
            result = contextResult;
        }
    } else {
        result = contextResult;
    }
    const scrollViewRef = useRef<ScrollView>(null);
    const itemOffsets = useRef<Record<number, number>>({}).current;
    const fadeAnims = useRef<Animated.Value[]>([]).current;

    useEffect(() => {
        if (result?.questionLog) {
            result.questionLog.forEach((_, i) => {
                fadeAnims[i] = new Animated.Value(0);
                Animated.timing(fadeAnims[i], {
                    toValue: 1,
                    duration: 400,
                    delay: i * 80,
                    useNativeDriver: true,
                }).start();
            });
        }
    }, [result]);

    if (!result || !result.questionLog || !Array.isArray(result.questionLog)) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={[styles.header, { justifyContent: 'center', flex: 1 }]}>
                        <Text style={styles.errorText}>No review data available</Text>
                        <TouchableOpacity style={styles.resultsBtn} onPress={() => router.replace('/')}>
                            <Text style={styles.resultsBtnText}>GO HOME</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    const scrollToQuestion = (index: number) => {
        const offset = itemOffsets[index] || index * 250;
        scrollViewRef.current?.scrollTo({ y: offset, animated: true });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerLabel}>REVIEW ROUND</Text>
                        <Text style={styles.headerTitle}>{result.playerScore}/{result.questionLog?.length} Correct</Text>
                    </View>
                    <View style={styles.accuracyPill}>
                        <Text style={styles.accuracyText}>{result.accuracy ?? 0}% accuracy</Text>
                    </View>
                </View>

                {/* Progress Dots */}
                <View style={styles.progressRow}>
                    {result.questionLog?.map((q, i) => (
                        <TouchableOpacity key={i} onPress={() => scrollToQuestion(i)}>
                            <View
                                style={[
                                    styles.progressDot,
                                    q.isCorrect ? styles.dotCorrect : styles.dotWrong
                                ]}
                            />
                        </TouchableOpacity>
                    )) || <View />}
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {result.questionLog?.map((q, i) => {
                        const topicColor = TOPIC_COLORS[q.topic as any] || TOPIC_COLORS.investing;

                        return (
                            <Animated.View
                                key={i}
                                onLayout={(e) => {
                                    itemOffsets[i] = e.nativeEvent.layout.y;
                                }}
                                style={[
                                    styles.card,
                                    {
                                        borderColor: q.isCorrect ? '#00D68F' : '#FF4757',
                                        opacity: fadeAnims[i] || 1,
                                        transform: [{
                                            translateY: fadeAnims[i] ? fadeAnims[i].interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [20, 0]
                                            }) : 0
                                        }]
                                    }
                                ]}
                            >
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardHeaderLeft}>
                                        <Text style={styles.qNum}>Q{i + 1}</Text>
                                        <View style={[styles.topicPill, { backgroundColor: topicColor.bg }]}>
                                            <Text style={[styles.topicPillText, { color: topicColor.text }]}>{q.topic.replace('_', ' ').toUpperCase()}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardHeaderRight}>
                                        {q.isCorrect ? (
                                            <Text style={styles.statusCorrect}>✓ Correct</Text>
                                        ) : (
                                            <Text style={styles.statusWrong}>✗ {q.userAnswer === null ? 'Timed Out' : 'Wrong'}</Text>
                                        )}
                                        <Text style={styles.timeText}>{(q.timeTaken / 1000).toFixed(1)}s</Text>
                                    </View>
                                </View>

                                <Text style={styles.questionText}>{q.question}</Text>

                                {/* Options Review */}
                                {q.options && q.options.length > 0 && (
                                    <View style={styles.optionsList}>
                                        {q.options.map((opt: string, optIdx: number) => {
                                            const isUserSelected = q.userAnswer === opt;
                                            const isCorrect = q.correctAnswer === opt;

                                            let optBg = '#1E1E1E';
                                            let optText = '#999999';
                                            let Icon = null;

                                            if (isCorrect) {
                                                optBg = '#0D2A1E';
                                                optText = '#00D68F';
                                                Icon = Check;
                                            } else if (isUserSelected && !isCorrect) {
                                                optBg = '#2A0D0D';
                                                optText = '#FF4757';
                                                Icon = X;
                                            }

                                            return (
                                                <View key={optIdx} style={[styles.optionPill, { backgroundColor: optBg }]}>
                                                    <Text style={[styles.optionPillText, { color: optText }]}>{opt}</Text>
                                                    {Icon && <Icon size={14} color={optText} />}
                                                </View>
                                            );
                                        })}
                                    </View>
                                )}

                                {/* Math/Short Answer displays */}
                                {(!q.options || q.options.length === 0) && (
                                    <View style={styles.answerCompare}>
                                        <View>
                                            <Text style={styles.compareLabel}>YOUR ANSWER</Text>
                                            <Text style={[styles.compareValue, { color: q.isCorrect ? '#00D68F' : '#FF4757' }]}>
                                                {q.userAnswer || '—'}
                                            </Text>
                                        </View>
                                        <View style={styles.compareDivider} />
                                        <View>
                                            <Text style={styles.compareLabel}>CORRECT</Text>
                                            <Text style={[styles.compareValue, { color: '#00D68F' }]}>{q.correctAnswer}</Text>
                                        </View>
                                    </View>
                                )}

                                {/* Explanation */}
                                <View style={[styles.explanationBox, { backgroundColor: q.isCorrect ? '#0F1A0F' : '#1A0F0F' }]}>
                                    <View style={styles.explanationLabelRow}>
                                        <Lightbulb size={12} color={q.isCorrect ? '#00D68F' : '#FF4757'} />
                                        <Text style={[styles.explanationLabel, { color: q.isCorrect ? '#00D68F' : '#FF4757' }]}>WHY?</Text>
                                    </View>
                                    <Text style={styles.explanationText}>{q.explanation}</Text>
                                </View>
                            </Animated.View>
                        );
                    })}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>

            {/* Fixed Bottom Button */}
            <View style={styles.bottomBar}>
                <Text style={styles.swipeTip}>Scroll down to review all questions</Text>
                <TouchableOpacity
                    style={styles.resultsBtn}
                    onPress={() => router.replace({
                        pathname: '/post-match',
                        params: {} // GameContext holds lastDuelResult
                    } as any)}
                >
                    <Text style={styles.resultsBtnText}>SEE RESULTS</Text>
                    <ChevronRight size={18} color={Colors.background} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerLabel: {
        color: '#5A5A5A',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
    },
    accuracyPill: {
        backgroundColor: 'rgba(0, 214, 143, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
    },
    accuracyText: {
        color: '#00D68F',
        fontSize: 12,
        fontWeight: '700',
    },
    progressRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 6,
        marginBottom: 20,
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    dotCorrect: {
        backgroundColor: '#00D68F',
    },
    dotWrong: {
        backgroundColor: '#FF4757',
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 16,
    },
    card: {
        backgroundColor: '#141414',
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardHeaderRight: {
        alignItems: 'flex-end',
    },
    qNum: {
        color: '#5A5A5A',
        fontSize: 11,
        fontWeight: '700',
    },
    topicPill: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    topicPillText: {
        fontSize: 10,
        fontWeight: '800',
    },
    statusCorrect: {
        color: '#00D68F',
        fontSize: 12,
        fontWeight: '700',
    },
    statusWrong: {
        color: '#FF4757',
        fontSize: 12,
        fontWeight: '700',
    },
    timeText: {
        color: '#5A5A5A',
        fontSize: 10,
    },
    questionText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 16,
    },
    optionsList: {
        gap: 8,
        marginBottom: 16,
    },
    optionPill: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
    },
    optionPillText: {
        fontSize: 13,
        fontWeight: '500',
        flex: 1,
    },
    answerCompare: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    compareLabel: {
        color: '#5A5A5A',
        fontSize: 9,
        fontWeight: '700',
        marginBottom: 2,
    },
    compareValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    compareDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#333333',
        marginHorizontal: 16,
    },
    explanationBox: {
        borderRadius: 10,
        padding: 12,
    },
    explanationLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    explanationLabel: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    explanationText: {
        color: '#CCCCCC',
        fontSize: 13,
        lineHeight: 18,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.95)',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 34,
        borderTopWidth: 1,
        borderTopColor: '#1C1C1C',
        alignItems: 'center',
    },
    swipeTip: {
        color: '#5A5A5A',
        fontSize: 11,
        marginBottom: 12,
    },
    resultsBtn: {
        backgroundColor: Colors.accent,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 14,
        gap: 8,
    },
    resultsBtnText: {
        color: Colors.background,
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 1,
    },
    errorText: {
        color: Colors.textSecondary,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});
