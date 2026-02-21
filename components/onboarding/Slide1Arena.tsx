import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    SharedValue,
    useSharedValue,
    withRepeat,
    withTiming,
    withSequence,
    withDelay,
    withSpring
} from 'react-native-reanimated';
import { DuelScene } from './DuelScene';
import { ONBOARDING_CONFIG, SLIDE_DATA } from '@/src/constants/onboardingConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
    isVisible: boolean;
    scrollX: SharedValue<number>;
    index: number;
}

export const Slide1Arena = ({ isVisible, scrollX, index }: Props) => {
    const data = SLIDE_DATA[0];


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
                <DuelScene isVisible={isVisible} />
            </Animated.View>

            <View style={styles.textZone}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subtitle}>{data.subtitle}</Text>
                <Text style={styles.tertiary}>{data.tertiary}</Text>
                {data.subLabel && <Text style={styles.subLabel}>{data.subLabel}</Text>}
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
        paddingHorizontal: 0,
        overflow: 'hidden',
    },
    textZone: {
        paddingHorizontal: 24,
        paddingBottom: 180,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 52,
        fontFamily: 'BarlowCondensed_800ExtraBold',
        lineHeight: 56,
    },
    subtitle: {
        color: '#00D68F',
        fontSize: 52,
        fontFamily: 'BarlowCondensed_800ExtraBold',
        lineHeight: 56,
    },
    tertiary: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 52,
        fontFamily: 'BarlowCondensed_800ExtraBold',
        lineHeight: 56,
    },
    subLabel: {
        color: 'rgba(255,255,255,0.35)',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1.2,
        marginTop: 8,
    },
    floating: {
        position: 'absolute',
    },
    floatingText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },
});
