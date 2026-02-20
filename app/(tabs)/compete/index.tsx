import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Share2, ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { DIVISIONS, getDivision } from '@/constants/divisions';
import { userService } from '@/src/services/userService';
import UserAvatar from '@/src/components/UserAvatar';
import UsernameDisplay from '@/src/components/UsernameDisplay';
import { useQuery } from '@tanstack/react-query';

export default function CompeteScreen() {
    const { profile, division } = useGame();
    const [activeTab, setActiveTab] = useState<'open' | 'division'>('open');

    const { data: leaderboardData, isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const { data, error } = await userService.getLeaderboard(50);
            if (error) throw error;
            return data || [];
        }
    });

    const leaderboard = leaderboardData || [];

    const filteredPlayers = useMemo(() => {
        if (activeTab === 'open') return leaderboard;
        return leaderboard.filter((p: any) => {
            const d = getDivision(p.rating);
            return d.name === division.name;
        });
    }, [leaderboard, activeTab, division.name]);

    const userRank = useMemo(() => {
        const index = leaderboard.findIndex(p => p.rating <= profile.rating);
        return index === -1 ? leaderboard.length + 1 : index + 1;
    }, [leaderboard, profile.rating]);

    const displayRank = userRank;

    const renderPlayer = ({ item, index }: { item: any; index: number }) => {
        const playerDiv = getDivision(item.rating);
        const isTop3 = index < 3;
        const medals = ['🥇', '🥈', '🥉'];

        return (
            <View style={[styles.playerRow, isTop3 && styles.playerRowTop]}>
                <View style={styles.rankCol}>
                    {isTop3 ? (
                        <Text style={styles.medal}>{medals[index]}</Text>
                    ) : (
                        <Text style={styles.rankNum}>{index + 1}</Text>
                    )}
                </View>
                <UserAvatar size={36} animalEmoji={item.avatar} frameId="none" isPro={false} showProBadge={false} />
                <View style={styles.playerInfo}>
                    <UsernameDisplay username={item.username} isPro={false} size="sm" />
                    <Text style={[styles.playerDiv, { color: playerDiv.color }]}>{playerDiv.title}</Text>
                </View>
                <Text style={styles.playerRating}>{item.rating}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>COMPETE</Text>
                        <Text style={styles.headerSub}>Climb the ranks</Text>
                    </View>
                    <TouchableOpacity style={styles.shareBtn}>
                        <Share2 {...({ size: 18, color: Colors.textSecondary } as any)} />
                    </TouchableOpacity>
                </View>

                <View style={styles.tournamentCard}>
                    <View style={styles.tournamentHeader}>
                        <Trophy {...({ size: 18, color: Colors.xpGold } as any)} />
                        <Text style={styles.tournamentTitle}>WEEKLY TOURNAMENT</Text>
                    </View>
                    <Text style={styles.tournamentName}>Finance Sprint Championship</Text>
                    <View style={styles.tournamentStats}>
                        <View style={styles.tournamentStat}>
                            <Text style={styles.tournamentStatValue}>3d 14h</Text>
                            <Text style={styles.tournamentStatLabel}>REMAINING</Text>
                        </View>
                        <View style={styles.tournamentStatDivider} />
                        <View style={styles.tournamentStat}>
                            <Text style={styles.tournamentStatValue}>#{displayRank}</Text>
                            <Text style={styles.tournamentStatLabel}>YOUR RANK</Text>
                        </View>
                        <View style={styles.tournamentStatDivider} />
                        <View style={styles.tournamentStat}>
                            <Text style={[styles.tournamentStatValue, { color: Colors.xpGold }]}>500 XP</Text>
                            <Text style={styles.tournamentStatLabel}>PRIZE</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'open' && styles.tabActive]}
                        onPress={() => setActiveTab('open')}
                    >
                        <Text style={[styles.tabText, activeTab === 'open' && styles.tabTextActive]}>OPEN DIVISION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'division' && styles.tabActive]}
                        onPress={() => setActiveTab('division')}
                    >
                        <Text style={[styles.tabText, activeTab === 'division' && styles.tabTextActive]}>{division.title.split(' ')[0].toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.divisionRow}>
                    {DIVISIONS.slice(0, 6).map((d: any) => (
                        <View
                            key={d.name}
                            style={[
                                styles.divisionDot,
                                { backgroundColor: d.color },
                                d.name === division.name && styles.divisionDotActive,
                            ]}
                        />
                    ))}
                </View>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color={Colors.accent} size="large" />
                    </View>
                ) : (
                    <FlatList
                        data={filteredPlayers}
                        renderItem={renderPlayer}
                        keyExtractor={(item: any) => item.id}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={[styles.playerRow, styles.yourRow]}>
                                <View style={styles.rankCol}>
                                    <Text style={[styles.rankNum, { color: Colors.accent }]}>#{displayRank}</Text>
                                </View>
                                <UserAvatar size={36} animalEmoji={profile.avatar} frameId={profile.selectedAvatarFrame as any} isPro={profile.isPro} showProBadge={false} />
                                <View style={styles.playerInfo}>
                                    <UsernameDisplay username={profile.username} isPro={profile.isPro} size="sm" color={Colors.accent} />
                                    <Text style={[styles.playerDiv, { color: division.color }]}>{division.title}</Text>
                                </View>
                                <Text style={[styles.playerRating, { color: Colors.accent }]}>{profile.rating}</Text>
                            </View>
                        }
                    />
                )}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
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
    shareBtn: {
        padding: 8,
        backgroundColor: Colors.cardBackground,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    tournamentCard: {
        marginHorizontal: 16,
        backgroundColor: Colors.cardBackground,
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    tournamentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    tournamentTitle: {
        color: Colors.xpGold,
        fontSize: 11,
        fontWeight: '700' as const,
        letterSpacing: 1,
    },
    tournamentName: {
        color: Colors.textPrimary,
        fontSize: 17,
        fontWeight: '700' as const,
        marginBottom: 12,
    },
    tournamentStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tournamentStat: {
        flex: 1,
        alignItems: 'center',
    },
    tournamentStatValue: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '800' as const,
        marginBottom: 2,
    },
    tournamentStatLabel: {
        color: Colors.textTertiary,
        fontSize: 9,
        fontWeight: '600' as const,
        letterSpacing: 0.5,
    },
    tournamentStatDivider: {
        width: 1,
        height: 28,
        backgroundColor: Colors.border,
    },
    tabs: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 8,
        gap: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: Colors.cardBackground,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    tabActive: {
        backgroundColor: Colors.accentDim,
        borderColor: Colors.accent,
    },
    tabText: {
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '700' as const,
        letterSpacing: 1,
    },
    tabTextActive: {
        color: Colors.accent,
    },
    divisionRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    divisionDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        opacity: 0.4,
    },
    divisionDotActive: {
        opacity: 1,
        width: 20,
        borderRadius: 4,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: Colors.cardBackground,
        borderRadius: 10,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    playerRowTop: {
        borderColor: Colors.xpGoldDim,
    },
    yourRow: {
        borderColor: Colors.accent,
        backgroundColor: Colors.accentDim,
    },
    rankCol: {
        width: 32,
        alignItems: 'center',
    },
    medal: {
        fontSize: 18,
    },
    rankNum: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '700' as const,
    },
    playerAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.cardElevated,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        marginLeft: 8,
    },
    playerEmoji: {
        fontSize: 16,
    },
    playerInfo: {
        flex: 1,
        marginLeft: 10,
    },
    playerName: {
        color: Colors.textPrimary,
        fontSize: 13,
        fontWeight: '600' as const,
    },
    playerDiv: {
        fontSize: 10,
        fontWeight: '500' as const,
        marginTop: 1,
    },
    playerRating: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '800' as const,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
