import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface PrefStep6ReminderProps {
    time: string; // "HH:MM"
    onSelect: (time: string) => void;
}

const PRESETS = [
    { label: 'Morning', time: '07:00', icon: '🌅' },
    { label: 'Lunch', time: '13:00', icon: '🍜' },
    { label: 'Evening', time: '20:00', icon: '🌆' },
    { label: 'Night', time: '22:00', icon: '🌌' },
];

export const PrefStep6Reminder: React.FC<PrefStep6ReminderProps> = ({ time, onSelect }) => {
    // Helper to format time for display
    const formatTime = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayH = h % 12 || 12;
        return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    // Calculate clock hand rotation
    const getRotation = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        return ((h % 12) * 30 + (m / 60) * 30) - 90; // -90 to start from top
    };

    return (
        <View style={styles.container}>
            <Animated.View
                entering={FadeInUp.delay(350).springify()}
                style={styles.clockContainer}
            >
                <View style={styles.clockOuter}>
                    <View style={styles.clockInner}>
                        {/* Clock markers */}
                        {[...Array(12)].map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.marker,
                                    { transform: [{ rotate: `${i * 30}deg` }, { translateY: -95 }] }
                                ]}
                            />
                        ))}

                        {/* Clock hand */}
                        <Animated.View style={[
                            styles.hand,
                            { transform: [{ rotate: `${getRotation(time) + 90}deg` }] }
                        ]} />

                        <View style={styles.centerDot} />

                        <View style={styles.display}>
                            <Text style={styles.timeText}>{formatTime(time)}</Text>
                            <Text style={styles.everyDay}>Every day</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>

            <View style={styles.presets}>
                {PRESETS.map((preset, index) => {
                    const isSelected = time === preset.time;
                    return (
                        <Animated.View
                            key={preset.time}
                            entering={FadeInUp.delay(500 + index * 60).springify()}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    onSelect(preset.time);
                                    if (Platform.OS !== 'web') {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    }
                                }}
                                style={[styles.preset, isSelected && styles.presetActive]}
                            >
                                <Text style={styles.presetIcon}>{preset.icon}</Text>
                                <Text style={[styles.presetLabel, isSelected && styles.presetLabelActive]}>
                                    {preset.label}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginTop: 8,
        alignItems: 'center',
    },
    clockContainer: {
        width: 230,
        height: 230,
        marginBottom: 32,
    },
    clockOuter: {
        flex: 1,
        borderRadius: 115,
        backgroundColor: 'rgba(0, 214, 143, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(0, 214, 143, 0.15)',
        padding: 10,
    },
    clockInner: {
        flex: 1,
        borderRadius: 105,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    marker: {
        position: 'absolute',
        width: 2,
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 1,
    },
    hand: {
        position: 'absolute',
        width: 3,
        height: 80,
        backgroundColor: '#00D68F',
        borderRadius: 2,
        bottom: '50%',
        transformOrigin: 'bottom',
    },
    centerDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#00D68F',
        zIndex: 10,
    },
    display: {
        marginTop: 20,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    everyDay: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 4,
    },
    presets: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
    },
    preset: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        minWidth: 90,
    },
    presetActive: {
        backgroundColor: 'rgba(0, 214, 143, 0.1)',
        borderColor: '#00D68F',
    },
    presetIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    presetLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
        fontWeight: '600',
    },
    presetLabelActive: {
        color: '#00D68F',
    },
});
