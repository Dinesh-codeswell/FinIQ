import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { ChevronRight, Zap, TrendingUp, BarChart2, Target, Swords, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { AVATAR_EMOJIS, AVATARS } from '@/constants/divisions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Step = 'carousel' | 'quiz1' | 'quiz2' | 'quiz3' | 'username';

const CAROUSEL_SLIDES = [
    {
        emoji: '⚔️',
        title: 'Duel friends on finance.',
        subtitle: 'Win real knowledge.',
        icon: <Zap {...({ size: 28, color: Colors.accent } as any)} />,
    },
    {
        emoji: '📈',
        title: 'Master money math.',
        subtitle: 'Grow your rating.',
        icon: <TrendingUp {...({ size: 28, color: Colors.accent } as any)} />,
    },
    {
        emoji: '🌍',
        title: 'Daily market challenges.',
        subtitle: 'Stay ahead.',
        icon: <BarChart2 {...({ size: 28, color: Colors.accent } as any)} />,
    },
];

const features = [
    {
        icon: <Target {...({ size: 32, color: Colors.accent } as any)} />,
        title: "Daily Challenges",
        description: "Test your financial knowledge with new scenarios every day."
    },
    {
        icon: <Swords {...({ size: 32, color: Colors.scenarioBlue } as any)} />,
        title: "Live Duels",
        description: "Compete against friends and players worldwide in real-time."
    },
    {
        icon: <TrendingUp {...({ size: 32, color: Colors.xpGold } as any)} />,
        title: "Track Growth",
        description: "Climb the ranks and earn badges as you master concepts."
    }
];

const TOPICS = ['Investing', 'Personal Finance', 'Crypto', 'Banking', 'Economics'];

export default function OnboardingScreen() {
    const router = useRouter();
    const { completeOnboarding } = useGame();

    const [step, setStep] = useState<Step>('carousel');
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<number>(1);
    const [interests, setInterests] = useState<string[]>([]);
    const [sessionLength, setSessionLength] = useState<number>(5);
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('fox');

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const animateTransition = (callback: () => void) => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
            callback();
            slideAnim.setValue(30);
            fadeAnim.setValue(0);
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
                Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
            ]).start();
        });
    };

    const nextCarousel = () => {
        if (Platform.OS !== 'web') Haptics.selectionAsync();
        if (carouselIndex < 2) {
            animateTransition(() => setCarouselIndex(carouselIndex + 1));
        } else {
            animateTransition(() => setStep('quiz1'));
        }
    };

    const nextQuiz = () => {
        if (Platform.OS !== 'web') Haptics.selectionAsync();
        if (step === 'quiz1') animateTransition(() => setStep('quiz2'));
        else if (step === 'quiz2') animateTransition(() => setStep('quiz3'));
        else if (step === 'quiz3') animateTransition(() => setStep('username'));
    };

    const toggleInterest = (topic: string) => {
        if (Platform.OS !== 'web') Haptics.selectionAsync();
        setInterests(prev =>
            prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
        );
    };

    const handleFinish = () => {
        if (!username.trim()) return;
        if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        completeOnboarding(username.trim(), avatar, difficulty, interests, sessionLength);
        router.replace('/');
    };

    const suggestedHandle = `@${avatar === 'bull' ? 'Bull' : avatar === 'bear' ? 'Bear' : avatar === 'owl' ? 'Owl' : avatar === 'wolf' ? 'Wolf' : 'Fox'}Rider_${Math.floor(Math.random() * 99)}`;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                        {step === 'carousel' && (
                            <View style={styles.carouselContainer}>
                                <View style={styles.arrowContainer}>
                                    <ArrowRight {...({ size: 24, color: '#000' } as any)} />
                                </View>
                                <View style={styles.carouselTop}>
                                    <Text style={styles.logo}>FINIQ</Text>
                                    <Text style={styles.tagline}>Your Money Mind, Sharpened Daily.</Text>
                                </View>

                                <View style={styles.slideContent}>
                                    <Text style={styles.slideEmoji}>{CAROUSEL_SLIDES[carouselIndex].emoji}</Text>
                                    {CAROUSEL_SLIDES[carouselIndex].icon}
                                    <Text style={styles.slideTitle}>{CAROUSEL_SLIDES[carouselIndex].title}</Text>
                                    <Text style={styles.slideSubtitle}>{CAROUSEL_SLIDES[carouselIndex].subtitle}</Text>
                                </View>

                                <View style={styles.carouselBottom}>
                                    <View style={styles.dots}>
                                        {[0, 1, 2].map(i => (
                                            <View key={i} style={[styles.dot, i === carouselIndex && styles.dotActive]} />
                                        ))}
                                    </View>
                                    <TouchableOpacity style={styles.primaryBtn} onPress={nextCarousel}>
                                        <Text style={styles.primaryBtnText}>
                                            {carouselIndex < 2 ? 'NEXT' : 'GET STARTED'}
                                        </Text>
                                        <ChevronRight size={18} color={Colors.background} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {step === 'quiz1' && (
                            <View style={styles.quizContainer}>
                                <Text style={styles.quizStep}>1 OF 3</Text>
                                <Text style={styles.quizTitle}>What's your current finance knowledge?</Text>
                                {[
                                    { label: 'Beginner', desc: 'Just starting out', value: 1 },
                                    { label: 'Intermediate', desc: 'Know the basics well', value: 2 },
                                    { label: 'Advanced', desc: 'Deep market knowledge', value: 3 },
                                ].map(opt => (
                                    <TouchableOpacity
                                        key={opt.value}
                                        style={[styles.quizOption, difficulty === opt.value && styles.quizOptionActive]}
                                        onPress={() => { setDifficulty(opt.value); if (Platform.OS !== 'web') Haptics.selectionAsync(); }}
                                    >
                                        <View>
                                            <Text style={[styles.quizOptionLabel, difficulty === opt.value && styles.quizOptionLabelActive]}>
                                                {opt.label}
                                            </Text>
                                            <Text style={styles.quizOptionDesc}>{opt.desc}</Text>
                                        </View>
                                        {difficulty === opt.value && <View style={styles.checkDot} />}
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={[styles.primaryBtn, styles.quizBtn]} onPress={nextQuiz}>
                                    <Text style={styles.primaryBtnText}>CONTINUE</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {step === 'quiz2' && (
                            <View style={styles.quizContainer}>
                                <Text style={styles.quizStep}>2 OF 3</Text>
                                <Text style={styles.quizTitle}>What topics interest you most?</Text>
                                <Text style={styles.quizHint}>Select all that apply</Text>
                                <View style={styles.topicsGrid}>
                                    {TOPICS.map(topic => (
                                        <TouchableOpacity
                                            key={topic}
                                            style={[styles.topicChip, interests.includes(topic) && styles.topicChipActive]}
                                            onPress={() => toggleInterest(topic)}
                                        >
                                            <Text style={[styles.topicChipText, interests.includes(topic) && styles.topicChipTextActive]}>
                                                {topic}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TouchableOpacity
                                    style={[styles.primaryBtn, styles.quizBtn, interests.length === 0 && styles.btnDisabled]}
                                    onPress={nextQuiz}
                                    disabled={interests.length === 0}
                                >
                                    <Text style={styles.primaryBtnText}>CONTINUE</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {step === 'quiz3' && (
                            <View style={styles.quizContainer}>
                                <Text style={styles.quizStep}>3 OF 3</Text>
                                <Text style={styles.quizTitle}>How long do you want daily sessions?</Text>
                                {[
                                    { label: '5 min', desc: 'Quick daily sharpening', value: 5 },
                                    { label: '10 min', desc: 'Balanced practice', value: 10 },
                                    { label: '15 min', desc: 'Deep daily training', value: 15 },
                                ].map(opt => (
                                    <TouchableOpacity
                                        key={opt.value}
                                        style={[styles.quizOption, sessionLength === opt.value && styles.quizOptionActive]}
                                        onPress={() => { setSessionLength(opt.value); if (Platform.OS !== 'web') Haptics.selectionAsync(); }}
                                    >
                                        <View>
                                            <Text style={[styles.quizOptionLabel, sessionLength === opt.value && styles.quizOptionLabelActive]}>
                                                {opt.label}
                                            </Text>
                                            <Text style={styles.quizOptionDesc}>{opt.desc}</Text>
                                        </View>
                                        {sessionLength === opt.value && <View style={styles.checkDot} />}
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={[styles.primaryBtn, styles.quizBtn]} onPress={nextQuiz}>
                                    <Text style={styles.primaryBtnText}>CONTINUE</Text>
                                </TouchableOpacity>
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
                                    onPress={handleFinish}
                                    disabled={!username.trim()}
                                >
                                    <Text style={styles.primaryBtnText}>ENTER THE ARENA</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    </Animated.View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    carouselContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    carouselTop: {
        alignItems: 'center',
        paddingTop: 40,
    },
    logo: {
        color: Colors.textPrimary,
        fontSize: 42,
        fontWeight: '900' as const,
        letterSpacing: 6,
    },
    tagline: {
        color: Colors.textSecondary,
        fontSize: 13,
        marginTop: 6,
        letterSpacing: 0.5,
    },
    slideContent: {
        alignItems: 'center',
        gap: 12,
    },
    slideEmoji: {
        fontSize: 56,
        marginBottom: 8,
    },
    slideTitle: {
        color: Colors.textPrimary,
        fontSize: 24,
        fontWeight: '800' as const,
        textAlign: 'center',
        marginTop: 8,
    },
    slideSubtitle: {
        color: Colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
    },
    carouselBottom: {
        alignItems: 'center',
        paddingBottom: 40,
        gap: 24,
    },
    dots: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.border,
    },
    dotActive: {
        width: 24,
        backgroundColor: Colors.accent,
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
    arrowContainer: {
        position: 'absolute',
        top: 60,
        right: 0,
        opacity: 0.1,
        transform: [{ rotate: '-15deg' }],
    },
});
