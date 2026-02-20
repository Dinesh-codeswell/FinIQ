const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const batchPath = process.argv[3];

if (!filePath || !batchPath) {
    console.error('Usage: node append_questions.js <file_path> <batch_path>');
    process.exit(1);
}

try {
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newData = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

    existingData.push(...newData);

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 4), 'utf8');
    console.log(`Successfully added ${newData.length} questions to ${filePath}`);
} catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
}
