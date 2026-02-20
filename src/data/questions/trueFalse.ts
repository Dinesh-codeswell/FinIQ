import { Question } from './schema';

export const trueFalseQuestions: Question[] = [
    // PERSONAL FINANCE
    {
        id: "TF_PF_001", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "A credit score of 750 is considered poor.",
        answer: "FALSE", explanation: "750 is generally considered a good to excellent score.",
        timeLimit: 10
    },
    {
        id: "TF_PF_002", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "You should carry your credit card pin written on the card.",
        answer: "FALSE", explanation: "Never write your PIN on the card; it's a security risk.",
        timeLimit: 10
    },
    {
        id: "TF_PF_003", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Emergency funds should be invested in high-risk stocks.",
        answer: "FALSE", explanation: "Emergency funds need to be liquid and safe, like in a savings account.",
        timeLimit: 10
    },
    {
        id: "TF_PF_004", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Debit cards spend money directly from your bank account.",
        answer: "TRUE", explanation: "Unlike credit cards, debit cards use your own existing funds.",
        timeLimit: 10
    },
    {
        id: "TF_PF_005", type: "true_false", topic: "insurance", difficulty: 1, minRating: 0,
        question: "Life insurance is primarily for investment purposes.",
        answer: "FALSE", explanation: "Its primary purpose is risk protection for dependents.",
        timeLimit: 10
    },
    {
        id: "TF_PF_006", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Compounding works best over long periods.",
        answer: "TRUE", explanation: "The longer the time horizon, the more powerful compounding becomes.",
        timeLimit: 10
    },
    {
        id: "TF_PF_007", type: "true_false", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Income tax is paid on gross income without deductions.",
        answer: "FALSE", explanation: "Tax is paid on taxable income after allowing for deductions.",
        timeLimit: 10
    },
    {
        id: "TF_PF_008", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Inflation decreases the purchasing power of money.",
        answer: "TRUE", explanation: "As prices rise, the same amount of money buys fewer goods.",
        timeLimit: 10
    },
    {
        id: "TF_PF_009", type: "true_false", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "A co-signer is equally responsible for repaying a loan.",
        answer: "TRUE", explanation: "If the primary borrower defaults, the co-signer must pay.",
        timeLimit: 10
    },
    {
        id: "TF_PF_010", type: "true_false", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Fixed deposits always beat inflation.",
        answer: "FALSE", explanation: "Post-tax FD returns often fail to beat high inflation.",
        timeLimit: 10
    },
    {
        id: "TF_PF_011", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Buying a car is typically an asset, not a liability.",
        answer: "FALSE", explanation: "Cars depreciate rapidly and require maintenance, making them liabilities in cash flow terms.",
        timeLimit: 10
    },
    {
        id: "TF_PF_012", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Budgeting helps you track expenses and save more.",
        answer: "TRUE", explanation: "A budget is a fundamental tool for financial control.",
        timeLimit: 10
    },
    {
        id: "TF_PF_013", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Paying only the minimum due on credit cards avoids interest.",
        answer: "FALSE", explanation: "Interest is charged on the unpaid balance, usually at very high rates.",
        timeLimit: 10
    },
    {
        id: "TF_PF_014", type: "true_false", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Net worth = Assets - Liabilities.",
        answer: "TRUE", explanation: "This is the standard formula for calculating net worth.",
        timeLimit: 10
    },
    {
        id: "TF_PF_015", type: "true_false", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Variable interest rates stay the same throughout the loan tenure.",
        answer: "FALSE", explanation: "They fluctuate based on market benchmarks.",
        timeLimit: 10
    },

    // INVESTING
    {
        id: "TF_INV_001", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Stocks represent ownership in a company.",
        answer: "TRUE", explanation: "Buying a share means becoming a partial owner.",
        timeLimit: 10
    },
    {
        id: "TF_INV_002", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Bondholders are paid before shareholders in case of bankruptcy.",
        answer: "TRUE", explanation: "Debt holders have higher priority claim on assets than equity holders.",
        timeLimit: 10
    },
    {
        id: "TF_INV_003", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Higher risk investments typically offer lower potential returns.",
        answer: "FALSE", explanation: "Risk and return are generally positively correlated.",
        timeLimit: 10
    },
    {
        id: "TF_INV_004", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Diversification guarantees you will not lose money.",
        answer: "FALSE", explanation: "It reduces risk but cannot eliminate systemic market risk.",
        timeLimit: 10
    },
    {
        id: "TF_INV_005", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "A 'Bear Market' is when stock prices are rising.",
        answer: "FALSE", explanation: "A Bear Market is defined by falling prices; Bull Market is rising.",
        timeLimit: 10
    },
    {
        id: "TF_INV_006", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Index funds are actively managed by fund managers.",
        answer: "FALSE", explanation: "Index funds are passively managed to mimic a market index.",
        timeLimit: 10
    },
    {
        id: "TF_INV_007", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "You can start investing with small amounts.",
        answer: "TRUE", explanation: "SIPs and fractional shares allow investing with very little money.",
        timeLimit: 10
    },
    {
        id: "TF_INV_008", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Dividends are guaranteed payments.",
        answer: "FALSE", explanation: "Companies are not obligated to pay dividends; it depends on profits and policy.",
        timeLimit: 10
    },
    {
        id: "TF_INV_009", type: "true_false", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Bonds prices move inversely to interest rates.",
        answer: "TRUE", explanation: "When rates go up, existing bond prices go down.",
        timeLimit: 10
    },
    {
        id: "TF_INV_010", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Liquid funds are riskier than small-cap equity funds.",
        answer: "FALSE", explanation: "Liquid funds invest in safe, short-term debt; small-caps are volatile equity.",
        timeLimit: 10
    },
    {
        id: "TF_INV_011", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Real estate is a highly liquid asset.",
        answer: "FALSE", explanation: "Selling property takes significant time and effort.",
        timeLimit: 10
    },
    {
        id: "TF_INV_012", type: "true_false", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Expense ratio affects your mutual fund returns.",
        answer: "TRUE", explanation: "Higher expense ratios eat into your net returns.",
        timeLimit: 10
    },
    {
        id: "TF_INV_013", type: "true_false", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Short term capital gains tax is usually lower than long term.",
        answer: "FALSE", explanation: "STCG is usually taxed higher to encourage long-term holding.",
        timeLimit: 10
    },
    {
        id: "TF_INV_014", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Gold is considered a hedge against inflation.",
        answer: "TRUE", explanation: "Gold tends to hold value effectively over very long periods.",
        timeLimit: 10
    },
    {
        id: "TF_INV_015", type: "true_false", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Beta measures a stock's volatility relative to the market.",
        answer: "TRUE", explanation: "Beta > 1 means more volatile than the market.",
        timeLimit: 10
    },

    // BANKING
    {
        id: "TF_BNK_001", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "Savings accounts typically offer higher interest than Fixed Deposits.",
        answer: "FALSE", explanation: "FDs lock money away and thus offer higher rates.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_002", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "Cheques are valid for 3 months from the date of issue.",
        answer: "TRUE", explanation: "This is the standard validity period in India.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_003", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "Repo rate is the rate at which banks lend to RBI.",
        answer: "FALSE", explanation: "Repo rate is the rate at which RBI lends to banks.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_004", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "KYC stands for Know Your Customer.",
        answer: "TRUE", explanation: "It is a mandatory process for verifying identity.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_005", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "You can withdraw cash from a credit card without any extra charges.",
        answer: "FALSE", explanation: "Cash advances usually attract immediate interest and withdrawal fees.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_006", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "IFSC code is required for NEFT transfers.",
        answer: "TRUE", explanation: "It identifies the specific bank branch.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_007", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "Demand Drafts can bounce like cheques.",
        answer: "FALSE", explanation: "DDs are prepaid and cannot bounce for insufficient funds.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_008", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "Recurring Deposit (RD) allows monthly savings.",
        answer: "TRUE", explanation: "RDs are built for fixed monthly contributions.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_009", type: "true_false", topic: "banking", difficulty: 3, minRating: 1300,
        question: "DICGC insures bank deposits up to ₹5 Lakhs.",
        answer: "TRUE", explanation: "This provides safety for depositors if a bank fails.",
        timeLimit: 10
    },
    {
        id: "TF_BNK_010", type: "true_false", topic: "banking", difficulty: 2, minRating: 1000,
        question: "Overdraft facility allows withdrawing more than balance.",
        answer: "TRUE", explanation: "It is a credit facility attached to accounts.",
        timeLimit: 10
    },

    // MACRO & MARKET
    {
        id: "TF_MM_001", type: "true_false", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "GDP includes unpaid household work.",
        answer: "FALSE", explanation: "GDP only measures market transactions.",
        timeLimit: 10
    },
    {
        id: "TF_MM_002", type: "true_false", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "A recession affects only the stock market.",
        answer: "FALSE", explanation: "Recessions affect jobs, income, and production across the economy.",
        timeLimit: 10
    },
    {
        id: "TF_MM_003", type: "true_false", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "SEBI regulates the insurance sector.",
        answer: "FALSE", explanation: "SEBI regulates securities; IRDAI regulates insurance.",
        timeLimit: 10
    },
    {
        id: "TF_MM_004", type: "true_false", topic: "crypto", difficulty: 2, minRating: 1000,
        question: "Cryptocurrency transactions are reversible.",
        answer: "FALSE", explanation: "Blockchain transactions are immutable and generally irreversible.",
        timeLimit: 10
    },
    {
        id: "TF_MM_005", type: "true_false", topic: "crypto", difficulty: 1, minRating: 0,
        question: "Bitcoin supply is unlimited.",
        answer: "FALSE", explanation: "Bitcoin is capped at 21 million coins.",
        timeLimit: 10
    },

    // FUN/TRIVIA
    {
        id: "TF_TRIV_001", type: "true_false", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "The currency of Japan is the Yuan.",
        answer: "FALSE", explanation: "Japan uses the Yen. Yuan is Chinese.",
        timeLimit: 10
    },
    {
        id: "TF_TRIV_002", type: "true_false", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "The bull is a symbol of market optimism.",
        answer: "TRUE", explanation: "Bulls thrust upward, symbolizing rising prices.",
        timeLimit: 10
    },
    {
        id: "TF_TRIV_003", type: "true_false", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "Benjamin Franklin coined 'Time is Money'.",
        answer: "TRUE", explanation: "It appeared in his essay 'Advice to a Young Tradesman'.",
        timeLimit: 10
    },
    {
        id: "TF_TRIV_004", type: "true_false", topic: "investing", difficulty: 1, minRating: 0,
        question: "Warren Buffett is known as the Oracle of Omaha.",
        answer: "TRUE", explanation: "It is his famous nickname due to his investment track record.",
        timeLimit: 10
    },
    {
        id: "TF_TRIV_005", type: "true_false", topic: "banking", difficulty: 1, minRating: 0,
        question: "The Reserve Bank of India was established in 1947.",
        answer: "FALSE", explanation: "It was established in 1935.",
        timeLimit: 10
    }
];
