import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { TYPOGRAPHY } from '@/constants/typography';

// Components
import HomeHeader from '@/components/home/HomeHeader';
import FilterPillStrip from '@/components/home/FilterPillStrip';
import RatingHeroCard from '@/components/home/RatingHeroCard';
import FinTipCard from '@/components/home/FinTipCard';
import FinTourOverlay from '@/src/components/fin/FinTourOverlay';
import FriendsOnline from '@/components/home/FriendsOnline';
import MarketMoodCard from '@/components/home/MarketMoodCard';
import DuelsSection from '@/components/home/DuelsSection';

export default function ArenaHome() {
    const router = useRouter();
    const { profile, checkAndUpdateStreak, isReady } = useGame();
    const fadeIn = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isReady && !profile.onboardingCompleted) {
            router.replace('/onboarding' as any);
        }
    }, [isReady, profile.onboardingCompleted]);

    useEffect(() => {
        if (isReady && profile.onboardingCompleted) {
            checkAndUpdateStreak();
        }
    }, [isReady]);

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    if (!isReady || !profile.onboardingCompleted) {
        return <View style={styles.container} />;
    }

    return (
        <View style={styles.container}>
            <FinTourOverlay />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Animated.View style={{ opacity: fadeIn, flex: 1 }}>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Spacing Sequence (Change 11) */}

                        {/* Status bar -> utility bar: 8px */}
                        <View style={{ marginTop: 8 }}>
                            <HomeHeader />
                        </View>

                        {/* greeting title -> filter pills: 12px */}
                        <View style={{ marginTop: 12 }}>
                            <FilterPillStrip />
                        </View>

                        {/* Filter pills -> rating card: 20px */}
                        <View style={{ marginTop: 20 }}>
                            <RatingHeroCard />
                        </View>

                        {/* Rating card -> FIN SAYS card: 20px */}
                        <View style={{ marginTop: 20 }}>
                            <FinTipCard />
                        </View>

                        {/* FIN SAYS card -> Friends section header: 32px */}
                        <View style={{ marginTop: 32 }}>
                            <FriendsOnline />
                        </View>

                        {/* Avatar row -> Market Mood header: 28px */}
                        <View style={{ marginTop: 28 }}>
                            <MarketMoodCard />
                        </View>

                        {/* Market Mood card -> Duels header: 32px */}
                        <View style={{ marginTop: 32 }}>
                            <DuelsSection />
                        </View>

                        {/* Card row -> bottom nav: 24px */}
                        <View style={{ height: 24 }} />
                    </ScrollView>
                </Animated.View>
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        // Horizontal padding 16px generally
        paddingHorizontal: 16,
        paddingBottom: 100, // Account for bottom nav
    },
});
