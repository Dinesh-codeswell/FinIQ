import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface AuthBackgroundProps {
    children?: React.ReactNode;
    showGrid?: boolean;
}

export default function AuthBackground({ children, showGrid = true }: AuthBackgroundProps) {
    return (
        <View style={styles.container}>
            {/* Base Layer */}
            <View style={styles.base} />

            {/* Grid Layer */}
            {showGrid && (
                <View style={styles.gridOverlay}>
                    {Array.from({ length: Math.ceil(height / 48) }).map((_, i) => (
                        <View key={`h-${i}`} style={[styles.gridLineH, { top: i * 48 }]} />
                    ))}
                    {Array.from({ length: Math.ceil(width / 48) }).map((_, i) => (
                        <View key={`v-${i}`} style={[styles.gridLineV, { left: i * 48 }]} />
                    ))}
                </View>
            )}

            {/* Atmospheric Gradients */}
            <LinearGradient
                colors={['rgba(0, 214, 143, 0.12)', 'transparent']}
                style={styles.topGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.8, y: 0.8 }}
            />

            <LinearGradient
                colors={['transparent', 'rgba(245, 166, 35, 0.06)']}
                style={styles.bottomGradient}
                start={{ x: 0.2, y: 0.2 }}
                end={{ x: 1, y: 1 }}
            />

            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070A0E',
    },
    base: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#070A0E',
    },
    gridOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    gridLineH: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(0, 214, 143, 0.04)',
    },
    gridLineV: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: 'rgba(0, 214, 143, 0.04)',
    },
    topGradient: {
        position: 'absolute',
        top: -height * 0.25,
        left: -width * 0.25,
        width: width * 1.5,
        height: height * 0.75,
        opacity: 0.8,
    },
    bottomGradient: {
        position: 'absolute',
        bottom: -height * 0.2,
        right: -width * 0.2,
        width: width * 1.5,
        height: height * 0.6,
    },
});
