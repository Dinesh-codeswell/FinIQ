import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import FinMascot from './FinMascot';
import { FIN_TOUR_STEPS } from '@/src/data/fin/tour';
import { useFinStore } from '@/src/store/finStore';
import Colors from '@/constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function FinTourOverlay() {
    const { tourCompleted, setTourCompleted } = useFinStore();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    if (tourCompleted) return null;

    const step = FIN_TOUR_STEPS[currentStepIndex];
    const isLast = currentStepIndex === FIN_TOUR_STEPS.length - 1;

    const handleNext = () => {
        if (isLast) {
            setTourCompleted(true);
        } else {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const handleSkip = () => {
        setTourCompleted(true);
    };

    return (
        <Modal transparent animationType="fade" visible={!tourCompleted}>
            <View style={styles.container}>
                <View style={styles.backdrop} />

                <View style={styles.content}>
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipText}>Skip tour</Text>
                    </TouchableOpacity>

                    <View style={[
                        styles.messageBox,
                        step.position === 'top' ? styles.positionTop : styles.positionBottom
                    ]}>
                        <View style={styles.stepInfo}>
                            <FinMascot expression={step.expression} size="medium" />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{step.title}</Text>
                                <Text style={styles.message}>{step.message}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.actionButton} onPress={handleNext}>
                            <Text style={styles.actionLabel}>{step.action_label}</Text>
                        </TouchableOpacity>

                        <View style={styles.progressRow}>
                            {FIN_TOUR_STEPS.map((_, i) => (
                                <View
                                    key={i}
                                    style={[styles.dot, i === currentStepIndex && styles.activeDot]}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.85)',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: 24,
    },
    skipText: {
        color: '#AAAAAA',
        fontSize: 14,
    },
    messageBox: {
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: '#333',
    },
    positionTop: {
        marginTop: -100,
    },
    positionBottom: {
        marginTop: 100,
    },
    stepInfo: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    message: {
        color: '#CCCCCC',
        fontSize: 14,
        lineHeight: 20,
    },
    actionButton: {
        backgroundColor: Colors.accent,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 16,
    },
    actionLabel: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#444',
    },
    activeDot: {
        backgroundColor: Colors.accent,
        width: 12,
    },
});
