const fs = require('fs');
const path = require('path');

const filePath = './src/data/questions/moneyMath.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Clean up the corrupted section around MM_H_019
// We'll replace the mess between MM_H_018's end and MM_H_020's start.
const corruptedRegex = /\},\s*timeLimit: 8, tags: \["mental_math"\]\s*\}\s*,\s*\{/;
// That regex is hard. Let's just look for the known fragments.

content = content.replace(/id: "MM_H_018"[\s\S]*?id: "MM_H_020"/, (match) => {
    return `id: "MM_H_018", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "XIRR approx for 10% return monthly? ~ ?", answer: 21, explanation: "Monthly compounding effect", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Monthly compounding effect.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_H_019", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Cube of 6 = ?", answer: 216, explanation: "6 * 6 * 6 = 216", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 6 * 6 * 6 = 216.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_H_020"`;
});

// 2. Fix the missing tags and corrupted formatting for objects
// We'll use a regex to find all objects and ensure they have tags and correct structure.
const objectRegex = /\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?\}/g;

content = content.replace(objectRegex, (match, id) => {
    // Ensure tags field exists
    if (!match.includes('tags:')) {
        const topicMatch = match.match(/topic:\s*['"]([^'"]+)['"]/);
        const topic = topicMatch ? topicMatch[1] : 'general';
        match = match.replace(/(timeLimit: \d+)/, `$1, tags: ["${topic}"]`);
    }

    // Fix indentation mess (opening brace on its own line followed by id)
    // and ensuring a comma after the closing brace
    match = match.replace(/^\{\n\s+id:/, '    {\n        id:');

    return match;
});

// 3. Final verification of the export structure
if (!content.includes('export const moneyMathQuestions: Question[] = [')) {
    console.error("Export statement missing or corrupted!");
}

fs.writeFileSync(filePath, content);
console.log("Fixed moneyMath.ts");
