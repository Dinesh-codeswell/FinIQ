import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { COMMITMENT_OPTIONS } from '@/src/constants/preferenceOptions';

interface PrefStep5CommitmentProps {
    selected: number;
    onSelect: (minutes: number) => void;
}

type CommitmentOpt = (typeof COMMITMENT_OPTIONS)[number];

// Single card component so hooks are called at top level (no hooks inside .map)
function CommitmentCard({
    opt,
    index,
    isSelected,
    onSelect,
}: {
    opt: CommitmentOpt;
    index: number;
    isSelected: boolean;
    onSelect: (minutes: number) => void;
}) {
    const borderOpacity = useSharedValue(0);
    const bgOpacity = useSharedValue(0);

    useEffect(() => {
        borderOpacity.value = withTiming(isSelected ? 1 : 0, { duration: 200 });
        bgOpacity.value = withTiming(isSelected ? 1 : 0, { duration: 200 });
    }, [isSelected]);

    const animatedStyle = useAnimatedStyle(() => {
        const borderColor =
            borderOpacity.value > 0.5 ? opt.accent : 'rgba(255,255,255,0.1)';
        const backgroundColor =
            bgOpacity.value > 0.5 ? `${opt.accent}20` : 'rgba(255,255,255,0.04)';
        return {
            borderColor,
            backgroundColor,
        };
    });

    return (
        <Animated.View
            entering={FadeInUp.delay(350 + index * 100).springify()}
            style={[styles.flex1, isSelected && { zIndex: 10 }]}
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
                    <Text
                        style={[styles.tileLabel, { color: isSelected ? opt.accent : '#FFFFFF' }]}
                        numberOfLines={1}
                    >
                        {opt.minutes} MIN
                    </Text>
                    <Text style={styles.tileMode} numberOfLines={2}>
                        {opt.mode}
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
}

export const PrefStep5Commitment: React.FC<PrefStep5CommitmentProps> = ({
    selected,
    onSelect,
}) => {
    const selectedObj =
        COMMITMENT_OPTIONS.find((o) => o.minutes === selected) || COMMITMENT_OPTIONS[1];

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {COMMITMENT_OPTIONS.map((opt, index) => (
                    <CommitmentCard
                        key={opt.id}
                        opt={opt}
                        index={index}
                        isSelected={selected === opt.minutes}
                        onSelect={onSelect}
                    />
                ))}
            </View>

            <Animated.View
                entering={FadeInUp.delay(700).springify()}
                style={styles.details}
            >
                <Text style={[styles.detailsMode, { color: selectedObj.accent }]}>
                    {selectedObj.label} MODE
                </Text>
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
        gap: 14,
    },
    flex1: {
        flex: 1,
    },
    tile: {
        minHeight: 140,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    tileIcon: {
        fontSize: 28,
        marginBottom: 8,
        opacity: 0.9,
    },
    tileLabel: {
        fontSize: 14,
        fontWeight: '900',
        textAlign: 'center',
    },
    tileMode: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.4)',
        marginTop: 4,
        textAlign: 'center',
        paddingHorizontal: 4,
        fontWeight: 'bold',
        letterSpacing: 0.2,
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
