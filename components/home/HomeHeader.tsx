import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '@/context/GameContext';
import { TYPOGRAPHY } from '@/constants/typography';
import { DIVISIONS } from '@/constants/divisions';
import UserAvatar from '@/src/components/UserAvatar';

export default function HomeHeader() {
    const router = useRouter();
    const { profile, division } = useGame();

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    }, []);

    const nextDivInfo = useMemo(() => {
        const currentDivIndex = DIVISIONS.findIndex(d => d.name === division.name);
        const nextDivision = currentDivIndex < DIVISIONS.length - 1 ? DIVISIONS[currentDivIndex + 1] : null;
        if (!nextDivision) return 'Max Rank';
        const ptsToNext = nextDivision.minRating - profile.rating;
        return `${division.title} · ${ptsToNext} pts to ${nextDivision.title.split(' ')[0]}`;
    }, [division, profile.rating]);

    return (
        <View style={styles.container}>
            {/* ELEMENT A — Top utility bar (40px height) */}
            <View style={styles.utilityBar}>
                <TouchableOpacity
                    style={styles.profileSection}
                    onPress={() => router.push('/profile' as any)}
                    activeOpacity={0.8}
                >
                    <View style={styles.avatarBorder}>
                        <UserAvatar
                            size={28}
                            animalEmoji={profile.avatar}
                            frameId={profile.selectedAvatarFrame as any}
                            isPro={profile.isPro}
                            showProBadge={false}
                        />
                    </View>
                    <Text style={styles.utilityUsername}>@{profile.username}</Text>
                </TouchableOpacity>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.bellButton}>
                        <Ionicons name="notifications" size={20} color="#6B7280" />
                    </TouchableOpacity>

                    <View style={styles.streakPill}>
                        <Text style={styles.streakText}>🔥 {profile.streak}</Text>
                    </View>
                </View>
            </View>

            {/* ELEMENT B — Page title (below utility bar, 16px margin-top) */}
            <View style={styles.greetingSection}>
                <Text style={styles.pageGreeting}>{greeting}, {profile.username.split('_')[0]}.</Text>
                <Text style={styles.rankSubtitle}>
                    {nextDivInfo}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    utilityBar: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatarBorder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#00D68F',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    utilityUsername: {
        fontSize: 13,
        fontWeight: TYPOGRAPHY.weights.medium as any,
        color: '#9CA3AF',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    bellButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    streakPill: {
        backgroundColor: '#1C1C1C',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#2D2410',
    },
    streakText: {
        fontSize: 12,
        fontWeight: TYPOGRAPHY.weights.semibold as any,
        color: '#F5A623',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    greetingSection: {
        marginTop: 16,
    },
    pageGreeting: {
        fontSize: 28,
        fontWeight: TYPOGRAPHY.weights.bold as any,
        color: '#FFFFFF',
        letterSpacing: -0.3,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    rankSubtitle: {
        fontSize: 13,
        fontWeight: TYPOGRAPHY.weights.regular as any,
        color: '#6B7280',
        marginTop: 4,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
});
