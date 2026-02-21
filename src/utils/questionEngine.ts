import { Question, DailyChallenge, QuestionType } from '@/src/data/questions/schema';
import { duelService } from '@/src/services/duelService';
import mentalMathData from '@/mental_math_data.json';
import { MentalMathQuestion } from '@/types/game';

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
    topic?: string;
}

export const getQuestionsForDuel = async (options: DuelOptions): Promise<Question[]> => {
    const { difficulty, playerRating = 0, duelsPlayed = 0, count = 10, mode = 'classical' } = options;

    const starterRatio = getStarterRatio(playerRating, duelsPlayed);
    const starterCount = Math.round(count * starterRatio);
    const regularCount = count - starterCount;

    if (options.topic === 'mental_math') {
        // Fetch from local JSON for Mental Math
        const mmQs = mentalMathData as MentalMathQuestion[];
        let filtered = mmQs.filter(q => q.difficulty <= difficulty + 1);

        // Shuffle and take count
        const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, count);
        // Ensure every question has options so the duel UI can render answer choices
        return shuffled.map((q: any) => {
            if (q.options && q.options.length >= 2) return q as Question;
            const answerStr = String(q.answer ?? '');
            const num = parseInt(answerStr, 10);
            if (!Number.isNaN(num)) {
                return {
                    ...q,
                    options: generateMathOptions(num),
                    answer: num.toLocaleString('en-IN'),
                } as Question;
            }
            if (answerStr.length === 1 && /[A-Za-z]/.test(answerStr)) {
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const distractors = new Set<string>([answerStr.toUpperCase()]);
                while (distractors.size < 4) {
                    distractors.add(alphabet[Math.floor(Math.random() * 26)]);
                }
                return { ...q, options: shuffle(Array.from(distractors)) } as Question;
            }
            // Fallback: ensure 4 distinct options so UI always has choices
            const fallbackOpts = [answerStr, 'A', 'B', 'C'].slice(0, 4);
            return { ...q, options: shuffle(fallbackOpts) } as Question;
        }) as Question[];
    }

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
        // Ensure money_math / mental_math (numeric) always have 4 options
        if ((q.type === 'money_math' || (q.type as string) === 'mental_math') && typeof q.answer === 'number' && (!q.options || q.options.length === 0)) {
            return {
                ...q,
                options: generateMathOptions(q.answer),
                answer: q.answer.toLocaleString('en-IN')
            };
        }

        // Handle mental math string type answers (like letter patterns or words)
        if ((q.type as string) === 'mental_math' && typeof q.answer === 'string' && (!q.options || q.options.length === 0)) {
            if (q.answer.length === 1 && /[A-Z]/.test(q.answer)) {
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const distractors = new Set<string>();
                distractors.add(q.answer);
                while (distractors.size < 4) {
                    const randomIdx = Math.floor(Math.random() * 26);
                    distractors.add(alphabet[randomIdx]);
                }
                return { ...q, options: shuffle(Array.from(distractors)) };
            }
            // Fallback for word answers
            const fallbackOpts = [q.answer, 'Option A', 'Option B', 'Option C'];
            return { ...q, options: shuffle(fallbackOpts) };
        }

        // Ensure true_false questions always have ["TRUE", "FALSE"] options
        if (q.type === 'true_false' && (!q.options || q.options.length === 0)) {
            const answerStr = String(q.answer ?? '').trim().toUpperCase();
            return {
                ...q,
                options: ['TRUE', 'FALSE'],
                answer: answerStr === 'TRUE' ? 'TRUE' : 'FALSE',
                correctAnswer: answerStr === 'TRUE' ? 0 : 1,
            };
        }

        // Ensure scenario_mcq questions have options — if correctAnswer index exists, reconstruct
        if (q.type === 'scenario_mcq' && (!q.options || q.options.length === 0)) {
            console.warn(`[questionEngine] scenario_mcq ${q.id} has no options — skipping or using answer as single option`);
            // If we have an answer string, create placeholder options with the answer included
            if (q.answer && typeof q.answer === 'string') {
                const opts = [q.answer.trim(), 'Not enough information', 'None of the above', 'All of the above'];
                return { ...q, options: shuffle(opts), answer: q.answer.trim(), correctAnswer: undefined };
            }
        }

        // Trim answer whitespace for all questions coming from DB
        if (q.answer && typeof q.answer === 'string') {
            return { ...q, answer: q.answer.trim() };
        }

        return q;
    }).filter(q => q.options && q.options.length >= 2) as any as Question[];
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
    const selected = selectedOption?.toString().trim();
    const answer = question.answer?.toString().trim();
    if (!selected || !answer) return false;
    if (question.type === 'money_math' || (question.type as string) === 'mental_math') {
        return selected === answer;
    }
    return selected === answer;
};
