const fs = require('fs');
const path = require('path');

const questionsDir = './src/data/questions';
const files = ['dailyChallenges.ts', 'moneyMath.ts', 'scenarioMCQ.ts', 'termMatch.ts', 'trueFalse.ts'];

const inventory = {
    types: {},
    topics: {},
    difficulties: {},
    total: 0
};

files.forEach(file => {
    const filePath = path.join(questionsDir, file);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf-8');
    const ids = content.match(/id:\s*['"][^'"]+['"]/g) || [];

    ids.forEach(idMatch => {
        inventory.total++;
        let type = file.replace('.ts', '').replace(/([A-Z])/g, '_$1').toLowerCase();
        if (type === 'daily_challenges') type = 'daily_challenge';
        if (type === 'money_math') type = 'money_math';
        if (type === 'scenario_m_c_q') type = 'scenario_mcq';
        if (type === 'term_match') type = 'term_match';
        if (type === 'true_false') type = 'true_false';

        inventory.types[type] = (inventory.types[type] || 0) + 1;
    });

    const topics = content.match(/topic:\s*['"]([^'"]+)['"]/g) || [];
    topics.forEach(t => {
        const name = t.match(/['"](.*)['"]/)[1];
        inventory.topics[name] = (inventory.topics[name] || 0) + 1;
    });

    const diffs = content.match(/difficulty:\s*([0-9])/g) || [];
    diffs.forEach(d => {
        const val = d.match(/[0-9]/)[0];
        inventory.difficulties[val] = (inventory.difficulties[val] || 0) + 1;
    });
});

console.log('EXISTING QUESTION INVENTORY:');
console.log('─────────────────────────────────────────────');
Object.keys(inventory.types).sort().forEach(k => console.log(`Type: ${k.padEnd(15)} Count: ${inventory.types[k]}`));
console.log('─────────────────────────────────────────────');
Object.keys(inventory.topics).sort().forEach(k => console.log(`Topic: ${k.padEnd(15)} Count: ${inventory.topics[k]}`));
console.log('─────────────────────────────────────────────');
Object.keys(inventory.difficulties).sort().forEach(k => console.log(`Difficulty ${k}:      Count: ${inventory.difficulties[k]}`));
console.log('─────────────────────────────────────────────');
console.log(`TOTAL EXISTING:           ${inventory.total}`);
console.log(`QUESTIONS TO GENERATE:    ${1000 - inventory.total}`);
