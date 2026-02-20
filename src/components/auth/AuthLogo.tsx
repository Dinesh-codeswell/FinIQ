import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AuthLogoProps {
    size?: number;
    fontSize?: number;
    showText?: boolean;
}

export default function AuthLogo({ size = 80, fontSize = 28, showText = false }: AuthLogoProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { width: size, height: size }]}>
                <LinearGradient
                    colors={['#0D1F17', '#0A1A12']}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={[styles.monogram, { fontSize }]}>FQ</Text>
                </LinearGradient>
            </View>
            {showText && (
                <View style={styles.textBlock}>
                    <Text style={styles.brandName}>FINIQ</Text>
                    <Text style={styles.tagline}>Your Money Mind, Sharpened.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    iconContainer: {
        borderRadius: 22,
        borderWidth: 1,
        borderColor: 'rgba(0, 214, 143, 0.3)',
        overflow: 'hidden',
        shadowColor: '#00D68F',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monogram: {
        color: '#00D68F',
        fontWeight: '900',
        letterSpacing: -1,
    },
    textBlock: {
        marginTop: 16,
        alignItems: 'center',
    },
    brandName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    tagline: {
        marginTop: 6,
        color: 'rgba(255, 255, 255, 0.45)',
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: 0.5,
    },
});
