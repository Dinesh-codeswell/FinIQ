import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { RadarChart } from './RadarChart';
import { ONBOARDING_CONFIG, SLIDE_DATA } from '@/src/constants/onboardingConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
    isVisible: boolean;
    scrollX: SharedValue<number>;
    index: number;
}

export const Slide2Weapon = ({ isVisible, scrollX, index }: Props) => {
    const data = SLIDE_DATA[1];
    const xpWidth = useSharedValue(0);

    React.useEffect(() => {
        if (isVisible) {
            xpWidth.value = withDelay(1100, withTiming(0.78, { duration: 800 }));
        }
    }, [isVisible]);

    const xpStyle = useAnimatedStyle(() => ({
        width: `${xpWidth.value * 100}%`,
    }));

    const parallaxStyle = useAnimatedStyle(() => {
        const inputValues = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];
        const translateX = interpolate(
            scrollX.value,
            inputValues,
            [-SCREEN_WIDTH * 0.15, 0, SCREEN_WIDTH * 0.15]
        );
        return { transform: [{ translateX }] };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.illustration, parallaxStyle]}>
                <RadarChart isVisible={isVisible} />

                <View style={styles.xpBarContainer}>
                    <View style={styles.xpTrack}>
                        <Animated.View style={[styles.xpFill, xpStyle]} />
                    </View>
                    <Text style={styles.xpLabel}>1,240 ELO · Gold Analyst</Text>
                </View>
            </Animated.View>

            <View style={styles.textZone}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subtitle}>{data.subtitle}</Text>
                <Text style={styles.tertiary}>{data.tertiary}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        flex: 1,
    },
    illustration: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    xpBarContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    xpTrack: {
        width: 200,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    xpFill: {
        height: '100%',
        backgroundColor: '#00D68F',
    },
    xpLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 8,
    },
    textZone: {
        paddingHorizontal: 24,
        paddingBottom: 200,
    },
    title: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 40,
        fontFamily: 'BarlowCondensed_700Bold',
        lineHeight: 44,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 40,
        fontFamily: 'BarlowCondensed_700Bold',
        lineHeight: 44,
    },
    tertiary: {
        color: '#00D68F',
        fontSize: 52,
        fontFamily: 'BarlowCondensed_800ExtraBold',
        lineHeight: 56,
        marginTop: 4,
    },
});
