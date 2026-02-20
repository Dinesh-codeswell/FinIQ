import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { ONBOARDING_CONFIG } from '@/src/constants/onboardingConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;

interface Props {
    isVisible: boolean;
}

export const LeaderboardStack = ({ isVisible }: Props) => {
    const card3Y = useSharedValue(40);
    const card2Y = useSharedValue(40);
    const card1Y = useSharedValue(40);
    const cardOpacity = useSharedValue(0);

    useEffect(() => {
        if (isVisible) {
            cardOpacity.value = withTiming(1, { duration: 400 });
            card3Y.value = withDelay(300, withSpring(0));
            card2Y.value = withDelay(400, withSpring(0));
            card1Y.value = withDelay(500, withSpring(0));
        }
    }, [isVisible]);

    const cardStyle = (animatedY: SharedValue<number>) => useAnimatedStyle(() => ({
        opacity: cardOpacity.value,
        transform: [{ translateY: animatedY.value }],
    }));

    return (
        <View style={styles.container}>
            {/* Card 3 (Bronze) */}
            <Animated.View style={[styles.card, styles.card3, cardStyle(card3Y)]}>
                <Text style={styles.cardRank}>🥉 #24</Text>
                <View style={styles.cardCenter}>
                    <Text style={styles.username}>MarketBear_01</Text>
                    <Text style={styles.division}>Bronze Analyst</Text>
                </View>
                <View style={styles.cardRight}>
                    <Text style={styles.elo}>1,120</Text>
                    <Text style={styles.eloChange}>▲ +12</Text>
                </View>
            </Animated.View>

            {/* Card 2 (Silver) */}
            <Animated.View style={[styles.card, styles.card2, cardStyle(card2Y)]}>
                <Text style={styles.cardRank}>🥈 #12</Text>
                <View style={styles.cardCenter}>
                    <Text style={styles.username}>TrendHunter</Text>
                    <Text style={styles.division}>Silver Analyst</Text>
                </View>
                <View style={styles.cardRight}>
                    <Text style={styles.elo}>1,450</Text>
                    <Text style={styles.eloChange}>▲ +15</Text>
                </View>
            </Animated.View>

            {/* Card 1 (Gold - TOP) */}
            <Animated.View style={[styles.card, styles.card1, cardStyle(card1Y)]}>
                <View style={styles.leftSection}>
                    <Text style={styles.emoji}>🥇</Text>
                    <Text style={styles.rankNum}>#1</Text>
                </View>
                <View style={styles.cardCenter}>
                    <Text style={styles.username}>BullRider_99</Text>
                    <Text style={styles.divisionGold}>Gold Analyst</Text>
                </View>
                <View style={styles.cardRight}>
                    <Text style={styles.elo}>1,847</Text>
                    <Text style={styles.eloChangeGreen}>▲ +24</Text>
                </View>
            </Animated.View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 40,
        height: 180,
    },
    card: {
        width: CARD_WIDTH,
        height: 72,
        borderRadius: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        position: 'absolute',
    },
    card1: {
        zIndex: 3,
        backgroundColor: '#2A2000',
        borderColor: 'rgba(245,166,35,0.4)',
        top: 0,
        elevation: 8,
        shadowColor: '#F5A623',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
    },
    card2: {
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderColor: 'rgba(255,255,255,0.1)',
        top: 12,
        opacity: 0.8,
    },
    card3: {
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderColor: 'rgba(255,255,255,0.1)',
        top: 24,
        opacity: 0.6,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    emoji: {
        fontSize: 24,
    },
    rankNum: {
        color: '#F5A623',
        fontSize: 20,
        fontWeight: '800',
        fontFamily: 'BarlowCondensed_800ExtraBold',
    },
    cardRank: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        fontWeight: '700',
    },
    cardCenter: {
        flex: 1,
        marginLeft: 16,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    division: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
        fontWeight: '600',
    },
    divisionGold: {
        color: '#F5A623',
        fontSize: 11,
        fontWeight: '600',
    },
    cardRight: {
        alignItems: 'flex-end',
    },
    elo: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
        fontFamily: 'BarlowCondensed_800ExtraBold',
    },
    eloChange: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        fontWeight: '700',
    },
    eloChangeGreen: {
        color: '#00D68F',
        fontSize: 12,
        fontWeight: '700',
    },
});
