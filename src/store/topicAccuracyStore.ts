import AsyncStorage from '@react-native-async-storage/async-storage';
import { Topic } from '../data/questions/schema';
import { supabase } from '../services/supabase';
import { userService } from '../services/userService';

const TOPIC_ACCURACY_KEY = 'finiq_topic_accuracy_v1';

export interface TopicStats {
    topic: Topic;
    totalAnswered: number;
    totalCorrect: number;
    accuracy: number;
    lastUpdated: number;
    recentAccuracy: number;
    recentAnswers: boolean[];
}

export interface TopicAccuracyState {
    topics: Record<string, TopicStats>;
    totalQuestionsEver: number;
    lastDuelTimestamp: number;
}

const DEFAULT_TOPICS: Topic[] = [
    'investing',
    'banking',
    'macroeconomics',
    'personal_finance',
    'mental_math',
    'crypto',
    'equity_markets',
    'taxation',
    'insurance'
];

const createDefaultState = (): TopicAccuracyState => ({
    topics: Object.fromEntries(
        DEFAULT_TOPICS.map(topic => [topic, {
            topic,
            totalAnswered: 0,
            totalCorrect: 0,
            accuracy: 0,
            lastUpdated: 0,
            recentAccuracy: 0,
            recentAnswers: [],
        }])
    ),
    totalQuestionsEver: 0,
    lastDuelTimestamp: 0,
});

let writeQueue: Promise<void> = Promise.resolve();

export async function loadTopicAccuracy(): Promise<TopicAccuracyState> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        let state = createDefaultState();

        if (session?.user) {
            const { data: cloudStats } = await userService.getTopicStats(session.user.id);
            if (cloudStats && cloudStats.length > 0) {
                cloudStats.forEach((stat: any) => {
                    const topic = stat.topic as Topic;
                    if (state.topics[topic]) {
                        state.topics[topic] = {
                            ...state.topics[topic],
                            totalAnswered: stat.total_answered,
                            totalCorrect: stat.total_correct,
                            accuracy: Math.round(stat.accuracy * 100),
                            lastUpdated: new Date(stat.last_updated).getTime(),
                        };
                    }
                });
                state.totalQuestionsEver = cloudStats.reduce((sum: number, s: any) => sum + s.total_answered, 0);
                return state;
            }
        }

        const raw = await AsyncStorage.getItem(TOPIC_ACCURACY_KEY);
        if (!raw) return state;

        const saved = JSON.parse(raw);
        return {
            ...state,
            ...saved,
            topics: { ...state.topics, ...saved.topics },
        };
    } catch (error) {
        console.error('Failed to load topic accuracy:', error);
        return createDefaultState();
    }
}

export async function updateTopicAccuracy(
    topic: Topic,
    isCorrect: boolean
): Promise<void> {
    writeQueue = writeQueue.then(async () => {
        try {
            const state = await loadTopicAccuracy();
            const { data: { session } } = await supabase.auth.getSession();

            // Ensure topic exists in state
            if (!state.topics[topic]) {
                state.topics[topic] = {
                    topic,
                    totalAnswered: 0,
                    totalCorrect: 0,
                    accuracy: 0,
                    lastUpdated: 0,
                    recentAccuracy: 0,
                    recentAnswers: [],
                };
            }

            const topicStats = state.topics[topic];

            topicStats.totalAnswered += 1;
            topicStats.totalCorrect += isCorrect ? 1 : 0;
            topicStats.accuracy = Math.round(
                (topicStats.totalCorrect / topicStats.totalAnswered) * 100
            );

            topicStats.recentAnswers = [isCorrect, ...topicStats.recentAnswers].slice(0, 10);
            topicStats.recentAccuracy = topicStats.recentAnswers.length > 0
                ? Math.round((topicStats.recentAnswers.filter(Boolean).length / topicStats.recentAnswers.length) * 100)
                : 0;

            topicStats.lastUpdated = Date.now();
            state.totalQuestionsEver += 1;
            state.lastDuelTimestamp = Date.now();

            if (session?.user) {
                await userService.updateTopicStats(
                    session.user.id,
                    topic,
                    topicStats.totalAnswered,
                    topicStats.totalCorrect
                );
            } else {
                await AsyncStorage.setItem(TOPIC_ACCURACY_KEY, JSON.stringify(state));
            }
        } catch (error) {
            console.error('Failed to update topic accuracy:', error);
        }
    });
    return writeQueue;
}
