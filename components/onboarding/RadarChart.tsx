import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withSpring,
    withDelay,
} from 'react-native-reanimated';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface Props {
    isVisible: boolean;
}

const DOMAINS = [
    'Investing', 'Personal Finance', 'Banking',
    'Macroeconomics', 'Crypto', 'Mental Math'
];

const VALUES = [0.75, 0.60, 0.45, 0.80, 0.50, 0.90];
const RADIUS = 110;
const CENTER = 125;

export const RadarChart = ({ isVisible }: Props) => {
    const animationValues = useRef(DOMAINS.map(() => useSharedValue(0))).current;

    useEffect(() => {
        if (isVisible) {
            animationValues.forEach((val, i) => {
                val.value = withDelay(i * 100, withSpring(VALUES[i], { damping: 15, stiffness: 100 }));
            });
        }
    }, [isVisible]);

    const getPoint = (radius: number, angle: number) => {
        const x = CENTER + radius * Math.cos(angle - Math.PI / 2);
        const y = CENTER + radius * Math.sin(angle - Math.PI / 2);
        return { x, y };
    };

    const radarPoints = useAnimatedProps(() => {
        const points = DOMAINS.map((_, i) => {
            const { x, y } = getPoint(animationValues[i].value * RADIUS, (i * 2 * Math.PI) / 6);
            return `${x},${y}`;
        }).join(' ');
        return { points };
    });

    return (
        <View style={styles.container}>
            <Svg width={CENTER * 2} height={CENTER * 2} viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}>
                {/* Background Rings */}
                {[0.33, 0.66, 1].map((scale, i) => (
                    <Polygon
                        key={i}
                        points={DOMAINS.map((_, j) => {
                            const { x, y } = getPoint(RADIUS * scale, (j * 2 * Math.PI) / 6);
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                    />
                ))}

                {/* Axis Lines */}
                {DOMAINS.map((_, i) => {
                    const { x, y } = getPoint(RADIUS, (i * 2 * Math.PI) / 6);
                    return (
                        <Line
                            key={i}
                            x1={CENTER}
                            y1={CENTER}
                            x2={x}
                            y2={y}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Fill Polygon */}
                <AnimatedPolygon
                    animatedProps={radarPoints}
                    fill="rgba(0, 214, 143, 0.25)"
                    stroke="#00D68F"
                    strokeWidth="2"
                />
            </Svg>
        </View>
    );
};

import { useRef } from 'react';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
