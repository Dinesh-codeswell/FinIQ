import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Dimensions } from 'react-native';
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LucideIcon, TrendingUp, Home, Landmark, Globe, Bitcoin, Hash, BarChart2, FileText, Shield, Zap } from 'lucide-react-native';
import { TOPIC_OPTIONS } from '@/src/constants/preferenceOptions';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48 - 12) / 2;

interface PrefStep2TopicsProps {
    selected: string[];
    onToggle: (id: string) => void;
}

const IconMap: Record<string, LucideIcon> = {
    'trending-up': TrendingUp,
    'home': Home,
    'landmark': Landmark,
    'globe': Globe,
    'bitcoin': Bitcoin,
    'hash': Hash,
    'bar-chart-2': BarChart2,
    'file-text': FileText,
    'shield': Shield,
    'zap': Zap,
};

export const PrefStep2Topics: React.FC<PrefStep2TopicsProps> = ({ selected, onToggle }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.counterText}>
                    <Text style={styles.counterValue}>{selected.length}</Text> selected · Select all that spark interest
                </Text>
            </View>

            <View style={styles.grid}>
                {TOPIC_OPTIONS.map((topic, index) => {
                    const isSelected = selected.includes(topic.id);
                    const Icon = IconMap[topic.icon!] || Zap;

                    const animatedStyle = useAnimatedStyle(() => ({
                        transform: [{ scale: withSpring(isSelected ? 1.04 : 1, { damping: 12 }) }],
                        borderColor: withTiming(isSelected ? `${topic.accent}99` : `${topic.accent}33`, { duration: 200 }),
                    }));

                    const iconStyle = useAnimatedStyle(() => ({
                        opacity: withTiming(isSelected ? 1 : 0.6, { duration: 200 }),
                    }));

                    return (
                        <Animated.View
                            key={topic.id}
                            entering={FadeInUp.delay(350 + index * 60).springify()}
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    onToggle(topic.id);
                                    if (Platform.OS !== 'web') {
                                        Haptics.selectionAsync();
                                    }
                                }}
                            >
                                <Animated.View style={[styles.card, animatedStyle]}>
                                    <LinearGradient
                                        colors={(topic.gradient || ['#1A1D2B', '#0D1018']) as any}
                                        style={styles.gradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <View style={styles.cardHeader}>
                                            <Animated.View style={iconStyle}>
                                                <Icon size={24} color={topic.accent} />
                                            </Animated.View>
                                            <View style={[
                                                styles.selectionIndicator,
                                                { borderColor: isSelected ? topic.accent : 'rgba(255,255,255,0.2)' }
                                            ]}>
                                                {isSelected && <View style={[styles.selectionFill, { backgroundColor: topic.accent }]} />}
                                            </View>
                                        </View>

                                        <Text style={styles.topicLabel}>{topic.label}</Text>

                                    </LinearGradient>
                                </Animated.View>
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
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingBottom: 40,
    },
    card: {
        width: CARD_WIDTH,
        height: 100,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
    },
    gradient: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    topicLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    selectionIndicator: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectionFill: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    checkBadge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIcon: {
        fontSize: 10,
        color: '#000000',
        fontWeight: 'bold',
    },
});
