import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    withRepeat,
    withSequence,
    withDelay
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
    currentIndex: number;
    onNext: () => void;
    onSignIn: () => void;
}

export const OnboardingCTA = ({ currentIndex, onNext, onSignIn }: Props) => {
    const scale = useSharedValue(1);
    const glintX = useSharedValue(-100);

    React.useEffect(() => {
        if (currentIndex === 2) {
            glintX.value = withRepeat(
                withSequence(
                    withTiming(200, { duration: 1500 }),
                    withDelay(1500, withTiming(-100, { duration: 0 }))
                ),
                -1
            );
        } else {
            glintX.value = -100;
        }
    }, [currentIndex]);

    const btnStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const glintStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: glintX.value }],
    }));

    const handlePressIn = () => {
        scale.value = withTiming(0.97, { duration: 80 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const handlePress = () => {
        Haptics.impactAsync(currentIndex === 2 ? Haptics.ImpactFeedbackStyle.Heavy : Haptics.ImpactFeedbackStyle.Medium);
        onNext();
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.gradient}
            />

            <View style={styles.content}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={handlePress}
                    style={styles.touchable}
                >
                    <Animated.View style={[styles.primaryBtn, btnStyle]}>
                        <Text style={styles.primaryBtnText}>
                            {currentIndex < 2 ? 'NEXT' : 'ENTER THE ARENA'}
                        </Text>
                        {currentIndex < 2 && (
                            <ArrowRight size={20} color="#000000" strokeWidth={3} />
                        )}

                        {currentIndex === 2 && (
                            <Animated.View style={[styles.glint, glintStyle]}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
                                    style={styles.glintGradient}
                                />
                            </Animated.View>
                        )}
                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onSignIn} style={styles.secondaryLink}>
                    <Text style={styles.secondaryText}>
                        Already have an account? <Text style={styles.signInText}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 180,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    touchable: {
        width: '100%',
    },
    primaryBtn: {
        backgroundColor: '#00D68F',
        height: 56,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        overflow: 'hidden',
    },
    primaryBtnText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1,
    },
    glint: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 100,
    },
    glintGradient: {
        flex: 1,
    },
    secondaryLink: {
        marginTop: 16,
        alignItems: 'center',
    },
    secondaryText: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: 13,
        fontWeight: '500',
    },
    signInText: {
        color: '#00D68F',
        fontWeight: '600',
    },
});
