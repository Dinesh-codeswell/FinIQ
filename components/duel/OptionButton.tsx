import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Animated } from 'react-native';

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

const OPTION_THEMES: Record<string, { bg: string, accent: string }> = {
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
    anySelected
}: OptionButtonProps) {
    const scale = useRef(new Animated.Value(1)).current;
    const theme = OPTION_THEMES[label];

    useEffect(() => {
        if (isSelected) {
            Animated.sequence([
                Animated.timing(scale, { toValue: 1.05, duration: 150, useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
            ]).start();
        }
    }, [isSelected]);

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
        onPress();
    };

    const containerStyle = [
        styles.container,
        { backgroundColor: theme.bg, borderColor: 'transparent' },
        isSelected && { borderWidth: 2, borderColor: theme.accent, backgroundColor: `${theme.accent}33` },
        isCorrect && { backgroundColor: `${theme.accent}66` },
        isWrong && { backgroundColor: 'rgba(255, 71, 87, 0.2)' },
        anySelected && !isSelected && !isCorrect && { opacity: 0.4 },
        anySelected && !isSelected && isCorrect && { opacity: 1, borderWidth: 2, borderColor: theme.accent } // Highlight correct even if not selected
    ];

    const badgeStyle = [
        styles.badge,
        { backgroundColor: `${theme.accent}33` },
        (isSelected || isCorrect || isWrong) && { backgroundColor: theme.accent }
    ];

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
                style={containerStyle}
                onPress={handlePress}
                disabled={disabled}
                activeOpacity={0.8}
            >
                <View style={badgeStyle}>
                    <Text style={[styles.label, { color: (isSelected || isCorrect || isWrong) ? '#FFFFFF' : theme.accent }]}>
                        {label}
                    </Text>
                </View>
                <Text style={styles.text} numberOfLines={2}>{text}</Text>
                {isCorrect && <Text style={styles.feedbackIcon}>✓</Text>}
                {isWrong && isSelected && <Text style={styles.feedbackIcon}>✗</Text>}
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
        marginBottom: 10,
        borderWidth: 2,
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
        color: '#FFFFFF',
        marginLeft: 8,
    },
});
