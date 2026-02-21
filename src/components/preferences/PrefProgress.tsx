import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PrefProgressProps {
    progress: number; // 0 to 1
}

export const PrefProgress: React.FC<PrefProgressProps> = ({ progress }) => {
    const width = useSharedValue(0);

    useEffect(() => {
        width.value = withSpring(progress * SCREEN_WIDTH, {
            damping: 20,
            stiffness: 150,
        });
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: width.value,
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.fill, animatedStyle]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 4,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'absolute',
        top: 0,
        zIndex: 100,
    },
    fill: {
        height: '100%',
        backgroundColor: '#00D68F',
        borderRadius: 2,
    },
});
