import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight, Layout } from 'react-native-reanimated';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react-native';
import Colors from '@/constants/colors';
import UserAvatar from '@/src/components/UserAvatar';
import UsernameDisplay from '@/src/components/UsernameDisplay';
import { LeaderboardEntry, DIVISION_CONFIG } from '@/src/services/leaderboardService';

interface Props {
    item: LeaderboardEntry;
    index: number;
    isUser?: boolean;
    onPress?: () => void;
}

export const LeaderboardRow = ({ item, index, isUser, onPress }: Props) => {
    const division = DIVISION_CONFIG[item.division] || DIVISION_CONFIG.bronze;
    const rank = item.global_rank || (index + 1);

    const renderRankDelta = () => {
        if (item.rank_change > 0) {
            return (
                <View style={[styles.deltaContainer, styles.deltaUp]}>
                    <ChevronUp size={10} color={Colors.accent} strokeWidth={3} />
                    <Text style={styles.deltaTextUp}>{Math.abs(item.rank_change)}</Text>
                </View>
            );
        }
        if (item.rank_change < 0) {
            return (
                <View style={[styles.deltaContainer, styles.deltaDown]}>
                    <ChevronDown size={10} color={Colors.alert} strokeWidth={3} />
                    <Text style={styles.deltaTextDown}>{Math.abs(item.rank_change)}</Text>
                </View>
            );
        }
        return (
            <View style={styles.deltaContainer}>
                <Minus size={10} color={Colors.textTertiary} strokeWidth={3} />
            </View>
        );
    };

    return (
        <Animated.View
            entering={FadeInRight.delay(Math.min(index * 40, 200)).duration(350).springify().damping(14)}
            layout={Layout.springify().damping(14)}
        >
            <TouchableOpacity
                style={[
                    styles.container,
                    isUser && styles.userContainer,
                    { borderLeftColor: division.color }
                ]}
                onPress={onPress}
                activeOpacity={0.7}
            >
                <View style={styles.rankSection}>
                    <Text style={[styles.rankText, isUser && styles.userRankText]}>
                        {rank}
                    </Text>
                    {renderRankDelta()}
                </View>

                <View style={styles.avatarWrapper}>
                    <UserAvatar
                        size={40}
                        animalEmoji={item.avatar}
                        frameId="none"
                        isPro={false}
                    />
                    {item.is_online && <View style={styles.onlineIndicator} />}
                </View>

                <View style={styles.infoSection}>
                    <UsernameDisplay
                        username={item.username}
                        isPro={false}
                        size="sm"
                    />
                    <Text style={[styles.divisionText, { color: division.color }]}>
                        {division.label}
                    </Text>
                </View>

                <View style={styles.statsSection}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.xpText}>{item.tournament_xp} XP</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: Colors.surface,
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        borderLeftWidth: 4,
    },
    userContainer: {
        backgroundColor: Colors.accentDim,
        borderColor: Colors.accentMuted,
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    rankSection: {
        width: 35,
        alignItems: 'center',
        marginRight: 12,
    },
    rankText: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '800',
        fontFamily: 'Outfit-Bold',
    },
    userRankText: {
        color: Colors.accent,
    },
    deltaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        gap: 1,
    },
    deltaUp: {
        backgroundColor: Colors.accentDim,
        paddingHorizontal: 4,
        borderRadius: 4,
    },
    deltaDown: {
        backgroundColor: Colors.alertDim,
        paddingHorizontal: 4,
        borderRadius: 4,
    },
    deltaTextUp: {
        color: Colors.accent,
        fontSize: 9,
        fontWeight: '900',
    },
    deltaTextDown: {
        color: Colors.alert,
        fontSize: 9,
        fontWeight: '900',
    },
    avatarWrapper: {
        position: 'relative',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.accent,
        borderWidth: 2,
        borderColor: Colors.surface,
    },
    infoSection: {
        flex: 1,
        marginLeft: 12,
    },
    usernameContainer: {
        marginBottom: 2,
    },
    divisionText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    statsSection: {
        alignItems: 'flex-end',
    },
    ratingText: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '900',
        fontFamily: 'Outfit-Bold',
    },
    xpText: {
        color: Colors.textTertiary,
        fontSize: 10,
        fontWeight: '600',
        marginTop: 1,
    },
});
