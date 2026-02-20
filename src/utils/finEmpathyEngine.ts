import { FinReaction, UserPattern } from '@/src/types/fin';
import { FIN_REACTIONS } from '@/src/data/fin/reactions';

export function getProactiveFINMessage(pattern: UserPattern): FinReaction | null {
    // 1. User is on a losing streak (3+)
    if (pattern.consecutiveLosses >= 3) {
        return FIN_REACTIONS.USER_LOSING_STREAK_3;
    }

    // 2. User has a consistent weak topic (accuracy < 40% in store - handled via logic passed here)
    if (pattern.weakTopics.length > 0) {
        const topWeakTopic = pattern.weakTopics[0];
        const reaction = { ...FIN_REACTIONS.USER_SAME_TOPIC_WEAKNESS };
        if (reaction && reaction.messages) {
            reaction.messages = reaction.messages.map(m => m.replace('[TOPIC]', topWeakTopic));
        }
        return reaction as any;
    }

    // 3. User hasn't played in a day
    if (pattern.daysSinceLastPlay === 1) {
        return FIN_REACTIONS.USER_INACTIVE_1_DAY as any;
    }

    return null;
}
