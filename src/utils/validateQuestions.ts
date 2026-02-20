import { allQuestions } from '../data/questions';

const validate = () => {
    console.log("Starting Question Bank Validation...");
    let errors = 0;
    const ids = new Set<string>();

    allQuestions.forEach((q, index) => {
        // Unique ID check
        if (!q.id) {
            console.error(`Error at index ${index}: Missing ID`);
            errors++;
        } else if (ids.has(q.id)) {
            console.error(`Error: Duplicate ID found: ${q.id}`);
            errors++;
        }
        ids.add(q.id);

        // Required fields check
        if (!q.question) {
            console.error(`Error in ${q.id}: Missing question text`);
            errors++;
        }
        if (q.answer === undefined || q.answer === null) {
            console.error(`Error in ${q.id}: Missing answer`);
            errors++;
        }

        // Options check for MCQ/Daily
        if (q.type === 'scenario_mcq' || q.type === 'daily_challenge') {
            if (!q.options || q.options.length < 2) {
                console.error(`Error in ${q.id}: Type ${q.type} requires options`);
                errors++;
            }
            if (!q.options?.includes(q.answer as string)) {
                console.error(`Error in ${q.id}: Answer "${q.answer}" must be one of the options`);
                errors++;
            }
        }

        // True/False answer check
        if (q.type === 'true_false') {
            if (q.answer !== 'TRUE' && q.answer !== 'FALSE') {
                console.error(`Error in ${q.id}: True/False question must have answer TRUE or FALSE`);
                errors++;
            }
        }
    });

    if (errors === 0) {
        console.log(`Validation Success! ${allQuestions.length} questions validated with 0 errors.`);
    } else {
        console.error(`Validation Failed with ${errors} errors.`);
        process.exit(1);
    }
};

validate();
