import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '@/constants/colors';
import { DIVISION_CONFIG } from '@/src/services/leaderboardService';

interface Props {
    activeDivision: string;
    onSelect: (division: string) => void;
}

export const DivisionSlider = ({ activeDivision, onSelect }: Props) => {
    const divisions = ['all', ...Object.keys(DIVISION_CONFIG)];

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {divisions.map((divId) => {
                    const isActive = activeDivision === divId;
                    const config = DIVISION_CONFIG[divId] || { label: 'Global', color: Colors.accent };

                    return (
                        <TouchableOpacity
                            key={divId}
                            onPress={() => onSelect(divId)}
                            style={[
                                styles.tab,
                                isActive && { borderColor: config.color, backgroundColor: `${config.color}15` }
                            ]}
                        >
                            <Text style={[
                                styles.tabText,
                                isActive && { color: config.color }
                            ]}>
                                {divId === 'all' ? 'GLOBAL' : config.label.toUpperCase()}
                            </Text>
                            {isActive && (
                                <View style={[styles.activeIndicator, { backgroundColor: config.color }]} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
    },
    tabText: {
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -1,
        height: 2,
        width: '40%',
        borderRadius: 1,
    },
});
