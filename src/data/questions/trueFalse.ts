import { Question } from './schema';

export const trueFalseQuestions: Question[] = [
    // PERSONAL FINANCE
    {
        id: "TF_PF_001", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "A credit score of 750 is considered poor.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "750 is generally considered a good to excellent score.",
        feedbackCorrect: "✓ Correct! 750 is generally considered a good to excellent score.",
        feedbackWrong: "✗ Not quite. 750 is generally considered a good to excellent score.",
        timeLimit: 10
    },
    {
        id: "TF_PF_002", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "You should carry your credit card pin written on the card.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Never write your PIN on the card; it's a security risk.",
        feedbackCorrect: "✓ Correct! Never write your PIN on the card; it.",
        feedbackWrong: "✗ Not quite. Never write your PIN on the card; it.",
        timeLimit: 10
    },
    {
        id: "TF_PF_003", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Emergency funds should be invested in high-risk stocks.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Emergency funds need to be liquid and safe, like in a savings account.",
        feedbackCorrect: "✓ Correct! Emergency funds need to be liquid and safe, like in a savings account.",
        feedbackWrong: "✗ Not quite. Emergency funds need to be liquid and safe, like in a savings account.",
        timeLimit: 10
    },
    {
        id: "TF_PF_004", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Debit cards spend money directly from your bank account.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "Unlike credit cards, debit cards use your own existing funds.",
        feedbackCorrect: "✓ Correct! Unlike credit cards, debit cards use your own existing funds.",
        feedbackWrong: "✗ Not quite. Unlike credit cards, debit cards use your own existing funds.",
        timeLimit: 10
    },
    {
        id: "TF_PF_005", type: "true_false", topic: "insurance", difficulty: 1, minRating: 0,
        question: "Life insurance is primarily for investment purposes.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Its primary purpose is risk protection for dependents.",
        feedbackCorrect: "✓ Correct! Its primary purpose is risk protection for dependents.",
        feedbackWrong: "✗ Not quite. Its primary purpose is risk protection for dependents.",
        timeLimit: 10
    },
    {
        id: "TF_PF_006", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Compounding works best over long periods.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "The longer the time horizon, the more powerful compounding becomes.",
        feedbackCorrect: "✓ Correct! The longer the time horizon, the more powerful compounding becomes.",
        feedbackWrong: "✗ Not quite. The longer the time horizon, the more powerful compounding becomes.",
        timeLimit: 10
    },
    {
        id: "TF_PF_007", type: "true_false", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Income tax is paid on gross income without deductions.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Tax is paid on taxable income after allowing for deductions.",
        feedbackCorrect: "✓ Correct! Tax is paid on taxable income after allowing for deductions.",
        feedbackWrong: "✗ Not quite. Tax is paid on taxable income after allowing for deductions.",
        timeLimit: 10
    },
    {
        id: "TF_PF_008", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Inflation decreases the purchasing power of money.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "As prices rise, the same amount of money buys fewer goods.",
        feedbackCorrect: "✓ Correct! As prices rise, the same amount of money buys fewer goods.",
        feedbackWrong: "✗ Not quite. As prices rise, the same amount of money buys fewer goods.",
        timeLimit: 10
    },
    {
        id: "TF_PF_009", type: "true_false", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "A co-signer is equally responsible for repaying a loan.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "If the primary borrower defaults, the co-signer must pay.",
        feedbackCorrect: "✓ Correct! If the primary borrower defaults, the co-signer must pay.",
        feedbackWrong: "✗ Not quite. If the primary borrower defaults, the co-signer must pay.",
        timeLimit: 10
    },
    {
        id: "TF_PF_010", type: "true_false", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Fixed deposits always beat inflation.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Post-tax FD returns often fail to beat high inflation.",
        feedbackCorrect: "✓ Correct! Post-tax FD returns often fail to beat high inflation.",
        feedbackWrong: "✗ Not quite. Post-tax FD returns often fail to beat high inflation.",
        timeLimit: 10
    },
    {
        id: "TF_PF_011", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Buying a car is typically an asset, not a liability.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Cars depreciate rapidly and require maintenance, making them liabilities in cash flow terms.",
        feedbackCorrect: "✓ Correct! Cars depreciate rapidly and require maintenance, making them liabilities in cash flow terms.",
        feedbackWrong: "✗ Not quite. Cars depreciate rapidly and require maintenance, making them liabilities in cash flow terms.",
        timeLimit: 10
    },
    {
        id: "TF_PF_012", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Budgeting helps you track expenses and save more.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "A budget is a fundamental tool for financial control.",
        feedbackCorrect: "✓ Correct! A budget is a fundamental tool for financial control.",
        feedbackWrong: "✗ Not quite. A budget is a fundamental tool for financial control.",
        timeLimit: 10
    },
    {
        id: "TF_PF_013", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Paying only the minimum due on credit cards avoids interest.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Interest is charged on the unpaid balance, usually at very high rates.",
        feedbackCorrect: "✓ Correct! Interest is charged on the unpaid balance, usually at very high rates.",
        feedbackWrong: "✗ Not quite. Interest is charged on the unpaid balance, usually at very high rates.",
        timeLimit: 10
    },
    {
        id: "TF_PF_014", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Net worth = Assets - Liabilities.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "This is the standard formula for calculating net worth.",
        feedbackCorrect: "✓ Correct! This is the standard formula for calculating net worth.",
        feedbackWrong: "✗ Not quite. This is the standard formula for calculating net worth.",
        timeLimit: 10
    },
    {
        id: "TF_PF_015", type: "true_false", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Variable interest rates stay the same throughout the loan tenure.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "They fluctuate based on market benchmarks.",
        feedbackCorrect: "✓ Correct! They fluctuate based on market benchmarks.",
        feedbackWrong: "✗ Not quite. They fluctuate based on market benchmarks.",
        timeLimit: 10
    },

    // INVESTING
    {
        id: "TF_INV_001", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Stocks represent ownership in a company.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "Buying a share means becoming a partial owner.",
        feedbackCorrect: "✓ Correct! Buying a share means becoming a partial owner.",
        feedbackWrong: "✗ Not quite. Buying a share means becoming a partial owner.",
        timeLimit: 10
    },
    {
        id: "TF_INV_002", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Bondholders are paid before shareholders in case of bankruptcy.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "Debt holders have higher priority claim on assets than equity holders.",
        feedbackCorrect: "✓ Correct! Debt holders have higher priority claim on assets than equity holders.",
        feedbackWrong: "✗ Not quite. Debt holders have higher priority claim on assets than equity holders.",
        timeLimit: 10
    },
    {
        id: "TF_INV_003", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Higher risk investments typically offer lower potential returns.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Risk and return are generally positively correlated.",
        feedbackCorrect: "✓ Correct! Risk and return are generally positively correlated.",
        feedbackWrong: "✗ Not quite. Risk and return are generally positively correlated.",
        timeLimit: 10
    },
    {
        id: "TF_INV_004", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Diversification guarantees you will not lose money.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "It reduces risk but cannot eliminate systemic market risk.",
        feedbackCorrect: "✓ Correct! It reduces risk but cannot eliminate systemic market risk.",
        feedbackWrong: "✗ Not quite. It reduces risk but cannot eliminate systemic market risk.",
        timeLimit: 10
    },
    {
        id: "TF_INV_005", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "A 'Bear Market' is when stock prices are rising.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "A Bear Market is defined by falling prices; Bull Market is rising.",
        feedbackCorrect: "✓ Correct! A Bear Market is defined by falling prices; Bull Market is rising.",
        feedbackWrong: "✗ Not quite. A Bear Market is defined by falling prices; Bull Market is rising.",
        timeLimit: 10
    },
    {
        id: "TF_INV_006", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Index funds are actively managed by fund managers.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Index funds are passively managed to mimic a market index.",
        feedbackCorrect: "✓ Correct! Index funds are passively managed to mimic a market index.",
        feedbackWrong: "✗ Not quite. Index funds are passively managed to mimic a market index.",
        timeLimit: 10
    },
    {
        id: "TF_INV_007", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "You can start investing with small amounts.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "SIPs and fractional shares allow investing with very little money.",
        feedbackCorrect: "✓ Correct! SIPs and fractional shares allow investing with very little money.",
        feedbackWrong: "✗ Not quite. SIPs and fractional shares allow investing with very little money.",
        timeLimit: 10
    },
    {
        id: "TF_INV_008", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Dividends are guaranteed payments.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Companies are not obligated to pay dividends; it depends on profits and policy.",
        feedbackCorrect: "✓ Correct! Companies are not obligated to pay dividends; it depends on profits and policy.",
        feedbackWrong: "✗ Not quite. Companies are not obligated to pay dividends; it depends on profits and policy.",
        timeLimit: 10
    },
    {
        id: "TF_INV_009", type: "true_false", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Bonds prices move inversely to interest rates.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "When rates go up, existing bond prices go down.",
        feedbackCorrect: "✓ Correct! When rates go up, existing bond prices go down.",
        feedbackWrong: "✗ Not quite. When rates go up, existing bond prices go down.",
        timeLimit: 10
    },
    {
        id: "TF_INV_010", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Liquid funds are riskier than small-cap equity funds.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Liquid funds invest in safe, short-term debt; small-caps are volatile equity.",
        feedbackCorrect: "✓ Correct! Liquid funds invest in safe, short-term debt; small-caps are volatile equity.",
        feedbackWrong: "✗ Not quite. Liquid funds invest in safe, short-term debt; small-caps are volatile equity.",
        timeLimit: 10
    },
    {
        id: "TF_INV_011", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Real estate is a highly liquid asset.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Selling property takes significant time and effort.",
        feedbackCorrect: "✓ Correct! Selling property takes significant time and effort.",
        feedbackWrong: "✗ Not quite. Selling property takes significant time and effort.",
        timeLimit: 10
    },
    {
        id: "TF_INV_012", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Expense ratio affects your mutual fund returns.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "Higher expense ratios eat into your net returns.",
        feedbackCorrect: "✓ Correct! Higher expense ratios eat into your net returns.",
        feedbackWrong: "✗ Not quite. Higher expense ratios eat into your net returns.",
        timeLimit: 10
    },
    {
        id: "TF_INV_013", type: "true_false", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Short term capital gains tax is usually lower than long term.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "STCG is usually taxed higher to encourage long-term holding.",
        feedbackCorrect: "✓ Correct! STCG is usually taxed higher to encourage long-term holding.",
        feedbackWrong: "✗ Not quite. STCG is usually taxed higher to encourage long-term holding.",
        timeLimit: 10
    },
    {
        id: "TF_INV_014", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Gold is considered a hedge against inflation.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "Gold tends to hold value effectively over very long periods.",
        feedbackCorrect: "✓ Correct! Gold tends to hold value effectively over very long periods.",
        feedbackWrong: "✗ Not quite. Gold tends to hold value effectively over very long periods.",
        timeLimit: 10
    },
    {
        id: "TF_INV_015", type: "true_false", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Beta measures a stock's volatility relative to the market.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "Beta > 1 means more volatile than the market.",
        feedbackCorrect: "✓ Correct! Beta > 1 means more volatile than the market.",
        feedbackWrong: "✗ Not quite. Beta > 1 means more volatile than the market.",
        timeLimit: 10
    },

    // BANKING
    {
        id: "TF_BNK_001", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "Savings accounts typically offer higher interest than Fixed Deposits.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "FDs lock money away and thus offer higher rates.",
        feedbackCorrect: "✓ Correct! FDs lock money away and thus offer higher rates.",
        feedbackWrong: "✗ Not quite. FDs lock money away and thus offer higher rates.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_002", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "Cheques are valid for 3 months from the date of issue.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "This is the standard validity period in India.",
        feedbackCorrect: "✓ Correct! This is the standard validity period in India.",
        feedbackWrong: "✗ Not quite. This is the standard validity period in India.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_003", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "Repo rate is the rate at which banks lend to RBI.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Repo rate is the rate at which RBI lends to banks.",
        feedbackCorrect: "✓ Correct! Repo rate is the rate at which RBI lends to banks.",
        feedbackWrong: "✗ Not quite. Repo rate is the rate at which RBI lends to banks.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_004", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "KYC stands for Know Your Customer.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "It is a mandatory process for verifying identity.",
        feedbackCorrect: "✓ Correct! It is a mandatory process for verifying identity.",
        feedbackWrong: "✗ Not quite. It is a mandatory process for verifying identity.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_005", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "You can withdraw cash from a credit card without any extra charges.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Cash advances usually attract immediate interest and withdrawal fees.",
        feedbackCorrect: "✓ Correct! Cash advances usually attract immediate interest and withdrawal fees.",
        feedbackWrong: "✗ Not quite. Cash advances usually attract immediate interest and withdrawal fees.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_006", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "IFSC code is required for NEFT transfers.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "It identifies the specific bank branch.",
        feedbackCorrect: "✓ Correct! It identifies the specific bank branch.",
        feedbackWrong: "✗ Not quite. It identifies the specific bank branch.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_007", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "Demand Drafts can bounce like cheques.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "DDs are prepaid and cannot bounce for insufficient funds.",
        feedbackCorrect: "✓ Correct! DDs are prepaid and cannot bounce for insufficient funds.",
        feedbackWrong: "✗ Not quite. DDs are prepaid and cannot bounce for insufficient funds.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_008", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "Recurring Deposit (RD) allows monthly savings.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "RDs are built for fixed monthly contributions.",
        feedbackCorrect: "✓ Correct! RDs are built for fixed monthly contributions.",
        feedbackWrong: "✗ Not quite. RDs are built for fixed monthly contributions.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_009", type: "true_false", topic: "banking", difficulty: 3, minRating: 1300,
        question: "DICGC insures bank deposits up to ₹5 Lakhs.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "This provides safety for depositors if a bank fails.",
        feedbackCorrect: "✓ Correct! This provides safety for depositors if a bank fails.",
        feedbackWrong: "✗ Not quite. This provides safety for depositors if a bank fails.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_010", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "Overdraft facility allows withdrawing more than balance.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "It is a credit facility attached to accounts.",
        feedbackCorrect: "✓ Correct! It is a credit facility attached to accounts.",
        feedbackWrong: "✗ Not quite. It is a credit facility attached to accounts.",
        timeLimit: 10
    },

    // MACRO & MARKET
    {
        id: "TF_MM_001", type: "true_false", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "GDP includes unpaid household work.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "GDP only measures market transactions.",
        feedbackCorrect: "✓ Correct! GDP only measures market transactions.",
        feedbackWrong: "✗ Not quite. GDP only measures market transactions.",
        timeLimit: 10
    },
    {
        id: "TF_MM_002", type: "true_false", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "A recession affects only the stock market.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Recessions affect jobs, income, and production across the economy.",
        feedbackCorrect: "✓ Correct! Recessions affect jobs, income, and production across the economy.",
        feedbackWrong: "✗ Not quite. Recessions affect jobs, income, and production across the economy.",
        timeLimit: 10
    },
    {
        id: "TF_MM_003", type: "true_false", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "SEBI regulates the insurance sector.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "SEBI regulates securities; IRDAI regulates insurance.",
        feedbackCorrect: "✓ Correct! SEBI regulates securities; IRDAI regulates insurance.",
        feedbackWrong: "✗ Not quite. SEBI regulates securities; IRDAI regulates insurance.",
        timeLimit: 10
    },
    {
        id: "TF_MM_004", type: "true_false", topic: "crypto", difficulty: 2, minRating: 1000,
        question: "Cryptocurrency transactions are reversible.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Blockchain transactions are immutable and generally irreversible.",
        feedbackCorrect: "✓ Correct! Blockchain transactions are immutable and generally irreversible.",
        feedbackWrong: "✗ Not quite. Blockchain transactions are immutable and generally irreversible.",
        timeLimit: 10
    },
    {
        id: "TF_MM_005", type: "true_false", topic: "crypto", difficulty: 1, minRating: 0,
        question: "Bitcoin supply is unlimited.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Bitcoin is capped at 21 million coins.",
        feedbackCorrect: "✓ Correct! Bitcoin is capped at 21 million coins.",
        feedbackWrong: "✗ Not quite. Bitcoin is capped at 21 million coins.",
        timeLimit: 10
    },

    // FUN/TRIVIA
    {
        id: "TF_TRIV_001", type: "true_false", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "The currency of Japan is the Yuan.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "Japan uses the Yen. Yuan is Chinese.",
        feedbackCorrect: "✓ Correct! Japan uses the Yen.",
        feedbackWrong: "✗ Not quite. Japan uses the Yen.",
        timeLimit: 10
    },
    {
        id: "TF_TRIV_002", type: "true_false", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "The bull is a symbol of market optimism.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "Bulls thrust upward, symbolizing rising prices.",
        feedbackCorrect: "✓ Correct! Bulls thrust upward, symbolizing rising prices.",
        feedbackWrong: "✗ Not quite. Bulls thrust upward, symbolizing rising prices.",
        timeLimit: 10
    },
    {
        id: "TF_TRIV_003", type: "true_false", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "Benjamin Franklin coined 'Time is Money'.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "It appeared in his essay 'Advice to a Young Tradesman'.",
        feedbackCorrect: "✓ Correct! It appeared in his essay .",
        feedbackWrong: "✗ Not quite. It appeared in his essay .",
        timeLimit: 10
    },
    {
        id: "TF_TRIV_004", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Warren Buffett is known as the Oracle of Omaha.",
        options: ["TRUE", "FALSE"],
        answer: "TRUE",
        correctAnswer: 0,
        explanation: "It is his famous nickname due to his investment track record.",
        feedbackCorrect: "✓ Correct! It is his famous nickname due to his investment track record.",
        feedbackWrong: "✗ Not quite. It is his famous nickname due to his investment track record.",
        timeLimit: 10
    },
    {
        id: "TF_TRIV_005", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "The Reserve Bank of India was established in 1947.",
        options: ["TRUE", "FALSE"],
        answer: "FALSE",
        correctAnswer: 1,
        explanation: "It was established in 1935.",
        feedbackCorrect: "✓ Correct! It was established in 1935.",
        feedbackWrong: "✗ Not quite. It was established in 1935.",
        timeLimit: 10
    }
];
