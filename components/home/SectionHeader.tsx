import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TYPOGRAPHY } from '@/constants/typography';

interface SectionHeaderProps {
    title: string;
    count?: number | string;
    actionLabel?: string;
    onActionPress?: () => void;
    showChevron?: boolean;
}

export default function SectionHeader({
    title,
    count,
    actionLabel,
    onActionPress,
    showChevron = true
}: SectionHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>
                    {title}{' '}
                    {count !== undefined && (
                        <Text style={styles.count}>{count}</Text>
                    )}
                </Text>
                {showChevron && (
                    <Text style={styles.chevron}>›</Text>
                )}
            </View>

            {actionLabel && (
                <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
                    <Text style={styles.actionLabel}>{actionLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: TYPOGRAPHY.weights.semibold as any,
        color: '#FFFFFF',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    count: {
        fontWeight: TYPOGRAPHY.weights.regular as any,
        color: '#6B7280',
    },
    chevron: {
        fontSize: 17,
        fontWeight: TYPOGRAPHY.weights.thin as any,
        color: '#6B7280',
        marginLeft: 4,
    },
    actionLabel: {
        fontSize: 13,
        fontWeight: TYPOGRAPHY.weights.medium as any,
        color: '#00D68F',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
});
