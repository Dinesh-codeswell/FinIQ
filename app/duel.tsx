import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Platform,
    ActivityIndicator,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withRepeat,
    withSequence,
    runOnJS,
} from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { getQuestionsForDuel, checkAnswer } from '@/src/utils/questionEngine';
import { Question } from '@/src/data/questions/schema';
import { updateTopicAccuracy } from '@/src/store/topicAccuracyStore';
import { QuestionResult, DuelResult } from '@/types/game';
import { useFinStore } from '@/src/store/finStore';
import { MENTAL_MATH_MODES } from '@/src/constants/mentalMathModes';

// Redesigned Components
import BattleHeader from '@/components/duel/BattleHeader';
import QuestionCard from '@/components/duel/QuestionCard';
import OptionButton from '@/components/duel/OptionButton';
import ProgressFooter from '@/components/duel/ProgressFooter';
import FeedbackPanel from '@/components/duel/FeedbackPanel';

const DUEL_DURATION = 60;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DuelScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{
        opponentName?: string;
        opponentAvatar?: string;
        opponentRating?: string;
        topic?: string;
        mode?: string;
    }>();
    const { profile, recordDuelResult, setLastDuelResult } = useGame();
    const { recordDuelResult: recordFinResult } = useFinStore();

    const opponentName = params.opponentName || 'Bot';
    const opponentAvatar = params.opponentAvatar || 'wolf';
    const opponentRating = parseInt(params.opponentRating || '1000', 10);
    const topic = params.topic || 'investing';
    const mode = params.mode || 'classical';

    const mmMode = topic === 'mental_math' ? MENTAL_MATH_MODES.find(m => m.id === mode) : null;
    const duelDuration = mmMode ? mmMode.duration : 60;
    const questionCount = mmMode ? mmMode.questionCount : 20;

    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [playerScore, setPlayerScore] = useState<number>(0);
    const [botScore, setBotScore] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(duelDuration);
    const [answered, setAnswered] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [isBotThinking, setIsBotThinking] = useState<boolean>(true);
    const [resultsHistory, setResultsHistory] = useState<(boolean | null)[]>(new Array(20).fill(null));

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const qs = await getQuestionsForDuel({
                    difficulty: profile.difficulty || 1,
                    count: questionCount,
                    mode: mode as any,
                    topic: topic
                });
                setQuestions(qs);
            } catch (error) {
                console.error('Failed to load questions:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadQuestions();
    }, []);

    // Animations (Reanimated — UI thread)
    const questionSlideX = useSharedValue(0);
    const bgGlowOpacity = useSharedValue(0.02);

    const botTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const gameOverRef = useRef(false);
    const questionLog = useRef<QuestionResult[]>([]);
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        bgGlowOpacity.value = withRepeat(
            withSequence(
                withTiming(0.05, { duration: 3000 }),
                withTiming(0.02, { duration: 3000 })
            ),
            -1,
            true
        );

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (timeLeft === 0 && !gameOverRef.current) {
            endGame();
        }
    }, [timeLeft]);

    useEffect(() => {
        questionSlideX.value = SCREEN_WIDTH;
        questionSlideX.value = withSpring(0, { damping: 18, stiffness: 120 });
        scheduleBotAnswer();
    }, [currentIndex]);

    const scheduleBotAnswer = useCallback(() => {
        setIsBotThinking(true);
        if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
        const delay = 3000 + Math.random() * 4000;
        const correctChance = 0.55 + (opponentRating - 800) * 0.0003;

        botTimeoutRef.current = setTimeout(() => {
            if (!gameOverRef.current) {
                setIsBotThinking(false);
                if (Math.random() < correctChance) {
                    setBotScore(prev => prev + 1);
                }
            }
        }, delay);
    }, [currentIndex, opponentRating]);

    const handleAnswer = useCallback((optionIndex: number) => {
        if (answered || gameOver) return;
        setAnswered(true);
        setSelectedOption(optionIndex);

        const currentQ = questions[currentIndex];
        const selectedValue = (currentQ.options || [])[optionIndex];
        const isCorrect = checkAnswer(currentQ, selectedValue);

        if (isCorrect) {
            setPlayerScore(prev => prev + 1);
            if (Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
        } else {
            if (Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
        }

        // Update results history for footer
        setResultsHistory(prev => {
            const next = [...prev];
            next[currentIndex] = isCorrect;
            return next;
        });

        // Track result
        const timeTaken = Date.now() - startTimeRef.current;
        const result: QuestionResult = {
            questionId: currentQ.id,
            question: currentQ.question,
            topic: currentQ.topic as any,
            difficulty: currentQ.difficulty as any,
            userAnswer: selectedValue,
            correctAnswer: currentQ.answer as any,
            isCorrect,
            timeTaken,
            explanation: currentQ.explanation || 'No explanation provided.',
            options: currentQ.options,
        };
        questionLog.current.push(result);

        // Update topic accuracy
        updateTopicAccuracy(currentQ.topic as any, isCorrect).catch(console.error);

        const advance = () => {
            setCurrentIndex(prev => prev + 1);
            setAnswered(false);
            setSelectedOption(null);
            startTimeRef.current = Date.now();
        };

        const delay = isCorrect ? 1800 : 2200;
        setTimeout(() => {
            if (currentIndex < questions.length - 1 && !gameOverRef.current) {
                questionSlideX.value = withTiming(-SCREEN_WIDTH, { duration: 220 }, (finished) => {
                    if (finished) runOnJS(advance)();
                });
            } else if (!gameOverRef.current) {
                endGame();
            }
        }, delay);
    }, [answered, gameOver, currentIndex, questions]);

    const endGame = useCallback(() => {
        if (gameOverRef.current) return;
        gameOverRef.current = true;
        setGameOver(true);
        if (timerRef.current) clearInterval(timerRef.current);
        if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);

        const log = questionLog.current;
        const totalQuestions = log.length || 1;
        const accuracy = Math.round((playerScore / totalQuestions) * 100);
        const avgTimeTaken = Math.round(log.reduce((sum, q) => sum + q.timeTaken, 0) / totalQuestions);

        const won = playerScore > botScore;
        const ratingChange = won ? 25 : -15;
        const xpMultiplier = mmMode ? mmMode.xpMultiplier : 1;
        const xpEarned = Math.round(playerScore * 10 * xpMultiplier);

        const result: DuelResult = {
            duelId: Math.random().toString(36).substring(2, 11),
            mode: mode,
            won,
            playerScore,
            opponentScore: botScore,
            ratingChange,
            xpEarned,
            opponentName,
            opponentAvatar,
            opponentRating,
            timestamp: Date.now(),
            accuracy,
            avgTimeTaken,
            questionLog: log,
        };

        setLastDuelResult(result);
        recordDuelResult(result as any);
        recordFinResult(won ? 'win' : 'loss', mode);

        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }

        setTimeout(() => {
            router.replace({ pathname: '/duel-explanation' } as any);
        }, 300);
    }, [playerScore, botScore, profile.rating, opponentRating, opponentName, opponentAvatar]);

    const mainZoneStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: questionSlideX.value }],
    }));
    const bgSpotlightStyle = useAnimatedStyle(() => ({
        opacity: bgGlowOpacity.value,
    }));

    if (isLoading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator color={Colors.accent} size="large" />
            </View>
        );
    }

    const currentQ = questions[currentIndex];
    if (!currentQ) return <View style={styles.container} />;

    return (
        <View style={styles.container}>
            <View style={styles.bgGrid} pointerEvents="none" />
            <Animated.View style={[styles.bgSpotlight, bgSpotlightStyle]} pointerEvents="none" />
            {timeLeft <= 10 && (
                <View style={styles.criticalVignette} pointerEvents="none" />
            )}

            <SafeAreaView style={styles.safeArea}>
                <BattleHeader
                    playerScore={playerScore}
                    botScore={botScore}
                    timeLeft={timeLeft}
                    totalDuration={duelDuration}
                    currentIndex={currentIndex}
                    totalQuestions={questions.length}
                    playerAvatar={profile.avatar}
                    botAvatar={opponentAvatar}
                    botName={opponentName.split('_')[0].toUpperCase()}
                    isThinking={isBotThinking}
                />

                <Animated.View style={[styles.mainBattleZone, mainZoneStyle]}>
                    <QuestionCard
                        question={currentQ.question}
                        topic={currentQ.topic}
                    />

                    <View style={styles.optionsArea}>
                        {['A', 'B', 'C', 'D'].map((label, idx) => {
                            const optionText = currentQ.options ? currentQ.options[idx] : undefined;
                            if (!optionText) return null;
                            const isCorrect = answered && checkAnswer(currentQ, optionText);
                            const isWrong = answered && !isCorrect && selectedOption === idx;

                            return (
                                <OptionButton
                                    key={idx}
                                    label={label}
                                    text={optionText}
                                    isSelected={selectedOption === idx}
                                    isCorrect={isCorrect}
                                    isWrong={isWrong}
                                    disabled={answered}
                                    anySelected={answered}
                                    onPress={() => handleAnswer(idx)}
                                />
                            );
                        })}
                    </View>
                </Animated.View>

                <ProgressFooter
                    total={20}
                    current={currentIndex}
                    results={resultsHistory}
                />

                <FeedbackPanel
                    isVisible={answered}
                    isCorrect={selectedOption !== null && !!currentQ.options && checkAnswer(currentQ, currentQ.options[selectedOption!])}
                    correctOptionText={currentQ.answer as string}
                    explanation={currentQ.explanation || ''}
                    points={1}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#090C0F',
    },
    bgGrid: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.025,
        // Using a simpler background color for native fallback if gradients/grid aren't supported
    },
    bgSpotlight: {
        position: 'absolute',
        top: 0,
        left: '50%',
        marginLeft: -100,
        width: 200,
        height: 100,
        backgroundColor: '#00D68F',
        borderRadius: 100,
        opacity: 0.05,
    },
    criticalVignette: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 71, 87, 0.04)',
    },
    safeArea: {
        flex: 1,
    },
    mainBattleZone: {
        flex: 1,
    },
    optionsArea: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
