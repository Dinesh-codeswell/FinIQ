import React, { useEffect, useRef } from 'react';
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
import { Trophy, XCircle, Zap, Share2, Home } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import UserAvatar from '@/src/components/UserAvatar';
import UsernameDisplay from '@/src/components/UsernameDisplay';
import FinMascot from '@/src/components/fin/FinMascot';
import { FIN_REACTIONS } from '@/src/data/fin/reactions';

export default function PostMatchScreen() {
    const router = useRouter();
    const { lastDuelResult, profile, division } = useGame();

    const resultScale = useRef(new Animated.Value(0)).current;
    const scoreSlide = useRef(new Animated.Value(50)).current;
    const detailsFade = useRef(new Animated.Value(0)).current;
    const mascotBounce = useRef(new Animated.Value(0)).current;
    const ratingAnim = useRef(new Animated.Value(0)).current;

    const result = lastDuelResult;
    const won = result?.won ?? false;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(resultScale, { toValue: 1, tension: 100, friction: 6, useNativeDriver: true }),
            Animated.parallel([
                Animated.timing(scoreSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
                Animated.timing(detailsFade, { toValue: 1, duration: 500, useNativeDriver: true }),
            ]),
            Animated.spring(mascotBounce, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
            Animated.timing(ratingAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
        ]).start();

        if (Platform.OS !== 'web') {
            if (won) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            }
        }
    }, []);

    const getReaction = () => {
        if (!result) return FIN_REACTIONS.CURIOUS; // Fallback
        if (won) {
            if (result.playerScore >= 5 && result.opponentScore <= 1) return FIN_REACTIONS.VICTORY_DOMINANT;
            return FIN_REACTIONS.VICTORY_CLOSE;
        } else {
            if (Math.abs(result.playerScore - (result.opponentScore || 0)) <= 1) return FIN_REACTIONS.DEFEAT_CLOSE;
            return FIN_REACTIONS.DEFEAT_BAD;
        }
    };

    const reaction = getReaction();
    const reactionMessage = reaction.messages[Math.floor(Math.random() * reaction.messages.length)];

    if (!result) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.center}>
                        <Text style={styles.errorText}>No match data found</Text>
                        <TouchableOpacity style={styles.continueBtn} onPress={() => router.replace('/')}>
                            <Text style={styles.continueBtnText}>GO HOME</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    const ratingChangeText = result.ratingChange >= 0 ? `+${result.ratingChange}` : `${result.ratingChange}`;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <Animated.View style={[styles.resultBanner, { transform: [{ scale: resultScale }] }]}>
                        <Text style={[styles.resultEmoji]}>{won ? '🏆' : '💪'}</Text>
                        <Text style={[styles.resultText, { color: won ? Colors.accent : Colors.loss }]}>
                            {won ? 'VICTORY' : 'DEFEAT'}
                        </Text>
                    </Animated.View>

                    <Animated.View style={[styles.scoreBoard, { transform: [{ translateY: scoreSlide }], opacity: detailsFade }]}>
                        <View style={styles.scorePlayer}>
                            <UserAvatar size={56} animalEmoji={profile?.avatar ?? 'fox'} frameId={(profile?.selectedAvatarFrame as any) ?? 'none'} isPro={profile?.isPro ?? false} />
                            <Text style={styles.scoreName}>YOU</Text>
                            <Text style={[styles.scoreNum, { color: won ? Colors.accent : Colors.textPrimary }]}>
                                {result.playerScore}
                            </Text>
                        </View>

                        <View style={styles.scoreDivider}>
                            <Text style={styles.scoreDividerText}>—</Text>
                        </View>

                        <View style={styles.scorePlayer}>
                            <UserAvatar size={56} animalEmoji={result.opponentAvatar} frameId="none" isPro={false} />
                            <Text style={styles.scoreName}>{(result.opponentName || 'Opponent').split('_')[0]}</Text>
                            <Text style={[styles.scoreNum, { color: !won ? Colors.accent : Colors.textPrimary }]}>
                                {result.opponentScore}
                            </Text>
                        </View>
                    </Animated.View>

                    <Animated.View style={[styles.statsRow, { opacity: detailsFade }]}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: result.ratingChange >= 0 ? Colors.accent : Colors.loss }]}>
                                {ratingChangeText}
                            </Text>
                            <Text style={styles.statLabel}>RATING</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: Colors.xpGold }]}>+{result.xpEarned}</Text>
                            <Text style={styles.statLabel}>XP EARNED</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{profile?.rating ?? 0}</Text>
                            <Text style={[styles.statLabel, division?.color && { color: division.color }]}>
                                {division?.title ? division.title.split(' ')[0].toUpperCase() : '—'}
                            </Text>
                        </View>
                    </Animated.View>

                    <Animated.View style={[styles.mascotCard, { transform: [{ scale: mascotBounce }] }]}>
                        <FinMascot expression={reaction.expression} size="medium" />
                        <View style={styles.mascotBubble}>
                            <Text style={styles.mascotText}>{reactionMessage}</Text>
                            <Text style={styles.mascotName}>— FIN</Text>
                        </View>
                    </Animated.View>

                    <Animated.View style={[styles.actions, { opacity: detailsFade }]}>
                        <TouchableOpacity
                            style={styles.playAgainBtn}
                            onPress={() => router.replace('/matchmaking' as any)}
                        >
                            <Text style={styles.playAgainText}>PLAY AGAIN</Text>
                        </TouchableOpacity>

                        <View style={styles.secondaryActions}>
                            <TouchableOpacity
                                style={styles.reviewBtn}
                                onPress={() => router.replace({
                                    pathname: '/duel-explanation',
                                    params: { result: JSON.stringify(result) }
                                } as any)}
                            >
                                <Text style={styles.reviewBtnText}>REVIEW</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.continueBtn}
                                onPress={() => router.replace('/')}
                            >
                                <Text style={styles.continueBtnText}>DONE</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: Colors.textSecondary,
        fontSize: 16,
        marginBottom: 20,
    },
    resultBanner: {
        alignItems: 'center',
        marginBottom: 32,
    },
    resultEmoji: {
        fontSize: 48,
        marginBottom: 8,
    },
    resultText: {
        fontSize: 42,
        fontWeight: '900' as const,
        letterSpacing: 4,
    },
    scoreBoard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    scorePlayer: {
        flex: 1,
        alignItems: 'center',
    },
    scoreAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.cardElevated,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        marginBottom: 6,
    },
    scoreEmoji: {
        fontSize: 24,
    },
    scoreName: {
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '600' as const,
        marginBottom: 4,
    },
    scoreNum: {
        fontSize: 36,
        fontWeight: '900' as const,
    },
    scoreDivider: {
        paddingHorizontal: 12,
    },
    scoreDividerText: {
        color: Colors.textTertiary,
        fontSize: 24,
        fontWeight: '300' as const,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        color: Colors.textPrimary,
        fontSize: 20,
        fontWeight: '800' as const,
        marginBottom: 2,
    },
    statLabel: {
        color: Colors.textSecondary,
        fontSize: 9,
        fontWeight: '600' as const,
        letterSpacing: 1,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: Colors.border,
    },
    mascotCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: Colors.cardBackground,
        borderRadius: 14,
        padding: 14,
        marginBottom: 28,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    mascotEmoji: {
        fontSize: 32,
        marginRight: 12,
    },
    mascotBubble: {
        flex: 1,
    },
    mascotText: {
        color: Colors.textPrimary,
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 4,
    },
    mascotName: {
        color: Colors.textTertiary,
        fontSize: 11,
        fontWeight: '600' as const,
    },
    actions: {
        width: '100%',
        gap: 12,
    },
    playAgainBtn: {
        backgroundColor: Colors.accent,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    playAgainText: {
        color: Colors.background,
        fontSize: 14,
        fontWeight: '800' as const,
        letterSpacing: 1,
    },
    secondaryActions: {
        flexDirection: 'row',
        gap: 12,
    },
    continueBtn: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    reviewBtn: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    reviewBtnText: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '700' as const,
        letterSpacing: 1,
    },
    continueBtnText: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '700' as const,
        letterSpacing: 1,
    },
});
