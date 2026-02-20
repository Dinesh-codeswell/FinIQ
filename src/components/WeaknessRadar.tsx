import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText, G } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    Easing
} from 'react-native-reanimated';
import { TopicStats } from '../store/topicAccuracyStore';
import { Topic } from '../data/questions/schema';
import Colors from '@/constants/colors';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface WeaknessRadarProps {
    topicStats: Record<string, TopicStats>;
    size?: number;
    animated?: boolean;
}

const TOPICS_CONFIG: Record<string, { label: string; icon: string }> = {
    investing: { label: 'Investing', icon: '📈' },
    banking: { label: 'Banking', icon: '🏦' },
    macroeconomics: { label: 'Macro', icon: '🌍' },
    personal_finance: { label: 'Personal', icon: '💰' },
    mental_math: { label: 'Math', icon: '🧮' },
    crypto: { label: 'Crypto', icon: '₿' },
};

const ORDERED_TOPICS: Topic[] = [
    'investing',
    'banking',
    'macroeconomics',
    'personal_finance',
    'mental_math',
    'crypto',
];

export default function WeaknessRadar({
    topicStats,
    size = 280,
    animated = true,
}: WeaknessRadarProps) {
    const center = size / 2;
    const radius = size * 0.35;

    const points = useSharedValue(ORDERED_TOPICS.map(() => radius * 0.5));

    useEffect(() => {
        const targetPoints = ORDERED_TOPICS.map(topic => {
            const stats = topicStats[topic];
            const accuracy = stats && stats.totalAnswered >= 5 ? stats.accuracy : 50;
            return radius * (accuracy / 100);
        });

        if (animated) {
            points.value = withTiming(targetPoints, {
                duration: 800,
                easing: Easing.out(Easing.exp),
            });
        } else {
            points.value = targetPoints;
        }
    }, [topicStats, radius, animated]);

    const getCoordinates = (index: number, r: number) => {
        const angle = (60 * index - 90) * (Math.PI / 180);
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle),
        };
    };

    const animatedProps = useAnimatedProps(() => {
        const path = points.value.map((r, i) => {
            const coord = getCoordinates(i, r);
            return `${coord.x},${coord.y}`;
        }).join(' ');
        return { points: path };
    });

    const backgroundHexagons = [0.33, 0.66, 1].map((scale) => {
        const r = radius * scale;
        return ORDERED_TOPICS.map((_, i) => {
            const coord = getCoordinates(i, r);
            return `${coord.x},${coord.y}`;
        }).join(' ');
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                {/* Grid lines */}
                <G>
                    {backgroundHexagons.map((pointsStr, i) => (
                        <Polygon
                            key={`grid-${i}`}
                            points={pointsStr}
                            fill="none"
                            stroke={Colors.border}
                            strokeWidth="1"
                        />
                    ))}
                    {ORDERED_TOPICS.map((_, i) => {
                        const coord = getCoordinates(i, radius);
                        return (
                            <Line
                                key={`line-${i}`}
                                x1={center}
                                y1={center}
                                x2={coord.x}
                                y2={coord.y}
                                stroke={Colors.border}
                                strokeWidth="1"
                            />
                        );
                    })}
                </G>

                {/* Data area */}
                <AnimatedPolygon
                    animatedProps={animatedProps}
                    fill="rgba(0, 214, 143, 0.15)"
                    stroke="#00D68F"
                    strokeWidth="2"
                />

                {/* Labels & Markers */}
                {ORDERED_TOPICS.map((topic, i) => {
                    const stats = topicStats[topic];
                    const accuracy = stats && stats.totalAnswered >= 5 ? stats.accuracy : 50;
                    const coord = getCoordinates(i, radius * 1.2);
                    const config = TOPICS_CONFIG[topic] || { label: topic, icon: '' };

                    let color = '#F5A623'; // Amber default
                    if (accuracy >= 70) color = '#00D68F'; // Green
                    if (accuracy < 50) color = '#FF4757'; // Red
                    if (!stats || stats.totalAnswered < 5) color = Colors.textTertiary;

                    return (
                        <G key={`label-${topic}`}>
                            <SvgText
                                x={coord.x}
                                y={coord.y - 12}
                                fill={color}
                                fontSize="10"
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                {config.icon} {config.label}
                            </SvgText>
                            <SvgText
                                x={coord.x}
                                y={coord.y}
                                fill={Colors.textSecondary}
                                fontSize="9"
                                textAnchor="middle"
                            >
                                {stats && stats.totalAnswered >= 5 ? `${accuracy}%` : 'Locked'}
                            </SvgText>
                        </G>
                    );
                })}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
