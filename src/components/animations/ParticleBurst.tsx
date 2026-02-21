import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
    interpolate
} from 'react-native-reanimated';

interface ParticleProps {
    index: number;
    color: string;
}

const Particle = ({ index, color }: ParticleProps) => {
    const angle = (index * 15) * (Math.PI / 180);
    const distance = useSharedValue(0);
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);

    useEffect(() => {
        const targetDistance = 100 + Math.random() * 100;
        distance.value = withTiming(targetDistance, {
            duration: 1000,
            easing: Easing.out(Easing.quad),
        });
        opacity.value = withDelay(500, withTiming(0, { duration: 500 }));
        scale.value = withTiming(0, { duration: 1000 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: Math.cos(angle) * distance.value },
                { translateY: Math.sin(angle) * distance.value },
                { scale: scale.value }
            ],
            opacity: opacity.value,
            backgroundColor: color,
        };
    });

    return <Animated.View style={[styles.particle, animatedStyle]} />;
};

export const ParticleBurst = ({ color = '#FFD700' }) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: 24 }).map((_, i) => (
                <Particle key={i} index={i} color={color} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    particle: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 3,
    },
});
