import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { COMMITMENT_OPTIONS } from '@/src/constants/preferenceOptions';

interface PrefStep5CommitmentProps {
    selected: number;
    onSelect: (minutes: number) => void;
}

export const PrefStep5Commitment: React.FC<PrefStep5CommitmentProps> = ({ selected, onSelect }) => {
    const selectedObj = COMMITMENT_OPTIONS.find(o => o.minutes === selected) || COMMITMENT_OPTIONS[1];

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {COMMITMENT_OPTIONS.map((opt, index) => {
                    const isSelected = selected === opt.minutes;

                    const animatedStyle = useAnimatedStyle(() => ({
                        transform: [{ scale: withSpring(isSelected ? 1.05 : 1, { damping: 12 }) }],
                        borderColor: withTiming(isSelected ? opt.accent : 'rgba(255,255,255,0.1)', { duration: 200 }),
                        backgroundColor: withTiming(isSelected ? `${opt.accent}20` : 'rgba(255,255,255,0.04)', { duration: 200 }),
                    }));

                    return (
                        <Animated.View
                            key={opt.id}
                            entering={FadeInUp.delay(350 + index * 100).springify()}
                            style={styles.flex1}
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    onSelect(opt.minutes);
                                    if (Platform.OS !== 'web') {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    }
                                }}
                                style={styles.flex1}
                            >
                                <Animated.View style={[styles.tile, animatedStyle]}>
                                    <Text style={[styles.tileIcon, isSelected && { color: opt.accent }]}>
                                        {opt.id === 'flash' ? '⚡' : opt.id === 'blitz' ? '🔥' : '🧠'}
                                    </Text>
                                    <Text style={[styles.tileLabel, { color: isSelected ? opt.accent : '#FFFFFF' }]}>
                                        {opt.minutes} MIN
                                    </Text>
                                    <Text style={styles.tileMode}>{opt.mode}</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </View>

            <Animated.View
                entering={FadeInUp.delay(700).springify()}
                style={styles.details}
            >
                <Text style={[styles.detailsMode, { color: selectedObj.accent }]}>{selectedObj.label} MODE</Text>
                <Text style={styles.detailsDesc}>{selectedObj.desc}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginTop: 24,
    },
    grid: {
        flexDirection: 'row',
        gap: 10,
    },
    flex1: {
        flex: 1,
    },
    tile: {
        height: 120,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        padding: 8,
    },
    tileIcon: {
        fontSize: 24,
        marginBottom: 8,
        opacity: 0.8,
    },
    tileLabel: {
        fontSize: 16,
        fontWeight: '900',
    },
    tileMode: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.4)',
        marginTop: 4,
        textAlign: 'center',
    },
    details: {
        marginTop: 32,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    detailsMode: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 8,
    },
    detailsDesc: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
        lineHeight: 18,
    },
});
