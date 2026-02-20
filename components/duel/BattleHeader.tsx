import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { AVATAR_EMOJIS } from '@/constants/divisions';

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
    isThinking
}: BattleHeaderProps) {
    const scoreScale = useRef(new Animated.Value(1)).current;
    const botScoreScale = useRef(new Animated.Value(1)).current;
    const prevScore = useRef(playerScore);
    const prevBotScore = useRef(botScore);

    useEffect(() => {
        if (playerScore > prevScore.current) {
            Animated.sequence([
                Animated.timing(scoreScale, { toValue: 1.4, duration: 150, useNativeDriver: true }),
                Animated.timing(scoreScale, { toValue: 1, duration: 150, useNativeDriver: true }),
            ]).start();
        }
        prevScore.current = playerScore;
    }, [playerScore]);

    useEffect(() => {
        if (botScore > prevBotScore.current) {
            Animated.sequence([
                Animated.timing(botScoreScale, { toValue: 1.4, duration: 150, useNativeDriver: true }),
                Animated.timing(botScoreScale, { toValue: 1, duration: 150, useNativeDriver: true }),
            ]).start();
        }
        prevBotScore.current = botScore;
    }, [botScore]);

    const timerPercent = timeLeft / totalDuration;
    const timerColor = timeLeft <= 10 ? '#FF4757' : timeLeft <= 30 ? '#F5A623' : '#00D68F';

    return (
        <View style={styles.container}>
            {/* TIMER BAR */}
            <View style={styles.timerBarTrack}>
                <View style={[styles.timerBarFill, { width: `${timerPercent * 100}%`, backgroundColor: timerColor }]} />
            </View>

            <View style={styles.headerContent}>
                {/* YOUR SIDE */}
                <View style={styles.playerSide}>
                    <Animated.Text style={[styles.scoreText, { transform: [{ scale: scoreScale }] }]}>
                        {playerScore}
                    </Animated.Text>
                    <View style={[styles.avatarRing, { borderColor: '#00D68F' }]}>
                        <Text style={styles.emoji}>{AVATAR_EMOJIS[playerAvatar] || '🦊'}</Text>
                    </View>
                    <Text style={styles.username} numberOfLines={1}>YOU</Text>
                </View>

                {/* CENTER STATUS */}
                <View style={styles.centerStatus}>
                    <Text style={[styles.timerNumber, timeLeft <= 10 && styles.timerCritical]}>{timeLeft}s</Text>
                    <Text style={styles.qCounter}>Q{currentIndex + 1} of {totalQuestions}</Text>
                </View>

                {/* OPPONENT SIDE */}
                <View style={styles.playerSide}>
                    <Animated.Text style={[styles.scoreText, { transform: [{ scale: botScoreScale }] }]}>
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

const ThinkingDots = () => {
    const dot1 = useRef(new Animated.Value(0.3)).current;
    const dot2 = useRef(new Animated.Value(0.3)).current;
    const dot3 = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animate = (anim: Animated.Value, delay: number) => {
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }),
                    Animated.timing(anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
                    Animated.delay(800 - delay),
                ])
            ).start();
        };
        animate(dot1, 0);
        animate(dot2, 200);
        animate(dot3, 400);
    }, []);

    return (
        <View style={styles.dotsRow}>
            <Animated.View style={[styles.dot, { opacity: dot1 }]} />
            <Animated.View style={[styles.dot, { opacity: dot2 }]} />
            <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        </View>
    );
};

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
    },
    timerBarFill: {
        height: '100%',
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
