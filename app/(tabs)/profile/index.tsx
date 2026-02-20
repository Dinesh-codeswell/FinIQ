import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Shield, TrendingUp, Flame, Swords, Award, Zap, Star, Eye, Feather, Crown, Briefcase, Brain, Target, Lock, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { AVATAR_EMOJIS, BADGES } from '@/constants/divisions';
import UserAvatar from '@/src/components/UserAvatar';
import UsernameDisplay from '@/src/components/UsernameDisplay';
import WeaknessRadar from '@/src/components/WeaknessRadar';
import { loadTopicAccuracy, TopicAccuracyState } from '@/src/store/topicAccuracyStore';
import { AVATAR_FRAMES, AvatarFrameId } from '@/src/data/avatarFrames';
import { useFocusEffect } from '@react-navigation/native';

const ICON_MAP: Record<string, any> = {
    'first_blood': <Swords {...({ size: 24, color: Colors.accent } as any)} />,
    'speed_demon': <Zap {...({ size: 24, color: '#FFD700' } as any)} />,
    'compound_king': <TrendingUp {...({ size: 24, color: '#4CD964' } as any)} />,
    'wall_street_wolf': <Briefcase {...({ size: 24, color: '#5AC8FA' } as any)} />,
    'centurion': <Shield {...({ size: 24, color: '#FF9500' } as any)} />,
    'market_oracle': <Brain {...({ size: 24, color: '#AF52DE' } as any)} />,
    'streak_master': <Flame {...({ size: 24, color: '#FF3B30' } as any)} />,
};

const TOPIC_LABELS = ['Investing', 'Banking', 'Crypto', 'Personal Finance', 'Economics'];

export default function ProfileScreen() {
    const { profile, division, resetProfile, updateProfile } = useGame();
    const [topicData, setTopicData] = React.useState<TopicAccuracyState | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            loadTopicAccuracy().then(setTopicData);
        }, [])
    );

    const winRate = profile.totalDuels > 0
        ? Math.round((profile.wins / profile.totalDuels) * 100)
        : 0;

    const titleMap: Record<number, string> = {
        0: 'Rookie',
        1: 'Quant',
        2: 'Analyst',
        3: 'Trader',
        4: 'Fund Manager',
        5: 'Quant Strategist',
    };
    const titleIndex = Math.min(Math.floor(profile.rating / 400), 5);
    const playerTitle = titleMap[titleIndex] || 'Rookie';

    const topTopic = topicData ? Object.values(topicData.topics).sort((a, b) => b.accuracy - a.accuracy)[0] : null;
    const lowTopic = topicData ? Object.values(topicData.topics).filter(t => t.totalAnswered >= 5).sort((a, b) => a.accuracy - b.accuracy)[0] : null;

    const activateProDemo = () => {
        updateProfile({
            isPro: true,
            proExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
            proStartedAt: Date.now(),
        });
        alert('Pro activated! (7-day Demo Trial)');
    };

    // eslint-disable-next-line no-undef
    const BADGE_ICONS: Record<string, React.ReactNode> = {
        'zap': <Zap {...({ size: 16, color: Colors.xpGold } as any)} />,
        'shield': <Shield {...({ size: 16, color: Colors.scenarioBlue } as any)} />,
        'crown': <Crown {...({ size: 16, color: Colors.accent } as any)} />,
        'award': <Award {...({ size: 16, color: Colors.loss } as any)} />
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerTitle}>PROFILE</Text>
                        <TouchableOpacity style={styles.settingsBtn}>
                            <Settings {...({ size: 24, color: Colors.textPrimary } as any)} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileCard}>
                        <UserAvatar
                            size={80}
                            animalEmoji={profile.avatar}
                            frameId={profile.selectedAvatarFrame as any}
                            isPro={profile.isPro}
                        />
                        <View style={{ marginTop: 12, alignItems: 'center' }}>
                            <UsernameDisplay username={profile.username} isPro={profile.isPro} size="md" />
                            <View style={styles.titleBadge}>
                                <Text style={[styles.titleText, { color: division.color }]}>{playerTitle}</Text>
                            </View>
                        </View>
                        <Text style={styles.ratingBig}>{profile.rating}</Text>
                        <Text style={[styles.divisionLabel, { color: division.color }]}>{division.title}</Text>
                    </View>

                    <View style={styles.statsGrid}>
                        <View style={styles.statCell}>
                            <View style={styles.statIconContainer}>
                                <Award {...({ size: 20, color: Colors.accent } as any)} />
                            </View>
                            <Text style={styles.statValue}>{profile.totalDuels}</Text>
                            <Text style={styles.statLabel}>Duels</Text>
                        </View>
                        <View style={styles.statCell}>
                            <TrendingUp {...({ size: 16, color: Colors.accent } as any)} />
                            <Text style={styles.statValue}>{winRate}%</Text>
                            <Text style={styles.statLabel}>Win Rate</Text>
                        </View>
                        <View style={styles.statCell}>
                            <View style={styles.statIconContainer}>
                                <Target {...({ size: 20, color: Colors.xpGold } as any)} />
                            </View>
                            <Text style={styles.statValue}>{profile.longestStreak}</Text>
                            <Text style={styles.statLabel}>Best Streak</Text>
                        </View>
                        <View style={styles.statCell}>
                            <Star {...({ size: 16, color: Colors.xpGold } as any)} />
                            <Text style={styles.statValue}>{profile.xp}</Text>
                            <Text style={styles.statLabel}>Total XP</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionLabel}>YOUR FINANCE BRAIN</Text>
                    <View style={styles.radarCard}>
                        <Text style={styles.radarSub}>{topicData?.totalQuestionsEver || 0} questions answered</Text>

                        {(!topicData || topicData.totalQuestionsEver < 10) ? (
                            <View style={styles.radarLocked}>
                                <View style={styles.lockIconCircle}>
                                    <Brain {...({ size: 32, color: Colors.textTertiary } as any)} />
                                    <View style={styles.lockOverlay}>
                                        <Lock {...({ size: 16, color: Colors.textPrimary } as any)} />
                                    </View>
                                </View>
                                <Text style={styles.lockedText}>Answer 10 questions to unlock your brain map</Text>
                                <View style={styles.lockProgressTrack}>
                                    <View style={[styles.lockProgressFill, { width: `${Math.min((topicData?.totalQuestionsEver || 0) * 10, 100)}%` }]} />
                                </View>
                                <Text style={styles.lockStat}>{topicData?.totalQuestionsEver || 0}/10</Text>
                            </View>
                        ) : (
                            <WeaknessRadar topicStats={topicData.topics} size={260} />
                        )}

                        <View style={styles.radarStatsRow}>
                            <View style={styles.radarStatItem}>
                                <Text style={styles.radarStatLabel}>STRONGEST</Text>
                                <Text style={[styles.radarStatValue, { color: '#00D68F' }]}>
                                    {topTopic ? `${topTopic.accuracy}%` : '--'}
                                </Text>
                            </View>
                            <View style={styles.radarStatDivider} />
                            <View style={styles.radarStatItem}>
                                <Text style={styles.radarStatLabel}>WEAKEST</Text>
                                <Text style={[styles.radarStatValue, { color: '#FF4757' }]}>
                                    {lowTopic ? `${lowTopic.accuracy}%` : '--'}
                                </Text>
                            </View>
                            <View style={styles.radarStatDivider} />
                            <View style={styles.radarStatItem}>
                                <Text style={styles.radarStatLabel}>RANK</Text>
                                <Text style={styles.radarStatValue}>#{Math.floor(Math.random() * 500) + 1}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.practiceBtn}
                            onPress={() => alert('Topic Practice Mode coming soon!')}
                        >
                            <Text style={styles.practiceBtnText}>PRACTICE YOUR WEAKNESSES</Text>
                            <ChevronRight {...({ size: 16, color: Colors.background } as any)} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionLabel}>AVATAR FRAME</Text>
                    <View style={styles.framePickerCard}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.frameList}>
                            {Object.values(AVATAR_FRAMES).map((frame) => {
                                const isSelected = profile.selectedAvatarFrame === frame.id;
                                const isLocked = frame.isPro && !profile.isPro;
                                return (
                                    <TouchableOpacity
                                        key={frame.id}
                                        style={styles.frameItem}
                                        onPress={() => {
                                            if (isLocked) {
                                                alert('This frame requires FINIQ Pro!');
                                            } else {
                                                updateProfile({ selectedAvatarFrame: frame.id });
                                            }
                                        }}
                                    >
                                        <View style={[styles.framePreview, isSelected && styles.frameSelected, isLocked && { opacity: 0.6 }]}>
                                            <UserAvatar size={48} animalEmoji={profile.avatar} frameId={frame.id} isPro={profile.isPro} showProBadge={false} />
                                            {isSelected && (
                                                <View style={styles.checkOverlay}>
                                                    <CheckCircle2 {...({ size: 12, color: "#FFFFFF" } as any)} />
                                                </View>
                                            )}
                                            {isLocked && (
                                                <View style={styles.lockOverlayCenter}>
                                                    <Lock {...({ size: 14, color: "#FFFFFF" } as any)} />
                                                </View>
                                            )}
                                        </View>
                                        <Text style={[styles.frameName, isSelected && { color: Colors.accent }]}>{frame.name}</Text>
                                        {frame.isPro && !profile.isPro && <Text style={styles.proTag}>PRO</Text>}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>

                        {!profile.isPro && (
                            <TouchableOpacity style={styles.proBanner} onPress={activateProDemo}>
                                <Text style={styles.proBannerTitle}>Unlock 5 animated frames + Pro features</Text>
                                <Text style={styles.proBannerPrice}>₹199/month · ₹1,499/year</Text>
                                <View style={styles.proBannerBtn}>
                                    <Text style={styles.proBannerBtnText}>START FREE TRIAL</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>

                    <Text style={styles.sectionLabel}>BADGES</Text>
                    <View style={styles.badgesGrid}>
                        {BADGES.map(badge => {
                            const earned = profile.badges.includes(badge.id);
                            return (
                                <View key={badge.id} style={[styles.badgeItem, !earned && styles.badgeLocked]}>
                                    <View style={[styles.badgeIcon, earned && styles.badgeIconEarned]}>
                                        {BADGE_ICONS[badge.icon] || <Award {...({ size: 16, color: earned ? Colors.xpGold : Colors.textTertiary } as any)} />}
                                    </View>
                                    <Text style={[styles.badgeName, !earned && styles.badgeNameLocked]}>{badge.name}</Text>
                                </View>
                            );
                        })}
                    </View>

                    <TouchableOpacity style={styles.resetBtn} onPress={resetProfile}>
                        <Text style={styles.resetText}>Reset Progress</Text>
                    </TouchableOpacity>

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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: 24,
        fontWeight: '900' as const,
        letterSpacing: 2,
    },
    settingsBtn: {
        padding: 8,
        backgroundColor: Colors.cardBackground,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    profileCard: {
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    bigAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.cardElevated,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        marginBottom: 12,
    },
    bigEmoji: {
        fontSize: 36,
    },
    username: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '700' as const,
        marginBottom: 4,
    },
    titleBadge: {
        backgroundColor: Colors.cardElevated,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 12,
    },
    titleText: {
        fontSize: 12,
        fontWeight: '700' as const,
        letterSpacing: 0.5,
    },
    ratingBig: {
        color: Colors.textPrimary,
        fontSize: 42,
        fontWeight: '900' as const,
        letterSpacing: 1,
    },
    divisionLabel: {
        fontSize: 13,
        fontWeight: '600' as const,
        marginTop: 2,
    },
    radarCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    radarSub: {
        color: '#9A9A9A',
        fontSize: 12,
        marginBottom: 16,
    },
    radarLocked: {
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.cardElevated,
        borderRadius: 12,
        marginBottom: 16,
    },
    lockIconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    lockOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#F5A623',
        padding: 4,
        borderRadius: 10,
    },
    lockedText: {
        color: Colors.textSecondary,
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: 40,
        marginBottom: 16,
    },
    lockProgressTrack: {
        width: '60%',
        height: 6,
        backgroundColor: Colors.cardBackground,
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 4,
    },
    lockProgressFill: {
        height: '100%',
        backgroundColor: Colors.accent,
    },
    lockStat: {
        color: Colors.textTertiary,
        fontSize: 11,
        fontWeight: '700',
    },
    radarStatsRow: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    radarStatItem: {
        flex: 1,
        alignItems: 'center',
    },
    radarStatLabel: {
        color: '#5A5A5A',
        fontSize: 10,
        fontWeight: '700',
        marginBottom: 4,
    },
    radarStatValue: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '800',
    },
    radarStatDivider: {
        width: 1,
        height: 24,
        backgroundColor: Colors.border,
    },
    practiceBtn: {
        marginTop: 16,
        width: '100%',
        backgroundColor: Colors.accent,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    practiceBtnText: {
        color: Colors.background,
        fontSize: 12,
        fontWeight: '800',
    },
    framePickerCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    frameList: {
        gap: 16,
        paddingBottom: 8,
    },
    frameItem: {
        alignItems: 'center',
        width: 70,
    },
    framePreview: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.cardElevated,
        marginBottom: 6,
    },
    frameSelected: {
        transform: [{ scale: 1.1 }],
        borderColor: Colors.accent,
        borderWidth: 2,
    },
    checkOverlay: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        padding: 2,
    },
    lockOverlayCenter: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    frameName: {
        color: Colors.textSecondary,
        fontSize: 10,
        fontWeight: '600',
        textAlign: 'center',
    },
    proTag: {
        color: '#F5A623',
        fontSize: 8,
        fontWeight: '900',
    },
    proBanner: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#1A1500',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F5A623',
        alignItems: 'center',
    },
    proBannerTitle: {
        color: '#F5A623',
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 4,
    },
    proBannerPrice: {
        color: '#9A9A9A',
        fontSize: 11,
        marginBottom: 12,
    },
    proBannerBtn: {
        backgroundColor: '#F5A623',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    proBannerBtnText: {
        color: '#000000',
        fontSize: 11,
        fontWeight: '900',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
    },
    statCell: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        gap: 4,
    },
    statIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.cardElevated,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    statValue: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '800' as const,
    },
    statLabel: {
        color: Colors.textSecondary,
        fontSize: 9,
        fontWeight: '600' as const,
        textAlign: 'center',
    },
    sectionLabel: {
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '700' as const,
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    topicCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 14,
        padding: 14,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        gap: 10,
    },
    topicRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topicName: {
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '500' as const,
        width: 100,
    },
    topicBarTrack: {
        flex: 1,
        height: 6,
        backgroundColor: Colors.cardElevated,
        borderRadius: 3,
        marginHorizontal: 8,
        overflow: 'hidden',
    },
    topicBarFill: {
        height: '100%',
        backgroundColor: Colors.accent,
        borderRadius: 3,
    },
    topicPercent: {
        color: Colors.textTertiary,
        fontSize: 11,
        fontWeight: '600' as const,
        width: 35,
        textAlign: 'right',
    },
    badgesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 24,
    },
    badgeItem: {
        width: '22%',
        alignItems: 'center',
        gap: 4,
    },
    badgeLocked: {
        opacity: 0.3,
    },
    badgeIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.cardElevated,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    badgeIconEarned: {
        backgroundColor: Colors.xpGoldDim,
        borderColor: Colors.xpGold,
    },
    badgeName: {
        color: Colors.textPrimary,
        fontSize: 9,
        fontWeight: '600' as const,
        textAlign: 'center',
    },
    badgeNameLocked: {
        color: Colors.textTertiary,
    },
    resetBtn: {
        alignItems: 'center',
        paddingVertical: 14,
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.lossDim,
    },
    resetText: {
        color: Colors.loss,
        fontSize: 13,
        fontWeight: '600' as const,
    },
});
