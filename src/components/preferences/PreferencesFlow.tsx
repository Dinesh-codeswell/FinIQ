import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    FadeIn,
    FadeOut
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { PrefHeader } from './PrefHeader';
import { PrefProgress } from './PrefProgress';
import { PrefContinueButton } from './PrefContinueButton';
import { PrefStep1Knowledge } from './PrefStep1Knowledge';
import { PrefStep2Topics } from './PrefStep2Topics';
import { PrefStep3PlayStyle } from './PrefStep3PlayStyle';
import { PrefStep4Mission } from './PrefStep4Mission';
import { PrefStep5Commitment } from './PrefStep5Commitment';
import { PrefStep6Reminder } from './PrefStep6Reminder';
import { PrefLoadingTransition } from './PrefLoadingTransition';
import { SCREEN_ATMOSPHERES } from '@/src/constants/preferenceOptions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useGame } from '@/context/GameContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PreferencesFlowProps {
    onComplete: (data: any) => void;
    username: string;
    avatar: string;
}

export const PreferencesFlow: React.FC<PreferencesFlowProps> = ({ onComplete, username, avatar }) => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [knowledge, setKnowledge] = useState<string | null>(null);
    const [topics, setTopics] = useState<string[]>([]);
    const [playStyle, setPlayStyle] = useState<string[]>([]);
    const [mission, setMission] = useState<string | null>(null);
    const [commitment, setCommitment] = useState<number>(10);
    const [reminderTime, setReminderTime] = useState<string>("20:00");

    const totalSteps = 6;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(s => s + 1);
        } else {
            setIsLoading(true);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(s => s - 1);
        }
    };

    const toggleTopic = (id: string) => {
        setTopics(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
    };

    const togglePlayStyle = (id: string) => {
        setPlayStyle(prev => {
            if (prev.includes(id)) return prev.filter(s => s !== id);
            if (prev.length >= 2) return [prev[1], id];
            return [...prev, id];
        });
    };

    const toggleMission = (id: string) => {
        setMission(id);
    };

    const canContinue = useMemo(() => {
        switch (step) {
            case 1: return knowledge !== null;
            case 2: return topics.length >= 1;
            case 3: return playStyle.length >= 1;
            case 4: return mission !== null;
            case 5: return commitment !== null;
            case 6: return true;
            default: return false;
        }
    }, [step, knowledge, topics, playStyle, mission, commitment]);

    const currentAtmosphere = (SCREEN_ATMOSPHERES as any)[step] || '#000000';

    const bgStyle = useAnimatedStyle(() => ({
        backgroundColor: withTiming(currentAtmosphere, { duration: 400 }),
    }));

    const renderStep = () => {
        switch (step) {
            case 1: return <PrefStep1Knowledge selected={knowledge} onSelect={setKnowledge} />;
            case 2: return <PrefStep2Topics selected={topics} onToggle={toggleTopic} />;
            case 3: return <PrefStep3PlayStyle selected={playStyle} onToggle={togglePlayStyle} />;
            case 4: return <PrefStep4Mission selected={mission ? [mission] : []} onToggle={toggleMission} />;
            case 5: return <PrefStep5Commitment selected={commitment} onSelect={setCommitment} />;
            case 6: return <PrefStep6Reminder time={reminderTime} onSelect={setReminderTime} />;
            default: return null;
        }
    };

    const questions = [
        "Where are you starting from?",
        "What's your financial world? Pick all that call to you.",
        "What's your fight style in the arena?",
        "What's the REAL reason you're here?",
        "How much time can you commit to the arena?",
        "When should I remind you to duel? I won't let you forget."
    ];

    if (isLoading) {
        return (
            <PrefLoadingTransition
                topics={topics}
                onComplete={() => onComplete({
                    knowledge, topics, playStyle, mission, commitment, reminderTime
                })}
            />
        );
    }

    return (
        <Animated.View style={[styles.container, bgStyle]}>
            <PrefProgress progress={step / totalSteps} />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headerRow}>
                    {step > 1 && (
                        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                            <ChevronLeft color="rgba(255,255,255,0.5)" size={24} />
                        </TouchableOpacity>
                    )}
                </View>

                <PrefHeader
                    question={questions[step - 1]}
                    step={step}
                    totalSteps={totalSteps}
                />

                <View style={styles.content}>
                    {renderStep()}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.reassurance}>You can change this anytime in settings.</Text>
                    <PrefContinueButton
                        enabled={canContinue}
                        onPress={handleNext}
                        label={step === totalSteps ? "START MY FINANCIAL JOURNEY →" : "CONTINUE"}
                    />
                </View>
            </SafeAreaView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    headerRow: {
        height: 40,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        alignItems: 'center',
    },
    reassurance: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.35)',
        marginBottom: 16,
    },
});
