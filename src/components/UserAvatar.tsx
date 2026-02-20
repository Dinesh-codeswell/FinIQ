import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    withDelay,
    Easing,
    interpolate
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { AVATAR_EMOJIS } from '@/constants/divisions';
import { AVATAR_FRAMES, AvatarFrameId } from '@/src/data/avatarFrames';
import Colors from '@/constants/colors';

interface UserAvatarProps {
    size?: number;
    imageSource?: string | null;
    animalEmoji?: string;
    frameId?: AvatarFrameId;
    isPro?: boolean;
    showProBadge?: boolean;
    isOnline?: boolean;
}

export default function UserAvatar({
    size = 40,
    imageSource,
    animalEmoji = 'fox',
    frameId = 'grey_static',
    isPro = false,
    showProBadge = true,
    isOnline = false,
}: UserAvatarProps) {
    const frame = AVATAR_FRAMES[frameId] || AVATAR_FRAMES.grey_static;

    // Animations
    const pulseScale = useSharedValue(1);
    const rotateValue = useSharedValue(0);
    const shimmerValue = useSharedValue(0);
    const onlinePulse = useSharedValue(1);

    useEffect(() => {
        if (frame.animationType === 'pulse') {
            pulseScale.value = withRepeat(
                withSequence(
                    withTiming(1.12, { duration: 900, easing: Easing.inOut(Easing.ease) }),
                    withTiming(1.0, { duration: 900, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                true
            );
        } else {
            pulseScale.value = 1;
        }

        if (frame.animationType === 'rotate' || frame.animationType === 'scroll') {
            rotateValue.value = withRepeat(
                withTiming(360, { duration: 3000, easing: Easing.linear }),
                -1,
                false
            );
        }

        if (frame.animationType === 'shimmer') {
            shimmerValue.value = withRepeat(
                withTiming(1, { duration: 2000, easing: Easing.bezier(0.4, 0, 0.6, 1) }),
                -1,
                false
            );
        }

        if (isOnline) {
            onlinePulse.value = withRepeat(
                withSequence(
                    withTiming(1.25, { duration: 1000 }),
                    withTiming(1.0, { duration: 1000 })
                ),
                -1,
                true
            );
        }
    }, [frame.animationType, isOnline]);

    const animatedFrameStyle = useAnimatedStyle(() => {
        if (frame.animationType === 'pulse') {
            return {
                transform: [{ scale: pulseScale.value }],
                opacity: interpolate(pulseScale.value, [1, 1.12], [1, 0.8]),
            };
        }
        return {};
    });

    const animatedRotateStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotateValue.value}deg` }],
        };
    });

    const animatedShimmerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: interpolate(shimmerValue.value, [0, 1], [-size, size * 2]) }],
        };
    });

    const onlineAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: onlinePulse.value }],
        };
    });

    const badgeSize = size * 0.4;
    const onlineDotSize = size * 0.25;

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {/* Frame Layer */}
            {frameId !== 'none' && (
                <Animated.View
                    style={[
                        styles.frame,
                        {
                            width: size + frame.borderWidth * 2,
                            height: size + frame.borderWidth * 2,
                            borderRadius: (size + frame.borderWidth * 2) / 2,
                            borderColor: frame.borderColor,
                            borderWidth: frame.borderWidth,
                        },
                        frame.glowColor ? {
                            shadowColor: frame.borderColor,
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            elevation: 5,
                        } : {},
                        animatedFrameStyle,
                    ]}
                />
            )}

            {/* Rotation Layer (for chart_line, diamond_spin) */}
            {(frame.animationType === 'rotate' || frame.animationType === 'scroll') && (
                <Animated.View style={[StyleSheet.absoluteFill, animatedRotateStyle]}>
                    <View
                        style={[
                            styles.orbitals,
                            {
                                width: 6,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: frame.borderColor,
                                top: -3,
                                left: size / 2 - 3
                            }
                        ]}
                    />
                </Animated.View>
            )}

            {/* Avatar Content */}
            <View style={[styles.avatarContent, { width: size, height: size, borderRadius: size / 2 }]}>
                {imageSource ? (
                    <Image source={{ uri: imageSource }} style={styles.image} />
                ) : (
                    <Text style={[styles.emoji, { fontSize: size * 0.5 }]}>
                        {AVATAR_EMOJIS[animalEmoji] || animalEmoji || '🦊'}
                    </Text>
                )}

                {/* Shimmer Overlay */}
                {frame.animationType === 'shimmer' && (
                    <Animated.View style={[styles.shimmerContainer, animatedShimmerStyle]}>
                        <LinearGradient
                            colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFill}
                        />
                    </Animated.View>
                )}
            </View>

            {/* Status Markers */}
            <View style={styles.markersContainer}>
                {isOnline && (
                    <Animated.View
                        style={[
                            styles.onlineDot,
                            {
                                width: onlineDotSize,
                                height: onlineDotSize,
                                borderRadius: onlineDotSize / 2,
                            },
                            onlineAnimatedStyle,
                        ]}
                    />
                )}
                {isPro && showProBadge && size >= 36 && (
                    <View
                        style={[
                            styles.proBadge,
                            {
                                width: badgeSize * 1.4,
                                height: badgeSize * 0.8,
                                borderRadius: 4,
                                marginLeft: isOnline ? 2 : 0,
                            },
                        ]}
                    >
                        <Text style={[styles.proText, { fontSize: size * 0.18 }]}>PRO</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    frame: {
        position: 'absolute',
    },
    avatarContent: {
        backgroundColor: Colors.cardElevated,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    emoji: {
        textAlign: 'center',
    },
    shimmerContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '50%',
    },
    orbitals: {
        position: 'absolute',
    },
    markersContainer: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineDot: {
        backgroundColor: '#00D68F',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    proBadge: {
        backgroundColor: '#F5A623',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    proText: {
        color: '#000000',
        fontWeight: '900',
    },
});
