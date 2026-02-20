import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { SPACING } from '@/src/constants/spacing';

export default function RecentActivity() {
    const router = useRouter();
    const { profile } = useGame();

    if (profile.totalDuels === 0) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.sectionLabel}>RECENT ACTIVITY</Text>

            <View style={styles.card}>
                <View style={[styles.iconCircle, { backgroundColor: '#1A2A1A' }]}>
                    <Ionicons name="flash" size={20} color={Colors.accent} />
                </View>

                <View style={styles.details}>
                    <Text style={styles.modeTitle}>Sprint Duel</Text>
                    <Text style={styles.subtitle}>vs CashFlow · Loss</Text>
                    <Text style={styles.xpGain}>{profile.wins > 0 ? '+50 XP' : '+24 XP earned'}</Text>
                </View>

                <TouchableOpacity
                    style={styles.rematchBtn}
                    onPress={() => router.push('/matchmaking' as any)}
                >
                    <Text style={styles.rematchText}>REMATCH</Text>
                    <Ionicons name="refresh" size={14} color={Colors.accent} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#5A5A5A',
        letterSpacing: 0.08,
        textTransform: 'uppercase',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#141414',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2E2E2E',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        flex: 1,
        marginLeft: 12,
    },
    modeTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 12,
        color: '#9A9A9A',
        marginTop: 2,
    },
    xpGain: {
        fontSize: 11,
        color: '#F5A623', // Amber
        marginTop: 2,
    },
    rematchBtn: {
        backgroundColor: '#0D2A1E',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rematchText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.accent,
    },
});
