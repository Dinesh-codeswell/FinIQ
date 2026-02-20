import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Newspaper, TrendingUp, Lightbulb, BarChart2, Award, ChevronRight, Lock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { FINIQ_FACTS, MOCK_LEADERBOARD } from '@/mocks/data';
import { getDailyChallenge } from '@/src/utils/questionEngine';
import { AVATAR_EMOJIS, getDivision } from '@/constants/divisions';

export default function FeedScreen() {
    const router = useRouter();
    const { profile } = useGame();
    const dailyChallenge = getDailyChallenge();
    const todayStr = new Date().toISOString().split('T')[0];
    const dailyDone = profile.dailyChallengeCompleted === todayStr;

    const randomFacts = [...FINIQ_FACTS].sort(() => Math.random() - 0.5).slice(0, 3);
    const recentPromotions = MOCK_LEADERBOARD.slice(0, 3);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>FEED</Text>
                        <Text style={styles.headerSub}>Stay sharp, stay informed</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.dailyCompact}
                        onPress={() => !dailyDone && router.push('/daily-challenge' as any)}
                        activeOpacity={dailyDone ? 1 : 0.7}
                    >
                        <View style={styles.dailyCompactLeft}>
                            <TrendingUp {...({ size: 16, color: Colors.accent } as any)} />
                            <View style={styles.dailyCompactText}>
                                <Text style={styles.dailyCompactTitle}>MARKET MOOD</Text>
                                <Text style={styles.dailyCompactDesc} numberOfLines={1}>
                                    {dailyDone ? 'Completed today ✓' : 'Today\'s challenge is live'}
                                </Text>
                            </View>
                        </View>
                        {!dailyDone && <ChevronRight {...({ size: 18, color: Colors.textSecondary } as any)} />}
                    </TouchableOpacity>

                    {profile.totalDuels > 0 && (
                        <View style={styles.statsCard}>
                            <View style={styles.statsCardHeader}>
                                <Newspaper {...({ size: 48, color: Colors.textSecondary, style: { marginBottom: 16, opacity: 0.5 } } as any)} />
                                <Text style={styles.statsCardTitle}>YOUR WEEK</Text>
                            </View>
                            <Text style={styles.statsHighlight}>
                                You answered {profile.totalDuels * 5}+ questions this week.
                            </Text>
                            <View style={styles.statsGrid}>
                                <View style={styles.statBox}>
                                    <Text style={styles.statBoxValue}>{profile.totalDuels}</Text>
                                    <Text style={styles.statBoxLabel}>Duels</Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Text style={styles.statBoxValue}>{profile.wins}</Text>
                                    <Text style={styles.statBoxLabel}>Wins</Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Text style={[styles.statBoxValue, { color: Colors.xpGold }]}>{profile.xp}</Text>
                                    <Text style={styles.statBoxLabel}>XP</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    <Text style={styles.sectionLabel}>FINIQ FACTS</Text>
                    {randomFacts.map((fact, i) => (
                        <View key={i} style={styles.factCard}>
                            <View style={styles.factIcon}>
                                <Lock {...({ size: 16, color: Colors.textSecondary } as any)} />
                            </View>
                            <Text style={styles.factText}>{fact}</Text>
                        </View>
                    ))}

                    <Text style={[styles.sectionLabel, { marginTop: 16 }]}>COMMUNITY</Text>
                    {recentPromotions.map((player, i) => {
                        const d = getDivision(player.rating);
                        return (
                            <View key={player.id} style={styles.communityCard}>
                                <View style={[styles.communityAvatar, { borderColor: d.color }]}>
                                    <Text style={styles.communityEmoji}>{AVATAR_EMOJIS[player.avatar] || '🦊'}</Text>
                                </View>
                                <View style={styles.communityInfo}>
                                    <Text style={styles.communityText}>
                                        <Text style={styles.communityName}>@{player.username}</Text>
                                        {' '}just climbed to{' '}
                                        <Text style={[styles.communityDiv, { color: d.color }]}>{player.division}</Text>!
                                    </Text>
                                </View>
                                <Award {...({ size: 16, color: d.color } as any)} />
                            </View>
                        );
                    })}

                    <View style={styles.mascotTip}>
                        <Text style={styles.mascotEmoji}>🦊</Text>
                        <View style={styles.mascotBubble}>
                            <Text style={styles.mascotTitle}>TIP FROM FIN</Text>
                            <Text style={styles.mascotText}>
                                Remember: A bond's price and its yield move in opposite directions. When interest rates rise, existing bond prices fall — and vice versa. This is one of the most tested concepts!
                            </Text>
                        </View>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>
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
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    header: {
        marginBottom: 16,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: 24,
        fontWeight: '900' as const,
        letterSpacing: 2,
    },
    headerSub: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 2,
    },
    dailyCompact: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: Colors.accent,
    },
    dailyCompactLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    dailyCompactText: {
        marginLeft: 10,
        flex: 1,
    },
    dailyCompactTitle: {
        color: Colors.accent,
        fontSize: 11,
        fontWeight: '700' as const,
        letterSpacing: 1,
    },
    dailyCompactDesc: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 1,
    },
    statsCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statsCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    statsCardTitle: {
        color: Colors.scenarioBlue,
        fontSize: 11,
        fontWeight: '700' as const,
        letterSpacing: 1,
    },
    statsHighlight: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '600' as const,
        marginBottom: 12,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 8,
    },
    statBox: {
        flex: 1,
        backgroundColor: Colors.cardElevated,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    statBoxValue: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '800' as const,
    },
    statBoxLabel: {
        color: Colors.textSecondary,
        fontSize: 10,
        marginTop: 2,
    },
    sectionLabel: {
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '700' as const,
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    factCard: {
        flexDirection: 'row',
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'flex-start',
    },
    factIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: Colors.xpGoldDim,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    factText: {
        color: Colors.textPrimary,
        fontSize: 13,
        lineHeight: 19,
        flex: 1,
    },
    communityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    communityAvatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: Colors.cardElevated,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        marginRight: 10,
    },
    communityEmoji: {
        fontSize: 15,
    },
    communityInfo: {
        flex: 1,
        marginRight: 8,
    },
    communityText: {
        color: Colors.textSecondary,
        fontSize: 12,
        lineHeight: 17,
    },
    communityName: {
        color: Colors.textPrimary,
        fontWeight: '600' as const,
    },
    communityDiv: {
        fontWeight: '700' as const,
    },
    mascotTip: {
        flexDirection: 'row',
        backgroundColor: Colors.cardBackground,
        borderRadius: 14,
        padding: 14,
        marginTop: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'flex-start',
    },
    mascotEmoji: {
        fontSize: 28,
        marginRight: 12,
    },
    mascotBubble: {
        flex: 1,
    },
    mascotTitle: {
        color: Colors.accent,
        fontSize: 10,
        fontWeight: '700' as const,
        letterSpacing: 1,
        marginBottom: 4,
    },
    mascotText: {
        color: Colors.textPrimary,
        fontSize: 12,
        lineHeight: 18,
    },
});
