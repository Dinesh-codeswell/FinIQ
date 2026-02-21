import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    ZoomIn,
    SlideInUp,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withSequence,
    withTiming,
    Easing
} from 'react-native-reanimated';
import { Trophy, ArrowUp, ArrowDown, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { DIVISION_CONFIG } from '@/src/services/leaderboardService';
import { ParticleBurst } from '../animations/ParticleBurst';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
    oldDivision: string;
    newDivision: string;
    onClose: () => void;
}

export const RankCelebration = ({ oldDivision, newDivision, onClose }: Props) => {
    const divisions = Object.keys(DIVISION_CONFIG);
    const oldIdx = divisions.indexOf(oldDivision);
    const newIdx = divisions.indexOf(newDivision);
    const isPromotion = newIdx > oldIdx;

    const config = DIVISION_CONFIG[newDivision] || DIVISION_CONFIG.bronze;

    const scale = useSharedValue(0);
    const rotate = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(1, { damping: 12 });
        rotate.value = withRepeat(
            withSequence(
                withTiming(-5, { duration: 100 }),
                withTiming(5, { duration: 100 })
            ),
            5,
            true
        );

        Haptics.notificationAsync(
            isPromotion ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { rotate: `${rotate.value}deg` }
        ]
    }));

    return (
        <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
            style={styles.overlay}
        >
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPress={onClose}
            >
                <Animated.View
                    entering={ZoomIn.delay(200).springify()}
                    style={[styles.card, { borderColor: config.color }]}
                >
                    <View style={[styles.glow, { backgroundColor: config.color, opacity: 0.2 }]} />

                    {isPromotion && <ParticleBurst color={config.color} />}

                    <View style={styles.iconWrapper}>
                        <Animated.View style={animatedStyle}>
                            {isPromotion ? (
                                <Trophy size={80} color={config.color} fill={`${config.color}30`} />
                            ) : (
                                <ArrowDown size={80} color={Colors.alert} />
                            )}
                        </Animated.View>
                        <Animated.View entering={SlideInUp.delay(500)} style={styles.badgeWrapper}>
                            <View style={[styles.arrowBadge, { backgroundColor: isPromotion ? Colors.accent : Colors.alert }]}>
                                {isPromotion ? <ArrowUp size={20} color="#000" /> : <ArrowDown size={20} color="#000" />}
                            </View>
                        </Animated.View>
                    </View>

                    <Text style={styles.statusText}>{isPromotion ? 'PROMOTED!' : 'RANK CHANGE'}</Text>
                    <Text style={[styles.divisionName, { color: config.color }]}>
                        {config.label} LEAGUE
                    </Text>

                    <Text style={styles.description}>
                        {isPromotion
                            ? `Congratulations! You've climbed into the ${config.label} Division. Keep the streak alive to reach Elite status.`
                            : `Your rank has shifted. Duel more to climb back up!`}
                    </Text>

                    <TouchableOpacity style={[styles.button, { backgroundColor: config.color }]} onPress={onClose}>
                        <Text style={styles.buttonText}>LFG!</Text>
                    </TouchableOpacity>
                </Animated.View>

                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <X size={24} color={Colors.textTertiary} />
                </TouchableOpacity>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 1000,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        backgroundColor: Colors.surface,
        width: '100%',
        padding: 32,
        borderRadius: 32,
        borderWidth: 2,
        alignItems: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 30,
        elevation: 20,
    },
    glow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 32,
    },
    iconWrapper: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    badgeWrapper: {
        position: 'absolute',
        top: -10,
        right: -10,
    },
    arrowBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.surface,
    },
    statusText: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 8,
    },
    divisionName: {
        fontSize: 40,
        fontWeight: '900',
        fontFamily: 'Outfit-Bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        color: Colors.textSecondary,
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    button: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
    },
    closeBtn: {
        marginTop: 24,
        padding: 12,
    },
});
