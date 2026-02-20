import { DailyChallenge } from './schema';

export const dailyChallengeQuestions: DailyChallenge[] = [
    // WEEK 1
    {
        id: "DC_001", type: "daily_challenge", topic: "macroeconomics", difficulty: 2, minRating: 0,
        question: "The RBI Monetary Policy Committee is meeting today. If they hike rates, what usually happens to home loan EMIs?",
        options: ["They rise", "They fall", "No change", "Banks pay you"],
        answer: "They rise",
        explanation: "Higher repo rates increase the cost of funds for banks, which they pass on to borrowers.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Higher repo rates increase the cost of funds for banks, which they pass on to borrowers.",
        timeLimit: 20, event_context: "MPC Meeting", fun_fact: "The MPC meets at least 4 times a year."
    },
    {
        id: "DC_002", type: "daily_challenge", topic: "crypto", difficulty: 2, minRating: 0,
        question: "Bitcoin just crossed a new all-time high. What is the fear index likely showing?",
        options: ["Extreme Fear", "Neutral", "Extreme Greed", "Boredom"],
        answer: "Extreme Greed",
        explanation: "When prices soar, the 'Fear & Greed Index' typically points to Extreme Greed as FOMO kicks in.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. When prices soar, the .",
        timeLimit: 20, event_context: "Crypto Bull Run", fun_fact: "The first real-world Bitcoin transaction was for two pizzas."
    },
    {
        id: "DC_003", type: "daily_challenge", topic: "taxation", difficulty: 2, minRating: 0,
        question: "It's tax season! Which section allows you to claim deduction for health insurance premiums?",
        options: ["80C", "80D", "80E", "80G"],
        answer: "80D",
        explanation: "Section 80D covers medical insurance premiums for self and family.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Section 80D covers medical insurance premiums for self and family.",
        timeLimit: 20, event_context: "Tax Filing Season", fun_fact: "Income tax was introduced in India in 1860 by James Wilson."
    },
    {
        id: "DC_004", type: "daily_challenge", topic: "investing", difficulty: 3, minRating: 0,
        question: "Gold prices are surging. This often happens when investors are worried about:",
        options: ["Economic stability", "Too much peace", "Low oil prices", "High tech growth"],
        answer: "Economic stability",
        explanation: "Gold is a 'safe haven' asset that investors flock to during uncertainty.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Gold is a .",
        timeLimit: 20, event_context: "Global Uncertainty", fun_fact: "All the gold ever mined would fit into a crate 21 meters cubed."
    },
    {
        id: "DC_005", type: "daily_challenge", topic: "equity_markets", difficulty: 2, minRating: 0,
        question: "A major IPO opens today. What is the 'Grey Market Premium' (GMP)?",
        options: ["Official discount", "Unofficial manufacturing cost", "Unofficial premium over issue price", "Tax paid on IPO"],
        answer: "Unofficial premium over issue price",
        explanation: "GMP indicates the demand for the IPO shares in the unofficial market before listing.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. GMP indicates the demand for the IPO shares in the unofficial market before listing.",
        timeLimit: 20, event_context: "IPO Buzz", fun_fact: "The Dutch East India Company conducted the world's first IPO in 1602."
    },
    {
        id: "DC_006", type: "daily_challenge", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "It's the 1st of the month! What's the best strategy for your salary?",
        options: ["Spend then save", "Save then spend", "Wait for next month", "Buy lottery"],
        answer: "Save then spend",
        explanation: "'Pay yourself first' means moving savings to investment accounts before spending.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Keep learning!.",
        timeLimit: 20, event_context: "Pay Check Day", fun_fact: "The 50/30/20 rule suggests saving 20% of your income."
    },
    {
        id: "DC_007", type: "daily_challenge", topic: "macroeconomics", difficulty: 2, minRating: 0,
        question: "Oil prices crashed 10% yesterday. Who benefits most in India?",
        options: ["Oil exporters", "Paint companies & Airlines", "Gold miners", "Real estate"],
        answer: "Paint companies & Airlines",
        explanation: "Oil is a major raw material/cost for paint companies and airlines, so their margins improve.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Oil is a major raw material/cost for paint companies and airlines, so their margins improve.",
        timeLimit: 20, event_context: "Use of Oil", fun_fact: "India imports over 80% of its crude oil requirements."
    },
    // WEEK 2 onwards
    {
        id: "DC_008", type: "daily_challenge", topic: "banking", difficulty: 1, minRating: 0,
        question: "Bank holiday next week! How many characters is an IFSC code?",
        options: ["10", "11", "12", "8"],
        answer: "11",
        explanation: "The 11-character code identifies the bank and branch.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. The 11-character code identifies the bank and branch.",
        timeLimit: 20, event_context: "General Trivia", fun_fact: "The 5th character of every IFSC code is '0'."
    },
    {
        id: "DC_009", type: "daily_challenge", topic: "investing", difficulty: 2, minRating: 0,
        question: "Sensex hit 80k! If you had invested via SIPs during the crash, you benefitted from:",
        options: ["Rupee Cost Averaging", "Market Timing", "Short Selling", "Luck only"],
        answer: "Rupee Cost Averaging",
        explanation: "Buying more units when prices are low lowers your average cost.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Buying more units when prices are low lowers your average cost.",
        timeLimit: 20, event_context: "Market All Time High", fun_fact: "The Sensex started with a base value of 100 in 1979."
    },
    {
        id: "DC_010", type: "daily_challenge", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Inflation data is out. If inflation is 6% and your FD gives 5%, your real return is:",
        options: ["Positive", "Negative", "Zero", "Double"],
        answer: "Negative",
        explanation: "Real Return = Nominal Return - Inflation. 5% - 6% = -1%.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Real Return = Nominal Return - Inflation.",
        timeLimit: 20, event_context: "Data Release", fun_fact: "Hyperinflation in Zimbabwe reached 79.6 billion percent in 2008."
    },
    {
        id: "DC_011", type: "daily_challenge", topic: "equity_markets", difficulty: 2, minRating: 0,
        question: "Quarterly results season! 'Topline' refers to:",
        options: ["Revenue", "Net Profit", "Expenses", "CEO Salary"],
        answer: "Revenue",
        explanation: "Topline is the first line of the income statement: Revenue/Sales.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Topline is the first line of the income statement: Revenue/Sales.",
        timeLimit: 20, event_context: "Earnings Season", fun_fact: "Bottomline refers to Net Profit, the last line."
    },
    {
        id: "DC_012", type: "daily_challenge", topic: "macroeconomics", difficulty: 2, minRating: 0,
        question: "Budget Day! 'Fiscal Deficit' target is a key number. It means:",
        options: ["Govt savings", "Excess of Govt spending over income", "Trade surplus", "Tax collection"],
        answer: "Excess of Govt spending over income",
        explanation: "It indicates how much the government needs to borrow.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. It indicates how much the government needs to borrow.",
        timeLimit: 20, event_context: "Union Budget", fun_fact: "The Constitution of India refers to the budget as 'Annual Financial Statement'."
    },
    {
        id: "DC_013", type: "daily_challenge", topic: "investing", difficulty: 2, minRating: 0,
        question: "Diwali Muhurat Trading happens for:",
        options: ["1 hour", "Full day", "1 week", "1 minute"],
        answer: "1 hour",
        explanation: "It's a special one-hour trading session usually on Diwali evening.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. It.",
        timeLimit: 20, event_context: "Festive Season", fun_fact: "It marks the beginning of the new financial year 'Samvat'."
    },
    {
        id: "DC_014", type: "daily_challenge", topic: "crypto", difficulty: 3, minRating: 0,
        question: "A 'Rug Pull' in crypto means:",
        options: ["Price crash", "Developers abandon project taking funds", "Network upgrade", "Mining difficulty drop"],
        answer: "Developers abandon project taking funds",
        explanation: "It's a scam where developers pull the liquidity and disappear.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. It.",
        timeLimit: 20, event_context: "Crypto Safety", fun_fact: "Squid Game token was a famous rug pull."
    },
    {
        id: "DC_015", type: "daily_challenge", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Planning for retirement? The '4% Rule' guides:",
        options: ["Investment allocation", "Annual withdrawal rate", "Inflation assumption", "Tax rate"],
        answer: "Annual withdrawal rate",
        explanation: "It suggests you can withdraw 4% of your corpus annually to last 30 years.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. It suggests you can withdraw 4% of your corpus annually to last 30 years.",
        timeLimit: 20, event_context: "Retirement Planning", fun_fact: "The rule comes from the Trinity Study."
    },
    {
        id: "DC_016", type: "daily_challenge", topic: "banking", difficulty: 2, minRating: 0,
        question: "RBI announces 'Sovereign Gold Bonds'. They pay regular interest of:",
        options: ["0%", "2.5%", "8%", "10%"],
        answer: "2.5%",
        explanation: "SGBs pay 2.5% annual interest on top of gold price appreciation.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. SGBs pay 2.",
        timeLimit: 20, event_context: "Gold Bond Issue", fun_fact: "Capital gains on SGBs are tax-free if held till maturity."
    },
    {
        id: "DC_017", type: "daily_challenge", topic: "taxation", difficulty: 2, minRating: 0,
        question: "March 31st is approaching. It is the end of:",
        options: ["Calendar Year", "Financial Year", "Academic Year", "Election Year"],
        answer: "Financial Year",
        explanation: "In India, the financial year runs from April 1 to March 31.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. In India, the financial year runs from April 1 to March 31.",
        timeLimit: 20, event_context: "Year End", fun_fact: "You must complete tax-saving investments by this date."
    },
    {
        id: "DC_018", type: "daily_challenge", topic: "insurance", difficulty: 1, minRating: 0,
        question: "Buying car insurance? 'Third Party' cover protects:",
        options: ["Your car", "You", "Damage to others/property", "Passengers"],
        answer: "Damage to others/property",
        explanation: "It covers liability for damages caused to a third party.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. It covers liability for damages caused to a third party.",
        timeLimit: 20, event_context: "Vehicle Safety", fun_fact: "Third-party insurance is mandatory by law in India."
    },
    {
        id: "DC_019", type: "daily_challenge", topic: "investing", difficulty: 2, minRating: 0,
        question: "Market Correction usually refers to a drop of:",
        options: ["1-2%", "10% or more", "50%", "100%"],
        answer: "10% or more",
        explanation: "A drop of 10-20% is a correction; >20% is a bear market.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. A drop of 10-20% is a correction; >20% is a bear market.",
        timeLimit: 20, event_context: "Market Volatility", fun_fact: "Corrections are considered healthy for long-term market growth."
    },
    {
        id: "DC_020", type: "daily_challenge", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Credit Card statement shows 'Minimum Due'. Paying only this leads to:",
        options: ["No interest", "Debt trap", "Higher credit score", "Rewards"],
        answer: "Debt trap",
        explanation: "You pay interest on the remaining balance at very high rates.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. You pay interest on the remaining balance at very high rates.",
        timeLimit: 20, event_context: "Bill Payment", fun_fact: "Credit card interest can be as high as 40% annually."
    },
    {
        id: "DC_021", type: "daily_challenge", topic: "equity_markets", difficulty: 2, minRating: 0,
        question: "Company announces 'Bonus Shares'. How does it affect share price?",
        options: ["Increases", "Decreases proportionally", "Stays same", "Doubles"],
        answer: "Decreases proportionally",
        explanation: "Price adjusts so total market cap remains same, but liquidity increases.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Price adjusts so total market cap remains same, but liquidity increases.",
        timeLimit: 20, event_context: "Corporate Action", fun_fact: "Reliance issued 1:1 bonus shares in 2017."
    },
    {
        id: "DC_022", type: "daily_challenge", topic: "macroeconomics", difficulty: 3, minRating: 0,
        question: "What is 'GDP per capita'?",
        options: ["Total GDP", "GDP divided by population", "GDP growth rate", "GDP of capital city"],
        answer: "GDP divided by population",
        explanation: "It indicates the average economic output per person.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. It indicates the average economic output per person.",
        timeLimit: 20, event_context: "Economic Data", fun_fact: "Luxembourg has one of the highest GDP per capita."
    },
    {
        id: "DC_023", type: "daily_challenge", topic: "banking", difficulty: 2, minRating: 0,
        question: "What is the 'CVV' on your card?",
        options: ["Card Verification Value", "Center Value Verification", "Customer Valid Visa", "Code Visa Value"],
        answer: "Card Verification Value",
        explanation: "It's a security feature for 'card not present' transactions.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. It.",
        timeLimit: 20, event_context: "Online Shopping", fun_fact: "Amex cards have a 4-digit CVV on the front."
    },
    {
        id: "DC_024", type: "daily_challenge", topic: "investing", difficulty: 1, minRating: 0,
        question: "A 'Unicorn' startup is valued at:",
        options: ["$1 Million", "$100 Million", "$1 Billion", "$10 Billion"],
        answer: "$1 Billion",
        explanation: "Privately held startup companies valued over $1 billion.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Privately held startup companies valued over timeLimit: billion.",
        timeLimit: 20, event_context: "Startup News", fun_fact: "India has over 100 unicorns."
    },
    {
        id: "DC_025", type: "daily_challenge", topic: "taxation", difficulty: 2, minRating: 0,
        question: "Which form is used to file Income Tax Returns for salaried individuals?",
        options: ["ITR-1", "ITR-V", "Form 16", "Form 26AS"],
        answer: "ITR-1",
        explanation: "ITR-1 (Sahaj) is for residents with income up to ₹50L.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. ITR-1 (Sahaj) is for residents with income up to ₹50L.",
        timeLimit: 20, event_context: "Tax Filing", fun_fact: "Form 16 is the certificate of tax deducted at source."
    },
    {
        id: "DC_026", type: "daily_challenge", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "The 'Rule of 72' helps you calculate:",
        options: ["Tax", "Years to double investment", "Retirement age", "Loan EMI"],
        answer: "Years to double investment",
        explanation: "Divide 72 by the annual interest rate to get doubling time.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Divide 72 by the annual interest rate to get doubling time.",
        timeLimit: 20, event_context: "Quick Calculation", fun_fact: "Einstein reportedly called compound interest the 8th wonder."
    },
    {
        id: "DC_027", type: "daily_challenge", topic: "crypto", difficulty: 2, minRating: 0,
        question: "What is 'HODL'?",
        options: ["Hold On for Dear Life", "Hold On Daily", "High Order Digital Ledger", "Hold Official Digital License"],
        answer: "Hold On for Dear Life",
        explanation: "Originated from a typo for 'HOLD', now a crypto mantra.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Originated from a typo for .",
        timeLimit: 20, event_context: "Crypto Slang", fun_fact: "The typo happened on a Bitcoin forum in 2013."
    },
    {
        id: "DC_028", type: "daily_challenge", topic: "equity_markets", difficulty: 3, minRating: 0,
        question: "What is 'Insider Trading'?",
        options: ["Trading inside the exchange", "Trading based on non-public information", "Trading by employees", "Day trading"],
        answer: "Trading based on non-public information",
        explanation: "It is illegal as it gives an unfair advantage.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. It is illegal as it gives an unfair advantage.",
        timeLimit: 20, event_context: "Market Regulations", fun_fact: "Martha Stewart was famously convicted related to this."
    },
    {
        id: "DC_029", type: "daily_challenge", topic: "macroeconomics", difficulty: 2, minRating: 0,
        question: "A fluctuating exchange rate is determined by:",
        options: ["Government", "Market demand and supply", "IMF", "World Bank"],
        answer: "Market demand and supply",
        explanation: "Most major currencies float based on market forces.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Most major currencies float based on market forces.",
        timeLimit: 20, event_context: "Currency Volatility", fun_fact: "The Gold Standard fixed currencies to gold until the 20th century."
    },
    {
        id: "DC_030", type: "daily_challenge", topic: "investing", difficulty: 1, minRating: 0,
        question: "What represents the 'Cost of Living'?",
        options: ["CPI", "GDP", "Sensex", "P/E Ratio"],
        answer: "CPI",
        explanation: "Consumer Price Index measures changes in price level of a basket of consumer goods.",
        feedbackCorrect: "✓ Perfect! You follow the markets well.",
        feedbackWrong: "✗ Not quite. Consumer Price Index measures changes in price level of a basket of consumer goods.",
        timeLimit: 20, event_context: "Inflation Watch", fun_fact: "CPI includes food, transport, medical care, etc."
    }
];
