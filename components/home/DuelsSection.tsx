import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TYPOGRAPHY } from '@/constants/typography';
import { TourAnchor } from '@/src/components/fin/TourAnchor';
import SectionHeader from './SectionHeader';

export default function DuelsSection() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <SectionHeader
                title="Duels"
                count={2}
                actionLabel="View all"
            />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Sprint Card (Active) */}
                <TourAnchor id="sprint_duel_card">
                    <TouchableOpacity
                        style={[styles.card, styles.activeCard]}
                        activeOpacity={0.8}
                        onPress={() => router.push('/matchmaking')}
                    >
                        <View style={styles.accentEdge} />
                        <View style={styles.iconContainer}>
                            <Ionicons name="flash" size={26} color="#00D68F" />
                        </View>
                        <View style={styles.modeContent}>
                            <Text style={styles.modeName}>Sprint</Text>
                            <Text style={styles.modeDesc}>Fast-paced duels with quick questions.</Text>
                        </View>
                        <View style={styles.cardFooter}>
                            <Ionicons name="time-outline" size={14} color="#6B7280" />
                            <Text style={styles.timeText}>~1 min</Text>
                        </View>
                    </TouchableOpacity>
                </TourAnchor>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#13111A', borderColor: '#BB8FCE40' }]}
                    activeOpacity={0.8}
                    onPress={() => router.push('/mental-math-setup' as any)}
                >
                    <View style={[styles.accentEdge, { backgroundColor: '#BB8FCE' }]} />
                    <View style={[styles.iconContainer, { backgroundColor: '#1A1625' }]}>
                        <Ionicons name="calculator" size={26} color="#BB8FCE" />
                    </View>
                    <View style={styles.modeContent}>
                        <Text style={styles.modeName}>Brain Speed</Text>
                        <Text style={styles.modeDesc}>250+ rapid-fire math and logic puzzles.</Text>
                    </View>
                    <View style={styles.cardFooter}>
                        <Ionicons name="flash-outline" size={14} color="#BB8FCE" />
                        <Text style={[styles.timeText, { color: '#BB8FCE' }]}>Multi-mode</Text>
                    </View>
                </TouchableOpacity>

                {/* Scenario Card (Locked/Soon) */}
                <View style={[styles.card, styles.lockedCard]}>
                    <View style={styles.soonBadge}>
                        <Text style={styles.soonText}>SOON</Text>
                    </View>
                    <View style={[styles.iconContainer, { backgroundColor: '#1C1C1C' }]}>
                        <Ionicons name="map" size={26} color="#4B5563" />
                    </View>
                    <View style={styles.modeContent}>
                        <Text style={[styles.modeName, { color: '#9CA3AF' }]}>Scenario</Text>
                        <Text style={styles.modeDesc}>Explore deep market scenarios with Fin.</Text>
                    </View>
                    <View style={styles.cardFooter}>
                        <Ionicons name="time-outline" size={14} color="#4B5563" />
                        <Text style={[styles.timeText, { color: '#4B5563' }]}>~5 mins</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Horizontal padding handled by SectionHeader and scrollContent
    },
    scrollContent: {
        paddingRight: 20,
        gap: 16,
    },
    card: {
        width: 148,
        height: 180,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#222222',
        padding: 16,
        paddingHorizontal: 14,
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
    },
    activeCard: {
        backgroundColor: '#0D1A12',
    },
    lockedCard: {
        backgroundColor: '#111111',
    },
    accentEdge: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 3,
        backgroundColor: '#00D68F',
    },
    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: '#132218',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeContent: {
        flex: 1,
        marginTop: 12,
    },
    modeName: {
        fontSize: 15,
        fontWeight: TYPOGRAPHY.weights.bold as any,
        color: '#FFFFFF',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    modeDesc: {
        fontSize: 11,
        fontWeight: TYPOGRAPHY.weights.regular as any,
        color: '#6B7280',
        lineHeight: 14,
        marginTop: 4,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: 11,
        fontWeight: TYPOGRAPHY.weights.medium as any,
        color: '#6B7280',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    soonBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#211A00',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 8,
    },
    soonText: {
        fontSize: 8,
        fontWeight: TYPOGRAPHY.weights.semibold as any,
        color: '#F5A623',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
});
