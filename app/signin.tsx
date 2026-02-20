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
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import AuthBackground from '@/src/components/auth/AuthBackground';
import { supabase } from '@/src/services/supabase';
import { authService } from '@/src/services/authService';
import { useGame } from '@/context/GameContext';

export default function SignInScreen() {
    const router = useRouter();
    const { division } = useGame();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSignIn = async () => {
        if (!email || !password) return;
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.replace('/(tabs)' as any);
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
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Animated.View entering={FadeInDown.delay(200)} style={styles.titleBlock}>
                            <Text style={styles.titleLight}>Welcome back,</Text>
                            <Text style={[styles.titleBold, { color: '#00D68F' }]}>
                                {division.title.split(' ')[0]}.
                            </Text>
                        </Animated.View>

                        <View style={styles.form}>
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
                                        placeholder="Enter your password"
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
                                <TouchableOpacity style={styles.forgotBtn}>
                                    <Text style={styles.forgotText}>Forgot password?</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[styles.signInButton, (!email || !password || loading) && styles.signInButtonDisabled]}
                                onPress={handleSignIn}
                                disabled={loading}
                            >
                                <Text style={styles.signInButtonText}>Sign In</Text>
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
                        <TouchableOpacity onPress={() => router.push('/signup' as any)}>
                            <Text style={styles.footerText}>
                                New to FINIQ? <Text style={styles.footerHighlight}>Create Account</Text>
                            </Text>
                        </TouchableOpacity>
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
        paddingHorizontal: 16,
        height: 60,
        justifyContent: 'center',
    },
    backButton: {
        padding: 8,
        width: 44,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    titleBlock: {
        marginBottom: 40,
    },
    titleLight: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 24,
        fontWeight: '300',
    },
    titleBold: {
        fontSize: 32,
        fontWeight: '800',
        marginTop: 2,
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
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeButton: {
        position: 'absolute',
        right: 16,
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    forgotText: {
        color: '#00D68F',
        fontSize: 12,
        fontWeight: '600',
    },
    signInButton: {
        height: 56,
        backgroundColor: '#00D68F',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
    signInButtonDisabled: {
        opacity: 0.5,
    },
    signInButtonText: {
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
        color: 'rgba(255, 255, 255, 0.45)',
        fontSize: 14,
    },
    footerHighlight: {
        color: '#00D68F',
        fontWeight: '600',
    },
});
