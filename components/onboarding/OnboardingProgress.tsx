import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { ONBOARDING_CONFIG } from '@/src/constants/onboardingConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MARGIN_TOP = 8;
const HEIGHT = 3;
const GAP = 4;
const PADDING_HORIZONTAL = 24;

interface Props {
    currentIndex: number;
}

function ProgressSegmentFill({
    index,
    fillProgress,
    segmentWidth,
}: {
    index: number;
    fillProgress: SharedValue<number>;
    segmentWidth: number;
}) {
    const fillStyle = useAnimatedStyle(() => {
        const t = interpolate(
            fillProgress.value,
            [index, index + 1],
            [0, 1],
            Extrapolation.CLAMP
        );
        return {
            width: `${t * 100}%`,
            backgroundColor: t > 0.01
                ? ONBOARDING_CONFIG.colors.progress.active
                : ONBOARDING_CONFIG.colors.progress.upcoming,
        };
    });
    return (
        <View style={[styles.segment, { width: segmentWidth }]}>
            <Animated.View style={[styles.fill, fillStyle]} />
        </View>
    );
}

export const OnboardingProgress = ({ currentIndex }: Props) => {
    const segmentWidth = (SCREEN_WIDTH - PADDING_HORIZONTAL * 2 - GAP * 2) / 3;
    const fillProgress = useSharedValue(0);

    useEffect(() => {
        fillProgress.value = withTiming(currentIndex, { duration: 280 });
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            {[0, 1, 2].map((index) => (
                <ProgressSegmentFill
                    key={index}
                    index={index}
                    fillProgress={fillProgress}
                    segmentWidth={segmentWidth}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: MARGIN_TOP,
        left: PADDING_HORIZONTAL,
        right: PADDING_HORIZONTAL,
        flexDirection: 'row',
        gap: GAP,
        zIndex: 100,
    },
    segment: {
        height: HEIGHT,
        backgroundColor: ONBOARDING_CONFIG.colors.progress.upcoming,
        borderRadius: 2,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
    },
});
