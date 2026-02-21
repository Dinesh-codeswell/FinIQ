import React, { useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

interface OptionButtonProps {
    label: string;
    text: string;
    isSelected: boolean;
    isCorrect: boolean;
    isWrong: boolean;
    disabled: boolean;
    onPress: () => void;
    anySelected: boolean;
}

const OPTION_THEMES: Record<string, { bg: string; accent: string }> = {
    A: { bg: '#1A3A5C', accent: '#4A9EE8' },
    B: { bg: '#1A3A2A', accent: '#00D68F' },
    C: { bg: '#3A2A1A', accent: '#F5A623' },
    D: { bg: '#3A1A1A', accent: '#FF6B9D' },
};

export default function OptionButton({
    label,
    text,
    isSelected,
    isCorrect,
    isWrong,
    disabled,
    onPress,
    anySelected,
}: OptionButtonProps) {
    const scale = useSharedValue(1);
    const theme = OPTION_THEMES[label] ?? OPTION_THEMES.A;

    useEffect(() => {
        if (isCorrect) {
            scale.value = withSequence(
                withSpring(1.03, { damping: 12, stiffness: 300 }),
                withSpring(1)
            );
        }
        if (isWrong && isSelected) {
            scale.value = withSequence(
                withTiming(0.98, { duration: 80 }),
                withSpring(1.02, { damping: 8, stiffness: 200 }),
                withSpring(1)
            );
        }
    }, [isCorrect, isWrong, isSelected]);

    const animatedWrapperStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        if (disabled) return;
        scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const handlePress = () => {
        if (disabled) return;
        onPress();
    };

    const borderColor =
        isCorrect ? theme.accent
        : isWrong && isSelected ? '#FF4757'
        : isSelected ? theme.accent
        : 'transparent';
    const backgroundColor =
        isCorrect ? `${theme.accent}44`
        : isWrong && isSelected ? 'rgba(255, 71, 87, 0.25)'
        : isSelected ? `${theme.accent}33`
        : theme.bg;
    const badgeBg = (isSelected || isCorrect || isWrong) ? theme.accent : `${theme.accent}33`;
    const opacity = anySelected && !isSelected && !isCorrect ? 0.45 : 1;

    return (
        <Animated.View style={[animatedWrapperStyle, { marginBottom: 10 }]}>
            <TouchableOpacity
                style={[
                    styles.container,
                    {
                        backgroundColor,
                        borderColor,
                        borderWidth: isSelected || isCorrect || isWrong ? 2 : 2,
                        opacity,
                    },
                ]}
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                activeOpacity={1}
            >
                <View style={[styles.badge, { backgroundColor: badgeBg }]}>
                    <Text
                        style={[
                            styles.label,
                            { color: (isSelected || isCorrect || isWrong) ? '#FFFFFF' : theme.accent },
                        ]}
                    >
                        {label}
                    </Text>
                </View>
                <Text style={styles.text} numberOfLines={2}>
                    {text}
                </Text>
                {isCorrect && <Text style={styles.feedbackIcon}>✓</Text>}
                {isWrong && isSelected && <Text style={styles.feedbackIconWrong}>✗</Text>}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 64,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    badge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    text: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
        marginLeft: 12,
    },
    feedbackIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00D68F',
        marginLeft: 8,
    },
    feedbackIconWrong: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF4757',
        marginLeft: 8,
    },
});
