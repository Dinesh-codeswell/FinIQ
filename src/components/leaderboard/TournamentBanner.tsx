import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, Clock, Zap } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Props {
    endTime: string;
    prizeXp: number;
}

export const TournamentBanner = ({ endTime, prizeXp }: Props) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateTimer = () => {
            const end = new Date(endTime).getTime();
            const now = new Date().getTime();
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft('ENDED');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [endTime]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.mainInfo}>
                    <View style={styles.badge}>
                        <Trophy size={14} color={Colors.xpGold} fill={Colors.xpGold} />
                        <Text style={styles.badgeText}>WEEKLY SPRINT</Text>
                    </View>
                    <Text style={styles.title}>Finance Championship</Text>
                    <View style={styles.timerRow}>
                        <Clock size={12} color={Colors.textTertiary} />
                        <Text style={styles.timerText}>{timeLeft} remaining</Text>
                    </View>
                </View>

                <View style={styles.prizeSection}>
                    <View style={styles.prizeCircle}>
                        <Zap size={20} color={Colors.xpGold} fill={Colors.xpGold} />
                    </View>
                    <Text style={styles.prizeAmount}>{prizeXp}</Text>
                    <Text style={styles.prizeLabel}>XP PRIZE</Text>
                </View>
            </View>

            {/* Progress Bar Background */}
            <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        backgroundColor: Colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
        marginBottom: 8,
    },
    content: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },
    mainInfo: {
        flex: 1,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    badgeText: {
        color: Colors.xpGold,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    title: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '900',
        fontFamily: 'Outfit-Bold',
        marginBottom: 4,
    },
    timerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timerText: {
        color: Colors.textTertiary,
        fontSize: 12,
        fontWeight: '600',
    },
    prizeSection: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        borderLeftWidth: 1,
        borderLeftColor: Colors.border,
    },
    prizeCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.xpGoldDim,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    prizeAmount: {
        color: Colors.textPrimary,
        fontSize: 20,
        fontWeight: '900',
        fontFamily: 'Outfit-Bold',
    },
    prizeLabel: {
        color: Colors.textTertiary,
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    progressBg: {
        height: 4,
        backgroundColor: Colors.border,
        width: '100%',
    },
    progressFill: {
        height: '100%',
        backgroundColor: Colors.xpGold,
        borderRadius: 2,
    },
});
