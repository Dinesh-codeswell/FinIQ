import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FinMascot from '@/src/components/fin/FinMascot';
import { useFinStore } from '@/src/store/finStore';
import { getTodaysTip } from '@/src/utils/finTipEngine';
import { TYPOGRAPHY } from '@/constants/typography';
import { TourAnchor } from '@/src/components/fin/TourAnchor';

export default function FinTipCard() {
    const { tipLiked, setTipLiked } = useFinStore();
    const [showToast, setShowToast] = useState(false);
    const toastOpacity = useRef(new Animated.Value(0)).current;

    const tip = getTodaysTip();
    const todayStr = new Date().toISOString().split('T')[0];
    const isLiked = tipLiked[todayStr] || false;

    const likeScale = useRef(new Animated.Value(1)).current;

    const handleLike = () => {
        const nextLiked = !isLiked;
        setTipLiked(todayStr, nextLiked);

        Animated.sequence([
            Animated.timing(likeScale, { toValue: 1.4, duration: 100, useNativeDriver: true }),
            Animated.spring(likeScale, { toValue: 1, friction: 3, useNativeDriver: true }),
        ]).start();
    };

    const triggerToast = () => {
        setShowToast(true);
        Animated.sequence([
            Animated.timing(toastOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.delay(1500),
            Animated.timing(toastOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]).start(() => setShowToast(false));
    };

    return (
        <TourAnchor id="fin_tip_card">
            <View style={styles.card}>
                {/* Top Section */}
                <View style={styles.topSection}>
                    {/* Mascot Container */}
                    <View style={styles.mascotCircle}>
                        <FinMascot expression={tip.expression} size="medium" />
                    </View>

                    {/* Content Section */}
                    <View style={styles.contentSection}>
                        <Text style={styles.finWhisper}>Fin says</Text>
                        <Text style={styles.tipHeadline}>{tip.headline}</Text>
                        <Text style={styles.tipBody} numberOfLines={3}>
                            {tip.body}
                        </Text>
                    </View>

                    {/* Heart Icon */}
                    <TouchableOpacity
                        style={styles.heartWrapper}
                        onPress={handleLike}
                        onLongPress={triggerToast}
                        activeOpacity={0.7}
                    >
                        <Animated.View style={{ transform: [{ scale: likeScale }] }}>
                            <Ionicons
                                name={isLiked ? "heart" : "heart-outline"}
                                size={18}
                                color={isLiked ? "#FF4757" : "#3A3A3A"}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </View>

                {/* Hairline Separator */}
                <View style={styles.hairline} />

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    <View style={styles.tagPills}>
                        <View style={styles.pill}>
                            <Text style={styles.pillText}>
                                {tip.category.replace('_', ' · ')}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.nextTipText}>Next tip →</Text>
                    </TouchableOpacity>
                </View>

                {/* Toast Notification */}
                {showToast && (
                    <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
                        <Text style={styles.toastText}>Tip saved to Library</Text>
                    </Animated.View>
                )}
            </View>
        </TourAnchor>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#141414',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#222222',
        overflow: 'hidden',
    },
    topSection: {
        padding: 16,
        flexDirection: 'row',
        position: 'relative',
    },
    mascotCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentSection: {
        flex: 1,
        paddingLeft: 14,
    },
    finWhisper: {
        fontSize: 10,
        fontWeight: TYPOGRAPHY.weights.medium as any,
        color: '#6B7280',
        letterSpacing: 0.04 * 10, // 0.04em
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    tipHeadline: {
        fontSize: 16,
        fontWeight: TYPOGRAPHY.weights.bold as any,
        color: '#FFFFFF',
        marginTop: 2,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    tipBody: {
        fontSize: 13,
        fontWeight: TYPOGRAPHY.weights.regular as any,
        color: '#9CA3AF',
        marginTop: 6,
        lineHeight: 13 * 1.5,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    heartWrapper: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    hairline: {
        height: 1,
        backgroundColor: '#222222',
        marginHorizontal: 16,
    },
    bottomSection: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tagPills: {
        flexDirection: 'row',
    },
    pill: {
        backgroundColor: '#1C1C1C',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    pillText: {
        fontSize: 10,
        fontWeight: TYPOGRAPHY.weights.medium as any,
        color: '#6B7280',
        textTransform: 'capitalize',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    nextTipText: {
        fontSize: 11,
        fontWeight: TYPOGRAPHY.weights.medium as any,
        color: '#00D68F',
        fontFamily: TYPOGRAPHY.fontFamily,
    },
    toast: {
        position: 'absolute',
        bottom: 12,
        left: '20%',
        right: '20%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 20,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toastText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: TYPOGRAPHY.weights.semibold as any,
        fontFamily: TYPOGRAPHY.fontFamily,
    },
});
