import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ArrowRight, Check, X } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import AuthBackground from '@/src/components/auth/AuthBackground';
import { useGame } from '@/context/GameContext';
import { AVATAR_EMOJIS } from '@/constants/divisions';

const AVATARS = [
    '🦊', '🦉', '🐺', '🐻', '🐂', '🐨', '🐯', '🦅'
];

const SUGGESTIONS = ['@TrendRider', '@MarketFox', '@BondKing', '@EquityEdge', '@QuantWolf'];

export default function UsernameScreen() {
    const router = useRouter();
    const { profile, updateProfile } = useGame();
    const [username, setUsername] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('🦊');
    const [checking, setChecking] = useState(false);
    const [available, setAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        if (username.length > 2) {
            setChecking(true);
            const timer = setTimeout(() => {
                setChecking(false);
                setAvailable(Math.random() > 0.3); // Mock availability check
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setAvailable(null);
        }
    }, [username]);

    const handleFinish = () => {
        updateProfile({
            username: username || 'Player',
            avatar: selectedAvatar as any,
            onboardingCompleted: true
        });
        router.replace('/(tabs)' as any);
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
                            <Text style={styles.stepText}>Step 2 of 3</Text>
                            <View style={styles.dots}>
                                <View style={[styles.dot, styles.dotActive]} />
                                <View style={[styles.dot, styles.dotActive]} />
                                <View style={styles.dot} />
                            </View>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Animated.View entering={FadeInDown.delay(200)} style={styles.titleBlock}>
                            <Text style={styles.titleLight}>Choose Your</Text>
                            <Text style={styles.titleBold}>Arena Name</Text>
                            <Text style={styles.subtitle}>This is how you'll appear to opponents.</Text>
                        </Animated.View>

                        <View style={styles.form}>
                            {/* Username Field */}
                            <View style={styles.inputGroup}>
                                <View style={styles.usernameInputWrapper}>
                                    <Text style={styles.atSymbol}>@</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="username"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        value={username}
                                        onChangeText={setUsername}
                                        autoCapitalize="none"
                                        maxLength={15}
                                    />
                                </View>

                                {checking && (
                                    <Text style={styles.checkText}>Checking availability...</Text>
                                )}
                                {available === true && (
                                    <View style={styles.statusRow}>
                                        <Check size={14} color="#00D68F" />
                                        <Text style={[styles.statusText, { color: '#00D68F' }]}>
                                            @{username} is available!
                                        </Text>
                                    </View>
                                )}
                                {available === false && (
                                    <View style={styles.statusRow}>
                                        <X size={14} color="#FF4757" />
                                        <Text style={[styles.statusText, { color: '#FF4757' }]}>
                                            Username taken. Try {SUGGESTIONS[0]}?
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Suggestions */}
                            <View style={styles.suggestions}>
                                {SUGGESTIONS.slice(0, 3).map((s) => (
                                    <TouchableOpacity
                                        key={s}
                                        style={styles.suggestionPill}
                                        onPress={() => setUsername(s.replace('@', ''))}
                                    >
                                        <Text style={styles.suggestionText}>{s}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Avatar Selection */}
                            <View style={styles.avatarSection}>
                                <Text style={styles.sectionLabel}>PICK YOUR AVATAR</Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.avatarList}
                                >
                                    {AVATARS.map((emoji) => {
                                        const isSelected = selectedAvatar === emoji;
                                        return (
                                            <TouchableOpacity
                                                key={emoji}
                                                onPress={() => setSelectedAvatar(emoji)}
                                                style={[
                                                    styles.avatarItem,
                                                    isSelected && styles.avatarSelected
                                                ]}
                                            >
                                                <Text style={styles.avatarEmoji}>{emoji}</Text>
                                                {isSelected && (
                                                    <View style={styles.avatarCheck}>
                                                        <Check size={10} color="#000000" />
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            </View>

                            <TouchableOpacity
                                style={[styles.finishButton, (!username || available !== true) && styles.finishButtonDisabled]}
                                onPress={handleFinish}
                                disabled={!username || available !== true}
                            >
                                <Text style={styles.finishButtonText}>Join the Arena</Text>
                                <ArrowRight size={18} color="#000000" />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
        marginRight: 44,
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
        gap: 12,
    },
    usernameInputWrapper: {
        height: 64,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    atSymbol: {
        color: '#00D68F',
        fontSize: 24,
        fontWeight: '700',
        marginRight: 4,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
    },
    checkText: {
        color: '#F5A623',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginLeft: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    suggestions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    suggestionPill: {
        backgroundColor: 'rgba(0, 214, 143, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 214, 143, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    suggestionText: {
        color: '#00D68F',
        fontSize: 12,
        fontWeight: '600',
    },
    avatarSection: {
        marginTop: 12,
        gap: 16,
    },
    sectionLabel: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
    },
    avatarList: {
        gap: 16,
        paddingVertical: 10,
    },
    avatarItem: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        opacity: 0.6,
    },
    avatarSelected: {
        opacity: 1,
        borderColor: '#00D68F',
        borderWidth: 2,
        transform: [{ scale: 1.1 }],
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    avatarEmoji: {
        fontSize: 32,
    },
    avatarCheck: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        backgroundColor: '#00D68F',
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    finishButton: {
        height: 56,
        backgroundColor: '#00D68F',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 20,
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
    finishButtonDisabled: {
        opacity: 0.5,
    },
    finishButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
    },
});
