import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TYPOGRAPHY } from '@/constants/typography';

const FILTER_OPTIONS = ['All', 'Sprint', 'Scenario', 'Daily', 'Practice'];

export default function FilterPillStrip() {
    const [activeFilter, setActiveFilter] = useState('All');

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {FILTER_OPTIONS.map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        onPress={() => setActiveFilter(filter)}
                        activeOpacity={0.8}
                        style={[
                            styles.pill,
                            activeFilter === filter ? styles.activePill : styles.inactivePill
                        ]}
                    >
                        <Text style={[
                            styles.pillText,
                            activeFilter === filter ? styles.activeText : styles.inactiveText
                        ]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    pill: {
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activePill: {
        backgroundColor: '#FFFFFF',
    },
    inactivePill: {
        backgroundColor: '#1C1C1C',
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    pillText: {
        fontSize: 13,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    activeText: {
        fontWeight: TYPOGRAPHY.weights.semibold as any,
        color: '#000000',
    },
    inactiveText: {
        fontWeight: TYPOGRAPHY.weights.medium as any,
        color: '#9CA3AF',
    },
});
