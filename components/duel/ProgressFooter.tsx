import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressFooterProps {
    total: number;
    current: number;
    results: (boolean | null)[]; // true = correct, false = wrong, null = upcoming
}

export default function ProgressFooter({ total, current, results }: ProgressFooterProps) {
    const segments = Array.from({ length: total });

    return (
        <View style={styles.container}>
            <View style={styles.segmentRow}>
                {segments.map((_, i) => {
                    let color = '#242424'; // upcoming
                    if (i === current) color = '#F5A623'; // current pulsing (pulse handled in parent/higher level if needed)
                    else if (results[i] === true) color = '#00D68F';
                    else if (results[i] === false) color = '#FF4757';

                    return (
                        <View
                            key={i}
                            style={[
                                styles.segment,
                                { backgroundColor: color },
                                i === current && styles.currentSegment
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '10%',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    segmentRow: {
        flexDirection: 'row',
        height: 4,
        gap: 2,
    },
    segment: {
        flex: 1,
        height: '100%',
        borderRadius: 2,
    },
    currentSegment: {
        // Pulse animation can be added here
    },
});
