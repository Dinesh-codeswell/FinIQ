import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import AuthBackground from '@/src/components/auth/AuthBackground';
import AuthLogo from '@/src/components/auth/AuthLogo';
import MosaicGrid from '@/src/components/auth/MosaicGrid';
import { authService } from '@/src/services/authService';
import Colors from '@/constants/colors';
import { Shield } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        const { data, error } = await authService.signInWithGoogle();
        if (error) {
            alert(error.message);
        } else if (data?.session) {
            router.replace('/(tabs)' as any);
        }
    };

    return (
        <AuthBackground>
            <SafeAreaView style={styles.container}>
                <View style={styles.mosaicWrapper}>
                    <MosaicGrid />
                </View>

                <View style={styles.content}>
                    <Animated.View entering={FadeIn.delay(200)} style={styles.logoBlock}>
                        <AuthLogo size={56} fontSize={20} />
                        <Text style={styles.brandName}>FINIQ</Text>
                    </Animated.View>

                    <View style={styles.headlineBlock}>
                        <Animated.Text entering={FadeInDown.delay(450)} style={styles.headlineLight}>
                            Sharpen Your
                        </Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(550)} style={styles.headlineBold}>
                            Money Mind.
                        </Animated.Text>
                        <Animated.Text entering={FadeIn.delay(650)} style={styles.tagline}>
                            COMPETE. LEARN. DOMINATE.
                        </Animated.Text>
                    </View>

                    <Animated.View entering={FadeIn.delay(750)} style={styles.socialProof}>
                        <Text style={styles.socialProofText}>
                            🔥 Join 12,400+ players sharpening their finance IQ
                        </Text>
                    </Animated.View>
                </View>

                <View style={styles.ctaSection}>
                    <Animated.View entering={FadeInUp.delay(1100)} style={styles.legalBlock}>
                        <Text style={styles.legalText}>
                            By continuing, you agree to our{' '}
                            <Text style={styles.legalLink} onPress={() => Linking.openURL('https://finiq.app/terms')}>Terms of Use</Text>
                            {' '}and{' '}
                            <Text style={styles.legalLink} onPress={() => Linking.openURL('https://finiq.app/privacy')}>Privacy Policy</Text>.
                        </Text>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(900)} style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => router.push('/signup' as any)}
                        >
                            <Text style={styles.primaryButtonText}>Create Account</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={handleGoogleSignIn}
                        >
                            <View style={styles.googleIconPlaceholder} />
                            <Text style={styles.googleButtonText}>Continue with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.signInLink}
                            onPress={() => router.push('/signin' as any)}
                        >
                            <Text style={styles.signInText}>
                                Already have an account? <Text style={styles.signInHighlight}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </AuthBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mosaicWrapper: {
        height: '40%',
        width: '100%',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -40,
    },
    logoBlock: {
        alignItems: 'center',
        marginBottom: 24,
    },
    brandName: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: 2,
        marginTop: 10,
    },
    headlineBlock: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headlineLight: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 34,
        fontWeight: '300',
        textAlign: 'center',
    },
    headlineBold: {
        color: '#FFFFFF',
        fontSize: 38,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    tagline: {
        color: '#00D68F',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 3,
        marginTop: 8,
        textTransform: 'uppercase',
    },
    socialProof: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    socialProofText: {
        color: 'rgba(255, 255, 255, 0.45)',
        fontSize: 11,
        fontWeight: '500',
    },
    ctaSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    legalBlock: {
        marginBottom: 20,
        alignItems: 'center',
    },
    legalText: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 11,
        textAlign: 'center',
        lineHeight: 16,
    },
    legalLink: {
        color: 'rgba(0, 214, 143, 0.6)',
    },
    buttons: {
        gap: 12,
    },
    primaryButton: {
        height: 56,
        backgroundColor: '#00D68F',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
    primaryButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
    },
    googleButton: {
        height: 56,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    googleIconPlaceholder: {
        width: 20,
        height: 20,
        backgroundColor: '#FFFFFF', // Replace with real SVG later
        borderRadius: 4,
    },
    googleButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
    },
    signInLink: {
        marginTop: 8,
        alignItems: 'center',
    },
    signInText: {
        color: 'rgba(255, 255, 255, 0.45)',
        fontSize: 14,
    },
    signInHighlight: {
        color: '#00D68F',
        fontWeight: '600',
    },
});
