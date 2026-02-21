import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    useSharedValue,
    useAnimatedStyle,
    useAnimatedProps,
    withTiming,
    withRepeat,
    withSequence,
    withDelay,
    interpolate,
    withSpring,
    Easing,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { Check, Shield, Zap, TrendingUp, Globe, Target } from 'lucide-react-native';
import Svg, { Path, Circle, Line, G, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface PrefLoadingTransitionProps {
    onComplete: () => void;
    topics: string[];
}

const LOADING_STEPS = [
    "Building your analyst profile...",
    "Calibrating your starting ELO...",
    "Mapping your interest graph...",
    "Setting up your first arena...",
    "Ready for the fight."
];

const AnimatedDot = ({ point, index }: { point: SharedValue<number>, index: number }) => {
    const dotProps = useAnimatedProps(() => {
        const angle = (index * 60 * Math.PI) / 180;
        const r = point.value * 100;
        return {
            cx: 120 + r * Math.cos(angle),
            cy: 120 + r * Math.sin(angle)
        };
    });

    return (
        <AnimatedCircle
            r="3"
            fill="#00D68F"
            animatedProps={dotProps}
        />
    );
};

export const PrefLoadingTransition: React.FC<PrefLoadingTransitionProps> = ({ onComplete, topics }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const contentOpacity = useSharedValue(0);
    const radarScale = useSharedValue(0.8);
    const radarRotate = useSharedValue(0);
    const scanLinePosition = useSharedValue(-100);
    const checkScale = useSharedValue(0);

    // Data points for the holographic radar - Declared individually to follow hook rules
    const p1 = useSharedValue(0.1);
    const p2 = useSharedValue(0.1);
    const p3 = useSharedValue(0.1);
    const p4 = useSharedValue(0.1);
    const p5 = useSharedValue(0.1);
    const p6 = useSharedValue(0.1);
    const dataPoints = [p1, p2, p3, p4, p5, p6];

    useEffect(() => {
        const timers: any[] = [];

        // Entrance
        contentOpacity.value = withTiming(1, { duration: 800 });
        radarScale.value = withSpring(1, { damping: 15 });
        radarRotate.value = withRepeat(withTiming(360, { duration: 40000, easing: Easing.linear }), -1);

        // Scan line effect
        scanLinePosition.value = withRepeat(
            withTiming(SCREEN_HEIGHT + 100, { duration: 3000, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
            -1
        );

        // Animate data points progressively
        dataPoints.forEach((point, i) => {
            const t = setTimeout(() => {
                point.value = withSpring(0.4 + Math.random() * 0.5, { damping: 12 });
            }, 500 + i * 400);
            timers.push(t);
        });

        // Step timer
        const interval = setInterval(() => {
            setStepIndex(prev => {
                if (prev < LOADING_STEPS.length - 1) return prev + 1;
                return prev;
            });
        }, 1100);

        // Final completion logic
        const finalTimer = setTimeout(() => {
            checkScale.value = withSpring(1, { damping: 12 });
            const completeTimer = setTimeout(onComplete, 1200);
            timers.push(completeTimer);
        }, 5500);
        timers.push(finalTimer);

        return () => {
            clearInterval(interval);
            timers.forEach(t => clearTimeout(t));
        };
    }, []);

    const containerStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
    }));

    const radarContainerStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: radarScale.value },
            { rotate: `${radarRotate.value}deg` }
        ],
    }));

    const scanLineStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scanLinePosition.value }],
    }));

    const checkContainerStyle = useAnimatedStyle(() => ({
        transform: [{ scale: checkScale.value }],
        opacity: checkScale.value,
    }));

    // Data Area extracted to maintain stable references
    const dataAreaProps = useAnimatedProps(() => {
        const radius = 100;
        const center = 120;
        const points = [p1.value, p2.value, p3.value, p4.value, p5.value, p6.value].map((v, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const r = v * radius;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
        });
        return {
            d: `M ${points.join(' L ')} Z`
        };
    });

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[styles.container, containerStyle]}
        >
            {/* Holographic Scan Line */}
            <Animated.View style={[styles.scanLine, scanLineStyle]} />

            <View style={styles.center}>
                <View style={styles.radarWrapper}>
                    <Animated.View style={[styles.radarContainer, radarContainerStyle]}>
                        <Svg width="240" height="240" viewBox="0 0 240 240">
                            <Defs>
                                <SvgGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <Stop offset="0%" stopColor="#00D68F" stopOpacity="0.4" />
                                    <Stop offset="100%" stopColor="#00D68F" stopOpacity="0.1" />
                                </SvgGradient>
                            </Defs>

                            {/* Grid Circles */}
                            {[40, 70, 100].map((r, i) => (
                                <Circle
                                    key={i}
                                    cx="120"
                                    cy="120"
                                    r={r}
                                    stroke="#00D68F"
                                    strokeWidth="0.5"
                                    fill="none"
                                    opacity={0.15 - i * 0.03}
                                />
                            ))}

                            {/* Hexagon Grid */}
                            {[1, 0.7, 0.4].map((scale, idx) => {
                                const radius = 100 * scale;
                                const points = Array.from({ length: 6 }).map((_, i) => {
                                    const angle = (i * 60 * Math.PI) / 180;
                                    return `${120 + radius * Math.cos(angle)},${120 + radius * Math.sin(angle)}`;
                                }).join(' ');
                                return (
                                    <Path
                                        key={`hex-${idx}`}
                                        d={`M ${Array.from({ length: 6 }).map((_, i) => {
                                            const angle = (i * 60 * Math.PI) / 180;
                                            return `${120 + radius * Math.cos(angle)} ${120 + radius * Math.sin(angle)}`;
                                        }).join(' L ')} Z`}
                                        stroke="#00D68F"
                                        strokeWidth="0.5"
                                        fill="none"
                                        opacity={0.1}
                                    />
                                );
                            })}

                            {/* Axis Lines */}
                            {Array.from({ length: 6 }).map((_, i) => {
                                const angle = (i * 60 * Math.PI) / 180;
                                return (
                                    <Line
                                        key={i}
                                        x1="120"
                                        y1="120"
                                        x2={120 + 100 * Math.cos(angle)}
                                        y2={120 + 100 * Math.sin(angle)}
                                        stroke="#00D68F"
                                        strokeWidth="0.5"
                                        opacity={0.1}
                                    />
                                );
                            })}

                            {/* Data Area - The actual "Hologram" */}
                            <AnimatedPath
                                animatedProps={dataAreaProps}
                                fill="url(#grad)"
                                stroke="#00D68F"
                                strokeWidth="2"
                                opacity={0.6}
                            />

                            {/* Data Point Blobs */}
                            {dataPoints.map((p, i) => (
                                <AnimatedDot key={i} point={p} index={i} />
                            ))}
                        </Svg>

                        {/* Outer rotating markers */}
                        <View style={styles.markersContainer}>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.marker,
                                        { transform: [{ rotate: `${i * 30}deg` }, { translateY: -115 }] }
                                    ]}
                                />
                            ))}
                        </View>
                    </Animated.View>

                    {/* Non-rotating central artifacts */}
                    <View style={styles.staticCenter}>
                        <PulseRing delay={0} size={140} />
                        <PulseRing delay={800} size={140} />

                        {stepIndex === (LOADING_STEPS?.length || 5) - 1 && (
                            <Animated.View style={[styles.checkContainer, checkContainerStyle]}>
                                <Check size={40} color="#00D68F" />
                            </Animated.View>
                        )}
                    </View>
                </View>

                {/* Status UI */}
                <View style={styles.statusBox}>
                    <View style={styles.glitchContainer}>
                        <Text style={styles.loadingText}>{(LOADING_STEPS || [])[stepIndex] || "LOADING..."}</Text>
                        <View style={styles.progressBar}>
                            <Animated.View
                                style={[
                                    styles.progressFill,
                                    { width: `${((stepIndex + 1) / (LOADING_STEPS?.length || 1)) * 100}%` }
                                ]}
                            />
                        </View>
                    </View>

                    <View style={styles.dataGrid}>
                        <DataBit label="SYNC" value="ACTIVE" color="#00D68F" />
                        <View style={styles.dataDivider} />
                        <DataBit label="NODE" value="FIN-IQ-01" color="rgba(255,255,255,0.4)" />
                        <View style={styles.dataDivider} />
                        <DataBit label="ELO" value="INITIALIZING" color="#F5A623" />
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};

const DataBit = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <View style={styles.dataBit}>
        <Text style={styles.bitLabel}>{label}</Text>
        <Text style={[styles.bitValue, { color }]}>{value}</Text>
    </View>
);

const PulseRing = ({ delay, size }: { delay: number, size: number }) => {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0.4);

    useEffect(() => {
        scale.value = withDelay(delay, withRepeat(withTiming(1.6, { duration: 2500, easing: Easing.out(Easing.quad) }), -1));
        opacity.value = withDelay(delay, withRepeat(withTiming(0, { duration: 2500, easing: Easing.out(Easing.quad) }), -1));
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
        width: size,
        height: size,
        borderRadius: size / 2,
    }));

    return <Animated.View style={[styles.pulseRing, style]} />;
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#05080A',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    scanLine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'rgba(0, 214, 143, 0.3)',
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        zIndex: 1,
    },
    center: {
        alignItems: 'center',
        width: '100%',
    },
    radarWrapper: {
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    radarContainer: {
        width: 240,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },
    staticCenter: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pulseRing: {
        position: 'absolute',
        borderWidth: 1.5,
        borderColor: '#00D68F',
    },
    markersContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        position: 'absolute',
        width: 1,
        height: 6,
        backgroundColor: '#00D68F',
        opacity: 0.4,
    },
    checkContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 214, 143, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#00D68F',
        zIndex: 10,
    },
    statusBox: {
        width: '80%',
        alignItems: 'center',
    },
    glitchContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 12,
        opacity: 0.9,
    },
    progressBar: {
        width: '60%',
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#00D68F',
        borderRadius: 2,
    },
    dataGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    dataBit: {
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    bitLabel: {
        fontSize: 8,
        color: 'rgba(255, 255, 255, 0.3)',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    bitValue: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    dataDivider: {
        width: 1,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});

