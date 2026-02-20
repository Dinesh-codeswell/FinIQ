import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withDelay,
    Easing
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 3;
const CARD_HEIGHT = 70;

const MOCK_CARDS = [
    { label: 'NIFTY 50', value: '+1.2%', trend: 'up' },
    { label: '₹/$', value: '84.2', trend: 'down' },
    { label: 'BITCOIN', value: '+4.5%', trend: 'up' },
    { label: 'SENSEX', value: '72k', trend: 'up' },
    { label: 'GOLD', value: '-0.3%', trend: 'down' },
    { label: 'PLAYERS', value: '12k+', trend: 'up' },
    { label: 'STREAK', value: '47🔥', trend: 'up' },
    { label: 'CHALLENGE', value: 'LIVE', trend: 'up' },
    { label: 'EQUITY', value: 'BULL', trend: 'up' },
    { label: 'BANKING', value: '89%', trend: 'up' },
    { label: 'CRYPTO', value: 'MOON', trend: 'up' },
    { label: 'TAXATION', value: 'LVL 5', trend: 'up' },
];

function MosaicCard({ label, value, trend, index }: { label: string, value: string, trend: string, index: number }) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(10);

    useEffect(() => {
        opacity.value = withDelay(index * 100, withTiming(1, { duration: 600 }));
        translateY.value = withDelay(index * 100, withTiming(0, { duration: 600, easing: Easing.out(Easing.back(1.5)) }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={[styles.cardValue, { color: trend === 'up' ? '#00D68F' : '#FF4757' }]}>
                {value}
            </Text>
            <View style={styles.miniChart}>
                <View style={[styles.chartBar, { height: '40%', opacity: 0.3 }]} />
                <View style={[styles.chartBar, { height: '70%', opacity: 0.5, backgroundColor: trend === 'up' ? '#00D68F' : '#FF4757' }]} />
                <View style={[styles.chartBar, { height: '50%', opacity: 0.3 }]} />
            </View>
        </Animated.View>
    );
}

export default function MosaicGrid() {
    const scrollY = useSharedValue(0);

    useEffect(() => {
        scrollY.value = withRepeat(
            withTiming(-20, { duration: 20000, easing: Easing.linear }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scrollY.value }],
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.grid, animatedStyle]}>
                {MOCK_CARDS.map((card, i) => (
                    <MosaicCard key={i} {...card} index={i} />
                ))}
            </Animated.View>
            <LinearGradient
                colors={['transparent', 'rgba(7, 10, 14, 0.6)', 'rgba(7, 10, 14, 1)']}
                style={styles.fadeOverlay}
                pointerEvents="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        overflow: 'hidden',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        padding: 16,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: 'rgba(20, 20, 20, 0.8)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.06)',
        padding: 8,
        justifyContent: 'space-between',
    },
    cardLabel: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 8,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    cardValue: {
        fontSize: 14,
        fontWeight: '800',
    },
    miniChart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 12,
        gap: 2,
    },
    chartBar: {
        width: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 1,
    },
    fadeOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
});
