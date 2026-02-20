import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

interface UsernameDisplayProps {
    username: string;
    isPro?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

export default function UsernameDisplay({
    username,
    isPro = false,
    size = 'md',
    color = Colors.textPrimary,
}: UsernameDisplayProps) {
    const isSmall = size === 'sm';
    const isLarge = size === 'lg';

    const fontSize = isSmall ? 12 : isLarge ? 20 : 16;
    const badgeWidth = isSmall ? 22 : isLarge ? 36 : 28;
    const badgeHeight = isSmall ? 12 : isLarge ? 18 : 14;
    const badgeTextSize = isSmall ? 6 : isLarge ? 9 : 7;

    return (
        <View style={styles.container}>
            <Text style={[styles.username, { fontSize, color }]} numberOfLines={1}>
                {username.startsWith('@') ? username : `@${username}`}
            </Text>
            {isPro && (
                <View
                    style={[
                        styles.proBadge,
                        {
                            width: badgeWidth,
                            height: badgeHeight,
                        },
                    ]}
                >
                    <Text style={[styles.proText, { fontSize: badgeTextSize }]}>PRO</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontWeight: '700',
    },
    proBadge: {
        backgroundColor: '#F5A623',
        borderRadius: 4,
        marginLeft: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    proText: {
        color: '#000000',
        fontWeight: '900',
    },
});
