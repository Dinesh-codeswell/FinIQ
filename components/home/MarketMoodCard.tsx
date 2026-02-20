import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect, Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '@/context/GameContext';
import { getDailyChallenge } from '@/src/utils/questionEngine';
import { TYPOGRAPHY } from '@/constants/typography';

const LiveIndicator = ({ isCompleted }: { isCompleted: boolean }) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!isCompleted) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
                ])
            ).start();
        }
    }, [isCompleted]);

    return (
        <View style={styles.liveContainer}>
            <Animated.View
                style={[
                    styles.liveDot,
                    { backgroundColor: isCompleted ? '#6B7280' : '#00D68F', opacity: pulseAnim }
                ]}
            />
            <Text style={[styles.liveText, { color: isCompleted ? '#6B7280' : '#00D68F' }]}>LIVE</Text>
        </View>
    );
};

export default function MarketMoodCard() {
    const router = useRouter();
    const { profile } = useGame();
    const [dailyChallenge, setDailyChallenge] = React.useState<{ question: string } | null>(null);
    const todayStr = new Date().toISOString().split('T')[0];
    const isCompleted = profile.dailyChallengeCompleted === todayStr;

    React.useEffect(() => {
        getDailyChallenge().then(challenge => {
            if (challenge) setDailyChallenge({ question: challenge.question });
        }).catch(() => { });
    }, []);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => !isCompleted && router.push('/daily-challenge' as any)}
            disabled={isCompleted}
            style={isCompleted ? { opacity: 0.6 } : {}}
        >
            <LinearGradient
                colors={isCompleted ? ['#1A1A1A', '#111111'] : ['#0A1F14', '#0D0D0D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.card, isCompleted && styles.cardCompleted]}
            >
                {/* Decoration Candlestick SVG */}
                <View style={styles.decorationContainer}>
                    <Svg width="80" height="80" viewBox="0 0 80 80">
                        {/* Faint Candlesticks */}
                        <Rect x="10" y="40" width="6" height="20" fill="#FFFFFF" fillOpacity="0.04" />
                        <Line x1="13" y1="35" x2="13" y2="65" stroke="#FFFFFF" strokeOpacity="0.04" strokeWidth="1" />

                        <Rect x="25" y="30" width="6" height="25" fill="#FFFFFF" fillOpacity="0.04" />
                        <Line x1="28" y1="25" x2="28" y2="60" stroke="#FFFFFF" strokeOpacity="0.04" strokeWidth="1" />

                        <Rect x="40" y="20" width="6" height="30" fill="#FFFFFF" fillOpacity="0.04" />
                        <Line x1="43" y1="15" x2="43" y2="55" stroke="#FFFFFF" strokeOpacity="0.04" strokeWidth="1" />
                    </Svg>
                </View>

                {/* Top Row */}
                <View style={styles.topRow}>
                    <View style={styles.labelSection}>
                        <Text style={styles.challengeLabel}>TODAY'S CHALLENGE</Text>
                    </View>
                    <LiveIndicator isCompleted={isCompleted} />
                </View>

                {/* Middle Section */}
                <View style={styles.middleSection}>
                    <Text style={[styles.title, isCompleted && { color: '#9CA3AF' }]}>MARKET MOOD</Text>
                    <Text style={styles.questionText}>
                        {dailyChallenge?.question ?? 'Loading challenge...'}
                    </Text>
                </View>

                {/* Bottom Row */}
                <View style={styles.bottomRow}>
                    <View style={styles.playersInfo}>
                        <Text style={styles.playersText}>📊 492 players answered</Text>
                    </View>

                    {isCompleted ? (
                        <View style={styles.donePill}>
                            <Text style={styles.doneText}>✓ Done</Text>
                        </View>
                    ) : (
                        <View style={styles.playButton}>
                            <Text style={styles.playButtonText}>PLAY →</Text>
                        </View>
                    )}
                </View>
            </LinearGradient>

            {isCompleted && (
                <TouchableOpacity style={styles.seeResultsRow}>
                    <Text style={styles.seeResultsText}>See results →</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1A3028',
        padding: 18,
        position: 'relative',
        overflow: 'hidden',
    },
    cardCompleted: {
        borderColor: '#3A3A3A',
    },
    decorationContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelSection: {
        borderLeftWidth: 2,
        borderLeftColor: '#00D68F',
        paddingLeft: 8,
    },
    challengeLabel: {
        fontSize: 10,
        fontWeight: TYPOGRAPHY.weights.semibold as any,
        color: '#00D68F',
        letterSpacing: 0.06 * 10,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    liveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    liveText: {
        fontSize: 10,
        fontWeight: TYPOGRAPHY.weights.bold as any,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    middleSection: {
        marginTop: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: TYPOGRAPHY.weights.extraBold as any,
        color: '#FFFFFF',
        letterSpacing: -0.5,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    questionText: {
        fontSize: 14,
        fontWeight: TYPOGRAPHY.weights.regular as any,
        color: '#D1D5DB',
        marginTop: 4,
        lineHeight: 14 * 1.6,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 18,
    },
    playersInfo: {
        flex: 1,
    },
    playersText: {
        fontSize: 12,
        fontWeight: TYPOGRAPHY.weights.regular as any,
        color: '#6B7280',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    playButton: {
        backgroundColor: '#00D68F',
        borderRadius: 999,
        paddingHorizontal: 18,
        paddingVertical: 8,
    },
    playButtonText: {
        fontSize: 13,
        fontWeight: TYPOGRAPHY.weights.bold as any,
        color: '#000000',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    donePill: {
        backgroundColor: '#1C1C1C',
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#3A3A3A',
    },
    doneText: {
        fontSize: 12,
        fontWeight: TYPOGRAPHY.weights.semibold as any,
        color: '#9CA3AF',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    seeResultsRow: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    seeResultsText: {
        fontSize: 13,
        color: '#00D68F',
        fontWeight: TYPOGRAPHY.weights.regular as any,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
});
