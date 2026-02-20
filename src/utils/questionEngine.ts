import { Question, DailyChallenge, QuestionType } from '@/src/data/questions/schema';
import { duelService } from '@/src/services/duelService';

// Helper to shuffle array
const shuffle = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

// Generate distractors for money math questions
export const generateMathOptions = (answer: number): string[] => {
    const opts = new Set<number>();
    opts.add(answer);

    while (opts.size < 4) {
        // Generate random variance between -50% and +50%
        const variance = (Math.random() * 1.0) - 0.5;
        const distractor = Math.round(answer * (1 + variance));
        if (distractor !== answer && distractor > 0) {
            opts.add(distractor);
        }
    }
    return shuffle(Array.from(opts)).map(n => n.toLocaleString('en-IN'));
};

const getStarterRatio = (playerRating: number, duelsPlayed: number): number => {
    if (duelsPlayed < 10) return 0.70;
    if (duelsPlayed < 20) return 0.50;
    if (duelsPlayed < 30) return 0.30;
    if (playerRating > 1050) return 0;
    return 0.20;
};

const interleaveQuestions = (starters: Question[], regulars: Question[]): Question[] => {
    const result: Question[] = [];
    const total = starters.length + regulars.length;

    if (starters.length === 0) return regulars;
    if (regulars.length === 0) return starters;

    const starterPositions = new Set<number>();
    const step = total / (starters.length + 1);
    for (let i = 1; i <= starters.length; i++) {
        starterPositions.add(Math.round(i * step) - 1);
    }

    let si = 0, ri = 0;
    for (let i = 0; i < total; i++) {
        if (starterPositions.has(i) && si < starters.length) {
            result.push(starters[si++]);
        } else if (ri < regulars.length) {
            result.push(regulars[ri++]);
        } else {
            result.push(starters[si++]);
        }
    }
    return result;
};

interface DuelOptions {
    difficulty: number;
    playerRating?: number;
    duelsPlayed?: number;
    count?: number;
    mode?: string;
}

export const getQuestionsForDuel = async (options: DuelOptions): Promise<Question[]> => {
    const { difficulty, playerRating = 0, duelsPlayed = 0, count = 10, mode = 'classical' } = options;

    const starterRatio = getStarterRatio(playerRating, duelsPlayed);
    const starterCount = Math.round(count * starterRatio);
    const regularCount = count - starterCount;

    let validTypes: QuestionType[] = [];
    if (mode === 'sprint') {
        validTypes = ['money_math', 'true_false'];
    } else if (mode === 'scenario') {
        validTypes = ['scenario_mcq'];
    } else {
        validTypes = ['money_math', 'scenario_mcq', 'true_false'];
    }

    // Fetch Starters
    let starterQs: Question[] = [];
    if (starterCount > 0) {
        const { data } = await duelService.getQuestions({
            count: starterCount,
            difficulty: 0,
            types: validTypes
        });
        if (data) starterQs = data as unknown as Question[];
    }

    // Fetch Regulars
    let regularQs: Question[] = [];
    if (regularCount > 0) {
        const { data } = await duelService.getQuestions({
            count: regularCount,
            difficulty: difficulty,
            types: validTypes
        });
        if (data) regularQs = data as unknown as Question[];
    }

    const interleaved = interleaveQuestions(starterQs, regularQs);

    return interleaved.map(q => {
        if (q.type === 'money_math' && typeof q.answer === 'number') {
            return {
                ...q,
                options: generateMathOptions(q.answer),
                answer: q.answer.toLocaleString('en-IN')
            };
        }
        return q;
    }) as any as Question[];
};

export const getDailyChallenge = async (): Promise<DailyChallenge | null> => {
    const { data } = await duelService.getQuestions({
        count: 1,
        difficulty: 1,
        types: ['daily_challenge']
    });

    return data && data.length > 0 ? (data[0] as unknown as DailyChallenge) : null;
};

export const checkAnswer = (question: Question, selectedOption: string | number): boolean => {
    if (question.type === 'money_math') {
        return selectedOption.toString() === question.answer.toString();
    }
    return selectedOption === question.answer;
};
