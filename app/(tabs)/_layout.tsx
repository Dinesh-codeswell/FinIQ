import { Tabs, useRouter, usePathname } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';

const TAB_ORDER = ['(arena)', 'compete', 'duel-dummy', 'quests', 'profile'];
import { TourAnchor } from '@/src/components/fin/TourAnchor';

const CustomTabButton = ({ children, onPress, isActive, label, index }: any) => {
    const pathname = usePathname();

    // Spotify-style label visibility logic:
    // Show label if active OR if it's the tab to the immediate left of the active one.
    const activeIndex = TAB_ORDER.findIndex(name => pathname.includes(name));
    const showLabel = isActive || (activeIndex !== -1 && index === activeIndex - 1);

    return (
        <TouchableOpacity
            style={styles.tabButton}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {isActive && <View style={styles.activeIndicator} />}

            <View style={[
                styles.pillContainer,
                isActive && styles.activePill
            ]}>
                {children}
                {showLabel && (
                    <Text style={[
                        styles.tabLabel,
                        { color: isActive ? '#FFFFFF' : '#6B7280' }
                    ]}>
                        {label}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const DuelTabButton = ({ onPress, isActive }: any) => {
    return (
        <TouchableOpacity
            style={styles.tabButton}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {isActive && <View style={styles.activeIndicator} />}
            <View style={[
                styles.pillContainer,
                isActive && styles.activePill
            ]}>
                <Ionicons
                    name="flash"
                    size={22}
                    color={isActive ? '#FFFFFF' : '#6B7280'}
                />
                {isActive && (
                    <Text style={[styles.tabLabel, { color: '#FFFFFF' }]}>
                        Duel
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: [
                    styles.tabBar,
                    { height: 58 + insets.bottom, paddingBottom: insets.bottom }
                ],
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#6B7280',
            }}
        >
            <Tabs.Screen
                name="(arena)"
                options={{
                    title: 'Arena',
                    tabBarButton: (props) => (
                        <CustomTabButton
                            {...props}
                            label="Arena"
                            index={0}
                            isActive={props.accessibilityState?.selected}
                        >
                            <Ionicons
                                name={props.accessibilityState?.selected ? "flash" : "flash-outline"}
                                size={22}
                                color={props.accessibilityState?.selected ? '#FFFFFF' : '#6B7280'}
                            />
                        </CustomTabButton>
                    ),
                }}
            />
            <Tabs.Screen
                name="compete"
                options={{
                    title: 'Compete',
                    tabBarButton: (props) => (
                        <TourAnchor id="bottom_nav_compete">
                            <CustomTabButton
                                {...props}
                                label="Compete"
                                index={1}
                                isActive={props.accessibilityState?.selected}
                            >
                                <Ionicons
                                    name={props.accessibilityState?.selected ? "trophy" : "trophy-outline"}
                                    size={22}
                                    color={props.accessibilityState?.selected ? '#FFFFFF' : '#6B7280'}
                                />
                            </CustomTabButton>
                        </TourAnchor>
                    ),
                }}
            />
            <Tabs.Screen
                name="duel-dummy"
                options={{
                    title: 'Duel',
                    tabBarButton: (props: any) => (
                        <TourAnchor id="center_duel_nav_button">
                            <DuelTabButton
                                onPress={() => router.push('/matchmaking')}
                                isActive={props.accessibilityState?.selected}
                            />
                        </TourAnchor>
                    ),
                }}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        router.push('/matchmaking');
                    }
                }}
            />
            <Tabs.Screen
                name="quests"
                options={{
                    title: 'Quests',
                    tabBarButton: (props) => (
                        <TourAnchor id="bottom_nav_quests">
                            <CustomTabButton
                                {...props}
                                label="Quests"
                                index={3}
                                isActive={props.accessibilityState?.selected}
                            >
                                <View>
                                    <Ionicons
                                        name={props.accessibilityState?.selected ? "ribbon" : "ribbon-outline"}
                                        size={22}
                                        color={props.accessibilityState?.selected ? '#FFFFFF' : '#6B7280'}
                                    />
                                    {/* Quest Badge Dot (Step 10) */}
                                    <View style={styles.questDot} />
                                </View>
                            </CustomTabButton>
                        </TourAnchor>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarButton: (props) => (
                        <CustomTabButton
                            {...props}
                            label="Profile"
                            index={4}
                            isActive={props.accessibilityState?.selected}
                        >
                            <Ionicons
                                name={props.accessibilityState?.selected ? "person" : "person-outline"}
                                size={22}
                                color={props.accessibilityState?.selected ? '#FFFFFF' : '#6B7280'}
                            />
                        </CustomTabButton>
                    ),
                }}
            />
            <Tabs.Screen
                name="feed"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        backgroundColor: '#0F0F0F',
        borderTopWidth: 0.5,
        borderTopColor: '#1E1E1E',
        elevation: 0,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 6,
    },
    activePill: {
        backgroundColor: '#1C1C1C',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: TYPOGRAPHY.weights.medium as any,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    activeIndicator: {
        position: 'absolute',
        top: 0,
        width: 20,
        height: 3,
        backgroundColor: '#00D68F',
        borderRadius: 1.5,
    },
    questDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00D68F',
        borderWidth: 1.5,
        borderColor: '#0F0F0F',
    },
});
