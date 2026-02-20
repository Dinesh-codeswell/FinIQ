
import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swords, Users, Zap, Trophy, Flame, Target, Award, BookOpen } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';

const QUEST_ICONS: Record<string, any> = {
    'daily_challenge': <Zap {...({ size: 24, color: Colors.accent } as any)} />,
    'play_duel': <Swords {...({ size: 24, color: Colors.textPrimary } as any)} />,
    'win_2_sprints': <Trophy {...({ size: 24, color: Colors.xpGold } as any)} />,
};

const ICON_MAP: Record<string, React.ReactNode> = {
    'target': <Target {...({ size: 24, color: Colors.accent } as any)} />,
    'zap': <Zap {...({ size: 24, color: Colors.xpGold } as any)} />,
    'trophy': <Trophy {...({ size: 24, color: Colors.xpGold } as any)} />,
    'book': <BookOpen {...({ size: 24, color: Colors.scenarioBlue } as any)} />
};

export default function QuestsScreen() {
    const { todayQuests, profile } = useGame();
    const progressAnim = useRef(todayQuests.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        todayQuests.forEach((quest, i) => {
            const progress = Math.min(quest.current / quest.target, 1);
            Animated.timing(progressAnim[i], {
                toValue: progress,
                duration: 800,
                delay: i * 200,
                useNativeDriver: false,
            }).start();
        });
    }, [todayQuests]);

    const completedCount = todayQuests.filter(q => q.completed).length;

    const weeklyQuests = [
        { id: 'w1', title: 'Achieve a 5-win streak', desc: 'Win 5 duels in a row', xp: 200, icon: <Zap {...({ size: 18, color: Colors.xpGold } as any)} />, progress: Math.min(profile.longestStreak / 5, 1) },
        { id: 'w2', title: 'Play 10 duels', desc: 'Complete 10 duel matches this week', xp: 150, icon: <Swords {...({ size: 18, color: Colors.xpGold } as any)} />, progress: Math.min(profile.totalDuels / 10, 1) },
        { id: 'w3', title: 'Invite a friend', desc: 'Invite a friend who joins FINIQ', xp: 500, icon: <Users {...({ size: 18, color: Colors.xpGold } as any)} />, progress: 0 },
    ];

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerTitle}>QUESTS</Text>
                            <Text style={styles.headerSub}>Complete missions, earn XP</Text>
                        </View>
                        <View style={styles.completionBadge}>
                            <Flame {...({ size: 16, color: Colors.energy, fill: Colors.energy } as any)} />
                            <Text style={styles.completionText}>{completedCount}/{todayQuests.length}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionLabel}>DAILY QUESTS</Text>
                    <Text style={styles.sectionHint}>Resets at midnight</Text>

                    {todayQuests.map((quest, index) => (
                        <View key={quest.id} style={[styles.questCard, quest.completed && styles.questCardDone]}>
                            <View style={styles.questIconWrap}>
                                {ICON_MAP[quest.icon] || <Target {...({ size: 18, color: Colors.accent } as any)} />}
                            </View>
                            <View style={styles.questContent}>
                                <View style={styles.questHeader}>
                                    <Text style={styles.questTitle}>{quest.title}</Text>
                                    <View style={styles.xpTag}>
                                        <Text style={styles.xpTagText}>+{quest.xpReward} XP</Text>
                                    </View>
                                </View>
                                <Text style={styles.questDesc}>{quest.description}</Text>
                                <View style={styles.progressTrack}>
                                    <Animated.View
                                        style={[
                                            styles.progressFill,
                                            quest.completed && styles.progressFillDone,
                                            {
                                                width: progressAnim[index]
                                                    ? progressAnim[index].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['0%', '100%'],
                                                    })
                                                    : '0%',
                                            },
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressText}>
                                    {quest.completed ? 'COMPLETED ✓' : `${quest.current}/${quest.target}`}
                                </Text >
                            </View >
                        </View >
                    ))}

                    <Text style={[styles.sectionLabel, { marginTop: 24 }]}>WEEKLY QUESTS</Text>
                    <Text style={styles.sectionHint}>Bigger rewards, harder challenges</Text>

                    {
                        weeklyQuests.map(quest => (
                            <View key={quest.id} style={styles.questCard}>
                                <View style={[styles.questIconWrap, styles.weeklyIcon]}>
                                    {quest.icon}
                                </View>
                                <View style={styles.questContent}>
                                    <View style={styles.questHeader}>
                                        <Text style={styles.questTitle}>{quest.title}</Text>
                                        <View style={[styles.xpTag, styles.weeklyXp]}>
                                            <Text style={[styles.xpTagText, { color: Colors.xpGold }]}>+{quest.xp} XP</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.questDesc}>{quest.desc}</Text>
                                    <View style={styles.progressTrack}>
                                        <View style={[styles.progressFillStatic, { width: `${quest.progress * 100}%` }]} />
                                    </View>
                                    <Text style={styles.progressText}>{Math.round(quest.progress * 100)}%</Text>
                                </View>
                            </View>
                        ))
                    }

                    <View style={{ height: 40 }} />
                </ScrollView >
            </SafeAreaView >
        </View >
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
    completionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: Colors.accentDim,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    completionText: {
        color: Colors.accent,
        fontSize: 14,
        fontWeight: '800' as const,
    },
    sectionLabel: {
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '700' as const,
        letterSpacing: 1.5,
        marginBottom: 2,
    },
    sectionHint: {
        color: Colors.textTertiary,
        fontSize: 11,
        marginBottom: 12,
    },
    questCard: {
        flexDirection: 'row',
        backgroundColor: Colors.cardBackground,
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    questCardDone: {
        borderColor: Colors.accentMuted,
        opacity: 0.7,
    },
    questIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: Colors.accentDim,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    weeklyIcon: {
        backgroundColor: Colors.xpGoldDim,
    },
    questContent: {
        flex: 1,
    },
    questHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
    },
    questTitle: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '600' as const,
        flex: 1,
    },
    xpTag: {
        backgroundColor: Colors.accentDim,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginLeft: 8,
    },
    weeklyXp: {
        backgroundColor: Colors.xpGoldDim,
    },
    xpTagText: {
        color: Colors.accent,
        fontSize: 10,
        fontWeight: '700' as const,
    },
    questDesc: {
        color: Colors.textSecondary,
        fontSize: 11,
        marginBottom: 8,
    },
    progressTrack: {
        height: 4,
        backgroundColor: Colors.cardElevated,
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: Colors.accent,
        borderRadius: 2,
    },
    progressFillDone: {
        backgroundColor: Colors.accentMuted,
    },
    progressFillStatic: {
        height: '100%',
        backgroundColor: Colors.xpGold,
        borderRadius: 2,
    },
    progressText: {
        color: Colors.textTertiary,
        fontSize: 10,
        fontWeight: '600' as const,
    },
});
