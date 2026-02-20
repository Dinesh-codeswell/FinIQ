import { Question, DailyChallenge, QuestionType } from '@/src/data/questions/schema';
import { allQuestions } from '@/src/data/questions';

// Helper to shuffle array
const shuffle = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

// Generate distractors for money math questions
const generateMathOptions = (answer: number): string[] => {
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
    // New players (first 10 duels): 70% Starter questions
    if (duelsPlayed < 10) return 0.70;
    // Next 10 duels: 50% Starter questions  
    if (duelsPlayed < 20) return 0.50;
    // Next 10 duels: 30% Starter questions
    if (duelsPlayed < 30) return 0.30;
    // After 30 duels or rating > 1050: phase out Starter completely
    if (playerRating > 1050) return 0;
    return 0.20; // Default floor for Bronze players
};

const interleaveQuestions = (starters: Question[], regulars: Question[]): Question[] => {
    const result: Question[] = [];
    const total = starters.length + regulars.length;

    if (starters.length === 0) return regulars;
    if (regulars.length === 0) return starters;

    // Spread starter positions evenly across the duel
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
    mode?: string; // 'sprint', 'scenario', 'classical'
}

// Track used questions in a session to avoid repetition
const sessionUsed = new Set<string>();

export const getQuestionsForDuel = (options: DuelOptions): Question[] => {
    const { difficulty, playerRating = 0, duelsPlayed = 0, count = 10, mode = 'classical' } = options;

    // 1. Calculate Starter Ratio
    const starterRatio = getStarterRatio(playerRating, duelsPlayed);
    const starterCount = Math.round(count * starterRatio);
    const regularCount = count - starterCount;

    // 2. Filter Pool
    let validTypes: QuestionType[] = [];
    if (mode === 'sprint') {
        validTypes = ['money_math', 'true_false'];
    } else if (mode === 'scenario') {
        validTypes = ['scenario_mcq'];
    } else {
        validTypes = ['money_math', 'scenario_mcq', 'true_false'];
    }

    // 3. Select Starter Questions
    const starterPool = allQuestions.filter(q =>
        q.difficulty === 0 &&
        validTypes.includes(q.type) &&
        !sessionUsed.has(q.id)
    );

    const starterQs = shuffle(starterPool).slice(0, starterCount);

    // 4. Select Regular Questions
    const validDifficulties = [difficulty];
    if (difficulty > 1) validDifficulties.push(difficulty - 1);
    if (difficulty < 3) validDifficulties.push(difficulty + 1);

    const regularPool = allQuestions.filter(q =>
        q.difficulty > 0 &&
        validTypes.includes(q.type) &&
        validDifficulties.includes(q.difficulty) &&
        !sessionUsed.has(q.id) &&
        q.type !== 'daily_challenge'
    );

    const regularQs = shuffle(regularPool).slice(0, regularCount);

    // If pool is exhausted, reset session (simplified strategy)
    if (starterQs.length < starterCount || regularQs.length < regularCount) {
        sessionUsed.clear();
        // Recalling selection would be recursive, let's just return what we have for now or fallback
    }

    // 5. Interleave
    const interleaved = interleaveQuestions(starterQs as Question[], regularQs as Question[]);

    // 6. Post-process (Generate Options for Math)
    return interleaved.map(q => {
        sessionUsed.add(q.id);
        if (q.type === 'money_math' && typeof q.answer === 'number') {
            return {
                ...q,
                options: generateMathOptions(q.answer),
                answer: q.answer.toLocaleString('en-IN') // Convert answer to string to match options
            };
        }
        return q;
    }) as Question[];
};

export const getDailyChallenge = (): DailyChallenge => {
    const today = new Date();
    // Deterministic hash of the date to pick a question
    const seed = today.getFullYear() * 1000 + (today.getMonth() + 1) * 100 + today.getDate();
    const challenges = allQuestions.filter(q => q.type === 'daily_challenge') as DailyChallenge[];

    if (challenges.length === 0) return null as any;

    const index = seed % challenges.length;
    return challenges[index];
};

export const checkAnswer = (question: Question, selectedOption: string | number): boolean => {
    if (question.type === 'money_math') {
        // Compare as strings since we formatted options
        return selectedOption.toString() === question.answer.toString();
    }
    // For True/False and MCQ
    return selectedOption === question.answer;
};
