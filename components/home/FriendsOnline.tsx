import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserAvatar from '@/src/components/UserAvatar';
import { MOCK_FRIENDS } from '@/mocks/data';
import { TYPOGRAPHY } from '@/constants/typography';
import SectionHeader from './SectionHeader';

const AVATAR_COLORS = ['#1A1A2E', '#1A2E1A', '#2E1A1A', '#1A2A2E', '#2E2A1A'];

const OnlineDot = () => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.6,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.onlineDot,
                { opacity: pulseAnim }
            ]}
        />
    );
};

export default function FriendsOnline() {
    const data = [...MOCK_FRIENDS, { id: 'invite-placeholder', isInvite: true }];

    const renderItem = ({ item, index }: any) => {
        if (item.isInvite) {
            return (
                <TouchableOpacity style={styles.friendItem} activeOpacity={0.8}>
                    <View style={styles.addFriendCircle}>
                        <Ionicons name="add" size={24} color="#6B7280" />
                    </View>
                    <Text style={styles.username}>Invite</Text>
                </TouchableOpacity>
            );
        }

        const bgColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
        const displayUsername = item.username.length > 9
            ? item.username.substring(0, 7) + '...'
            : item.username;

        return (
            <TouchableOpacity key={item.id} style={styles.friendItem} activeOpacity={0.8}>
                <View style={[styles.avatarContainer, { backgroundColor: bgColor }]}>
                    <UserAvatar
                        size={56}
                        animalEmoji={item.avatar}
                        frameId="none"
                        isPro={false}
                    />
                    <OnlineDot />
                </View>
                <Text style={styles.username}>{displayUsername}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <SectionHeader
                title="Friends online"
                count={MOCK_FRIENDS.length}
                actionLabel="Invite"
            />

            <FlatList
                horizontal
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                ItemSeparatorComponent={() => <View style={{ width: 18 }} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Horizontal padding handled by SectionHeader and scrollContent
    },
    scrollContent: {
        // Need to match the 20px padding (Change 11 says 20px for avatar rows)
        paddingRight: 20,
    },
    friendItem: {
        alignItems: 'center',
    },
    avatarContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        position: 'relative',
    },
    onlineDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#00D68F',
        borderWidth: 2,
        borderColor: '#0F0F0F', // Matches app background
    },
    username: {
        fontSize: 11,
        fontWeight: TYPOGRAPHY.weights.regular as any,
        color: '#9CA3AF',
        textAlign: 'center',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    addFriendCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#1C1C1C',
        borderWidth: 1.5,
        borderColor: '#3A3A3A',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
});
