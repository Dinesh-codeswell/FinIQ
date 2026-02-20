import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    withDelay,
    withSpring,
    withRepeat,
    Easing,
    runOnJS
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import AuthBackground from '@/src/components/auth/AuthBackground';
import AuthLogo from '@/src/components/auth/AuthLogo';
import { supabase } from '@/src/services/supabase';

const { width } = Dimensions.get('window');

const FloatingElement = ({ delay, duration, style, children }: any) => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withDelay(delay, withTiming(0.2, { duration: 600 }));
        translateY.value = withDelay(
            delay,
            withRepeat(
                withTiming(-12, { duration, easing: Easing.inOut(Easing.sin) }),
                -1,
                true
            )
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[style, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

export default function SplashScreen() {
    const router = useRouter();
    const rootNavigationState = useRootNavigationState();
    const isNavigationReady = !!rootNavigationState?.key;

    const logoScale = useSharedValue(0.6);
    const logoOpacity = useSharedValue(0);
    const textOpacity = useSharedValue(0);
    const textTranslateY = useSharedValue(8);
    const progressWidth = useSharedValue(48);

    useEffect(() => {
        // Logo Animation
        logoOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
        logoScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 100 }));

        // Text Animation
        textOpacity.value = withDelay(600, withTiming(1, { duration: 400 }));
        textTranslateY.value = withDelay(600, withTiming(0, { duration: 400 }));

        // Progress Bar
        progressWidth.value = withTiming(120, { duration: 2000, easing: Easing.inOut(Easing.quad) });
    }, []);

    useEffect(() => {
        if (!isNavigationReady) return;

        // Auth Check & Navigation
        const checkAuthAndNavigate = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                // Wait for the specific duration to show the splash
                setTimeout(() => {
                    if (session) {
                        router.replace('/(tabs)' as any);
                    } else {
                        router.replace('/welcome' as any);
                    }
                }, 2500);
            } catch (error) {
                console.error('Auth check failed:', error);
                setTimeout(() => router.replace('/welcome' as any), 2500);
            }
        };

        checkAuthAndNavigate();
    }, [isNavigationReady]);

    const logoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    const textStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateY: textTranslateY.value }],
    }));

    const progressStyle = useAnimatedStyle(() => ({
        width: progressWidth.value,
    }));

    return (
        <AuthBackground showGrid={true}>
            <View style={styles.content}>
                {/* Floating Background Elements */}
                <FloatingElement delay={400} duration={4000} style={{ position: 'absolute', top: '20%', left: '15%' }}>
                    <Text style={[styles.floatText, { color: '#00D68F' }]}>+2.4%</Text>
                </FloatingElement>
                <FloatingElement delay={800} duration={5500} style={{ position: 'absolute', top: '25%', right: '20%' }}>
                    <Text style={[styles.floatText, { color: '#FF4757' }]}>-0.8%</Text>
                </FloatingElement>
                <FloatingElement delay={1200} duration={4500} style={{ position: 'absolute', bottom: '30%', left: '25%' }}>
                    <Text style={styles.floatSymbol}>₹</Text>
                </FloatingElement>
                <FloatingElement delay={600} duration={6000} style={{ position: 'absolute', bottom: '25%', right: '15%' }}>
                    <Text style={[styles.floatText, { color: '#00D68F' }]}>+12.6%</Text>
                </FloatingElement>
                <FloatingElement delay={1000} duration={5000} style={{ position: 'absolute', top: '45%', left: '10%' }}>
                    <Text style={styles.floatSymbol}>$</Text>
                </FloatingElement>

                {/* Center Logo Area */}
                <Animated.View style={[styles.logoWrapper, logoStyle]}>
                    <AuthLogo size={80} fontSize={28} />
                </Animated.View>

                <Animated.View style={[styles.brandWrapper, textStyle]}>
                    <Text style={styles.brandName}>FINIQ</Text>
                    <Text style={styles.tagline}>Your Money Mind, Sharpened.</Text>
                </Animated.View>
            </View>

            {/* Subtle Loading Indicator */}
            <View style={styles.footer}>
                <Animated.View style={[styles.progressBar, progressStyle]} />
            </View>
        </AuthBackground>
    );
}

// Redundant withRepeat wrapper removed

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrapper: {
        marginBottom: 24,
    },
    brandWrapper: {
        alignItems: 'center',
    },
    brandName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 4,
        textTransform: 'uppercase',
    },
    tagline: {
        marginTop: 6,
        color: 'rgba(255, 255, 255, 0.45)',
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    floatText: {
        fontSize: 10,
        fontWeight: '700',
    },
    floatSymbol: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.08)',
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        alignItems: 'center',
    },
    progressBar: {
        height: 2,
        backgroundColor: '#00D68F',
        borderRadius: 1,
    },
});
