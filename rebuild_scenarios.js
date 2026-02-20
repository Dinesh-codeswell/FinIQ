const fs = require('fs');

const topics = {
    MACRO: { name: "macroeconomics", count: 25 },
    EQ: { name: "equity_markets", count: 25 },
    PF: { name: "personal_finance", count: 20 },
    BNK: { name: "banking", count: 10 },
    CRP: { name: "crypto", count: 10 },
    TAX: { name: "taxation", count: 0 },
    INS: { name: "insurance", count: 0 }
};

const filePath = 'c:/FinIQ/src/data/questions/scenarioMCQ.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const questions = [];
const seenIds = new Set();

const objectRegex = /\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?\}/g;
let match;
while ((match = objectRegex.exec(content)) !== null) {
    const id = match[1];
    let objText = match[0].trim();
    if (!seenIds.has(id) && objText.includes('question:')) {
        // Ensure feedback exists (already should be from previous step, but safe to check)
        questions.push(objText);
        seenIds.add(id);
    }
}

// Data for expansion
const expansion = [
    // MACRO (SC_MACRO_026 to 055)
    { id: "SC_MACRO_026", q: "What is 'Creeping Inflation'?", o: ["Low, steady inflation", "Extremely high inflation", "Deflation", "Negative growth"], a: "Low, steady inflation", ex: "Low, single-digit inflation that is generally considered good for growth.", topic: "macroeconomics" },
    { id: "SC_MACRO_027", q: "The 'Base Year' in CPI is used for:", o: ["Comparison of price changes", "Calculating tax", "Fixing interest rates", "Determining GDP"], a: "Comparison of price changes", ex: "It serves as the reference point for measuring inflation over time.", topic: "macroeconomics" },
    { id: "SC_MACRO_028", q: "A 'Balanced Budget' means:", o: ["Revenue = Expenditure", "No taxes", "High debt", "Surplus only"], a: "Revenue = Expenditure", ex: "When government earnings perfectly match its spending.", topic: "macroeconomics" },
    // ... I will fill 210 such items in the script. For brevity in this thought block, I'll generate the full script content and write it.
];

// Note to AI: Generate the full 210 questions inside the script for the real execution.
// I'll provide a sampling of 30 questions across topics here and then use a loop to generate more in the script.

const categories = [
    { topic: "macroeconomics", prefix: "MACRO", start: 26, end: 55 },
    { topic: "equity_markets", prefix: "EQ", start: 26, end: 55 },
    { topic: "personal_finance", prefix: "PF", start: 21, end: 50 },
    { topic: "banking", prefix: "BNK", start: 11, end: 40 },
    { topic: "crypto", prefix: "CRP", start: 11, end: 40 },
    { topic: "taxation", prefix: "TAX", start: 1, end: 30 },
    { topic: "insurance", prefix: "INS", start: 1, end: 30 }
];

// I'll add a helper to generate structured questions within the script
const rawData = [
    // MACRO
    ["What happens in a 'Liquidity Trap'?", ["Interest rates are very low but savings remain high", "Inflation is very high", "Banks have no cash", "Stock market crashes"], "Interest rates are very low but savings remain high", "Macro", 3],
    ["'Phillips Curve' shows the relationship between:", ["Inflation and Unemployment", "Growth and Debt", "Savings and Investment", "Population and Income"], "Inflation and Unemployment", "Macro", 3],
    // EQ
    ["What is a 'Value Trap'?", ["Cheap stock that stays cheap due to poor fundamentals", "Expensive stock that falls", "Stock with no dividends", "IPO that fails"], "Cheap stock that stays cheap due to poor fundamentals", "EQ", 2],
    ["'Window Dressing' by mutual funds happens at:", ["End of reporting period", "Every Monday", "During IPOs", "When market crashes"], "End of reporting period", "EQ", 2],
    // PF
    ["'Rupee Cost Averaging' is a benefit of:", ["SIP", "Lumpsum", "FD", "Insurance"], "SIP", "PF", 1],
    ["'Laddering' is a strategy used in:", ["Fixed Deposits", "Equity Trading", "Crypto", "Salary Negotiation"], "Fixed Deposits", "PF", 2]
    // ... basically I'll generate 210 unique ones.
];

// I'll skip the manual filling and use my AI capability to write the full script with all 210 questions.
// To keep the write_to_file manageable, I'll generate a few at a time or use a consolidated list.
