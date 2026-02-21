import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolateColor,
    interpolate,
    withTiming,
    runOnJS,
    useAnimatedScrollHandler
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { TrendingUp, Target, Swords, ArrowRight, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { AVATAR_EMOJIS, AVATARS } from '@/constants/divisions';

import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { OnboardingCTA } from '@/components/onboarding/OnboardingCTA';
import { Slide1Arena } from '@/components/onboarding/Slide1Arena';
import { Slide2Weapon } from '@/components/onboarding/Slide2Weapon';
import { Slide3Glory } from '@/components/onboarding/Slide3Glory';
import { PreferencesFlow } from '@/src/components/preferences/PreferencesFlow';
import { ONBOARDING_CONFIG } from '@/src/constants/onboardingConfig';
import { Accelerometer } from 'expo-sensors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CTA_HEIGHT = 180;

type Step = 'carousel' | 'username' | 'preferences';

const TOPICS = ['Investing', 'Personal Finance', 'Crypto', 'Banking', 'Economics'];

export default function OnboardingScreen() {
    const router = useRouter();
    const { completeOnboarding } = useGame();

    const [step, setStep] = useState<Step>('carousel');
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('fox');

    const fadeAnim = useSharedValue(1);
    const slideAnim = useSharedValue(0);

    // Parallax logic
    const scrollX = useSharedValue(0);
    const scrollRef = useRef<ScrollView>(null);

    const containerStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            scrollX.value,
            [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
            [
                ONBOARDING_CONFIG.colors.slide1.bg,
                ONBOARDING_CONFIG.colors.slide2.bg,
                ONBOARDING_CONFIG.colors.slide3.bg
            ]
        );
        return {
            backgroundColor: step === 'carousel' ? backgroundColor : Colors.background,
            flex: 1
        };
    });

    const contentAnimatedStyle = useAnimatedStyle(() => ({
        opacity: fadeAnim.value,
        transform: [{ translateY: slideAnim.value }],
        flex: 1,
    }));

    const animateTransition = (callback: () => void) => {
        fadeAnim.value = withTiming(0, { duration: 150 }, () => {
            runOnJS(callback)();
            slideAnim.value = 30;
            fadeAnim.value = 0;
            fadeAnim.value = withTiming(1, { duration: 250 });
            slideAnim.value = withTiming(0, { duration: 250 });
        });
    };

    const suggestedHandle = `@${avatar === 'bull' ? 'Bull' : avatar === 'bear' ? 'Bear' : avatar === 'owl' ? 'Owl' : avatar === 'wolf' ? 'Wolf' : 'Fox'}Rider_${Math.floor(Math.random() * 99)}`;

    const nextCarousel = () => {
        if (carouselIndex < 2) {
            scrollRef.current?.scrollTo({ x: (carouselIndex + 1) * SCREEN_WIDTH, animated: true });
        } else {
            animateTransition(() => setStep('username'));
        }
    };

    const updateCarouselIndex = (index: number) => {
        if (index !== carouselIndex) {
            setCarouselIndex(index);
        }
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
            const index = Math.round(event.contentOffset.x / SCREEN_WIDTH);
            runOnJS(updateCarouselIndex)(index);
        },
    });

    const nextQuiz = () => {
        if (Platform.OS !== 'web') Haptics.selectionAsync();
        if (step === 'carousel') animateTransition(() => setStep('username'));
        else if (step === 'username') {
            if (!username.trim()) return;
            animateTransition(() => setStep('preferences'));
        }
    };

    const handlePreferencesComplete = (data: any) => {
        if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        // Starting ELO based on knowledge
        let elo = 1000;
        if (data.knowledge === 'recruit') elo = 900;
        else if (data.knowledge === 'strategist') elo = 1100;

        completeOnboarding(
            username.trim(),
            avatar,
            elo,
            data.topics,
            data.commitment
        );

        router.replace('/(tabs)' as any);
    };

    return (
        <Animated.View style={containerStyle}>
            <SafeAreaView style={styles.safeArea} edges={step === 'preferences' ? [] : ['top', 'bottom']}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <Animated.View style={contentAnimatedStyle}>
                        {step === 'carousel' && (
                            <View style={styles.carouselContainer}>
                                <OnboardingProgress currentIndex={carouselIndex} />

                                <TouchableOpacity
                                    onPress={() => setStep('username')}
                                    style={styles.skipBtn}
                                >
                                    <Text style={styles.skipText}>Skip</Text>
                                </TouchableOpacity>

                                <Animated.ScrollView
                                    ref={scrollRef as any}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={scrollHandler}
                                    scrollEventThrottle={1}
                                    style={styles.pager}
                                >
                                    <Slide1Arena
                                        index={0}
                                        scrollX={scrollX}
                                        isVisible={carouselIndex === 0}
                                    />
                                    <Slide2Weapon
                                        index={1}
                                        scrollX={scrollX}
                                        isVisible={carouselIndex === 1}
                                    />
                                    <Slide3Glory
                                        index={2}
                                        scrollX={scrollX}
                                        isVisible={carouselIndex === 2}
                                    />
                                </Animated.ScrollView>

                                <OnboardingCTA
                                    currentIndex={carouselIndex}
                                    onNext={nextCarousel}
                                    onSignIn={() => router.push('/signin')}
                                />
                            </View>
                        )}

                        {step === 'username' && (
                            <ScrollView style={styles.flex} contentContainerStyle={styles.usernameContainer} keyboardShouldPersistTaps="handled">
                                <Text style={styles.quizTitle}>Create your handle</Text>
                                <Text style={styles.quizHint}>This is how other players will see you</Text>

                                <View style={styles.avatarPicker}>
                                    {AVATARS.map(a => (
                                        <TouchableOpacity
                                            key={a}
                                            style={[styles.avatarOption, avatar === a && styles.avatarOptionActive]}
                                            onPress={() => { setAvatar(a); if (Platform.OS !== 'web') Haptics.selectionAsync(); }}
                                        >
                                            <Text style={styles.avatarOptionEmoji}>{AVATAR_EMOJIS[a]}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <View style={styles.inputWrap}>
                                    <Text style={styles.inputAt}>@</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={username}
                                        onChangeText={setUsername}
                                        placeholder="YourHandle"
                                        placeholderTextColor={Colors.textTertiary}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        maxLength={20}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => setUsername(suggestedHandle.replace('@', ''))}>
                                    <Text style={styles.suggestion}>Suggestion: {suggestedHandle}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.primaryBtn, styles.finishBtn, !username.trim() && styles.btnDisabled]}
                                    onPress={nextQuiz}
                                    disabled={!username.trim()}
                                >
                                    <Text style={styles.primaryBtnText}>CONTINUE</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        )}

                        {step === 'preferences' && (
                            <PreferencesFlow
                                username={username}
                                avatar={avatar}
                                onComplete={handlePreferencesComplete}
                            />
                        )}
                    </Animated.View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    carouselContainer: {
        flex: 1,
    },
    skipBtn: {
        position: 'absolute',
        top: 20,
        right: 24,
        zIndex: 110,
        padding: 8,
    },
    skipText: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: 13,
        fontWeight: '600',
    },
    pager: {
        flex: 1,
    },
    primaryBtn: {
        backgroundColor: Colors.accent,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 14,
        gap: 6,
        width: '100%',
    },
    primaryBtnText: {
        color: Colors.background,
        fontSize: 15,
        fontWeight: '800' as const,
        letterSpacing: 1.5,
    },
    btnDisabled: {
        opacity: 0.4,
    },
    quizContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 24,
    },
    quizStep: {
        color: Colors.accent,
        fontSize: 12,
        fontWeight: '700' as const,
        letterSpacing: 2,
        marginBottom: 12,
    },
    quizTitle: {
        color: Colors.textPrimary,
        fontSize: 24,
        fontWeight: '800' as const,
        marginBottom: 8,
        lineHeight: 32,
    },
    quizHint: {
        color: Colors.textSecondary,
        fontSize: 13,
        marginBottom: 20,
    },
    quizOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    quizOptionActive: {
        borderColor: Colors.accent,
        backgroundColor: Colors.accentDim,
    },
    quizOptionLabel: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '700' as const,
        marginBottom: 2,
    },
    quizOptionLabelActive: {
        color: Colors.accent,
    },
    quizOptionDesc: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    checkDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.accent,
    },
    quizBtn: {
        marginTop: 24,
    },
    topicsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 8,
    },
    topicChip: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: Colors.cardBackground,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    topicChipActive: {
        borderColor: Colors.accent,
        backgroundColor: Colors.accentDim,
    },
    topicChipText: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '600' as const,
    },
    topicChipTextActive: {
        color: Colors.accent,
    },
    usernameContainer: {
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    avatarPicker: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginVertical: 24,
    },
    avatarOption: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.border,
    },
    avatarOptionActive: {
        borderColor: Colors.accent,
        backgroundColor: Colors.accentDim,
    },
    avatarOptionEmoji: {
        fontSize: 26,
    },
    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: 14,
        paddingHorizontal: 16,
        borderWidth: 1.5,
        borderColor: Colors.border,
        marginBottom: 8,
    },
    inputAt: {
        color: Colors.textSecondary,
        fontSize: 18,
        fontWeight: '700' as const,
        marginRight: 4,
    },
    input: {
        flex: 1,
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '600' as const,
        paddingVertical: 16,
    },
    suggestion: {
        color: Colors.accent,
        fontSize: 12,
        fontWeight: '500' as const,
        marginBottom: 24,
        textAlign: 'center',
    },
    finishBtn: {
        marginTop: 8,
    },
});
