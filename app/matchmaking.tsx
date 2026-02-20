import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { getRandomBot } from '@/mocks/data';
import UserAvatar from '@/src/components/UserAvatar';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function MatchmakingScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ topic?: string; mode?: string }>();
    const { profile, division } = useGame();
    const [opponent, setOpponent] = useState<ReturnType<typeof getRandomBot> | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const playerSlide = useRef(new Animated.Value(-100)).current;
    const rivalSlide = useRef(new Animated.Value(100)).current;
    const vsScale = useRef(new Animated.Value(0)).current;
    const metadataFade = useRef(new Animated.Value(0)).current;
    const countdownProgress = useRef(new Animated.Value(0)).current;
    const bgPulse = useRef(new Animated.Value(0)).current;

    // Particles
    const particles = useRef(Array.from({ length: 8 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        offset: new Animated.Value(0),
        duration: 8000 + Math.random() * 7000,
    }))).current;

    useEffect(() => {
        // Particles animation
        particles.forEach(p => {
            Animated.loop(
                Animated.timing(p.offset, {
                    toValue: -200,
                    duration: p.duration,
                    useNativeDriver: true,
                })
            ).start();
        });

        // Background pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(bgPulse, { toValue: 1, duration: 2000, useNativeDriver: true }),
                Animated.timing(bgPulse, { toValue: 0, duration: 2000, useNativeDriver: true }),
            ])
        ).start();

        // Reveal sequence
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();

        Animated.spring(playerSlide, {
            toValue: 0,
            friction: 7,
            tension: 50,
            useNativeDriver: true,
        }).start();

        const findTimer = setTimeout(() => {
            const bot = getRandomBot(profile.rating);
            setOpponent(bot);

            if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }

            Animated.parallel([
                Animated.spring(vsScale, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
                Animated.spring(rivalSlide, {
                    toValue: 0,
                    friction: 7,
                    tension: 50,
                    delay: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(metadataFade, { toValue: 1, duration: 400, delay: 600, useNativeDriver: true }),
            ]).start();

            setTimeout(() => setCountdown(3), 1000);
        }, 2000);

        return () => clearTimeout(findTimer);
    }, []);

    useEffect(() => {
        if (countdown === null) return;

        // Reset and start countdown progress animation
        countdownProgress.setValue(0);
        Animated.timing(countdownProgress, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false, // For strokeDashoffset
        }).start();

        if (countdown === 0) {
            if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }
            router.replace({
                pathname: '/duel' as any,
                params: {
                    opponentName: opponent?.username || 'Bot',
                    opponentAvatar: opponent?.avatar || 'fox',
                    opponentRating: String(opponent?.rating || 1000),
                    topic: params.topic || 'investing',
                    mode: params.mode || 'sprint'
                },
            });
            return;
        }

        if (Platform.OS !== 'web' && countdown > 0) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = countdownProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, circumference],
    });

    return (
        <View style={styles.container}>
            {/* Layer 2: Grid Texture */}
            <View style={styles.gridTexture} pointerEvents="none" />

            {/* Layer 3: Radial Glow */}
            <Animated.View style={[styles.radialGlow, { opacity: bgPulse.interpolate({ inputRange: [0, 1], outputRange: [0.03, 0.08] }) }]} pointerEvents="none" />

            {/* Layer 4: Particles */}
            {particles.map((p, i) => (
                <Animated.View
                    key={i}
                    style={[
                        styles.particle,
                        {
                            left: p.x,
                            top: p.y,
                            transform: [{ translateY: p.offset }],
                            opacity: p.offset.interpolate({ inputRange: [-200, 0], outputRange: [0, 0.2] })
                        }
                    ]}
                />
            ))}

            <SafeAreaView style={styles.safeArea}>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>

                    {/* ZONE 1 - TOP STATUS */}
                    <View style={styles.topStatus}>
                        <Text style={styles.rankLabel}>RANKED MATCH</Text>
                        <Text style={styles.searchingText}>
                            {opponent ? 'OPPONENT FOUND' : 'FINDING OPPONENT...'}
                        </Text>
                    </View>

                    {/* ZONE 2 - PLAYER REVEAL ARENA */}
                    <View style={styles.revealArena}>
                        {/* LEFT: YOU */}
                        <Animated.View style={[styles.playerCard, { transform: [{ translateX: playerSlide }] }]}>
                            <View style={[styles.avatarRing, { borderColor: '#00D68F' }]}>
                                <UserAvatar size={80} animalEmoji={profile.avatar} frameId={profile.selectedAvatarFrame as any} isPro={profile.isPro} showProBadge={false} />
                            </View>
                            <Text style={styles.username}>@{profile.username}</Text>
                            <Text style={[styles.rating, { color: '#00D68F' }]}>{profile.rating}</Text>
                            <Text style={styles.cardRoleLabel}>YOU</Text>
                        </Animated.View>

                        {/* CENTER: VS / COUNTDOWN */}
                        <View style={styles.centerVS}>
                            <Animated.View style={[styles.vsWrap, { transform: [{ scale: vsScale }] }]}>
                                {countdown !== null ? (
                                    <View style={styles.countdownContainer}>
                                        <Svg width="56" height="56" style={styles.countdownSvg}>
                                            <Circle
                                                cx="28"
                                                cy="28"
                                                r={radius}
                                                stroke="#1A1A1A"
                                                strokeWidth="3"
                                                fill="transparent"
                                            />
                                            <AnimatedCircle
                                                cx="28"
                                                cy="28"
                                                r={radius}
                                                stroke="#00D68F"
                                                strokeWidth="3"
                                                fill="transparent"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={strokeDashoffset}
                                                strokeLinecap="round"
                                            />
                                        </Svg>
                                        <Text style={styles.countdownNumber}>{countdown === 0 ? 'GO!' : countdown}</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.vsText}>VS</Text>
                                )}
                            </Animated.View>
                        </View>

                        {/* RIGHT: RIVAL */}
                        <Animated.View style={[styles.playerCard, { transform: [{ translateX: rivalSlide }] }]}>
                            {opponent ? (
                                <>
                                    <View style={[styles.avatarRing, { borderColor: '#FF4757' }]}>
                                        <UserAvatar size={80} animalEmoji={opponent.avatar} frameId="none" isPro={false} showProBadge={false} />
                                    </View>
                                    <Text style={styles.username}>@{opponent.username}</Text>
                                    <Text style={[styles.rating, { color: '#FF4757' }]}>{opponent.rating}</Text>
                                    <Text style={[styles.cardRoleLabel, { color: '#FF4757' }]}>RIVAL</Text>
                                </>
                            ) : (
                                <View style={styles.searchingPlaceholder}>
                                    <View style={styles.skeletonRing} />
                                    <Text style={styles.searchingDots}>...</Text>
                                </View>
                            )}
                        </Animated.View>
                    </View>

                    {/* ZONE 3 - MATCH METADATA */}
                    <Animated.View style={[styles.metadataContainer, { opacity: metadataFade, transform: [{ translateY: metadataFade.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
                        <View style={styles.paramPill}><Text style={styles.pillText}>📊 20 Questions</Text></View>
                        <View style={styles.separator} />
                        <View style={styles.paramPill}><Text style={styles.pillText}>⚡ Sprint Mode</Text></View>
                        <View style={styles.separator} />
                        <View style={styles.paramPill}><Text style={styles.pillText}>🏆 Ranked</Text></View>
                    </Animated.View>

                    {/* ZONE 4 - ACTION */}
                    <View style={styles.actionZone}>
                        {countdown !== null ? (
                            <Text style={styles.getReadyText}>GET READY...</Text>
                        ) : (
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                                <Text style={styles.cancelText}>CANCEL</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                </Animated.View>
            </SafeAreaView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080C10',
    },
    gridTexture: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.04,
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(rgba(0, 214, 143, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 214, 143, 0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
    } as any, // Background image properties aren't in RN StyleSheet but often handled by specific web drivers or view wrappers. For native we use a fallback if needed.
    radialGlow: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00D68F',
        borderRadius: width,
        transform: [{ scale: 2 }],
    },
    particle: {
        position: 'absolute',
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#00D68F',
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    topStatus: {
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    rankLabel: {
        fontSize: 10,
        color: '#5A5A5A',
        letterSpacing: 3,
        fontWeight: 'bold',
    },
    searchingText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 4,
        fontWeight: 'bold',
    },
    revealArena: {
        height: '55%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerCard: {
        flex: 3.5,
        alignItems: 'center',
    },
    centerVS: {
        flex: 3,
        alignItems: 'center',
    },
    avatarRing: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: 3,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 12,
    },
    rating: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 2,
    },
    cardRoleLabel: {
        fontSize: 10,
        color: '#5A5A5A',
        letterSpacing: 1,
        marginTop: 4,
        fontWeight: 'bold',
    },
    vsWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    vsText: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFFFFF',
        fontStyle: 'italic',
    },
    countdownContainer: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countdownNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        position: 'absolute',
    },
    countdownSvg: {
        transform: [{ rotate: '-90deg' }],
    },
    searchingPlaceholder: {
        alignItems: 'center',
    },
    skeletonRing: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: 2,
        borderColor: '#1A1A1A',
        borderStyle: 'dashed',
    },
    searchingDots: {
        color: '#5A5A5A',
        fontSize: 24,
        marginTop: 12,
    },
    metadataContainer: {
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paramPill: {
        backgroundColor: '#1A1A1A',
        borderColor: '#2E2E2E',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    pillText: {
        fontSize: 12,
        color: '#9A9A9A',
        fontWeight: '600',
    },
    separator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#2E2E2E',
        marginHorizontal: 8,
    },
    actionZone: {
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelBtn: {
        width: 200,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#3A3A3A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelText: {
        color: '#5A5A5A',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    getReadyText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});
