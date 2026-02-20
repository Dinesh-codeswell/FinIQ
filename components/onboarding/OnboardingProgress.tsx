import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    interpolateColor
} from 'react-native-reanimated';
import { ONBOARDING_CONFIG } from '@/src/constants/onboardingConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MARGIN_TOP = 8;
const HEIGHT = 3;
const GAP = 4;
const PADDING_HORIZONTAL = 24;

interface Props {
    currentIndex: number;
}

export const OnboardingProgress = ({ currentIndex }: Props) => {
    const segmentWidth = (SCREEN_WIDTH - (PADDING_HORIZONTAL * 2) - (GAP * 2)) / 3;

    return (
        <View style={styles.container}>
            {[0, 1, 2].map((index) => {
                return (
                    <View key={index} style={[styles.segment, { width: segmentWidth }]}>
                        <Animated.View
                            style={[
                                styles.fill,
                                {
                                    width: currentIndex >= index ? '100%' : '0%',
                                    backgroundColor: currentIndex >= index
                                        ? ONBOARDING_CONFIG.colors.progress.active
                                        : ONBOARDING_CONFIG.colors.progress.upcoming
                                }
                            ]}
                        />
                    </View>
                );
            })}
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
