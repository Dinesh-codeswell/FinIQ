import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { MENTAL_MATH_MODES } from '@/src/constants/mentalMathModes';

const { width } = Dimensions.get('window');

export default function MentalMathSetupScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const onSelectMode = (modeId: string) => {
        router.push({
            pathname: '/matchmaking',
            params: { topic: 'mental_math', mode: modeId }
        });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Mental Math</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                        <Text style={styles.mainTitle}>Choose Your Challenge</Text>
                        <Text style={styles.subTitle}>Push your brain to its absolute limit with speed-based arithmetic and logic.</Text>

                        {MENTAL_MATH_MODES.map((mode, index) => (
                            <TouchableOpacity
                                key={mode.id}
                                style={[styles.modeCard, { borderColor: mode.color + '30' }]}
                                onPress={() => onSelectMode(mode.id)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.glowBackground, { backgroundColor: mode.color }]} />
                                <View style={styles.modeIconContainer}>
                                    <Text style={styles.modeIcon}>{mode.icon}</Text>
                                </View>
                                <View style={styles.modeInfo}>
                                    <View style={styles.modeHeader}>
                                        <Text style={[styles.modeName, { color: mode.color }]}>{mode.name}</Text>
                                        <View style={[styles.badge, { backgroundColor: mode.color + '20' }]}>
                                            <Text style={[styles.badgeText, { color: mode.color }]}>{mode.badge}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.tagline}>{mode.tagline}</Text>
                                    <View style={styles.statsRow}>
                                        <View style={styles.statPill}>
                                            <Ionicons name="timer-outline" size={14} color="#9BA1A6" />
                                            <Text style={styles.statText}>{mode.duration}s</Text>
                                        </View>
                                        <View style={styles.statPill}>
                                            <Ionicons name="help-circle-outline" size={14} color="#9BA1A6" />
                                            <Text style={styles.statText}>{mode.questionCount} Qs</Text>
                                        </View>
                                        <View style={styles.statPill}>
                                            <Ionicons name="flash-outline" size={14} color="#00D68F" />
                                            <Text style={[styles.statText, { color: '#00D68F' }]}>{mode.xpMultiplier}x XP</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.chevronContainer}>
                                    <Ionicons name="chevron-forward" size={20} color={mode.color + '80'} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>

                    <View style={styles.infoCard}>
                        <Ionicons name="information-circle-outline" size={20} color="#6B7280" />
                        <Text style={styles.infoText}>
                            Each question has a strict time limit. If you miss one, the clock keeps ticking. Consistency is key to a high score.
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080C10',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 60,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Inter',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        fontFamily: 'Inter',
        letterSpacing: -1,
    },
    subTitle: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 12,
        marginBottom: 32,
        fontFamily: 'Inter',
        lineHeight: 22,
    },
    modeCard: {
        width: '100%',
        backgroundColor: '#11151A',
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 20,
        padding: 20,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    glowBackground: {
        position: 'absolute',
        top: -60,
        right: -60,
        width: 140,
        height: 140,
        borderRadius: 70,
        opacity: 0.05,
    },
    modeIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    modeIcon: {
        fontSize: 32,
    },
    modeInfo: {
        flex: 1,
    },
    modeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },
    modeName: {
        fontSize: 18,
        fontWeight: '900',
        fontFamily: 'Inter',
        letterSpacing: 1,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 9,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    tagline: {
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 16,
        fontFamily: 'Inter',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 8,
    },
    statPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 10,
        gap: 4,
    },
    statText: {
        color: '#9BA1A6',
        fontSize: 11,
        fontWeight: 'bold',
        fontFamily: 'Inter',
    },
    chevronContainer: {
        justifyContent: 'center',
        paddingLeft: 8,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        padding: 16,
        borderRadius: 16,
        marginTop: 10,
        gap: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.03)',
    },
    infoText: {
        flex: 1,
        color: '#6B7280',
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Inter',
    },
});
