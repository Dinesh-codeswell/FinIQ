import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    interpolateColor
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface PrefContinueButtonProps {
    onPress: () => void;
    enabled: boolean;
    label?: string;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const PrefContinueButton: React.FC<PrefContinueButtonProps> = ({
    onPress,
    enabled,
    label = "CONTINUE"
}) => {
    const handlePress = () => {
        if (!enabled) return;
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        onPress();
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(
                enabled ? '#00D68F' : 'rgba(0, 214, 143, 0.3)',
                { duration: 200 }
            ),
            shadowOpacity: withTiming(enabled ? 0.3 : 0, { duration: 200 }),
            transform: [{ scale: withTiming(enabled ? 1 : 0.98, { duration: 200 }) }]
        };
    });

    const textStyle = useAnimatedStyle(() => {
        return {
            color: withTiming(
                enabled ? '#000000' : 'rgba(0, 0, 0, 0.4)',
                { duration: 200 }
            ),
        };
    });

    return (
        <AnimatedTouchableOpacity
            activeOpacity={0.8}
            onPress={handlePress}
            disabled={!enabled}
            style={[styles.button, animatedStyle]}
        >
            <Animated.Text style={[styles.text, textStyle]}>{label}</Animated.Text>
        </AnimatedTouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 24,
        elevation: 4,
    },
    text: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 1,
    },
});
