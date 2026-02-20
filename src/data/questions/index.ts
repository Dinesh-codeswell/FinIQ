import { moneyMathQuestions } from './moneyMath';
import { scenarioMCQQuestions } from './scenarioMCQ';
import { trueFalseQuestions } from './trueFalse';
import { starterQuestions } from './starterQuestions';
import { termMatchQuestions } from './termMatch';
import { dailyChallengeQuestions } from './dailyChallenges';
import { Question, TermPair, DailyChallenge } from './schema';

export const allQuestions: (Question | DailyChallenge)[] = [
    ...starterQuestions,
    ...moneyMathQuestions,
    ...scenarioMCQQuestions,
    ...trueFalseQuestions,
    ...dailyChallengeQuestions
];

export const allTermPairs: TermPair[] = termMatchQuestions;

export * from './schema';
