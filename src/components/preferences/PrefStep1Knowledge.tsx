import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { KNOWLEDGE_LEVELS } from '@/src/constants/preferenceOptions';

interface PrefStep1KnowledgeProps {
    selected: string | null;
    onSelect: (id: string) => void;
}

export const PrefStep1Knowledge: React.FC<PrefStep1KnowledgeProps> = ({ selected, onSelect }) => {
    return (
        <View style={styles.container}>
            {KNOWLEDGE_LEVELS.map((level, index) => {
                const isSelected = selected === level.id;
                const isDimmed = selected !== null && !isSelected;

                const animatedStyle = useAnimatedStyle(() => ({
                    opacity: withTiming(isDimmed ? 0.5 : 1, { duration: 200 }),
                    transform: [{ scale: withSpring(isSelected ? 1.02 : 1, { damping: 15 }) }],
                    borderColor: withTiming(isSelected ? level.accent! : 'rgba(255,255,255,0.1)', { duration: 200 }),
                    borderWidth: isSelected ? 2 : 1,
                }));

                const bgStyle = useAnimatedStyle(() => ({
                    backgroundColor: withTiming(
                        isSelected ? `${level.accent}20` : 'rgba(255,255,255,0.04)',
                        { duration: 200 }
                    ),
                }));

                return (
                    <Animated.View
                        key={level.id}
                        entering={FadeInUp.delay(350 + index * 60).springify()}
                    >
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                onSelect(level.id);
                                if (Platform.OS !== 'web') {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                }
                            }}
                        >
                            <Animated.View style={[styles.card, animatedStyle, bgStyle]}>
                                <View style={[styles.badgeContainer, { backgroundColor: `${level.accent}30` }]}>
                                    {/* Simplified hexagonal badge or icon */}
                                    <Text style={[styles.badgeText, { color: level.accent }]}>
                                        {level.id === 'recruit' ? '⬡' : level.id === 'analyst' ? '⬢' : '★'}
                                    </Text>
                                </View>

                                <View style={styles.content}>
                                    <Text style={[styles.label, { color: level.accent }]}>
                                        {level.label}
                                    </Text>
                                    <Text style={styles.description}>{level.description}</Text>
                                </View>

                                <View style={[
                                    styles.selectionIndicator,
                                    { borderColor: isSelected ? level.accent : 'rgba(255,255,255,0.2)' }
                                ]}>
                                    {isSelected && <View style={[styles.selectionFill, { backgroundColor: level.accent }]} />}
                                </View>
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        gap: 12,
        marginTop: 24,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
    },
    badgeContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    badgeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    label: {
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    description: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
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
    },
});
