import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import AuthBackground from '@/src/components/auth/AuthBackground';
import { supabase } from '@/src/services/supabase';
import { authService } from '@/src/services/authService';

export default function SignUpScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const getPasswordStrength = () => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        return strength;
    };

    const strength = getPasswordStrength();
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['#FF4757', '#F5A623', '#F5A623', '#00D68F'];

    const handleSignUp = async () => {
        if (!email || !password) return;
        setLoading(true);
        try {
            // Supabase Signup logic
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            // Navigate to Step 2: Username
            router.push('/username' as any);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

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
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <ChevronLeft color="rgba(255,255,255,0.6)" size={28} />
                        </TouchableOpacity>

                        <View style={styles.stepIndicator}>
                            <Text style={styles.stepText}>Step 1 of 3</Text>
                            <View style={styles.dots}>
                                <View style={[styles.dot, styles.dotActive]} />
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                            </View>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Animated.View entering={FadeInDown.delay(200)} style={styles.titleBlock}>
                            <Text style={styles.titleLight}>Create your</Text>
                            <Text style={styles.titleBold}>FINIQ Account</Text>
                            <Text style={styles.subtitle}>Join 12,400+ players on the arena.</Text>
                        </Animated.View>

                        <View style={styles.form}>
                            {/* Email Field */}
                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <Mail size={12} color="rgba(255,255,255,0.5)" />
                                    <Text style={styles.label}>EMAIL</Text>
                                </View>
                                <TextInput
                                    style={[
                                        styles.input,
                                        focusedField === 'email' && styles.inputFocused
                                    ]}
                                    placeholder="your@email.com"
                                    placeholderTextColor="rgba(255,255,255,0.3)"
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Password Field */}
                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <Lock size={12} color="rgba(255,255,255,0.5)" />
                                    <Text style={styles.label}>PASSWORD</Text>
                                </View>
                                <View style={styles.passwordWrapper}>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            focusedField === 'password' && styles.inputFocused,
                                            { flex: 1 }
                                        ]}
                                        placeholder="Min. 8 characters"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        value={password}
                                        onChangeText={setPassword}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeButton}
                                    >
                                        {showPassword ? <EyeOff size={20} color="rgba(255,255,255,0.4)" /> : <Eye size={20} color="rgba(255,255,255,0.4)" />}
                                    </TouchableOpacity>
                                </View>

                                {/* Password Strength */}
                                {password.length > 0 && (
                                    <View style={styles.strengthContainer}>
                                        <View style={styles.strengthBarBackground}>
                                            <Animated.View
                                                style={[
                                                    styles.strengthBarFill,
                                                    {
                                                        width: `${(strength / 4) * 100}%`,
                                                        backgroundColor: strengthColors[strength - 1] || '#FF4757'
                                                    }
                                                ]}
                                            />
                                        </View>
                                        <Text style={[styles.strengthLabel, { color: strengthColors[strength - 1] || '#FF4757' }]}>
                                            {strengthLabels[strength - 1] || 'Weak'}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            <TouchableOpacity
                                style={[styles.continueButton, (!email || password.length < 8 || loading) && styles.continueButtonDisabled]}
                                onPress={handleSignUp}
                                disabled={loading}
                            >
                                <Text style={styles.continueButtonText}>Continue</Text>
                                <ArrowRight size={18} color="#000000" />
                            </TouchableOpacity>

                            <View style={styles.divider}>
                                <View style={styles.line} />
                                <Text style={styles.dividerText}>OR</Text>
                                <View style={styles.line} />
                            </View>

                            <TouchableOpacity
                                style={styles.googleButton}
                                onPress={handleGoogleSignIn}
                            >
                                <View style={styles.googleIconPlaceholder} />
                                <Text style={styles.googleButtonText}>Continue with Google</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            By continuing, you agree to our Terms of Use and Privacy Policy.
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </AuthBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
    },
    backButton: {
        padding: 8,
    },
    stepIndicator: {
        alignItems: 'center',
        marginRight: 44, // Offset for back button to center step indicator
    },
    stepText: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4,
    },
    dots: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    dotActive: {
        backgroundColor: '#00D68F',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    titleBlock: {
        marginBottom: 40,
    },
    titleLight: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 28,
        fontWeight: '300',
    },
    titleBold: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '800',
        marginTop: 2,
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.45)',
        fontSize: 13,
        marginTop: 8,
    },
    form: {
        gap: 24,
    },
    inputGroup: {
        gap: 8,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingLeft: 4,
    },
    label: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 1,
    },
    input: {
        height: 52,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: '#FFFFFF',
        fontSize: 15,
        paddingHorizontal: 16,
    },
    inputFocused: {
        borderColor: '#00D68F',
        backgroundColor: 'rgba(0, 214, 143, 0.05)',
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeButton: {
        position: 'absolute',
        right: 16,
    },
    strengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 4,
    },
    strengthBarBackground: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
    },
    strengthBarFill: {
        height: '100%',
        borderRadius: 2,
    },
    strengthLabel: {
        fontSize: 11,
        fontWeight: '600',
        width: 40,
    },
    continueButton: {
        height: 56,
        backgroundColor: '#00D68F',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 12,
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
    continueButtonDisabled: {
        opacity: 0.5,
    },
    continueButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginVertical: 8,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    dividerText: {
        color: 'rgba(255, 255, 255, 0.2)',
        fontSize: 12,
        fontWeight: '600',
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
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
    },
    googleButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
    },
    footer: {
        padding: 24,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 11,
        textAlign: 'center',
    },
});
