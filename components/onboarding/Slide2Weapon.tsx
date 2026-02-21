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
import { FinSynthesizer } from './FinSynthesizer';
import { ONBOARDING_CONFIG, SLIDE_DATA } from '@/src/constants/onboardingConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
    isVisible: boolean;
    scrollX: SharedValue<number>;
    index: number;
}

export const Slide2Weapon = ({ isVisible, scrollX, index }: Props) => {
    const data = SLIDE_DATA[1];
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
                <FinSynthesizer isVisible={isVisible} />
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
        overflow: 'hidden',
    },
    illustration: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    textZone: {
        paddingHorizontal: 24,
        paddingBottom: 180,
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
