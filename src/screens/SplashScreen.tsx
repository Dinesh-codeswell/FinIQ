import React, { useEffect, useMemo } from 'react';
import { View, Text, Dimensions, StyleSheet, StatusBar } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withSequence,
    withDelay,
    withRepeat,
    runOnJS,
    Easing,
    interpolate,
    useAnimatedProps,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect, Defs, RadialGradient, Stop } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { supabase } from '@/src/services/supabase';
import { userService } from '@/src/services/userService';
import Colors from '@/constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);

// --- Sub-components ---

const ScanLine = ({ y }: { y: SharedValue<number> }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: y.value }],
        opacity: interpolate(y.value, [-1, 0, SCREEN_HEIGHT, SCREEN_HEIGHT + 1], [0, 1, 1, 0]),
    }));

    return (
        <Animated.View style={[styles.scanLine, animatedStyle]}>
            <LinearGradient
                colors={['transparent', 'rgba(0, 214, 143, 0.8)', 'transparent']}
                start={[0, 0]}
                end={[1, 0]}
                style={{ flex: 1 }}
            />
        </Animated.View>
    );
};

const FiniqIcon = ({ glowScale, opacity, translateY }: {
    glowScale: SharedValue<number>,
    opacity: SharedValue<number>,
    translateY: SharedValue<number>
}) => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateY: translateY.value },
            { scale: interpolate(glowScale.value, [1, 1.4, 1], [1, 1.05, 1]) }
        ],
        shadowOpacity: interpolate(glowScale.value, [1, 1.4, 1], [0.12, 0.4, 0.12]),
        shadowRadius: interpolate(glowScale.value, [1, 1.4, 1], [20, 60, 20]),
    }));

    return (
        <Animated.View style={[styles.iconBox, animatedStyle]}>
            <LinearGradient
                colors={['#0D2018', '#081610']}
                style={StyleSheet.absoluteFill}
            />
            <Svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <Path
                    d="M10 35L20 25L28 30L42 12M42 12H32M42 12V22"
                    stroke="#00D68F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </Animated.View>
    );
};

const Wordmark = ({ progress }: { progress: SharedValue<number> }) => {
    const letters = ['F', 'I', 'N', 'I', 'Q'];

    return (
        <View style={styles.wordmarkRow}>
            {letters.map((letter, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                    const threshold = index / letters.length;
                    const letterProgress = interpolate(
                        progress.value,
                        [threshold, Math.min(threshold + 0.25, 1)],
                        [0, 1],
                        'clamp'
                    );
                    return {
                        opacity: letterProgress,
                        transform: [{ translateY: interpolate(letterProgress, [0, 1], [10, 0]) }]
                    };
                });

                return (
                    <Animated.Text key={index} style={[styles.wordmarkLetter, animatedStyle]}>
                        {letter}
                    </Animated.Text>
                );
            })}
        </View>
    );
};

const ChartLine = ({ progress }: { progress: SharedValue<number> }) => {
    const pathD = "M 0 18 L 12 14 L 24 16 L 36 10 L 48 12 L 60 6 L 72 8 L 80 2";
    const pathLength = 100;

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: interpolate(progress.value, [0, 1], [pathLength, 0])
    }));

    return (
        <View style={styles.chartContainer}>
            <Svg width="80" height="24" viewBox="0 0 80 24">
                <AnimatedPath
                    d={pathD}
                    stroke="#00D68F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    strokeDasharray={pathLength}
                    animatedProps={animatedProps}
                />
            </Svg>
            <Text style={styles.loadingText}>MARKET OPENING...</Text>
        </View>
    );
};

const AmbientElement = ({ item, opacity, driftValues }: {
    item: any,
    opacity: SharedValue<number>,
    driftValues: { x: SharedValue<number>, y: SharedValue<number> }
}) => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value * (item.opacity || 1),
        transform: [
            { translateX: driftValues.x.value },
            { translateY: driftValues.y.value }
        ]
    }));

    return (
        <Animated.View style={[styles.ambientItem, item.position, animatedStyle]}>
            <Text style={[styles.ambientText, { color: item.color || 'rgba(255,255,255,0.4)', fontSize: item.fontSize || 14 }]}>
                {item.text}
            </Text>
        </Animated.View>
    );
};

// --- Main Screen ---

export default function SplashScreen() {
    const router = useRouter();

    // Animation values
    const scanLineY = useSharedValue(-20);
    const gridOpacity = useSharedValue(0);
    const glowOpacity = useSharedValue(0);
    const iconTranslateY = useSharedValue(-80);
    const iconOpacity = useSharedValue(0);
    const glowScale = useSharedValue(1);
    const wordmarkProgress = useSharedValue(0);
    const taglineOpacity = useSharedValue(0);
    const taglineTranslateY = useSharedValue(5);
    const ambientOpacity = useSharedValue(0);
    const chartProgress = useSharedValue(0);
    const screenOpacity = useSharedValue(1);

    const driftValues = useMemo(() => Array(5).fill(0).map(() => ({
        x: useSharedValue(0),
        y: useSharedValue(0),
    })), []);

    const ambientItems = [
        { text: '+2.4%', position: { top: '18%', left: '12%' }, opacity: 0.18, color: '#00D68F' },
        { text: '+12.6%', position: { top: '72%', right: '8%' }, opacity: 0.15, color: '#00D68F' },
        { text: '-0.8%', position: { top: '32%', right: '14%' }, opacity: 0.12, color: '#FF4757' },
        { text: '₹', position: { top: '65%', left: '10%' }, opacity: 0.08, fontSize: 22 },
        { text: '1,240', position: { top: '80%', left: '18%' }, opacity: 0.07 },
    ];

    const triggerHaptic = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const handleFinish = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                // Check if onboarding is completed in the database
                const { data: profile } = await userService.getProfile(session.user.id);
                if (profile?.onboardingCompleted) {
                    router.replace('/(tabs)' as any);
                } else {
                    router.replace('/onboarding' as any);
                }
            } else {
                router.replace('/welcome' as any);
            }
        } catch (error) {
            router.replace('/welcome' as any);
        }
    };

    useEffect(() => {
        // 1. Grid & Scan (T+100)
        gridOpacity.value = withDelay(100, withTiming(1, { duration: 500 }));
        scanLineY.value = withDelay(100, withTiming(SCREEN_HEIGHT, {
            duration: 600,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }));

        // 2. Glow (T+300)
        glowOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));

        // 3. Icon Drop (T+550)
        iconOpacity.value = withDelay(550, withTiming(1, { duration: 200 }));
        iconTranslateY.value = withDelay(550, withSpring(0, {
            damping: 12,
            stiffness: 120,
            mass: 0.8
        }));

        // 4. Haptic (T+680 approx)
        setTimeout(() => { runOnJS(triggerHaptic)(); }, 680);

        // 5. Pulse (T+700)
        glowScale.value = withDelay(700, withSequence(
            withTiming(1.4, { duration: 200 }),
            withTiming(1, { duration: 300 })
        ));

        // 6. Wordmark (T+850)
        wordmarkProgress.value = withDelay(850, withTiming(1, { duration: 600 }));

        // 7. Tagline (T+1050)
        taglineOpacity.value = withDelay(1050, withTiming(0.4, { duration: 400 }));
        taglineTranslateY.value = withDelay(1050, withTiming(0, { duration: 400 }));

        // 8. Ambient (T+1200)
        ambientOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));

        // Start drift
        const driftConfigs = [
            { amp: -12, hor: 5, dur: 10000 },
            { amp: 10, hor: -8, dur: 12000 },
            { amp: -8, hor: 3, dur: 9000 },
            { amp: 14, hor: -4, dur: 11000 },
            { amp: -10, hor: 6, dur: 10000 },
        ];
        driftConfigs.forEach((cfg, i) => {
            driftValues[i].y.value = withRepeat(
                withSequence(
                    withTiming(cfg.amp, { duration: cfg.dur, easing: Easing.inOut(Easing.sin) }),
                    withTiming(0, { duration: cfg.dur, easing: Easing.inOut(Easing.sin) })
                ), -1, true
            );
            driftValues[i].x.value = withRepeat(
                withSequence(
                    withTiming(cfg.hor, { duration: cfg.dur * 1.2, easing: Easing.inOut(Easing.sin) }),
                    withTiming(0, { duration: cfg.dur * 1.2, easing: Easing.inOut(Easing.sin) })
                ), -1, true
            );
        });

        // 9. Chart (T+1400)
        chartProgress.value = withDelay(1400, withTiming(1, { duration: 1000 }));

        // 10. Exit (T+2800)
        setTimeout(() => {
            screenOpacity.value = withTiming(0, { duration: 400 }, (finished) => {
                if (finished) {
                    runOnJS(handleFinish)();
                }
            });
        }, 2800);

    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
            <StatusBar hidden />

            {/* Background Decor */}
            <Animated.View style={[styles.gridBackground, { opacity: gridOpacity }]}>
                {/* Render a simple CSS-like grid using Views */}
                <View style={styles.gridContainer}>
                    {Array(Math.ceil(SCREEN_HEIGHT / 52)).fill(0).map((_, i) => (
                        <View key={`h-${i}`} style={[styles.gridLineH, { top: i * 52 }]} />
                    ))}
                    {Array(Math.ceil(SCREEN_WIDTH / 52)).fill(0).map((_, i) => (
                        <View key={`v-${i}`} style={[styles.gridLineV, { left: i * 52 }]} />
                    ))}
                </View>
            </Animated.View>

            <Animated.View style={[styles.gradientOverlay, { opacity: glowOpacity }]}>
                <Svg height={SCREEN_HEIGHT} width={SCREEN_WIDTH}>
                    <Defs>
                        <RadialGradient id="grad" cx="50%" cy="48%" rx="55%" ry="40%" fx="50%" fy="48%">
                            <Stop offset="0%" stopColor="#00D68F" stopOpacity="0.08" />
                            <Stop offset="70%" stopColor="#00D68F" stopOpacity="0" />
                        </RadialGradient>
                    </Defs>
                    <Rect x="0" y="0" width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill="url(#grad)" />
                </Svg>
            </Animated.View>

            <ScanLine y={scanLineY} />

            {/* Floating Elements */}
            {ambientItems.map((item, i) => (
                <AmbientElement
                    key={i}
                    item={item}
                    opacity={ambientOpacity}
                    driftValues={driftValues[i]}
                />
            ))}

            {/* Center Group */}
            <View style={styles.centerGroup}>
                <FiniqIcon
                    glowScale={glowScale}
                    opacity={iconOpacity}
                    translateY={iconTranslateY}
                />

                <Wordmark progress={wordmarkProgress} />

                <Animated.Text style={[
                    styles.tagline,
                    {
                        opacity: taglineOpacity,
                        transform: [{ translateY: taglineTranslateY }]
                    }
                ]}>
                    Your Money Mind, Sharpened.
                </Animated.Text>
            </View>

            {/* Bottom Indicator */}
            <View style={styles.footer}>
                <ChartLine progress={chartProgress} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#060A0D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    gridContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    gridLineH: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(0, 214, 143, 0.035)',
    },
    gridLineV: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: 'rgba(0, 214, 143, 0.035)',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    scanLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        zIndex: 10,
    },
    centerGroup: {
        alignItems: 'center',
        marginTop: -40,
    },
    iconBox: {
        width: 96,
        height: 96,
        borderRadius: 24,
        backgroundColor: '#081610',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 0 },
        elevation: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0, 214, 143, 0.15)',
    },
    wordmarkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    wordmarkLetter: {
        fontSize: 48,
        fontFamily: 'BarlowCondensed_800ExtraBold',
        color: '#FFFFFF',
        letterSpacing: 6,
    },
    tagline: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: 0.5,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        alignItems: 'center',
    },
    chartContainer: {
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 10,
        color: 'rgba(0, 214, 143, 0.5)',
        marginTop: 8,
        letterSpacing: 2,
        fontWeight: '600',
    },
    ambientItem: {
        position: 'absolute',
    },
    ambientText: {
        fontWeight: '600',
    },
});
