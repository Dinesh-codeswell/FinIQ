import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Share2, Info, Users, Zap } from 'lucide-react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import {
    LeaderboardEntry,
    fetchLeaderboard,
    subscribeToLeaderboard,
    subscribeToPresence
} from '@/src/services/leaderboardService';
import { LeaderboardRow } from '@/src/components/leaderboard/LeaderboardRow';
import { LeaderboardPodium } from '@/src/components/leaderboard/LeaderboardPodium';
import { DivisionSlider } from '@/src/components/leaderboard/DivisionSlider';
import { TournamentBanner } from '@/src/components/leaderboard/TournamentBanner';
import { RankCelebration } from '@/src/components/leaderboard/RankCelebration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDivision } from '@/src/services/leaderboardService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LAST_DIVISION_KEY = 'last_leaderboard_division';

export default function CompeteScreen() {
    const { profile } = useGame();
    const [activeDivision, setActiveDivision] = useState('all');
    const [leaderboardType, setLeaderboardType] = useState<'rating' | 'weekly_xp'>('rating');
    const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userRank, setUserRank] = useState<number | null>(null);
    const [celebration, setCelebration] = useState<{ old: string; new: string } | null>(null);

    const listRef = useRef<FlatList>(null);

    // Division Change Detection (only show celebration for valid division keys)
    const validDivisions = useMemo(() => ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'elite'], []);
    useEffect(() => {
        const checkDivisionChange = async () => {
            const currentDiv = getDivision(profile.rating);
            const lastDiv = await AsyncStorage.getItem(LAST_DIVISION_KEY);

            if (lastDiv && lastDiv !== currentDiv && validDivisions.includes(lastDiv) && validDivisions.includes(currentDiv)) {
                setCelebration({ old: lastDiv, new: currentDiv });
            }

            await AsyncStorage.setItem(LAST_DIVISION_KEY, currentDiv);
        };

        if (profile?.rating != null) checkDivisionChange();
    }, [profile?.rating, validDivisions]);

    // Fetch Initial Leaderboard
    useEffect(() => {
        loadLeaderboard();
    }, [activeDivision, leaderboardType]);

    const loadLeaderboard = async () => {
        try {
            setIsLoading(true);
            const data = await fetchLeaderboard(activeDivision, leaderboardType, 50);
            setPlayers(data);

            // Find user rank in local data if exists
            const idx = data.findIndex(p => p.id === profile.id);
            if (idx !== -1) setUserRank(idx + 1);
        } catch (error) {
            console.error('Leaderboard Fetch Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Real-time Subscriptions
    useEffect(() => {
        const lbChannel = subscribeToLeaderboard((updated) => {
            setPlayers(prev => {
                const index = prev.findIndex(p => p.id === updated.id);
                if (index === -1) return prev;

                const newPlayers = [...prev];
                newPlayers[index] = { ...newPlayers[index], ...updated as any };

                // Re-sort list if rating/xp changed
                return newPlayers.sort((a, b) => {
                    if (leaderboardType === 'rating') return b.rating - a.rating;
                    return b.tournament_xp - a.tournament_xp;
                });
            });
        });

        const presenceChannel = subscribeToPresence(profile.id);

        return () => {
            lbChannel.unsubscribe();
            presenceChannel.unsubscribe();
        };
    }, [profile.id, leaderboardType]);

    const top3 = useMemo(() => players.slice(0, 3), [players]);
    const others = useMemo(() => players.slice(3), [players]);

    const handleTabChange = (div: string) => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setActiveDivision(div);
    };

    const toggleType = () => {
        if (Platform.OS !== 'web') Haptics.selectionAsync();
        setLeaderboardType(prev => prev === 'rating' ? 'weekly_xp' : 'rating');
    };

    const renderHeader = () => (
        <View>
            <TournamentBanner
                endTime={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()}
                prizeXp={500}
            />

            <DivisionSlider
                activeDivision={activeDivision}
                onSelect={handleTabChange}
            />

            <View style={styles.typeToggleContainer}>
                <TouchableOpacity
                    style={[styles.typeBtn, leaderboardType === 'rating' && styles.typeBtnActive]}
                    onPress={() => leaderboardType !== 'rating' && toggleType()}
                >
                    <Users size={14} color={leaderboardType === 'rating' ? Colors.accent : Colors.textTertiary} />
                    <Text style={[styles.typeBtnText, leaderboardType === 'rating' && styles.typeBtnTextActive]}>RATING</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.typeBtn, leaderboardType === 'weekly_xp' && styles.typeBtnActive]}
                    onPress={() => leaderboardType !== 'weekly_xp' && toggleType()}
                >
                    <Zap size={14} color={leaderboardType === 'weekly_xp' ? Colors.xpGold : Colors.textTertiary} />
                    <Text style={[styles.typeBtnText, leaderboardType === 'weekly_xp' && styles.typeBtnTextActive]}>WEEKLY XP</Text>
                </TouchableOpacity>
            </View>

            <LeaderboardPodium topPlayers={top3} type={leaderboardType} />
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <View style={styles.header}>
                    <View>
                        <View style={styles.titleRow}>
                            <Text style={styles.title}>ARENA</Text>
                            <View style={styles.liveIndicator}>
                                <View style={styles.liveDot} />
                                <Text style={styles.liveText}>LIVE</Text>
                            </View>
                        </View>
                        <Text style={styles.subtitle}>World Championship Series</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Info size={20} color={Colors.textSecondary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Share2 size={20} color={Colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color={Colors.accent} size="large" />
                        <Text style={styles.loadingText}>Fetching Ranks...</Text>
                    </View>
                ) : (
                    <FlatList
                        ref={listRef}
                        data={others}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <LeaderboardRow
                                item={item}
                                index={index + 3}
                                isUser={item.id === profile.id}
                            />
                        )}
                        ListHeaderComponent={renderHeader}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                )}

                {/* Sticky User Position Footer */}
                {profile && (players.findIndex(p => p.id === profile.id) >= 3 || userRank === null) ? (
                    <Animated.View
                        entering={SlideInDown.duration(500)}
                        style={styles.stickyFooter}
                    >
                        <LeaderboardRow
                            item={players.find(p => p.id === profile.id) || {
                                id: profile.id,
                                username: profile.username ?? '',
                                avatar: profile.avatar ?? 'fox',
                                rating: profile.rating ?? 1000,
                                previous_rating: profile.previous_rating ?? profile.rating ?? 1000,
                                rank_change: 0,
                                total_xp: profile.xp ?? 0,
                                tournament_xp: profile.tournament_xp ?? 0,
                                global_rank: userRank ?? 0,
                                win_count: profile.wins ?? 0,
                                loss_count: profile.loss_count ?? 0,
                                current_streak: profile.streak ?? 0,
                                is_online: true,
                                division: getDivision(profile.rating ?? 1000),
                                last_active_at: new Date().toISOString()
                            } as any}
                            index={userRank ? userRank - 1 : 99}
                            isUser={true}
                        />
                    </Animated.View>
                ) : null}
            </SafeAreaView>

                {celebration && validDivisions.includes(celebration.old) && validDivisions.includes(celebration.new) && (
                    <RankCelebration
                        oldDivision={celebration.old}
                        newDivision={celebration.new}
                        onClose={() => setCelebration(null)}
                    />
                )}
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
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        color: Colors.textPrimary,
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -0.5,
        fontFamily: 'Outfit-Bold',
    },
    liveIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.alertDim,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.alert,
    },
    liveText: {
        color: Colors.alert,
        fontSize: 10,
        fontWeight: '900',
    },
    subtitle: {
        color: Colors.textTertiary,
        fontSize: 12,
        fontWeight: '600',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    typeToggleContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        marginHorizontal: 16,
        padding: 4,
        borderRadius: 14,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    typeBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        gap: 8,
    },
    typeBtnActive: {
        backgroundColor: Colors.cardElevated,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    typeBtnText: {
        color: Colors.textTertiary,
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    typeBtnTextActive: {
        color: Colors.textPrimary,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 100, // Account for sticky footer
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    loadingText: {
        color: Colors.textTertiary,
        fontSize: 14,
        fontWeight: '600',
    },
    stickyFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 24 : 16,
        backgroundColor: 'rgba(10, 10, 10, 0.9)', // Colors.background with opacity
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 12,
    },
});
