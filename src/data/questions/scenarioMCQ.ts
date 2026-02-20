import { Question } from './schema';

export const scenarioMCQQuestions: Question[] = [
    // MACROECONOMICS
    {
        id: "SC_MACRO_001", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "RBI hikes repo rate by 50bps. What is the most direct effect?",
        options: ["Bond prices rise", "Loan EMIs increase", "Stock markets rally", "Rupee weakens against dollar"],
        answer: "Loan EMIs increase",
        explanation: "When RBI raises the repo rate, banks borrow at higher costs and pass this on as higher loan interest rates.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_002", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "When a central bank 'cuts rates', what typically happens to bond prices?",
        options: ["Fall sharply", "Rise", "Stay the same", "Become more volatile"],
        answer: "Rise",
        explanation: "Bond prices and interest rates move inversely — when rates fall, existing bonds with higher coupons become more valuable.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_003", type: "scenario_mcq", topic: "macroeconomics", difficulty: 1, minRating: 0,
        question: "What is 'quantitative easing'?",
        options: ["Raising tax rates", "Central bank buying bonds to inject money", "Reducing government spending", "Increasing reserve requirements"],
        answer: "Central bank buying bonds to inject money",
        explanation: "QE is a monetary policy where central banks purchase securities to increase money supply.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_004", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "India's CPI inflation rises to 7%. RBI's likely next action?",
        options: ["Cut rates to boost growth", "Hike rates to control inflation", "Print more money", "Devalue the rupee"],
        answer: "Hike rates to control inflation",
        explanation: "Central banks typically raise interest rates to cool down the economy and reduce inflation.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_005", type: "scenario_mcq", topic: "macroeconomics", difficulty: 1, minRating: 0,
        question: "The 'reverse repo rate' is the rate at which:",
        options: ["RBI lends to banks", "Banks lend to each other", "Banks park excess funds with RBI", "Government borrows from RBI"],
        answer: "Banks park excess funds with RBI",
        explanation: "Reverse repo is the rate at which the central bank borrows money from commercial banks.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_006", type: "scenario_mcq", topic: "macroeconomics", difficulty: 3, minRating: 1300,
        question: "When the yield curve inverts, it typically signals:",
        options: ["Strong economic growth ahead", "Possible economic recession", "Rising inflation", "Stock market rally"],
        answer: "Possible economic recession",
        explanation: "An inverted yield curve (short-term rates higher than long-term) is a reliable recession predictor.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_007", type: "scenario_mcq", topic: "macroeconomics", difficulty: 1, minRating: 0,
        question: "India's GDP growth rate is 6.5%. This is measured as:",
        options: ["Change in total exports", "Change in government spending", "Change in total value of goods/services produced", "Change in population income"],
        answer: "Change in total value of goods/services produced",
        explanation: "GDP measures the monetary value of all finished goods and services made within a country.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_008", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "Fiscal deficit means:",
        options: ["Trade deficit with other countries", "Government spending exceeds government revenue", "Banks have less capital than required", "Rupee is overvalued"],
        answer: "Government spending exceeds government revenue",
        explanation: "It represents the shortfall in a government's income compared to its spending.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_009", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "The 'current account deficit' measures:",
        options: ["Government budget shortfall", "Difference between exports and imports of goods, services, and transfers", "Corporate earnings deficit", "Bank liquidity shortfall"],
        answer: "Difference between exports and imports of goods, services, and transfers",
        explanation: "CAD records the value of exports and imports of both goods and services.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_010", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "Stagflation refers to:",
        options: ["Rapid economic growth with low inflation", "High inflation combined with slow growth and high unemployment", "Falling prices with rising growth", "Currency appreciation"],
        answer: "High inflation combined with slow growth and high unemployment",
        explanation: "Stagflation is a tough economic situation with stagnant growth and rising prices.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_011", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "If the dollar strengthens against the rupee, Indian importers will:",
        options: ["Pay less for imports", "Pay more for imports", "Be unaffected", "Benefit from cheaper raw materials"],
        answer: "Pay more for imports",
        explanation: "A stronger dollar means more rupees are needed to buy the same amount of dollars for imports.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_012", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "The multiplier effect in economics means:",
        options: ["Compound interest on savings", "An initial spending increase leads to larger total economic output increase", "Taxes multiply government revenue", "Inflation multiplies over time"],
        answer: "An initial spending increase leads to larger total economic output increase",
        explanation: "It describes how an injection of new spending increases total income by more than the original amount.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_013", type: "scenario_mcq", topic: "macroeconomics", difficulty: 3, minRating: 1300,
        question: "Forex reserves are mainly used to:",
        options: ["Pay government salaries", "Maintain currency stability and pay for imports", "Invest in stock markets", "Give loans to banks"],
        answer: "Maintain currency stability and pay for imports",
        explanation: "Central banks use reserves to defend the currency and ensure import cover.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_014", type: "scenario_mcq", topic: "macroeconomics", difficulty: 1, minRating: 0,
        question: "A 'trade surplus' occurs when:",
        options: ["Imports exceed exports", "Exports exceed imports", "Government surplus", "No trade happens"],
        answer: "Exports exceed imports",
        explanation: "Selling more to other countries than buying from them creates a surplus.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_015", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "Open Market Operations (OMO) involve:",
        options: ["Opening new bank branches", "RBI buying/selling government securities", "Stock market opening bell", "Opening trade borders"],
        answer: "RBI buying/selling government securities",
        explanation: "OMOs are used to adjust rupee liquidity in the market.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_016", type: "scenario_mcq", topic: "macroeconomics", difficulty: 1, minRating: 0,
        question: "Deflation is strictly defined as:",
        options: ["Slowing rate of inflation", "General decline in prices", "Falling GDP", "Falling currency value"],
        answer: "General decline in prices",
        explanation: "Deflation is negative inflation, where prices actually fall.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_017", type: "scenario_mcq", topic: "macroeconomics", difficulty: 1, minRating: 0,
        question: "Monetary policy is controlled by:",
        options: ["The Central Government", "The Central Bank (RBI)", "Commercial Banks", "The Stock Exchange"],
        answer: "The Central Bank (RBI)",
        explanation: "RBI formulates monetary policy to control money supply and interest rates.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_018", type: "scenario_mcq", topic: "macroeconomics", difficulty: 1, minRating: 0,
        question: "Fiscal policy refers to:",
        options: ["Interest rate decisions", "Government taxation and spending", "Bank lending rules", "Corporate governance"],
        answer: "Government taxation and spending",
        explanation: "Fiscal policy is how the government adjusts its spending levels and tax rates.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_019", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "Money supply M3 is also known as:",
        options: ["Narrow Money", "Broad Money", "Reserve Money", "Digital Money"],
        answer: "Broad Money",
        explanation: "M3 includes currency, deposits, and time deposits, representing total money supply.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_020", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "Hyperinflation is typically caused by:",
        options: ["Excessive money printing relative to output", "High interest rates", "Strong currency", "Low consumer demand"],
        answer: "Excessive money printing relative to output",
        explanation: "When money supply grows much faster than real economic output, currency loses value rapidly.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_021", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "A 'recession' is popularly defined as:",
        options: ["1 month of falling GDP", "Two consecutive quarters of negative GDP growth", "Any rise in unemployment", "Stock market crash"],
        answer: "Two consecutive quarters of negative GDP growth",
        explanation: "This is the standard technical definition of a recession.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_022", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "Purchasing Power Parity (PPP) compares:",
        options: ["Currencies based on goods they can buy", "Stock market returns", "Bank interest rates", "Tax rates"],
        answer: "Currencies based on goods they can buy",
        explanation: "PPP accounts for cost of living differences between countries.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_023", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "Capital Adequacy Ratio (CAR) applies to:",
        options: ["IT companies", "Banks", "Manufacturing firms", "Retail shops"],
        answer: "Banks",
        explanation: "CAR ensures banks have enough capital to withstand operational losses.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_024", type: "scenario_mcq", topic: "macroeconomics", difficulty: 2, minRating: 1000,
        question: "The 'Bank Rate' is:",
        options: ["Rate for long-term lending by RBI to banks", "Rate for savings accounts", "Rate for home loans", "Rate for FDs"],
        answer: "Rate for long-term lending by RBI to banks",
        explanation: "Bank rate influences long-term lending rates in the economy.",
        timeLimit: 15
    },
    {
        id: "SC_MACRO_025", type: "scenario_mcq", topic: "macroeconomics", difficulty: 3, minRating: 1300,
        question: "Liquidity Trap occurs when:",
        options: ["Interest rates are high and savings are low", "Interest rates are near zero but demand fails to pick up", "Inflation is high", "Banks run out of cash"],
        answer: "Interest rates are near zero but demand fails to pick up",
        explanation: "In a liquidity trap, monetary policy becomes ineffective as people hoard cash.",
        timeLimit: 15
    },

    // EQUITY MARKETS
    {
        id: "SC_EQ_001", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "A company's P/E ratio is 8 vs industry average of 22. This suggests:",
        options: ["Company is overvalued", "Company may be undervalued or facing problems", "Industry is undervalued", "P/E has no meaning in isolation"],
        answer: "Company may be undervalued or facing problems",
        explanation: "Low P/E can mean value, or it can mean the market expects poor future growth.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_002", type: "scenario_mcq", topic: "equity_markets", difficulty: 1, minRating: 0,
        question: "What does 'going long' on a stock mean?",
        options: ["Borrowing shares to sell", "Buying shares expecting price to rise", "Selling shares quickly", "Holding shares for exactly 1 year"],
        answer: "Buying shares expecting price to rise",
        explanation: "Long position means you own the asset and profit if it goes up.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_003", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "EBITDA stands for:",
        options: ["Earnings Before Interest, Tax, Depreciation and Amortization", "Earnings Based on Income Tax and Dividends Added", "Effective Business Income Tax and Debt Assessment", "None of the above"],
        answer: "Earnings Before Interest, Tax, Depreciation and Amortization",
        explanation: "It is a measure of a company's overall financial performance.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_004", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "A stock's beta is 1.5. This means:",
        options: ["It's 50% less volatile than the market", "It moves 1.5% when market moves 1%", "It always returns 1.5x the market", "It has 1.5% dividend yield"],
        answer: "It moves 1.5% when market moves 1%",
        explanation: "Beta measures volatility relative to the benchmark index (beta of 1).",
        timeLimit: 15
    },
    {
        id: "SC_EQ_005", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "In a rights issue, existing shareholders are:",
        options: ["Forced to sell their shares", "Offered new shares at a discount before public", "Given free bonus shares", "Asked to vote on company merger"],
        answer: "Offered new shares at a discount before public",
        explanation: "Rights issues allow companies to raise capital from existing shareholders.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_006", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "What is 'short selling'?",
        options: ["Selling shares within 1 day", "Borrowing shares, selling them, hoping to buy back cheaper", "Selling a small quantity of shares", "Selling at a price below market"],
        answer: "Borrowing shares, selling them, hoping to buy back cheaper",
        explanation: "Short sellers profit from falling prices.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_007", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Circuit breakers in stock markets are designed to:",
        options: ["Increase trading volumes", "Temporarily halt trading during extreme price movements", "Allow institutional investors priority access", "Calculate index values faster"],
        answer: "Temporarily halt trading during extreme price movements",
        explanation: "They curb panic selling and allow the market to digest information.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_008", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "A company announces a 2:1 stock split. If you owned 100 shares at ₹500:",
        options: ["You own 50 shares at ₹1000", "You own 200 shares at ₹250", "You own 100 shares at ₹250", "You own 200 shares at ₹500"],
        answer: "You own 200 shares at ₹250",
        explanation: "Splits increase share count and reduce price proportionally. Value remains same.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_009", type: "scenario_mcq", topic: "equity_markets", difficulty: 1, minRating: 0,
        question: "EPS (Earnings Per Share) is calculated as:",
        options: ["Total revenue / shares outstanding", "Net profit / total shares outstanding", "Dividends / share price", "Operating profit / market cap"],
        answer: "Net profit / total shares outstanding",
        explanation: "EPS indicates how much money a company makes for each share of its stock.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_010", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "What does a high Debt-to-Equity ratio indicate?",
        options: ["Company is highly profitable", "Company relies more on debt financing than equity", "Company has strong cash flows", "Company is paying high dividends"],
        answer: "Company relies more on debt financing than equity",
        explanation: "High leverage can be risky if earnings are volatile.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_011", type: "scenario_mcq", topic: "equity_markets", difficulty: 1, minRating: 0,
        question: "Market Capitalization is:",
        options: ["Total assets of the company", "Share price × Total shares outstanding", "Total sales revenue", "Profit before tax"],
        answer: "Share price × Total shares outstanding",
        explanation: "It represents the total market value of a company's outstanding shares.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_012", type: "scenario_mcq", topic: "equity_markets", difficulty: 1, minRating: 0,
        question: "Nifty 50 is an index of:",
        options: ["Top 50 global companies", "Top 50 companies on NSE by market cap", "Top 50 banks in India", "Top 50 IT companies"],
        answer: "Top 50 companies on NSE by market cap",
        explanation: "It is the benchmark index of the National Stock Exchange of India.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_013", type: "scenario_mcq", topic: "equity_markets", difficulty: 1, minRating: 0,
        question: "An IPO (Initial Public Offering) is when:",
        options: ["A company pays dividends", "A private company sells shares to public for first time", "A company buys back shares", "Two companies merge"],
        answer: "A private company sells shares to public for first time",
        explanation: "IPO marks the transition from private to public company.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_014", type: "scenario_mcq", topic: "equity_markets", difficulty: 1, minRating: 0,
        question: "Dividends are typically paid from:",
        options: ["Company revenue", "Company capital", "Net profits", "Employee salaries"],
        answer: "Net profits",
        explanation: "Dividends are a distribution of a portion of a company's earnings.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_015", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Book Value per share roughly represents:",
        options: ["Market price", "Liquidation value per share", "Future growth potential", "Annual dividend"],
        answer: "Liquidation value per share",
        explanation: "It is assets minus liabilities divided by shares.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_016", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "P/B Ratio compares:",
        options: ["Profit to Book Value", "Price to Book Value", "Price to Beta", "Profit to Beta"],
        answer: "Price to Book Value",
        explanation: "It compares market valuation to the company's net asset value.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_017", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "ROE (Return on Equity) measures:",
        options: ["Return on stock price", "Profitability relative to shareholder equity", "Return on total assets", "Return on revenue"],
        answer: "Profitability relative to shareholder equity",
        explanation: "High ROE indicates efficient use of shareholder capital.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_018", type: "scenario_mcq", topic: "equity_markets", difficulty: 3, minRating: 1300,
        question: "ROCE includes:",
        options: ["Only equity", "Only debt", "Equity plus Long Term Debt", "Current liabilities"],
        answer: "Equity plus Long Term Debt",
        explanation: "ROCE measures return on all capital employed in the business.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_019", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Detailed holdings of FIIs and DIIs are released:",
        options: ["Daily", "Quarterly", "Annually", "Weekly"],
        answer: "Quarterly",
        explanation: "Shareholding patterns are disclosed every quarter.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_020", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Free Float Market Cap excludes:",
        options: ["Shares held by public", "Shares held by promoters/locked-in", "Shares held by FIIs", "Shares held by mutual funds"],
        answer: "Shares held by promoters/locked-in",
        explanation: "Free float counts only shares available for trading in the open market.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_021", type: "scenario_mcq", topic: "equity_markets", difficulty: 1, minRating: 0,
        question: "A 'Blue Chip' stock refers to:",
        options: ["Penny stocks", "Large, well-established, profitable companies", "New startups", "Mining companies"],
        answer: "Large, well-established, profitable companies",
        explanation: "They are considered reliable investments with a history of performance.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_022", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Buyback of shares usually results in:",
        options: ["More shares in market", "Higher EPS", "Lower promoter holding", "Lower stock price"],
        answer: "Higher EPS",
        explanation: "Reducing share count increases Earnings Per Share if earnings settle.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_023", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Face Value affects:",
        options: ["Market price directly", "Dividend calculations and splits", "P/E Ratio", "Beta"],
        answer: "Dividend calculations and splits",
        explanation: "Dividends are often declared as a % of Face Value.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_024", type: "scenario_mcq", topic: "equity_markets", difficulty: 3, minRating: 1300,
        question: "Preferential Allotment is:",
        options: ["Shares to public", "Shares to specific group at set price", "Shares to employees", "Bonus shares"],
        answer: "Shares to specific group at set price",
        explanation: "It's a way to raise equity from strategic investors or promoters.",
        timeLimit: 15
    },
    {
        id: "SC_EQ_025", type: "scenario_mcq", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "ADR (American Depository Receipt) allows:",
        options: ["US citizens to buy Indian stocks", "Indians to buy US stocks", "Banks to lend in dollars", "Duty free imports"],
        answer: "US citizens to buy Indian stocks",
        explanation: "ADRs are negotiable certificates issued by a U.S. bank representing shares in a foreign stock.",
        timeLimit: 15
    },

    // PERSONAL FINANCE
    {
        id: "SC_PF_001", type: "scenario_mcq", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Which type of risk does diversification primarily reduce?",
        options: ["Systematic risk", "Unsystematic/company-specific risk", "Inflation risk", "Liquidity risk"],
        answer: "Unsystematic/company-specific risk",
        explanation: "Diversification cancels out individual asset risks but not the risk of the entire market falling.",
        timeLimit: 15
    },
    {
        id: "SC_PF_002", type: "scenario_mcq", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "An emergency fund should ideally cover how many months of expenses?",
        options: ["1-2 months", "3-6 months", "12-18 months", "24+ months"],
        answer: "3-6 months",
        explanation: "This provides a buffer for job loss or medical emergencies.",
        timeLimit: 15
    },
    {
        id: "SC_PF_003", type: "scenario_mcq", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "SIP (Systematic Investment Plan) helps with:",
        options: ["Timing the market perfectly", "Rupee cost averaging and disciplined investing", "Avoiding all investment risk", "Guaranteed returns"],
        answer: "Rupee cost averaging and disciplined investing",
        explanation: "Buying more units when prices are low lowers average cost over time.",
        timeLimit: 15
    },
    {
        id: "SC_PF_004", type: "scenario_mcq", topic: "insurance", difficulty: 1, minRating: 0,
        question: "Term insurance is primarily designed to:",
        options: ["Build wealth over time", "Provide a savings corpus", "Provide pure life cover at low cost", "Generate tax-free income"],
        answer: "Provide pure life cover at low cost",
        explanation: "It offers high cover for low premiums but has no maturity benefit if you survive.",
        timeLimit: 15
    },
    {
        id: "SC_PF_005", type: "scenario_mcq", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Your credit score is most affected by:",
        options: ["Your income level", "Your repayment history", "Number of bank accounts", "Your age"],
        answer: "Your repayment history",
        explanation: "Timely payments are the biggest factor in credit scoring.",
        timeLimit: 15
    },
    {
        id: "SC_PF_006", type: "scenario_mcq", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "CIBIL score range in India is:",
        options: ["0-100", "300-900", "500-1000", "1-10"],
        answer: "300-900",
        explanation: "900 is the highest possible score, indicating high creditworthiness.",
        timeLimit: 15
    },
    {
        id: "SC_PF_007", type: "scenario_mcq", topic: "investing", difficulty: 1, minRating: 0,
        question: "Which is NOT a feature of a Public Provident Fund (PPF)?",
        options: ["Tax-free interest", "15-year lock-in period", "Market-linked returns", "Government backing"],
        answer: "Market-linked returns",
        explanation: "PPF interest rates are set by the government, not the stock market.",
        timeLimit: 15
    },
    {
        id: "SC_PF_008", type: "scenario_mcq", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Power of Attorney in personal finance allows:",
        options: ["Lower tax rates", "Someone to act on your behalf for financial matters", "Access to government schemes", "Priority in loan approval"],
        answer: "Someone to act on your behalf for financial matters",
        explanation: "Useful for managing assets if you become incapacitated or live abroad.",
        timeLimit: 15
    },
    {
        id: "SC_PF_009", type: "scenario_mcq", topic: "insurance", difficulty: 2, minRating: 1000,
        question: "Health insurance 'waiting period' refers to:",
        options: ["Time to buy policy", "Time before specific diseases are covered", "Time to pay premium", "Time to get claim money"],
        answer: "Time before specific diseases are covered",
        explanation: "Pre-existing diseases often have a 2-4 year waiting period.",
        timeLimit: 15
    },
    {
        id: "SC_PF_010", type: "scenario_mcq", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "NPS Tier 1 account withdrawals are:",
        options: ["Fully liquid anytime", "Restricted until retirement age", "Allowed only for education", "Taxable fully"],
        answer: "Restricted until retirement age",
        explanation: "NPS is a retirement product with strict lock-in rules.",
        timeLimit: 15
    },
    {
        id: "SC_PF_011", type: "scenario_mcq", topic: "taxation", difficulty: 2, minRating: 1000,
        question: "ELSS lock-in period is:",
        options: ["1 year", "3 years", "5 years", "15 years"],
        answer: "3 years",
        explanation: "ELSS has the shortest lock-in among 80C tax-saving options.",
        timeLimit: 15
    },
    {
        id: "SC_PF_012", type: "scenario_mcq", topic: "taxation", difficulty: 2, minRating: 1000,
        question: "HRA exemption is available for:",
        options: ["Self-occupied house", "Rented accommodation", "Vacant plot", "Commercial shop"],
        answer: "Rented accommodation",
        explanation: "HRA tax benefit requires you to actually pay rent.",
        timeLimit: 15
    },
    {
        id: "SC_PF_013", type: "scenario_mcq", topic: "taxation", difficulty: 2, minRating: 1000,
        question: "Section 80C limit (currently) is:",
        options: ["₹1 Lakh", "₹1.5 Lakh", "₹2 Lakh", "₹50,000"],
        answer: "₹1.5 Lakh",
        explanation: "This covers PPF, LIC, ELSS, EPF, etc.",
        timeLimit: 15
    },
    {
        id: "SC_PF_014", type: "scenario_mcq", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "A 'Will' is important to:",
        options: ["Save taxes", "Ensure smooth asset transfer after death", "Avoid loans", "Get insurance"],
        answer: "Ensure smooth asset transfer after death",
        explanation: "It defines legal heirs and avoids family disputes.",
        timeLimit: 15
    },
    {
        id: "SC_PF_015", type: "scenario_mcq", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Nomination in bank accounts means:",
        options: ["Ownership transfer", "Trustee to receive funds after death", "Joint account holder", "Guarantor"],
        answer: "Trustee to receive funds after death",
        explanation: "Nominee is a custodian, not necessarily the legal heir.",
        timeLimit: 15
    },
    {
        id: "SC_PF_016", type: "scenario_mcq", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "The 'Credit Card Trap' refers to:",
        options: ["Paying minimum due only", "Using rewards", "Paying full bill", "Having limit increase"],
        answer: "Paying minimum due only",
        explanation: "Paying only minimum due attracts huge interest (30-40% p.a.) on balance.",
        timeLimit: 15
    },
    {
        id: "SC_PF_017", type: "scenario_mcq", topic: "banking", difficulty: 2, minRating: 1000,
        question: "Loan against Gold is typically:",
        options: ["Unsecured", "Secured", "Highest interest rate", "Taking weeks to process"],
        answer: "Secured",
        explanation: "Gold is the collateral, making it a secured loan with lower rates.",
        timeLimit: 15
    },
    {
        id: "SC_PF_018", type: "scenario_mcq", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Asset Allocation refers to:",
        options: ["Buying assets", "Mixing stocks, bonds, gold, cash", "Selling everything", "Allocating funds to banks"],
        answer: "Mixing stocks, bonds, gold, cash",
        explanation: "Balancing portfolio across asset classes to manage risk.",
        timeLimit: 15
    },
    {
        id: "SC_PF_019", type: "scenario_mcq", topic: "insurance", difficulty: 1, minRating: 0,
        question: "No Claim Bonus (NCB) applies to:",
        options: ["Life Insurance", "Health/Motor Insurance", "Fixed Deposits", "Mutual Funds"],
        answer: "Health/Motor Insurance",
        explanation: "It's a discount on premium for not making claims in previous years.",
        timeLimit: 15
    },
    {
        id: "SC_PF_020", type: "scenario_mcq", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "SWP holds for:",
        options: ["Systematic Withdrawal Plan", "Savings Wealth Plan", "Stock Wealth Plan", "Safe Withdrawal Plan"],
        answer: "Systematic Withdrawal Plan",
        explanation: "Allows periodic withdrawals from mutual fund investments.",
        timeLimit: 15
    },

    // BANKING & CREDIT
    {
        id: "SC_BNK_001", type: "scenario_mcq", topic: "banking", difficulty: 2, minRating: 1000,
        question: "CRR (Cash Reserve Ratio) is funds banks keep with:",
        options: ["Themselves", "RBI", "Government", "Shareholders"],
        answer: "RBI",
        explanation: "Banks must park a portion of deposits with RBI as cash.",
        timeLimit: 15
    },
    {
        id: "SC_BNK_002", type: "scenario_mcq", topic: "banking", difficulty: 2, minRating: 1000,
        question: "SLR (Statutory Liquidity Ratio) funds are kept in:",
        options: ["Cash only", "Gold, Cash or Govt Securities", "Stock market", "Foreign currency"],
        answer: "Gold, Cash or Govt Securities",
        explanation: "Liquid assets banks must maintain with themselves.",
        timeLimit: 15
    },
    {
        id: "SC_BNK_003", type: "scenario_mcq", topic: "banking", difficulty: 2, minRating: 1000,
        question: "MCLR is the benchmark for:",
        options: ["Deposit rates", "Floating rate loans", "Fixed rate loans", "Savings interest"],
        answer: "Floating rate loans",
        explanation: "Marginal Cost of Funds based Lending Rate.",
        timeLimit: 15
    },
    {
        id: "SC_BNK_004", type: "scenario_mcq", topic: "banking", difficulty: 1, minRating: 0,
        question: "Floating rate loans benefit borrowers when:",
        options: ["Interest rates rise", "Interest rates fall", "Inflation is high", "Economy is booming"],
        answer: "Interest rates fall",
        explanation: "Your EMI or tenure reduces as market rates fall.",
        timeLimit: 15
    },
    {
        id: "SC_BNK_005", type: "scenario_mcq", topic: "banking", difficulty: 1, minRating: 0,
        question: "Unsecured loan example:",
        options: ["Home Loan", "Car Loan", "Personal Loan", "Gold Loan"],
        answer: "Personal Loan",
        explanation: "No collateral helps secure the loan.",
        timeLimit: 15
    },
    {
        id: "SC_BNK_006", type: "scenario_mcq", topic: "banking", difficulty: 2, minRating: 1000,
        question: "NPA stands for:",
        options: ["Non Performing Asset", "New Pension Account", "Net Profit After tax", "National Payment Authority"],
        answer: "Non Performing Asset",
        explanation: "Loans that have stopped generating interest income for banks.",
        timeLimit: 15
    },
    {
        id: "SC_BNK_007", type: "scenario_mcq", topic: "banking", difficulty: 3, minRating: 1300,
        question: "SWIFT code is used for:",
        options: ["Local transfers", "International money transfers", "ATM withdrawals", "Cheque clearing"],
        answer: "International money transfers",
        explanation: "Society for Worldwide Interbank Financial Telecommunication.",
        timeLimit: 15
    },
    {
        id: "SC_BNK_008", type: "scenario_mcq", topic: "banking", difficulty: 1, minRating: 0,
        question: "NEFT transfers are:",
        options: ["Instant only", "Settled in batches", "Only for lakhs", "Offline only"],
        answer: "Settled in batches",
        explanation: "National Electronic Funds Transfer operates in half-hourly batches.",
        timeLimit: 15
    },
    {
        id: "SC_BNK_009", type: "scenario_mcq", topic: "banking", difficulty: 1, minRating: 0,
        question: "RTGS minimum limit is:",
        options: ["₹1", "₹2 Lakhs", "₹5 Lakhs", "₹10,000"],
        answer: "₹2 Lakhs",
        explanation: "Real Time Gross Settlement is for high value transactions.",
        timeLimit: 15
    },
    {
        id: "SC_BNK_010", type: "scenario_mcq", topic: "banking", difficulty: 1, minRating: 0,
        question: "UPI was developed by:",
        options: ["RBI directly", "NPCI", "SBI", "Google"],
        answer: "NPCI",
        explanation: "National Payments Corporation of India.",
        timeLimit: 15
    },

    // CRYPTO
    {
        id: "SC_CRP_001", type: "scenario_mcq", topic: "crypto", difficulty: 1, minRating: 0,
        question: "Blockchain is best described as:",
        options: ["Central database", "Distributed digital ledger", "Cloud storage", "Encryption software"],
        answer: "Distributed digital ledger",
        explanation: "A decentralized record of transactions across many computers.",
        timeLimit: 15
    },
    {
        id: "SC_CRP_002", type: "scenario_mcq", topic: "crypto", difficulty: 2, minRating: 1000,
        question: "Bitcoin vs Ethereum main difference:",
        options: ["Speed only", "Smart contracts vs Digital gold", "Color", "Creator"],
        answer: "Smart contracts vs Digital gold",
        explanation: "Ethereum is programmable (smart contracts), Bitcoin is primarily store of value.",
        timeLimit: 15
    },
    {
        id: "SC_CRP_003", type: "scenario_mcq", topic: "crypto", difficulty: 2, minRating: 1000,
        question: "Proof of Work (PoW) involves:",
        options: ["Staking coins", "Solving complex math puzzles", "Voting", "Random selection"],
        answer: "Solving complex math puzzles",
        explanation: "Miners use energy to solve puzzles to secure the network.",
        timeLimit: 15
    },
    {
        id: "SC_CRP_004", type: "scenario_mcq", topic: "crypto", difficulty: 2, minRating: 1000,
        question: "DeFi stands for:",
        options: ["Definite Finance", "Decentralized Finance", "Digital Files", "Debt Financing"],
        answer: "Decentralized Finance",
        explanation: "Financial services without central intermediaries.",
        timeLimit: 15
    },
    {
        id: "SC_CRP_005", type: "scenario_mcq", topic: "crypto", difficulty: 1, minRating: 0,
        question: "A Stablecoin is pegged to:",
        options: ["Bitcoin", "Real world asset like Dollar", "Ethereum", "Gold only"],
        answer: "Real world asset like Dollar",
        explanation: "Designed to minimize volatility.",
        timeLimit: 15
    },
    {
        id: "SC_CRP_006", type: "scenario_mcq", topic: "crypto", difficulty: 3, minRating: 1300,
        question: "Crypto tax in India (flat rate):",
        options: ["10%", "20%", "30%", "0%"],
        answer: "30%",
        explanation: "Flat 30% tax on gains from VDA (Virtual Digital Assets).",
        timeLimit: 15
    },
    {
        id: "SC_CRP_007", type: "scenario_mcq", topic: "crypto", difficulty: 1, minRating: 0,
        question: "NFT typically represents:",
        options: ["Fungible currency", "Unique digital ownership", "A share in company", "A type of Bitcoin"],
        answer: "Unique digital ownership",
        explanation: "Non-Fungible Tokens represent unique items.",
        timeLimit: 15
    },
    {
        id: "SC_CRP_008", type: "scenario_mcq", topic: "crypto", difficulty: 1, minRating: 0,
        question: "Cold Wallet means:",
        options: ["Freezing accounts", "Offline storage", "Mobile app", "Exchange wallet"],
        answer: "Offline storage",
        explanation: "Not connected to internet, safer from hacks.",
        timeLimit: 15
    },
    {
        id: "SC_CRP_009", type: "scenario_mcq", topic: "crypto", difficulty: 2, minRating: 1000,
        question: "Bitcoin Halving occurs approx every:",
        options: ["1 year", "2 years", "4 years", "10 years"],
        answer: "4 years",
        explanation: "Reduces block reward by half.",
        timeLimit: 15
    },
    {
        id: "SC_CRP_010", type: "scenario_mcq", topic: "crypto", difficulty: 2, minRating: 1000,
        question: "Total Market Cap constitutes:",
        options: ["Bitcoin only", "Value of all crypto coins combined", "Ethereum only", "Mining cost"],
        answer: "Value of all crypto coins combined",
        explanation: "The sum of market caps of all traded cryptocurrencies.",
        timeLimit: 15
    }
];
