import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LucideIcon, Zap, Target, Brain, Flame } from 'lucide-react-native';
import { PLAY_STYLE_OPTIONS } from '@/src/constants/preferenceOptions';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TILE_SIZE = (SCREEN_WIDTH - 48 - 12) / 2;

interface PrefStep3PlayStyleProps {
    selected: string[];
    onToggle: (id: string) => void;
}

const StyleTile = ({ styleOption, index, isSelected, onToggle }: {
    styleOption: any,
    index: number,
    isSelected: boolean,
    onToggle: (id: string) => void
}) => {
    const Icon = IconMap[styleOption.icon!] || Zap;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(isSelected ? 1.05 : 1, { damping: 12 }) }],
        borderColor: withTiming(isSelected ? `${styleOption.accent}80` : `${styleOption.accent}40`, { duration: 200 }),
        shadowOpacity: withTiming(isSelected ? 0.3 : 0, { duration: 200 }),
    }));

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(isSelected ? 1.1 : 1, { damping: 12 }) }],
    }));

    return (
        <Animated.View
            entering={FadeInUp.delay(350 + index * 60).springify()}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    onToggle(styleOption.id);
                    if (Platform.OS !== 'web') {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                }}
            >
                <Animated.View style={[styles.tile, animatedStyle]}>
                    <LinearGradient
                        colors={(styleOption.gradient || ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.04)']) as any}
                        style={styles.gradient}
                    >
                        <View style={styles.tileHeader}>
                            <Animated.View style={iconStyle}>
                                <Icon size={36} color={styleOption.accent} />
                            </Animated.View>
                        </View>

                        <View>
                            <Text style={[styles.label, { color: styleOption.accent }]}>{styleOption.label}</Text>
                            <Text style={styles.subLabel}>{styleOption.description}</Text>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const IconMap: Record<string, LucideIcon> = {
    'zap': Zap,
    'target': Target,
    'brain': Brain,
    'flame': Flame,
};

export const PrefStep3PlayStyle: React.FC<PrefStep3PlayStyleProps> = ({ selected, onToggle }) => {
    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {PLAY_STYLE_OPTIONS.map((style, index) => (
                    <StyleTile
                        key={style.id}
                        styleOption={style}
                        index={index}
                        isSelected={selected.includes(style.id)}
                        onToggle={onToggle}
                    />
                ))}
            </View >

            <Animated.Text
                entering={FadeInUp.delay(700).springify()}
                style={styles.hint}
            >
                Not sure? Pick what sounds coolest — you'll find your style.
            </Animated.Text>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginTop: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    tile: {
        width: TILE_SIZE,
        height: 140,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 2,
    },
    gradient: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    tileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    checkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIcon: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    subLabel: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 2,
        lineHeight: 14,
    },
    hint: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.3)',
        textAlign: 'center',
        marginTop: 24,
    },
});
