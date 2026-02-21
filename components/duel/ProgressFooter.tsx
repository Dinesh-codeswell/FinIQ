import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    Easing,
} from 'react-native-reanimated';

interface ProgressFooterProps {
    total: number;
    current: number;
    results: (boolean | null)[];
}

export default function ProgressFooter({ total, current, results }: ProgressFooterProps) {
    const segments = Array.from({ length: total });
    return (
        <View style={styles.container}>
            <View style={styles.segmentRow}>
                {segments.map((_, i) => (
                    <ProgressSegment
                        key={i}
                        index={i}
                        currentIndex={current}
                        result={results[i]}
                    />
                ))}
            </View>
        </View>
    );
}

function ProgressSegment({
    index,
    currentIndex,
    result,
}: {
    index: number;
    currentIndex: number;
    result: boolean | null;
}) {
    const scaleY = useSharedValue(1);
    const isCurrent = index === currentIndex;

    useEffect(() => {
        if (isCurrent) {
            scaleY.value = withRepeat(
                withSequence(
                    withTiming(1.2, { duration: 550, easing: Easing.inOut(Easing.ease) }),
                    withTiming(1, { duration: 550, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                true
            );
        } else {
            scaleY.value = withTiming(1, { duration: 200 });
        }
    }, [isCurrent]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: scaleY.value }],
    }));

    let backgroundColor = '#242424';
    if (result === true) backgroundColor = '#00D68F';
    else if (result === false) backgroundColor = '#FF4757';
    else if (isCurrent) backgroundColor = '#F5A623';

    return (
        <Animated.View
            style={[
                styles.segment,
                { backgroundColor },
                isCurrent && styles.currentSegment,
                animatedStyle,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: '10%',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    segmentRow: {
        flexDirection: 'row',
        height: 4,
        gap: 2,
    },
    segment: {
        flex: 1,
        height: '100%',
        borderRadius: 2,
        transformOrigin: 'center',
    },
    currentSegment: {},
});
