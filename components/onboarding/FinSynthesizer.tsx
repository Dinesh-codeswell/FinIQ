import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    withSequence,
    withDelay,
    interpolate,
    Easing,
    useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { Rect, Defs, LinearGradient, Stop, G } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BAR_COUNT = 12;
const BAR_WIDTH = 12;
const BAR_GAP = 6;
const CONTAINER_WIDTH = (BAR_WIDTH + BAR_GAP) * BAR_COUNT;

interface Props {
    isVisible: boolean;
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const FinSynthesizer = ({ isVisible }: Props) => {
    const bars = Array.from({ length: BAR_COUNT }).map(() => useSharedValue(0.2));
    const scanLine = useSharedValue(-100);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (isVisible) {
            opacity.value = withTiming(1, { duration: 600 });

            bars.forEach((bar, i) => {
                bar.value = withDelay(i * 100, withRepeat(
                    withSequence(
                        withTiming(0.4 + Math.random() * 0.6, { duration: 800 + Math.random() * 400 }),
                        withTiming(0.2 + Math.random() * 0.3, { duration: 800 + Math.random() * 400 })
                    ),
                    -1,
                    true
                ));
            });

            scanLine.value = withRepeat(
                withTiming(CONTAINER_WIDTH, { duration: 3000, easing: Easing.linear }),
                -1,
                false
            );
        } else {
            opacity.value = 0;
            bars.forEach(bar => { bar.value = 0.2; });
            scanLine.value = -100;
        }
    }, [isVisible]);

    const containerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: interpolate(opacity.value, [0, 1], [0.9, 1]) }]
    }));

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <Svg width={CONTAINER_WIDTH} height={200} viewBox={`0 0 ${CONTAINER_WIDTH} 200`}>
                <Defs>
                    <LinearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0%" stopColor="#00D68F" stopOpacity="0.8" />
                        <Stop offset="100%" stopColor="#00D68F" stopOpacity="0.2" />
                    </LinearGradient>
                </Defs>

                {bars.map((bar, i) => {
                    const animatedProps = useAnimatedProps(() => {
                        const height = bar.value * 160;
                        return {
                            height: height,
                            y: 180 - height,
                        };
                    });

                    return (
                        <G key={i}>
                            {/* Background track */}
                            <Rect
                                x={i * (BAR_WIDTH + BAR_GAP)}
                                y={20}
                                width={BAR_WIDTH}
                                height={160}
                                fill="rgba(255,255,255,0.05)"
                                rx={BAR_WIDTH / 2}
                            />
                            {/* Animated bar */}
                            <AnimatedRect
                                x={i * (BAR_WIDTH + BAR_GAP)}
                                width={BAR_WIDTH}
                                fill="url(#barGrad)"
                                rx={BAR_WIDTH / 2}
                                animatedProps={animatedProps}
                            />
                        </G>
                    );
                })}
            </Svg>

            {/* Glossy Overlay */}
            <View style={styles.gloss} pointerEvents="none" />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: 'rgba(0, 214, 143, 0.05)',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: 'rgba(0, 214, 143, 0.1)',
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 40,
    },
    gloss: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 32,
    }
});
