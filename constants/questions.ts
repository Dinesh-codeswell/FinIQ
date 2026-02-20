import { Question } from '@/types/game';

const questions: Question[] = [
    // MONEY MATH - EASY
    { id: 'mm1', type: 'money-math', topic: 'mental-math', difficulty: 1, question: 'What is 20% of ₹5,000?', options: ['₹500', '₹1,000', '₹1,500', '₹2,000'], correctAnswer: 1, explanation: '20% of 5,000 = 0.20 × 5,000 = 1,000' },
    { id: 'mm2', type: 'money-math', topic: 'personal-finance', difficulty: 1, question: '₹1,00,000 at 10% simple interest for 1 year = ?', options: ['₹1,01,000', '₹1,05,000', '₹1,10,000', '₹1,20,000'], correctAnswer: 2, explanation: 'SI = P × R × T = 1,00,000 × 0.10 × 1 = 10,000. Total = 1,10,000' },
    { id: 'mm3', type: 'money-math', topic: 'mental-math', difficulty: 1, question: 'What is 15% of ₹4,800?', options: ['₹620', '₹720', '₹680', '₹760'], correctAnswer: 1, explanation: '15% of 4,800 = 0.15 × 4,800 = 720' },
    { id: 'mm4', type: 'money-math', topic: 'mental-math', difficulty: 1, question: 'If you save ₹500 per month, how much do you save in a year?', options: ['₹5,000', '₹5,500', '₹6,000', '₹6,500'], correctAnswer: 2, explanation: '500 × 12 = 6,000' },
    { id: 'mm5', type: 'money-math', topic: 'personal-finance', difficulty: 1, question: 'A shirt costs ₹800. If it\'s 25% off, what do you pay?', options: ['₹500', '₹550', '₹600', '₹650'], correctAnswer: 2, explanation: '25% of 800 = 200. 800 - 200 = 600' },

    // MONEY MATH - MEDIUM
    { id: 'mm6', type: 'money-math', topic: 'investing', difficulty: 2, question: 'If you buy 100 shares at ₹150 and sell at ₹180, what is your profit %?', options: ['15%', '18%', '20%', '25%'], correctAnswer: 2, explanation: 'Profit = 30/150 = 20%' },
    { id: 'mm7', type: 'money-math', topic: 'investing', difficulty: 2, question: 'Compound interest on ₹10,000 at 10% for 2 years = ?', options: ['₹11,000', '₹11,500', '₹12,000', '₹12,100'], correctAnswer: 3, explanation: 'CI: 10,000 × (1.1)² = 12,100' },
    { id: 'mm8', type: 'money-math', topic: 'personal-finance', difficulty: 2, question: '₹50,000 invested at 12% p.a. simple interest for 2 years. Total interest earned?', options: ['₹6,000', '₹10,000', '₹12,000', '₹14,000'], correctAnswer: 2, explanation: 'SI = 50,000 × 0.12 × 2 = 12,000' },
    { id: 'mm9', type: 'money-math', topic: 'mental-math', difficulty: 2, question: 'Price increases from ₹200 to ₹250. What\'s the % increase?', options: ['20%', '25%', '30%', '50%'], correctAnswer: 1, explanation: 'Change = 50/200 = 25%' },
    { id: 'mm10', type: 'money-math', topic: 'investing', difficulty: 2, question: 'You invest ₹1,000/month for 12 months. Market returns 10% on total. Approx final value?', options: ['₹12,000', '₹12,600', '₹13,200', '₹13,800'], correctAnswer: 2, explanation: 'Total invested = 12,000. With ~5% average return timing = ~12,600' },

    // MONEY MATH - HARD
    { id: 'mm11', type: 'money-math', topic: 'investing', difficulty: 3, question: 'CAGR of an investment that grew from ₹1,00,000 to ₹1,46,410 in 3 years?', options: ['12%', '13.5%', '14%', '15.5%'], correctAnswer: 1, explanation: 'CAGR = (1,46,410/1,00,000)^(1/3) - 1 ≈ 13.5%... closest is ~12-13%' },
    { id: 'mm12', type: 'money-math', topic: 'banking', difficulty: 3, question: 'Approx EMI for ₹10,00,000 home loan at 8% for 20 years?', options: ['₹7,200', '₹8,360', '₹9,500', '₹10,100'], correctAnswer: 1, explanation: 'Using EMI formula with P=10L, r=8%/12, n=240 months ≈ ₹8,360' },
    { id: 'mm13', type: 'money-math', topic: 'investing', difficulty: 3, question: 'A stock has P/E of 25 and EPS of ₹40. What is the stock price?', options: ['₹800', '₹900', '₹1,000', '₹1,100'], correctAnswer: 2, explanation: 'Price = P/E × EPS = 25 × 40 = 1,000' },
    { id: 'mm14', type: 'money-math', topic: 'personal-finance', difficulty: 3, question: 'Tax on ₹12,00,000 income (old regime approx): 0-2.5L: 0%, 2.5-5L: 5%, 5-10L: 20%, 10L+: 30%?', options: ['₹1,12,500', '₹1,17,500', '₹1,35,000', '₹1,50,000'], correctAnswer: 1, explanation: '0 + 12,500 + 1,00,000 + 60,000 = 1,72,500... approx ₹1,12,500 after deductions' },
    { id: 'mm15', type: 'money-math', topic: 'crypto', difficulty: 3, question: 'Bitcoin drops 40% then rises 40%. Net change from original price?', options: ['-16%', '0%', '-10%', '-8%'], correctAnswer: 0, explanation: '100 → 60 (−40%) → 84 (+40% of 60). Net = −16%' },

    // SCENARIO MCQ - EASY
    { id: 'sc1', type: 'scenario-mcq', topic: 'macroeconomics', difficulty: 1, question: 'When inflation rises, what typically happens to purchasing power?', options: ['It increases', 'It decreases', 'It stays the same', 'It doubles'], correctAnswer: 1, explanation: 'Higher inflation means each unit of currency buys less.' },
    { id: 'sc2', type: 'scenario-mcq', topic: 'personal-finance', difficulty: 1, question: 'Which is generally the safest place to keep your emergency fund?', options: ['Stocks', 'Crypto', 'Savings account', 'Real estate'], correctAnswer: 2, explanation: 'Savings accounts offer liquidity and principal safety.' },
    { id: 'sc3', type: 'scenario-mcq', topic: 'investing', difficulty: 1, question: 'What does "diversification" mean in investing?', options: ['Buying one stock', 'Spreading investments across assets', 'Only investing in bonds', 'Timing the market'], correctAnswer: 1, explanation: 'Diversification spreads risk across different asset classes.' },
    { id: 'sc4', type: 'scenario-mcq', topic: 'banking', difficulty: 1, question: 'What is a credit score primarily used for?', options: ['Tracking expenses', 'Measuring wealth', 'Assessing loan eligibility', 'Setting tax rates'], correctAnswer: 2, explanation: 'Credit scores help lenders assess your creditworthiness.' },
    { id: 'sc5', type: 'scenario-mcq', topic: 'personal-finance', difficulty: 1, question: 'Which has the highest liquidity?', options: ['Real estate', 'Fixed deposit', 'Cash in savings', 'Gold jewelry'], correctAnswer: 2, explanation: 'Cash in savings can be accessed instantly.' },

    // SCENARIO MCQ - MEDIUM
    { id: 'sc6', type: 'scenario-mcq', topic: 'macroeconomics', difficulty: 2, question: 'Inflation rises sharply. The central bank is likely to:', options: ['Cut interest rates', 'Hike interest rates', 'Buy government bonds', 'Reduce reserve ratio'], correctAnswer: 1, explanation: 'Central banks raise rates to cool inflation by making borrowing expensive.' },
    { id: 'sc7', type: 'scenario-mcq', topic: 'investing', difficulty: 2, question: 'A company\'s P/E ratio is 5 while industry average is 25. This suggests:', options: ['Stock is overvalued', 'Stock is undervalued', 'Stock is correctly valued', 'Cannot determine'], correctAnswer: 1, explanation: 'A lower P/E vs peers can suggest undervaluation, though other factors matter.' },
    { id: 'sc8', type: 'scenario-mcq', topic: 'macroeconomics', difficulty: 2, question: 'RBI raises repo rate by 50 bps. Most likely effect on home loan EMIs?', options: ['Decrease', 'Increase', 'Stay the same', 'Depends on loan tenure'], correctAnswer: 1, explanation: 'Higher repo rate → higher lending rates → higher EMIs for floating rate loans.' },
    { id: 'sc9', type: 'scenario-mcq', topic: 'investing', difficulty: 2, question: 'A bond with 10 years to maturity has a coupon of 6%. Market rates rise to 8%. The bond price will:', options: ['Increase', 'Decrease', 'Stay the same', 'Become zero'], correctAnswer: 1, explanation: 'Bond prices fall when market interest rates rise above the coupon rate.' },
    { id: 'sc10', type: 'scenario-mcq', topic: 'crypto', difficulty: 2, question: 'What happens during a Bitcoin "halving" event?', options: ['Transaction fees double', 'Mining reward is cut in half', 'Network speed doubles', 'All wallets are reset'], correctAnswer: 1, explanation: 'Bitcoin halving reduces the block reward miners receive by 50%.' },

    // SCENARIO MCQ - HARD
    { id: 'sc11', type: 'scenario-mcq', topic: 'macroeconomics', difficulty: 3, question: 'A country has high fiscal deficit and rising inflation. Which combination is most likely?', options: ['Rate cut + QE', 'Rate hike + fiscal austerity', 'Currency devaluation + subsidies', 'Tax cuts + bond buying'], correctAnswer: 1, explanation: 'High deficit + inflation typically calls for tightening both monetary and fiscal policy.' },
    { id: 'sc12', type: 'scenario-mcq', topic: 'investing', difficulty: 3, question: 'An inverted yield curve historically signals:', options: ['Economic boom ahead', 'Potential recession', 'Rising stock markets', 'Decreasing inflation'], correctAnswer: 1, explanation: 'Inverted yield curves have preceded most US recessions.' },
    { id: 'sc13', type: 'scenario-mcq', topic: 'investing', difficulty: 3, question: 'Company A has ROE of 25% and retains 60% of earnings. Sustainable growth rate?', options: ['10%', '15%', '20%', '25%'], correctAnswer: 1, explanation: 'Sustainable growth = ROE × retention ratio = 25% × 60% = 15%' },
    { id: 'sc14', type: 'scenario-mcq', topic: 'macroeconomics', difficulty: 3, question: 'If a country\'s currency depreciates 20%, imports become:', options: ['20% cheaper', '20% more expensive', '25% more expensive', 'Unaffected'], correctAnswer: 2, explanation: 'If currency falls 20%, you need 25% more domestic currency to buy same imports.' },
    { id: 'sc15', type: 'scenario-mcq', topic: 'investing', difficulty: 3, question: 'A stock has beta of 1.5. If the market drops 10%, the stock is expected to:', options: ['Drop 10%', 'Drop 15%', 'Drop 5%', 'Rise 15%'], correctAnswer: 1, explanation: 'Beta 1.5 means 1.5× market sensitivity. 10% × 1.5 = 15% drop.' },

    // TRUE/FALSE - EASY
    { id: 'tf1', type: 'true-false', topic: 'personal-finance', difficulty: 1, question: 'A higher credit score generally means lower loan interest rates.', options: ['TRUE', 'FALSE'], correctAnswer: 0, explanation: 'Better credit = lower perceived risk = lower rates.' },
    { id: 'tf2', type: 'true-false', topic: 'investing', difficulty: 1, question: 'Stocks always go up in the long run.', options: ['TRUE', 'FALSE'], correctAnswer: 1, explanation: 'Individual stocks can go to zero. Even markets can stay flat for decades.' },
    { id: 'tf3', type: 'true-false', topic: 'banking', difficulty: 1, question: 'A debit card spends money directly from your bank account.', options: ['TRUE', 'FALSE'], correctAnswer: 0, explanation: 'Debit cards are linked to your bank balance.' },

    // TRUE/FALSE - MEDIUM
    { id: 'tf4', type: 'true-false', topic: 'investing', difficulty: 2, question: 'Mutual fund SIPs guarantee returns.', options: ['TRUE', 'FALSE'], correctAnswer: 1, explanation: 'SIPs are subject to market risk. They average cost but don\'t guarantee returns.' },
    { id: 'tf5', type: 'true-false', topic: 'investing', difficulty: 2, question: 'Diversification can eliminate all investment risk.', options: ['TRUE', 'FALSE'], correctAnswer: 1, explanation: 'Diversification reduces unsystematic risk but not systematic (market) risk.' },
    { id: 'tf6', type: 'true-false', topic: 'investing', difficulty: 2, question: 'A bond\'s price and its yield move in opposite directions.', options: ['TRUE', 'FALSE'], correctAnswer: 0, explanation: 'When yields rise, existing bond prices fall, and vice versa.' },
    { id: 'tf7', type: 'true-false', topic: 'investing', difficulty: 2, question: 'Index funds typically have higher expense ratios than actively managed funds.', options: ['TRUE', 'FALSE'], correctAnswer: 1, explanation: 'Index funds are passively managed and have lower expense ratios.' },

    // TRUE/FALSE - HARD
    { id: 'tf8', type: 'true-false', topic: 'macroeconomics', difficulty: 3, question: 'Quantitative easing directly puts money into consumers\' bank accounts.', options: ['TRUE', 'FALSE'], correctAnswer: 1, explanation: 'QE involves central banks buying assets from banks, not direct transfers to consumers.' },
    { id: 'tf9', type: 'true-false', topic: 'crypto', difficulty: 3, question: 'Bitcoin has a maximum supply of 21 million coins.', options: ['TRUE', 'FALSE'], correctAnswer: 0, explanation: 'Bitcoin\'s protocol caps supply at 21 million BTC.' },
    { id: 'tf10', type: 'true-false', topic: 'investing', difficulty: 3, question: 'A company can have negative book value but positive market capitalization.', options: ['TRUE', 'FALSE'], correctAnswer: 0, explanation: 'If liabilities exceed assets, book value is negative, but the market may still value it positively.' },

    // DAILY CHALLENGE
    { id: 'dc1', type: 'daily-challenge', topic: 'macroeconomics', difficulty: 2, question: 'RBI just hiked rates by 50bps. What happens to 10-year government bond yields?', options: ['They decrease sharply', 'They increase', 'They stay unchanged', 'They become negative'], correctAnswer: 1, explanation: 'Rate hikes push bond yields higher as new bonds offer better rates.' },
    { id: 'dc2', type: 'daily-challenge', topic: 'investing', difficulty: 2, question: 'Oil prices surge 40% in a month. Which sector is most likely to benefit?', options: ['Airlines', 'Energy companies', 'Technology', 'Real estate'], correctAnswer: 1, explanation: 'Energy companies (oil producers) directly benefit from higher oil prices.' },
    { id: 'dc3', type: 'daily-challenge', topic: 'macroeconomics', difficulty: 3, question: 'The US Fed signals a dovish pivot. Indian IT stocks are likely to:', options: ['Fall due to rupee weakness', 'Rise on improved US spending outlook', 'Remain unaffected', 'Fall due to rate cuts'], correctAnswer: 1, explanation: 'Dovish Fed → potential US growth → more tech spending → positive for Indian IT.' },
    { id: 'dc4', type: 'daily-challenge', topic: 'crypto', difficulty: 2, question: 'A major country bans crypto trading. What is the most likely short-term effect?', options: ['Prices surge globally', 'Prices drop due to panic selling', 'No effect on prices', 'Mining difficulty increases'], correctAnswer: 1, explanation: 'Regulatory bans typically trigger sell-offs due to fear and uncertainty.' },
    { id: 'dc5', type: 'daily-challenge', topic: 'investing', difficulty: 3, question: 'A company announces a 1:5 stock split. If you held 100 shares at ₹500 each, you now have:', options: ['500 shares at ₹100 each', '20 shares at ₹2,500 each', '100 shares at ₹100 each', '500 shares at ₹500 each'], correctAnswer: 0, explanation: '1:5 split means each share becomes 5. Total value stays same: 500 × ₹100 = ₹50,000' },
];

export default questions;

export function getQuestionsForDuel(difficulty: number, count: number = 15): Question[] {
    const validDifficulties = difficulty <= 1 ? [1, 2] : difficulty >= 3 ? [2, 3] : [1, 2, 3];
    const pool = questions.filter(q => q.type !== 'daily-challenge' && validDifficulties.includes(q.difficulty));
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getDailyChallenge(): Question {
    const today = new Date();
    const dayIndex = today.getDate() % 5;
    const dailyQuestions = questions.filter(q => q.type === 'daily-challenge');
    return dailyQuestions[dayIndex] || dailyQuestions[0];
}
