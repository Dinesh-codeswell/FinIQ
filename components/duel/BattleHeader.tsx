import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
    withDelay,
    withRepeat,
    Easing,
} from 'react-native-reanimated';
import { AVATAR_EMOJIS } from '@/constants/divisions';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface BattleHeaderProps {
    playerScore: number;
    botScore: number;
    timeLeft: number;
    totalDuration: number;
    currentIndex: number;
    totalQuestions: number;
    playerAvatar: string;
    botAvatar: string;
    botName: string;
    isThinking: boolean;
}

export default function BattleHeader({
    playerScore,
    botScore,
    timeLeft,
    totalDuration,
    currentIndex,
    totalQuestions,
    playerAvatar,
    botAvatar,
    botName,
    isThinking,
}: BattleHeaderProps) {
    const playerScale = useSharedValue(1);
    const botScale = useSharedValue(1);
    const timerWidth = useSharedValue(1);

    useEffect(() => {
        timerWidth.value = withTiming(Math.max(0, timeLeft / totalDuration), {
            duration: 400,
            easing: Easing.out(Easing.cubic),
        });
    }, [timeLeft, totalDuration]);

    const prevScore = React.useRef(playerScore);
    const prevBotScore = React.useRef(botScore);
    useEffect(() => {
        if (playerScore > prevScore.current) {
            playerScale.value = withSequence(
                withSpring(1.35, { damping: 10, stiffness: 400 }),
                withSpring(1)
            );
        }
        prevScore.current = playerScore;
    }, [playerScore]);

    useEffect(() => {
        if (botScore > prevBotScore.current) {
            botScale.value = withSequence(
                withSpring(1.35, { damping: 10, stiffness: 400 }),
                withSpring(1)
            );
        }
        prevBotScore.current = botScore;
    }, [botScore]);

    const timerPercent = Math.max(0, timeLeft / totalDuration);
    const timerColor = timeLeft <= 10 ? '#FF4757' : timeLeft <= 30 ? '#F5A623' : '#00D68F';

    const playerScoreStyle = useAnimatedStyle(() => ({
        transform: [{ scale: playerScale.value }],
    }));
    const botScoreStyle = useAnimatedStyle(() => ({
        transform: [{ scale: botScale.value }],
    }));
    const timerBarStyle = useAnimatedStyle(() => ({
        width: `${timerWidth.value * 100}%`,
    }));
    return (
        <View style={styles.container}>
            <View style={styles.timerBarTrack}>
                <Animated.View
                    style={[
                        styles.timerBarFill,
                        { backgroundColor: timerColor },
                        timerBarStyle,
                    ]}
                />
            </View>

            <View style={styles.headerContent}>
                <View style={styles.playerSide}>
                    <Animated.Text style={[styles.scoreText, playerScoreStyle]}>
                        {playerScore}
                    </Animated.Text>
                    <View style={[styles.avatarRing, { borderColor: '#00D68F' }]}>
                        <Text style={styles.emoji}>{AVATAR_EMOJIS[playerAvatar] || '🦊'}</Text>
                    </View>
                    <Text style={styles.username} numberOfLines={1}>YOU</Text>
                </View>

                <View style={styles.centerStatus}>
                    <Text style={[styles.timerNumber, timeLeft <= 10 && styles.timerCritical]}>{timeLeft}s</Text>
                    <Text style={styles.qCounter}>Q{currentIndex + 1} of {totalQuestions}</Text>
                </View>

                <View style={styles.playerSide}>
                    <Animated.Text style={[styles.scoreText, botScoreStyle]}>
                        {botScore}
                    </Animated.Text>
                    <View style={[styles.avatarRing, { borderColor: '#FF4757' }]}>
                        <Text style={styles.emoji}>{AVATAR_EMOJIS[botAvatar] || '🐺'}</Text>
                    </View>
                    <Text style={styles.username} numberOfLines={1}>{botName}</Text>
                    {isThinking && (
                        <View style={styles.thinkingContainer}>
                            <ThinkingDots />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

function ThinkingDots() {
    const d1 = useSharedValue(0.3);
    const d2 = useSharedValue(0.3);
    const d3 = useSharedValue(0.3);

    useEffect(() => {
        const pulse = withSequence(
            withTiming(1, { duration: 350 }),
            withTiming(0.3, { duration: 350 })
        );
        d1.value = withRepeat(pulse, -1);
        d2.value = withDelay(120, withRepeat(pulse, -1));
        d3.value = withDelay(240, withRepeat(pulse, -1));
    }, []);

    const s1 = useAnimatedStyle(() => ({ opacity: d1.value }));
    const s2 = useAnimatedStyle(() => ({ opacity: d2.value }));
    const s3 = useAnimatedStyle(() => ({ opacity: d3.value }));

    return (
        <View style={styles.dotsRow}>
            <Animated.View style={[styles.dot, s1]} />
            <Animated.View style={[styles.dot, s2]} />
            <Animated.View style={[styles.dot, s3]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '18%',
        width: '100%',
        paddingTop: 8,
    },
    timerBarTrack: {
        width: '100%',
        height: 6,
        backgroundColor: '#1E1E1E',
        position: 'absolute',
        top: 0,
        overflow: 'hidden',
        borderRadius: 3,
    },
    timerBarFill: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        borderRadius: 3,
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    playerSide: {
        width: '35%',
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    avatarRing: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1A1A1A',
    },
    emoji: {
        fontSize: 20,
    },
    username: {
        fontSize: 11,
        color: '#9A9A9A',
        marginTop: 4,
        fontWeight: '600',
    },
    centerStatus: {
        width: '30%',
        alignItems: 'center',
    },
    timerNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    timerCritical: {
        color: '#FF4757',
    },
    qCounter: {
        fontSize: 10,
        color: '#5A5A5A',
        marginTop: 2,
    },
    thinkingContainer: {
        position: 'absolute',
        bottom: -20,
    },
    dotsRow: {
        flexDirection: 'row',
        gap: 4,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#FF4757',
    },
});
