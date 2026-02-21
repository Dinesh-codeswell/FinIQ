import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { Crown } from 'lucide-react-native';
import Colors from '@/constants/colors';
import UserAvatar from '@/src/components/UserAvatar';
import UsernameDisplay from '@/src/components/UsernameDisplay';
import { LeaderboardEntry } from '@/src/services/leaderboardService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
    topPlayers: LeaderboardEntry[];
    type: 'rating' | 'weekly_xp';
}

export const LeaderboardPodium = ({ topPlayers, type }: Props) => {
    const first = topPlayers[0];
    const second = topPlayers[1];
    const third = topPlayers[2];

    const renderPodiumSpot = (player: LeaderboardEntry, position: 1 | 2 | 3) => {
        if (!player) return <View style={[styles.spotContainer, styles[`spot${position}`]]} />;

        const isFirst = position === 1;
        const size = isFirst ? 80 : 65;

        return (
            <Animated.View
                entering={FadeInDown.delay(position * 100).springify()}
                style={[styles.spotContainer, styles[`spot${position}`]]}
            >
                <View style={styles.avatarContainer}>
                    {isFirst && (
                        <Animated.View entering={ZoomIn.delay(600)} style={styles.crownWrapper}>
                            <Crown size={24} color="#FFD700" fill="#FFD700" />
                        </Animated.View>
                    )}
                    <UserAvatar
                        size={size}
                        animalEmoji={player.avatar}
                        frameId={isFirst ? "gold_circuit" : "none"}
                        isPro={false}
                    />
                    <View style={[styles.rankBadge, { backgroundColor: position === 1 ? '#FFD700' : position === 2 ? '#C0C0C0' : '#CD7F32' }]}>
                        <Text style={styles.rankBadgeText}>{position}</Text>
                    </View>
                </View>

                <UsernameDisplay
                    username={player.username}
                    isPro={false}
                    size={isFirst ? "md" : "sm"}
                />

                <View style={styles.podiumStats}>
                    <Text style={styles.ratingText}>{type === 'rating' ? player.rating : player.tournament_xp}</Text>
                    <Text style={styles.ratingLabel}>{type === 'rating' ? 'ELO' : 'XP'}</Text>
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            {renderPodiumSpot(second, 2)}
            {renderPodiumSpot(first, 1)}
            {renderPodiumSpot(third, 3)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 24,
        paddingHorizontal: 16,
        height: 240,
    },
    spotContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    spot1: {
        zIndex: 10,
        marginBottom: 10,
    },
    spot2: {
        zIndex: 5,
        marginRight: -10,
    },
    spot3: {
        zIndex: 5,
        marginLeft: -10,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 8,
        alignItems: 'center',
    },
    crownWrapper: {
        position: 'absolute',
        top: -20,
        zIndex: 20,
        transform: [{ rotate: '-10deg' }],
    },
    rankBadge: {
        position: 'absolute',
        bottom: -2,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.surface,
    },
    rankBadgeText: {
        color: Colors.surface,
        fontSize: 10,
        fontWeight: '900',
    },
    podiumUsername: {
        marginBottom: 2,
    },
    podiumStats: {
        alignItems: 'center',
    },
    ratingText: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '900',
        fontFamily: 'Outfit-Bold',
    },
    ratingLabel: {
        color: Colors.textTertiary,
        fontSize: 9,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginTop: -2,
    },
});
