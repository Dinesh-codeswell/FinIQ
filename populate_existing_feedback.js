const fs = require('fs');
const path = require('path');

const questionsDir = './src/data/questions';
const files = ['dailyChallenges.ts', 'moneyMath.ts', 'scenarioMCQ.ts', 'trueFalse.ts'];

const feedbackTemplates = {
    true_false: {
        correct: (q, ans, exp) => `✓ Correct! ${exp.split('.')[0]}.`,
        wrong: (q, ans, exp) => `✗ Not quite. ${exp.split('.')[0]}.`
    },
    money_math: {
        correct: (q, ans, exp) => `✓ Spot on! The calculation is correct.`,
        wrong: (q, ans, exp) => `✗ Close! ${exp.split('.')[0]}.`
    },
    scenario_mcq: {
        correct: (q, ans, exp) => `✓ Right! ${exp.split('.')[0]}.`,
        wrong: (q, ans, exp) => `✗ Actually, it's ${ans}. ${exp.split('.')[0]}.`
    },
    daily_challenge: {
        correct: (q, ans, exp) => `✓ Perfect! You follow the markets well.`,
        wrong: (q, ans, exp) => `✗ Not quite. ${exp.split('.')[0]}.`
    }
};

files.forEach(file => {
    const filePath = path.join(questionsDir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // We'll use a regex to match each object and insert the fields
    // This is a bit tricky with multi-line objects.
    // We'll look for the end of each object before the closing brace '}' that isn't part of an inner array.

    const objectRegex = /\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?\}/g;

    content = content.replace(objectRegex, (match, id) => {
        if (match.includes('feedbackCorrect:')) return match; // Already updated

        // Extract fields needed for feedback
        const typeMatch = match.match(/type:\s*['"]([^'"]+)['"]/);
        const ansMatch = match.match(/answer:\s*['"]?([^'",\n\}]+)['"]?/);
        const expMatch = match.match(/explanation:\s*['"]([^'"]+)['"]/);

        const type = typeMatch ? typeMatch[1] : (file.includes('trueFalse') ? 'true_false' : 'scenario_mcq');
        const ans = ansMatch ? ansMatch[1] : '';
        const exp = expMatch ? expMatch[1] : 'Keep learning!';

        const template = feedbackTemplates[type] || feedbackTemplates.scenario_mcq;
        const feedbackCorrect = template.correct(null, ans, exp).replace(/"/g, "'");
        const feedbackWrong = template.wrong(null, ans, exp).replace(/"/g, "'");

        // Insert before timeLimit or before last '}'
        if (match.includes('timeLimit:')) {
            return match.replace(/(timeLimit:)/, `feedbackCorrect: "${feedbackCorrect}",\n        feedbackWrong: "${feedbackWrong}",\n        $1`);
        } else {
            return match.replace(/\}(\s*)$/, `    feedbackCorrect: "${feedbackCorrect}",\n        feedbackWrong: "${feedbackWrong}"\n    }$1`);
        }
    });

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
