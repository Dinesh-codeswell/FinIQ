import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '@/context/GameContext';
import { TYPOGRAPHY } from '@/constants/typography';
import { DIVISIONS } from '@/constants/divisions';
import { TourAnchor } from '@/src/components/fin/TourAnchor';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RatingHeroCard() {
    const { profile, division } = useGame();

    const nextDivInfo = useMemo(() => {
        const currentDivIndex = DIVISIONS.findIndex(d => d.name === division.name);
        const nextDivision = currentDivIndex < DIVISIONS.length - 1 ? DIVISIONS[currentDivIndex + 1] : null;
        if (!nextDivision) return 'Max Rank';
        const ptsToNext = nextDivision.minRating - profile.rating;
        return `${division.title} · ${ptsToNext} pts to ${nextDivision.title.split(' ')[0]}`;
    }, [division, profile.rating]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0D1F17', '#111111']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <View style={styles.topSection}>
                    {/* Left Column (60% width) */}
                    <View style={styles.leftCol}>
                        <TourAnchor id="rating_hero_number">
                            <Text style={styles.ratingNumber}>{profile.rating}</Text>
                        </TourAnchor>
                        <View style={styles.deltaContainer}>
                            <Ionicons name="caret-up" size={12} color="#00D68F" />
                            <Text style={styles.deltaText}>+10 today</Text>
                        </View>
                        <Text style={styles.subtext}>{nextDivInfo}</Text>
                    </View>

                    {/* Right Column (40% width) */}
                    <View style={styles.rightCol}>
                        {/* Decorative Chart SVG */}
                        <View style={styles.chartContainer}>
                            <Svg width="80" height="40" viewBox="0 0 80 40">
                                <Path
                                    d="M 5 35 L 30 25 L 55 20 L 75 5"
                                    fill="none"
                                    stroke="#00D68F"
                                    strokeWidth="2"
                                    strokeOpacity="0.3"
                                />
                            </Svg>
                        </View>
                        <View style={styles.xpPill}>
                            <Text style={styles.xpText}>⚡ {profile.xp} XP</Text>
                        </View>
                    </View>
                </View>

                {/* hairline separator */}
                <View style={styles.hairline} />

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <TourAnchor id="stats_panel_streak">
                        <View style={styles.statCol}>
                            <Text style={[styles.statValue, { color: '#F5A623' }]}>{profile.streak}</Text>
                            <Text style={styles.statLabel}>Day Streak 🔥</Text>
                        </View>
                    </TourAnchor>
                    <View style={styles.labelDivider} />
                    <View style={styles.statCol}>
                        <Text style={[styles.statValue, { color: '#FFFFFF' }]}>{profile.duelsPlayedToday}</Text>
                        <Text style={styles.statLabel}>Duels Today</Text>
                    </View>
                    <View style={styles.labelDivider} />
                    <View style={styles.statCol}>
                        <Text style={[styles.statValue, { color: '#00D68F' }]}>492</Text>
                        <Text style={styles.statLabel}>Online Now</Text>
                    </View>
                </View>
                泛            </LinearGradient>

            {/* Banner CTA */}
            <View style={styles.ctaBanner}>
                <Text style={styles.ctaText}>Your daily mission →</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        borderRadius: 16,
        // Shadow for premium feel
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    card: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1A3028',
        padding: 20,
        paddingBottom: 14,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftCol: {
        width: '60%',
    },
    ratingNumber: {
        fontSize: 52,
        fontWeight: TYPOGRAPHY.weights.extraBold as any,
        color: '#FFFFFF',
        letterSpacing: -2,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    deltaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    deltaText: {
        fontSize: 13,
        fontWeight: TYPOGRAPHY.weights.medium as any,
        color: '#00D68F',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    subtext: {
        fontSize: 12,
        fontWeight: TYPOGRAPHY.weights.regular as any,
        color: '#6B7280',
        marginTop: 4,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    rightCol: {
        width: '40%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    chartContainer: {
        marginTop: 4,
    },
    xpPill: {
        backgroundColor: '#1A2A1E',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    xpText: {
        fontSize: 11,
        fontWeight: TYPOGRAPHY.weights.semibold as any,
        color: '#00D68F',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    hairline: {
        height: 1,
        backgroundColor: '#1E1E1E',
        marginVertical: 14,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statCol: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 22,
        fontWeight: TYPOGRAPHY.weights.bold as any,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    statLabel: {
        fontSize: 11,
        color: '#6B7280',
        marginTop: 2,
        letterSpacing: 0.5,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    labelDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#1E1E1E',
    },
    ctaBanner: {
        height: 40,
        backgroundColor: '#00D68F',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        // Creating banner feel, flush with card edges but it's technically separate View here
        // We ensure margin-top is -1 to overlap border if needed, or just borderRadii.
        marginTop: -2, // pull up to meet card
    },
    ctaText: {
        fontSize: 12,
        fontWeight: TYPOGRAPHY.weights.bold as any,
        color: '#000000',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
});
