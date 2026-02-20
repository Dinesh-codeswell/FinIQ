import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTopicConfig } from '@/constants/topicColors';

interface QuestionCardProps {
    question: string;
    topic: string;
}

export default function QuestionCard({ question, topic }: QuestionCardProps) {
    const topicConfig = getTopicConfig(topic);

    return (
        <View style={styles.container}>
            <View style={[styles.topicBadge, { backgroundColor: `${topicConfig.color}26` }]}>
                <View style={[styles.topicAccent, { backgroundColor: topicConfig.color }]} />
                <Text style={[styles.topicText, { color: topicConfig.color }]}>
                    {topicConfig.emoji} {topicConfig.label.toUpperCase()}
                </Text>
            </View>
            <Text style={styles.questionText}>{question}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '30%',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    topicBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        height: 24,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 12,
    },
    topicAccent: {
        width: 3,
        height: '100%',
    },
    topicText: {
        fontSize: 11,
        fontWeight: 'bold',
        paddingHorizontal: 8,
    },
    questionText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        lineHeight: 28,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
});
