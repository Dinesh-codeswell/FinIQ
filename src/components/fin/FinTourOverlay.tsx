import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    useAnimatedProps,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import Svg, { Defs, Mask, Rect, Circle } from 'react-native-svg';
import FinMascot from './FinMascot';
import { FIN_TOUR_STEPS } from '@/src/data/fin/tour';
import { useFinStore } from '@/src/store/finStore';
import { useTour } from '@/context/TourContext';
import Colors from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const SPRING_CONFIG = {
    damping: 15,
    stiffness: 100,
    mass: 1,
};

export default function FinTourOverlay() {
    const { tourCompleted, setTourCompleted } = useFinStore();
    const { elements, isTourVisible, setTourVisible, scrollToElement } = useTour();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // Spotlight shared values
    const spotlightX = useSharedValue(SCREEN_WIDTH / 2);
    const spotlightY = useSharedValue(SCREEN_HEIGHT / 2);
    const spotlightW = useSharedValue(0);
    const spotlightH = useSharedValue(0);
    const spotlightR = useSharedValue(0);

    if (tourCompleted) return null;

    const step = FIN_TOUR_STEPS[currentStepIndex];
    const isLast = currentStepIndex === FIN_TOUR_STEPS.length - 1;

    useEffect(() => {
        if (isTourVisible && step) {
            updateSpotlight();
        }
    }, [isTourVisible, currentStepIndex, elements]);

    const updateSpotlight = () => {
        const layout = elements[step.target_element];
        if (layout) {
            // Trigger auto-scroll
            scrollToElement(step.target_element);

            // Animate spotlight to target
            spotlightX.value = withSpring(layout.pageX - 10, SPRING_CONFIG);
            spotlightY.value = withSpring(layout.pageY - 10, SPRING_CONFIG);
            spotlightW.value = withSpring(layout.width + 20, SPRING_CONFIG);
            spotlightH.value = withSpring(layout.height + 20, SPRING_CONFIG);
            spotlightR.value = withSpring(12, SPRING_CONFIG);
        } else {
            // Default center if element not found yet
            spotlightX.value = withSpring(SCREEN_WIDTH / 2 - 50, SPRING_CONFIG);
            spotlightY.value = withSpring(SCREEN_HEIGHT / 2 - 50, SPRING_CONFIG);
            spotlightW.value = withSpring(100, SPRING_CONFIG);
            spotlightH.value = withSpring(100, SPRING_CONFIG);
            spotlightR.value = withSpring(50, SPRING_CONFIG);
        }
    };

    const handleNext = () => {
        if (isLast) {
            setTourCompleted(true);
            setTourVisible(false);
        } else {
            setCurrentStepIndex((prev) => prev + 1);
        }
    };

    const handleSkip = () => {
        setTourCompleted(true);
        setTourVisible(false);
    };

    const animatedProps = useAnimatedProps(() => ({
        x: spotlightX.value,
        y: spotlightY.value,
        width: spotlightW.value,
        height: spotlightH.value,
        rx: spotlightR.value,
    }));

    const messageBoxStyle = useAnimatedStyle(() => {
        const targetY = spotlightY.value;
        const targetH = spotlightH.value;

        // Position message box below spotlight if spotlight is in top half, else above
        const isLow = targetY > SCREEN_HEIGHT / 2;
        const boxY = isLow ? targetY - 220 : targetY + targetH + 20;

        return {
            top: withSpring(boxY, SPRING_CONFIG),
            opacity: withTiming(elements[step.target_element] ? 1 : 0),
            transform: [{ scale: withSpring(elements[step.target_element] ? 1 : 0.9) }]
        };
    });

    if (!step) return null;

    return (
        <Modal transparent animationType="none" visible={isTourVisible}>
            <Animated.View
                entering={FadeIn.duration(400)}
                exiting={FadeOut.duration(300)}
                style={styles.container}
            >
                {/* SVG Spotlight Mask */}
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                    <Defs>
                        <Mask id="mask" x="0" y="0" height="100%" width="100%">
                            <Rect height="100%" width="100%" fill="white" />
                            <AnimatedRect
                                animatedProps={animatedProps}
                                fill="black"
                            />
                        </Mask>
                    </Defs>
                    <Rect
                        height="100%"
                        width="100%"
                        fill="rgba(0,0,0,0.85)"
                        mask="url(#mask)"
                    />
                </Svg>

                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipText}>Skip tour</Text>
                </TouchableOpacity>

                <Animated.View style={[styles.messageBox, messageBoxStyle]}>
                    <View style={styles.headerRow}>
                        <View style={styles.mascotWrapper}>
                            <FinMascot expression={step.expression} size="medium" />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{step.title}</Text>
                            <View style={styles.progressBadge}>
                                <Text style={styles.progressText}>{currentStepIndex + 1}/{FIN_TOUR_STEPS.length}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.message}>{step.message}</Text>

                    <View style={styles.footerRow}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleNext} activeOpacity={0.85}>
                            <Text style={styles.actionLabel}>{step.action_label}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dotsRow}>
                        {FIN_TOUR_STEPS.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    i === currentStepIndex && styles.activeDot,
                                    i < currentStepIndex && styles.completedDot
                                ]}
                            />
                        ))}
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: 24,
        zIndex: 10,
    },
    skipText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 13,
        fontWeight: TYPOGRAPHY.weights.medium as any,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    messageBox: {
        position: 'absolute',
        left: 20,
        right: 20,
        backgroundColor: '#1A1A1A',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    mascotWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#262626',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#444',
    },
    titleContainer: {
        flex: 1,
        marginLeft: 16,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: TYPOGRAPHY.weights.bold as any,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    progressBadge: {
        backgroundColor: '#262626',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    progressText: {
        color: '#00D68F',
        fontSize: 10,
        fontWeight: TYPOGRAPHY.weights.bold as any,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    message: {
        color: '#D1D5DB',
        fontSize: 14,
        lineHeight: 22,
        fontFamily: TYPOGRAPHY.fontFamily,
        marginBottom: 20,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    actionButton: {
        backgroundColor: '#00D68F',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 14,
    },
    actionLabel: {
        color: '#000000',
        fontSize: 15,
        fontWeight: TYPOGRAPHY.weights.extraBold as any,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    dotsRow: {
        flexDirection: 'row',
        gap: 6,
        marginTop: 16,
        justifyContent: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#333',
    },
    activeDot: {
        backgroundColor: '#00D68F',
        width: 16,
    },
    completedDot: {
        backgroundColor: 'rgba(0,214,143,0.3)',
    }
});
