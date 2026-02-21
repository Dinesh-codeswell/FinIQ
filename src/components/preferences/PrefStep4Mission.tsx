import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    withSpring,
    withSequence
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { MONEY_MISSION_OPTIONS } from '@/src/constants/preferenceOptions';

interface PrefStep4MissionProps {
    selected: string[];
    onToggle: (id: string) => void;
}

const MissionRow = ({ option, index, isSelected, isDisabled, onToggle }: {
    option: any,
    index: number,
    isSelected: boolean,
    isDisabled: boolean,
    onToggle: (id: string) => void
}) => {
    const isSpecial = option.id === 'crush';

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isDisabled ? 0.4 : 1, { duration: 200 }),
        borderColor: withTiming(
            isSelected
                ? '#00D68F'
                : isSpecial ? 'rgba(0,214,143,0.2)' : 'rgba(255,255,255,0.08)',
            { duration: 200 }
        ),
        backgroundColor: withTiming(
            isSelected ? 'rgba(0,214,143,0.1)' : 'rgba(255,255,255,0.04)',
            { duration: 200 }
        ),
    }));

    return (
        <Animated.View
            entering={FadeInUp.delay(350 + index * 60).springify()}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                disabled={isDisabled}
                onPress={() => {
                    onToggle(option.id);
                    if (Platform.OS !== 'web') {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                }}
            >
                <Animated.View style={[styles.row, animatedStyle]}>
                    <View style={[styles.iconCircle, { backgroundColor: isSpecial ? 'rgba(0,214,143,0.15)' : 'rgba(255,255,255,0.05)' }]}>
                        <Text style={styles.emoji}>{option.emoji}</Text>
                    </View>
                    <Text style={styles.label}>{option.label}</Text>
                    <View style={[
                        styles.selectionIndicator,
                        { borderColor: isSelected ? '#00D68F' : 'rgba(255,255,255,0.2)' }
                    ]}>
                        {isSelected && <View style={styles.selectionFill} />}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export const PrefStep4Mission: React.FC<PrefStep4MissionProps> = ({ selected, onToggle }) => {
    const isAtMax = selected.length >= 2;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.counterText}>
                    <Text style={[styles.counterValue, isAtMax && { color: '#F5A623' }]}>
                        {selected.length}/2
                    </Text> {isAtMax ? "— you're set!" : "selected"}
                </Text>
            </View>

            <View style={styles.list}>
                {MONEY_MISSION_OPTIONS.map((option, index) => (
                    <MissionRow
                        key={option.id}
                        option={option}
                        index={index}
                        isSelected={selected.includes(option.id)}
                        isDisabled={isAtMax && !selected.includes(option.id)}
                        onToggle={onToggle}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginTop: 16,
    },
    header: {
        marginBottom: 16,
    },
    counterText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.4)',
    },
    counterValue: {
        color: '#00D68F',
        fontWeight: 'bold',
    },
    list: {
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        borderRadius: 14,
        paddingHorizontal: 12,
        borderWidth: 1,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    emoji: {
        fontSize: 18,
    },
    label: {
        flex: 1,
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    selectionIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectionFill: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#00D68F',
    },
});
