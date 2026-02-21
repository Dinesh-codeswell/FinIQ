import { Question } from './schema';

/**
 * Money Math Question Bank (Target: 250 questions)
 * difficulty: 0 (Starter), 1 (Easy), 2 (Medium), 3 (Hard)
 * Current: ~190 questions
 */
export const moneyMathQuestions: Question[] = [
    // EASY (Difficulty 1, MinRating 0)
    {
        id: "MM_E_001", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "15% of ₹4,000 = ?", answer: 600, explanation: "10% is 400, 5% is 200. Total = 600", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10% is 400, 5% is 200.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_002", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "25% of ₹12,000 = ?", answer: 3000, explanation: "25% is 1/4th. 12000 / 4 = 3000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 25% is 1/4th.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_003", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "10% of ₹85,000 = ?", answer: 8500, explanation: "Remove one zero from the end.", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Remove one zero from the end.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_004", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "30% of ₹2,500 = ?", answer: 750, explanation: "10% is 250. 30% is 250 * 3 = 750", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10% is 250.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_005", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "50% of ₹7,400 = ?", answer: 3700, explanation: "Half of 7400 is 3700", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Half of 7400 is 3700.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_006", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "20% of ₹45,000 = ?", answer: 9000, explanation: "10% is 4500. 20% is double that.", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10% is 4500.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_007", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "5% of ₹1,00,000 = ?", answer: 5000, explanation: "10% is 10,000. 5% is half of that.", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10% is 10,000.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_008", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "40% of ₹3,250 = ?", answer: 1300, explanation: "10% is 325. 40% is 325 * 4 = 1300", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10% is 325.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_009", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "75% of ₹8,000 = ?", answer: 6000, explanation: "3/4ths of 8000 is 6000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 3/4ths of 8000 is 6000.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_010", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "60% of ₹15,000 = ?", answer: 9000, explanation: "50% is 7500, 10% is 1500. Total = 9000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 50% is 7500, 10% is 1500.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_E_011", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹10,000 at 5% for 1 year = ?", answer: 500, explanation: "SI = P*R*T/100 = 10000*5*1/100", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! SI = P*R*T/100 = 10000*5*1/100.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_E_012", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹20,000 at 10% for 2 years = ?", answer: 4000, explanation: "Interest is 20% total. 20% of 20000 = 4000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Interest is 20% total.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_E_013", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹50,000 at 8% for 1 year = ?", answer: 4000, explanation: "8% of 50000 = 4000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 8% of 50000 = 4000.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_E_014", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹1,00,000 at 6% for 3 years = ?", answer: 18000, explanation: "Total rate = 18%. 18% of 1 Lakh is 18000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Total rate = 18%.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_E_015", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹5,000 at 12% for 2 years = ?", answer: 1200, explanation: "Total rate 24%. 24% of 5000 = 1200", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Total rate 24%.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_E_016", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Buy at ₹100, sell at ₹120. Profit % = ?", answer: 20, explanation: "Profit is 20 on base 100", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Profit is 20 on base 100.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_E_017", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Buy at ₹500, sell at ₹400. Loss % = ?", answer: 20, explanation: "Loss is 100 on base 500. 100/500 = 1/5 = 20%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Loss is 100 on base 500.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_E_018", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Buy at ₹200, sell at ₹250. Profit = ?", answer: 50, explanation: "250 - 200 = 50", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 250 - 200 = 50.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_E_019", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Buy at ₹1000, sell at ₹800. Loss = ?", answer: 200, explanation: "1000 - 800 = 200", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 1000 - 800 = 200.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_E_020", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Cost ₹150, profit 20%. Selling price = ?", answer: 180, explanation: "20% of 150 is 30. 150 + 30 = 180", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 20% of 150 is 30.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_E_021", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Invest ₹10,000. Get back ₹11,000. Return % = ?", answer: 10, explanation: "Gain 1000 on 10000 = 10%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Gain 1000 on 10000 = 10%.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_022", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Invest ₹5,000. Get back ₹5,500. Return % = ?", answer: 10, explanation: "Gain 500 on 5000 = 10%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Gain 500 on 5000 = 10%.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_023", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "₹2,000 grows to ₹2,500. Gain = ?", answer: 500, explanation: "2500 - 2000 = 500", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 2500 - 2000 = 500.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_024", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Invest ₹50,000. Lose 10%. Remaining = ?", answer: 45000, explanation: "10% loss is 5000. 50000 - 5000 = 45000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10% loss is 5000.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_025", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "₹1,00,000 grows by 15%. New value = ?", answer: 115000, explanation: "15% is 15000. Total 1,15,000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 15% is 15000.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_026", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Monthly salary ₹30,000. Annual salary = ?", answer: 360000, explanation: "30000 * 12 = 360000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 30000 * 12 = 360000.",
        timeLimit: 8, tags: ["personal_finance"]
    },
    {
        id: "MM_E_027", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Spend ₹15,000/month. Annual spend = ?", answer: 180000, explanation: "15000 * 12 = 180000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 15000 * 12 = 180000.",
        timeLimit: 8, tags: ["personal_finance"]
    },
    {
        id: "MM_E_028", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Save ₹3,000/month for 12 months. Total = ?", answer: 36000, explanation: "3000 * 12 = 36000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 3000 * 12 = 36000.",
        timeLimit: 8, tags: ["personal_finance"]
    },
    {
        id: "MM_E_029", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "EMI ₹8,000/month for 24 months. Total paid = ?", answer: 192000, explanation: "8000 * 24 = 192000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 8000 * 24 = 192000.",
        timeLimit: 8, tags: ["personal_finance"]
    },
    {
        id: "MM_E_030", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Electricity bill ₹2,400 for 3 months. Per month = ?", answer: 800, explanation: "2400 / 3 = 800", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 2400 / 3 = 800.",
        timeLimit: 8, tags: ["personal_finance"]
    },
    {
        id: "MM_E_032", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "35% of ₹14,000 = ?", answer: 4900, explanation: "10% is 1400. 30% is 4200. 5% is 700. Total = 4900.", feedbackCorrect: "✓ Sharp! 1400 x 3 + 700 is the fastest route.",
        feedbackWrong: "✗ Close! 10% is 1400. 35% is 3.5 times that amount.",
        timeLimit: 8, tags: ["percentages"]
    },
    {
        id: "MM_E_033", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "8% of ₹1,25,000 = ?", answer: 10000, explanation: "1% is 1250. 8% is 1250 * 8 = 10000.", feedbackCorrect: "✓ Exactly right. 1% is 1250, so 8% is exactly 10,000.",
        feedbackWrong: "✗ Actually: 1% of 1.25L is 1250. Multiply by 8 for the result.",
        timeLimit: 8, tags: ["percentages"]
    },
    {
        id: "MM_E_034", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "If price rises from ₹400 to ₹460, % increase = ?", answer: 15, explanation: "Increase is 60. 60 is 15% of 400.", feedbackCorrect: "✓ Perfect. The extra 60/400 represents a 15% hike in price.",
        feedbackWrong: "✗ Remember: % Increase = (Change / Original) x 100. 60/400 is 15%.",
        timeLimit: 8, tags: ["percentages"]
    },
    {
        id: "MM_E_035", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "Portfolio falls from ₹50,000 to ₹42,500. % loss = ?", answer: 15, explanation: "Loss is 7500. 7500 is 15% of 50,000.", feedbackCorrect: "✓ Correct. A 7,500 drop on a 50k base is a 15% loss.",
        feedbackWrong: "✗ Oops! Loss is 7,500. 7,500 divided by 50,000 equals 15%.",
        timeLimit: 8, tags: ["percentages"]
    },
    {
        id: "MM_E_036", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹15,000 at 8% for 2 years = ?", answer: 2400, explanation: "SI = (15000 * 8 * 2) / 100 = 2400.", feedbackCorrect: "✓ You've got it. Principal x Rate x Time gives the simple interest.",
        feedbackWrong: "✗ Use the formula P*R*T. In this case, 15000 * 0.08 * 2.",
        timeLimit: 10, tags: ["simple_interest"]
    },
    {
        id: "MM_E_037", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹80,000 at 6% for 18 months = ?", answer: 7200, explanation: "18 months = 1.5 years. 80000 * 0.06 * 1.5 = 7200.", feedbackCorrect: "✓ Sharp! 1.5 years at 6% results in total interest of 7,200.",
        feedbackWrong: "✗ Careful! 18 months is 1.5 years. SI = 80000 * 0.06 * 1.5.",
        timeLimit: 10, tags: ["simple_interest"]
    },
    {
        id: "MM_E_038", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "Total after SI: ₹20,000 at 10% for 3 years = ?", answer: 26000, explanation: "Interest is 6000. Total = 20000 + 6000 = 26000.", feedbackCorrect: "✓ Exactly. 6k interest plus the original 20k principal.",
        feedbackWrong: "✗ Don't forget to add the interest (6000) back to the principal.",
        timeLimit: 10, tags: ["simple_interest"]
    },
    {
        id: "MM_E_039", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "EMI is ₹12,000/month for 2 years. Total paid = ?", answer: 288000, explanation: "12000 * 24 months = 288000.", feedbackCorrect: "✓ Perfect. Monthly repayment x total months = total cost of loan.",
        feedbackWrong: "✗ Calculation: ₹12,000 per month for 24 months equals ₹2,88,000.",
        timeLimit: 8, tags: ["loans"]
    },
    {
        id: "MM_E_040", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Bought share at ₹150, sold at ₹180. Profit % = ?", answer: 20, explanation: "Profit is 30. (30 / 150) * 100 = 20%.", feedbackCorrect: "✓ Right! A ₹30 gain on a ₹150 investment is 20%.",
        feedbackWrong: "✗ Profit is ₹30. Profit % = (30 / 150) x 100 = 20%.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_041", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Premium ₹12,000/year for ₹50L cover. % of cover = ?", answer: 0.24, explanation: "(12000 / 5000000) * 100 = 0.24%.", feedbackCorrect: "✓ Nailed it! The annual premium is just 0.24% of the sum assured.",
        feedbackWrong: "✗ Divide premium by sum assured: 12,000 / 5,000,000 then multiply by 100.",
        timeLimit: 12, tags: ["insurance"]
    },
    {
        id: "MM_E_042", type: "money_math", topic: "insurance", difficulty: 1, minRating: 0,
        question: "After 20% co-pay on ₹40,000 claim, insurance pays = ?", answer: 32000, explanation: "Co-pay is 8000. Insurance pays 40000 - 8000 = 32000.", feedbackCorrect: "✓ Correct! You pay the 20% co-pay, insurer covers the rest.",
        feedbackWrong: "✗ Co-pay of 20% is ₹8,000. The insurer pays ₹40,000 - ₹8,000.",
        timeLimit: 10, tags: ["insurance"]
    },
    {
        id: "MM_E_043", type: "money_math", topic: "insurance", difficulty: 1, minRating: 0,
        question: "Deductible ₹5,000 on ₹35,000 claim. Insurance pays = ?", answer: 30000, explanation: "Insurance pays claim minus deductible: 35000 - 5000 = 30000.", feedbackCorrect: "✓ Sharp! The deductible is the initial amount you pay per claim.",
        feedbackWrong: "✗ Claim minus deductible equals payout. So, 35,000 - 5,000 = 30,000.",
        timeLimit: 8, tags: ["insurance"]
    },
    {
        id: "MM_E_044", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "STCG ₹60,000 at 15%. Tax liability = ?", answer: 9000, explanation: "60000 * 15% = 9000.", feedbackCorrect: "✓ Exactly. 15% is the standard rate for Short Term Capital Gains.",
        feedbackWrong: "✗ Calculation: 15% of ₹60,000 is ₹9,000 in tax liability.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_E_045", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "GST 18% on ₹5,000 service. Total invoice = ?", answer: 5900, explanation: "GST is 900. Total = 5000 + 900 = 5900.", feedbackCorrect: "✓ Perfect. Adding 18% tax to the base amount gives the total.",
        feedbackWrong: "✗ GST is 18% of 5,000 = 900. Total = 5,000 + 900.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_E_046", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "12% of ₹5,000 = ?", answer: 600, explanation: "10% is 500, 2% is 100. Total = 600.", feedbackCorrect: "✓ Simple and clean. 500 plus 100 equals 600.",
        feedbackWrong: "✗ 10% of 5000 is 500. Add another 2% (100) for 600.",
        timeLimit: 6, tags: ["percentages"]
    },
    {
        id: "MM_E_047", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "Double your money at 12% SI. Years = ?", answer: 8.3, explanation: "100 / 12 = 8.33 years.", feedbackCorrect: "✓ Sharp! It takes roughly 8.3 years to double at 12% SI.",
        feedbackWrong: "✗ Years to double = 100 / Interest Rate for simple interest calculations.",
        timeLimit: 10, tags: ["simple_interest"]
    },
    {
        id: "MM_E_048", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "Half of 1% of ₹10,00,000 = ?", answer: 5000, explanation: "1% is 10000. Half is 5000.", feedbackCorrect: "✓ Spot on! 1% is 10k, so 0.5% is exactly 5k.",
        feedbackWrong: "✗ 1% of 10 Lakhs is 10,000. Half of that is 5,000.",
        timeLimit: 8, tags: ["percentages"]
    },
    {
        id: "MM_E_049", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Save ₹2,500/month for 1 year. Total saved = ?", answer: 30000, explanation: "2500 * 12 months = 30000.", feedbackCorrect: "✓ Great habit. ₹2,500 monthly becomes ₹30k by the year's end.",
        feedbackWrong: "✗ Calculation: 2,500 per month x 12 months = 30,000 total.",
        timeLimit: 6, tags: ["savings"]
    },
    {
        id: "MM_E_050", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Bought 10 shares at ₹450. Total cost = ?", answer: 4500, explanation: "10 * 450 = 4500.", feedbackCorrect: "✓ Basic math! Quantity times price per share equals total outlay.",
        feedbackWrong: "✗ Simple multiplication: 10 shares at ₹450 each equals ₹4,500 total.",
        timeLimit: 6, tags: ["investing"]
    },
    {
        id: "MM_E_051", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "22% of ₹5,000 = ?", answer: 1100, explanation: "2% is 1000, 2% is 100. Total = 1100.", feedbackCorrect: "✓ Quick thinking! 1000 (20%) + 100 (2%) = 1100.",
        feedbackWrong: "✗ 20% of 5000 is 1000. 2% is 100. Sum = 1100.",
        timeLimit: 8, tags: ["percentages"]
    },
    {
        id: "MM_E_052", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹60,000 at 5% for 4 years = ?", answer: 12000, explanation: "60000 * 0.05 * 4 = 12000.", feedbackCorrect: "✓ Exactly. 5% for 4 years is effectively 20% total interest.",
        feedbackWrong: "✗ Interest = 60,000 x 0.05 x 4 years = 12,000.",
        timeLimit: 10, tags: ["simple_interest"]
    },
    {
        id: "MM_E_053", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Dividend yield 2%, stock price ₹400. Dividend = ?", answer: 8, explanation: "400 * 2% = 8.", feedbackCorrect: "✓ Right! A 2% yield on ₹400 equals an ₹8 payout.",
        feedbackWrong: "✗ Dividend = Stock Price x Yield %. 400 * 0.02 = 8.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_054", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "TDS 10% on interest of ₹25,000 = ?", answer: 2500, explanation: "25000 * 10% = 2500.", feedbackCorrect: "✓ Correct. Tax Deducted at Source takes 10% of that interest.",
        feedbackWrong: "✗ TDS is 10% of the interest. So, 0.10 * 25,000 = 2,500.",
        timeLimit: 6, tags: ["taxation"]
    },
    {
        id: "MM_E_055", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "Quarterly interest on ₹1L at 4% p.a. = ?", answer: 1000, explanation: "Annual is 4000. Quarter is 4000/4 = 1000.", feedbackCorrect: "✓ Sharp! One quarter is 1/4th of the 4% annual interest.",
        feedbackWrong: "✗ 4% of 1 Lakh is 4,000. Divide by 4 quarters for 1,000.",
        timeLimit: 10, tags: ["banking"]
    },
    {
        id: "MM_E_056", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "Increase ₹800 by 25% = ?", answer: 1000, explanation: "25% is 200. 800 + 200 = 1000.", feedbackCorrect: "✓ Easy! 1/4th of 800 is 200. Total becomes 1000.",
        feedbackWrong: "✗ 25% is 1/4th. 1/4 of 800 is 200. 800 + 200 = 1000.",
        timeLimit: 6, tags: ["percentages"]
    },
    {
        id: "MM_E_057", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Expense ratio 1% on ₹1,00,000 investment = ?", answer: 1000, explanation: "1% of 100000 is 1000.", feedbackCorrect: "✓ Correct. Higher expense ratios eat into your portfolio's growth.",
        feedbackWrong: "✗ 1% of 1,00,000 is simple: just remove two zeros. 1,000.",
        timeLimit: 6, tags: ["mutual_funds"]
    },
    {
        id: "MM_E_058", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Goal ₹1.2L in 12 months. Monthly SIP = ?", answer: 10000, explanation: "120000 / 12 = 10000.", feedbackCorrect: "✓ Exactly. Disciplined saving of 10k monthly hits the 1.2L goal.",
        feedbackWrong: "✗ Simple division: ₹1.2 Lakhs / 12 months = ₹10,000 per month.",
        timeLimit: 6, tags: ["savings"]
    },
    {
        id: "MM_E_059", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "Balance ₹15k, withdraw ₹6.5k. New balance = ?", answer: 8500, explanation: "15000 - 6500 = 8500.", feedbackCorrect: "✓ Spot on! Fundamental arithmetic for your bank balance.",
        feedbackWrong: "✗ Basic subtraction: 15,000 minus 6,500 equals 8,500.",
        timeLimit: 6, tags: ["banking"]
    },
    {
        id: "MM_E_060", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "15 is what % of 75? = ?", answer: 20, explanation: "15/75 = 1/5 = 20%.", feedbackCorrect: "✓ Sharp! 1/5th of any number is always 20%.",
        feedbackWrong: "✗ Ratio is 15/75. That simplifies to 1/5, which is 20%.",
        timeLimit: 8, tags: ["percentages"]
    },
    {
        id: "MM_E_061", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "2% of ₹2,50,000 = ?", answer: 5000, explanation: "1% is 2500. 2% is 5000.", feedbackCorrect: "✓ Quick math! 1% is 2,500, so double that is 5,000.",
        feedbackWrong: "✗ 1% of 2.5L is 2500. Multiply by 2 for the result.",
        timeLimit: 6, tags: ["percentages"]
    },
    {
        id: "MM_E_062", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "Interest on ₹50,000 at 6% for 6 months = ?", answer: 1500, explanation: "6 months is 0.5 year. 50000 * 0.06 * 0.5 = 1500.", feedbackCorrect: "✓ Correct! Half a year at 6% is effectively 3% interest.",
        feedbackWrong: "✗ 6 months = 0.5 years. Interest = 50,000 * 0.06 * 0.5.",
        timeLimit: 10, tags: ["simple_interest"]
    },
    {
        id: "MM_E_063", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Sell at ₹1200, buy at ₹1000. Profit % = ?", answer: 20, explanation: "Gain is 200 on 1000 base = 20%.", feedbackCorrect: "✓ Perfect. A ₹200 gain on a ₹1,000 cost is 20%.",
        feedbackWrong: "✗ Profit = (Sales - Cost)/Cost. So, 200/1000 = 20%.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_064", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Income ₹10L. 10% tax on everything. Tax = ?", answer: 100000, explanation: "1000000 * 10% = 100000.", feedbackCorrect: "✓ Simple flat tax logic. 10% of 10 Lakhs is 1 Lakh.",
        feedbackWrong: "✗ 10% of 1,000,000 is 100,000. Just remove one zero.",
        timeLimit: 6, tags: ["taxation"]
    },
    {
        id: "MM_E_065", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Rent ₹15k, Salary ₹60k. Rent as % of salary = ?", answer: 25, explanation: "15/60 = 1/4 = 25%.", feedbackCorrect: "✓ Healthy ratio. Rent is exactly 1/4th of the total salary.",
        feedbackWrong: "✗ Divide rent by salary: 15,000 / 60,000 = 1/4 = 25%.",
        timeLimit: 8, tags: ["budgeting"]
    },
    {
        id: "MM_E_066", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "3% of ₹12,000 = ?", answer: 360, explanation: "1% is 120. 3% is 120 * 3 = 360.", feedbackCorrect: "✓ Fast math. 1% is 120, so 3% is exactly 360.",
        feedbackWrong: "✗ 1% of 12000 is 120. Multiply by 3 for 3%.",
        timeLimit: 6, tags: ["percentages"]
    },
    {
        id: "MM_E_067", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Brokerage 0.1% on ₹50,000 trade = ?", answer: 50, explanation: "1% is 500. 0.1% is 50.", feedbackCorrect: "✓ Right! Low brokerage fees keep more profit in your pocket.",
        feedbackWrong: "✗ 1% is 500. Move decimal one more to get 0.1% = 50.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_068", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "Deposit ₹2,500 every month for 2 years. Total = ?", answer: 60000, explanation: "2500 * 24 months = 60000.", feedbackCorrect: "✓ Correct! Consistent saving for 24 months adds up fast.",
        feedbackWrong: "✗ Calculation: 2,500 per month x 24 months = 60,000 total.",
        timeLimit: 6, tags: ["savings"]
    },
    {
        id: "MM_E_069", type: "money_math", topic: "insurance", difficulty: 1, minRating: 0,
        question: "Medical bill ₹50k, 10% co-pay. You pay = ?", answer: 5000, explanation: "10% of 50000 is 5000.", feedbackCorrect: "✓ Right! You cover the 10% co-pay out of pocket.",
        feedbackWrong: "✗ Co-pay: You pay 10% of the bill. 10% of 50,000 is 5,000.",
        timeLimit: 8, tags: ["insurance"]
    },
    {
        id: "MM_E_070", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "What is 1/8 as a percentage? = ?", answer: 12.5, explanation: "1/4 is 25%, so 1/8 is 12.5%.", feedbackCorrect: "✓ Sharp! 1/8th is a key fraction to remember in finance.",
        feedbackWrong: "✗ 1/4 is 25%. Half of that is 1/8, which is 12.5%.",
        timeLimit: 6, tags: ["percentages"]
    },
    {
        id: "MM_E_071", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "7% of ₹4,000 = ?", answer: 280, explanation: "1% is 40. 7% is 40 * 7 = 280.", feedbackCorrect: "✓ Perfect. 40 times 7 equals 280 exactly.",
        feedbackWrong: "✗ 1% of 4000 is 40. Multiply by 7 to get 280.",
        timeLimit: 6, tags: ["percentages"]
    },
    {
        id: "MM_E_072", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Buy at ₹200, Sell at ₹250. Profit % = ?", answer: 25, explanation: "Gain 50 on 200 base = 25%.", feedbackCorrect: "✓ Exactly! A ₹50 profit on ₹200 is a 25% gain.",
        feedbackWrong: "✗ Profit is ₹50. (50 / 200) x 100 = 25%.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_073", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Refund of ₹5,200 on tax of ₹40,000. Net tax = ?", answer: 34800, explanation: "40000 - 5200 = 34800.", feedbackCorrect: "✓ Correct! Net tax is simply total tax minus the refund.",
        feedbackWrong: "✗ Subtraction: Total tax 40,000 minus refund 5,200 = 34,800.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_E_074", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "HRA ₹20k, Basic ₹50k. HRA as % of basic = ?", answer: 40, explanation: "20/50 = 2/5 = 40%.", feedbackCorrect: "✓ Perfect. HRA is exactly 40% of the basic salary here.",
        feedbackWrong: "✗ Ratio is 20,000 / 50,000 = 2/5. That is 40%.",
        timeLimit: 8, tags: ["salary"]
    },
    {
        id: "MM_E_075", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI for 1 year at 7% p.a. on ₹1,00,000 = ?", answer: 7000, explanation: "100000 * 0.07 * 1 = 7000.", feedbackCorrect: "✓ Correct! 7% of 1 Lakh is 7,000 rupees of interest.",
        feedbackWrong: "✗ 7% of 1 Lakh is simply 1,00,000 x 0.07 = 7,000.",
        timeLimit: 6, tags: ["simple_interest"]
    },
    {
        id: "MM_E_076", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "25% of what number is 50? = ?", answer: 200, explanation: "50 * 4 = 200.", feedbackCorrect: "✓ Sharp! If 1/4th is 50, then the whole is 200.",
        feedbackWrong: "✗ 25% is 1/4th. If 1/4 of X is 50, then X must be 200.",
        timeLimit: 8, tags: ["percentages"]
    },
    {
        id: "MM_E_077", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Bought 50 shares at ₹120. Total = ?", answer: 6000, explanation: "50 * 120 = 6000.", feedbackCorrect: "✓ Correct. Quick multiplication: 50 times 120 equals 6,000.",
        feedbackWrong: "✗ Calculation: 50 shares x ₹120 per share = ₹6,000 total.",
        timeLimit: 6, tags: ["investing"]
    },
    {
        id: "MM_E_078", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "Atm limit ₹20k, used ₹12.5k. Left = ?", answer: 7500, explanation: "20000 - 12500 = 7500.", feedbackCorrect: "✓ Spot on. Monitoring your limits is key to managing liquidity.",
        feedbackWrong: "✗ Subtraction: 20,000 minus 12,500 leaves 7,500.",
        timeLimit: 6, tags: ["banking"]
    },
    {
        id: "MM_E_079", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Cess 4% on tax of ₹25,000 = ?", answer: 1000, explanation: "25000 * 4% = 1000.", feedbackCorrect: "✓ Right! In India, health and education cess is 4% of tax.",
        feedbackWrong: "✗ Cess is 4% of the tax amount. 25,000 * 0.04 = 1,000.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_E_080", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "Reduce ₹1200 by 10% = ?", answer: 1080, explanation: "10% is 120. 1200 - 120 = 1080.", feedbackCorrect: "✓ Perfect. Subtracting 120 from 1200 gives the new price.",
        feedbackWrong: "✗ 10% of 1200 is 120. Subtraction: 1200 - 120 = 1080.",
        timeLimit: 6, tags: ["percentages"]
    },
    {
        id: "MM_E_081", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Credit card bill ₹40k, paid ₹5k. Balance = ?", answer: 35000, explanation: "40000 - 5000 = 35000.", feedbackCorrect: "✓ Correct. Paying the minimum leaves a large balance accumulating interest.",
        feedbackWrong: "✗ Simple math: 40k minus 5k paid leaves 35k balance.",
        timeLimit: 6, tags: ["credit_cards"]
    },
    {
        id: "MM_E_082", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Stock split 1:10. Price was ₹500, new price = ?", answer: 50, explanation: "Price is divided by 10 in a 1:10 split.", feedbackCorrect: "✓ Exactly. Splits increase liquidity by lowering the per-share price.",
        feedbackWrong: "✗ In a 1:10 split, the price is divided by 10. 500 / 10 = 50.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_083", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "Daily interest at 10% p.a. on ₹36,500 = ?", answer: 10, explanation: "Annual is 3650. Per day is 3650 / 365 = 10.", feedbackCorrect: "✓ Sharp! 36,500 is chosen to make daily math simple.",
        feedbackWrong: "✗ Annual interest is 3,650. Divide by 365 days to get 10/day.",
        timeLimit: 12, tags: ["banking"]
    },
    {
        id: "MM_E_084", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "Add 15% to ₹200 = ?", answer: 230, explanation: "10% is 20, 5% is 10. Total 200 + 30 = 230.", feedbackCorrect: "✓ Quick and clean! Adding 30 takes the total to 230.",
        feedbackWrong: "✗ 10% is 20. 5% is 10. So add 30 to 200 to get 230.",
        timeLimit: 6, tags: ["percentages"]
    },
    {
        id: "MM_E_085", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Bonus 1:1. Shares were 50, now you have = ?", answer: 100, explanation: "1:1 bonus means you get one share for every one owned.", feedbackCorrect: "✓ Right! A 1:1 bonus effectively doubles your share count.",
        feedbackWrong: "✗ 1:1 bonus means you get 50 more shares. 50 + 50 = 100.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_086", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Standard deduction on ₹6L salary = ?", answer: 50000, explanation: "Standard deduction in India for salary is ₹50,000.", feedbackCorrect: "✓ Correct! This is a flat benefit for all salaried taxpayers.",
        feedbackWrong: "✗ Standard deduction is a flat amount, currently ₹50,000 for salary.",
        timeLimit: 6, tags: ["taxation"]
    },
    {
        id: "MM_E_087", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "Min balance ₹5k, current ₹3.8k. Need to add = ?", answer: 1200, explanation: "5000 - 3800 = 1200.", feedbackCorrect: "✓ Perfect. Adding 1,200 avoids non-maintenance charges.",
        feedbackWrong: "✗ Simple: 5,000 required minus 3,800 current leaves 1,200.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_E_088", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "What is 1.5% as a decimal? = ?", answer: 0.015, explanation: "1.5 / 100 = 0.015.", feedbackCorrect: "✓ Sharp math! Moving the decimal two places left is key.",
        feedbackWrong: "✗ To get the decimal, divide by 100. 1.5 becomes 0.015.",
        timeLimit: 6, tags: ["percentages"]
    },
    {
        id: "MM_E_089", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Profit ₹8k on ₹80k investment. Return % = ?", answer: 10, explanation: "8000/80000 = 10%.", feedbackCorrect: "✓ Easy 10%! You've earned a tenth of your original capital.",
        feedbackWrong: "✗ 8,000 is exactly a tenth of 80,000. So the return is 10%.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_E_090", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "SIP ₹5k, return ₹200 this month. Return % = ?", answer: 4, explanation: "200/5000 = 4%.", feedbackCorrect: "✓ Nice! A ₹200 gain on 5k is a solid 4% monthly return.",
        feedbackWrong: "✗ Calculation: (Gain 200 / Invested 5,000) x 100 = 4%.",
        timeLimit: 8, tags: ["mutual_funds"]
    },
    {
        id: "MM_M_001", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "CI on ₹10,000 at 10% for 2 years (annual) = ?", answer: 12100, explanation: "10000 * 1.1 * 1.1 = 12100", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10000 * 1.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_M_002", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "CI on ₹50,000 at 8% for 2 years = ?", answer: 58320, explanation: "50000 * 1.08 * 1.08 = 58320", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 50000 * 1.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_M_003", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "CI on ₹1,00,000 at 12% for 1 year, half-yearly = ?", answer: 112360, explanation: "Effective rate approx 12.36%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Effective rate approx 12.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_M_004", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Invested ₹20,000. After 3 years at 10% CI, amount = ?", answer: 26620, explanation: "20000 * 1.331 = 26620", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 20000 * 1.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_005", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "₹10,000 doubles in 7 years at CI. Approx rate = ?", answer: 10, explanation: "Rule of 72: 72/7 approx 10%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Rule of 72: 72/7 approx 10%.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_M_006", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Price rises from ₹200 to ₹250. % increase = ?", answer: 25, explanation: "50 increase on 200 base = 25%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 50 increase on 200 base = 25%.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_M_007", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Price falls from ₹500 to ₹400. % decrease = ?", answer: 20, explanation: "100 decrease on 500 base = 20%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 100 decrease on 500 base = 20%.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_M_008", type: "money_math", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Stock was ₹150, now ₹135. % fall = ?", answer: 10, explanation: "15 fall on 150 = 10%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 15 fall on 150 = 10%.",
        timeLimit: 8, tags: ["equity_markets"]
    },
    {
        id: "MM_M_009", type: "money_math", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Salary was ₹40,000, hiked to ₹46,000. % hike = ?", answer: 15, explanation: "6000 hike on 40000 = 15%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 6000 hike on 40000 = 15%.",
        timeLimit: 8, tags: ["personal_finance"]
    },
    {
        id: "MM_M_010", type: "money_math", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Revenue was ₹10L, now ₹8L. % decline = ?", answer: 20, explanation: "2L decline on 10L = 20%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 2L decline on 10L = 20%.",
        timeLimit: 8, tags: ["personal_finance"]
    },
    {
        id: "MM_M_011", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Invest ₹60,000 in A and ₹40,000 in B. A's weight % = ?", answer: 60, explanation: "Total 100k. 60k/100k = 60%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Total 100k.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_012", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Port returns: A +20%, B -10%, equal weight. Net % = ?", answer: 5, explanation: "Average of +20 and -10 is +5", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Average of +20 and -10 is +5.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_013", type: "money_math", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Buy 50 shares at ₹200. Sell all at ₹240. Profit = ?", answer: 2000, explanation: "50 * 40 = 2000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 50 * 40 = 2000.",
        timeLimit: 8, tags: ["equity_markets"]
    },
    {
        id: "MM_M_014", type: "money_math", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Buy 100 shares at ₹150. Brokerage 1%. Total cost = ?", answer: 15150, explanation: "Cost 15000 + 150 brokerage = 15150", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Cost 15000 + 150 brokerage = 15150.",
        timeLimit: 8, tags: ["equity_markets"]
    },
    {
        id: "MM_M_015", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Invest ₹25,000 at 15% p.a. for 2 years CI. Profit = ?", answer: 8062.5, explanation: "25000 * (1.15^2 - 1) = 8062.5", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 25000 * (1.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_016", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "₹10,000 grows to ₹14,641 in 4 years. CAGR = ?", answer: 10, explanation: "1.1^4 = 1.4641, so 10%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 1.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_017", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "₹1,00,000 becomes ₹1,21,000 in 2 years. CAGR = ?", answer: 10, explanation: "Square root of 1.21 is 1.1, so 10%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Square root of 1.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_018", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "₹50,000 grows to ₹72,900 in 3 years. CAGR = ?", answer: 13.4, explanation: "Approx 13.4%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Approx 13.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_019", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Nominal return 12%, inflation 7%. Real return ≈ ?", answer: 5, explanation: "Approx 12 - 7 = 5%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Approx 12 - 7 = 5%.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_020", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "FD returns 6%, inflation 4.5%. Real return ≈ ?", answer: 1.5, explanation: "Approx 6 - 4.5 = 1.5%", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Approx 6 - 4.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_021", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "Loan ₹5L, 10% p.a., 5 years. Total interest approx = ?", answer: 137500, explanation: "Using EMI calculators, approx total interest.", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Using EMI calculators, approx total interest.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_M_022", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "EMI ₹15,000/month for 3 years at 12%. Principal approx = ?", answer: 450000, explanation: "Back calculation from EMI", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Back calculation from EMI.",
        timeLimit: 8, tags: ["banking"]
    },
    {
        id: "MM_M_023", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Rule of 72: Rate 8%. Years to double = ?", answer: 9, explanation: "72 / 8 = 9", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 72 / 8 = 9.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_M_024", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "10% of 250 + 20% of 500 = ?", answer: 125, explanation: "25 + 100 = 125", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 25 + 100 = 125.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_M_025", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "50% of 60 + 25% of 40 = ?", answer: 40, explanation: "30 + 10 = 40", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 30 + 10 = 40.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_M_026", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "15% of 2000 - 5% of 2000 = ?", answer: 200, explanation: "10% of 2000 = 200", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10% of 2000 = 200.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_M_027", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "1/5th of 5000 + 1/2 of 1000 = ?", answer: 1500, explanation: "1000 + 500 = 1500", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 1000 + 500 = 1500.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_M_028", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Square of 12 + Square of 5 = ?", answer: 169, explanation: "144 + 25 = 169", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 144 + 25 = 169.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_M_029", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "20 * 15 + 100 = ?", answer: 400, explanation: "300 + 100 = 400", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 300 + 100 = 400.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_M_030", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "1000 / 4 * 2 = ?", answer: 500, explanation: "250 * 2 = 500", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 250 * 2 = 500.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_M_066", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "A ₹3,000 grocery bill has 5% tax. Total?", answer: 3150,
        explanation: "5% of 3000 = 150. 3000 + 150 = 3150.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["taxes"]
    },
    {
        id: "MM_M_067", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "If you buy 2 products for ₹450 each and get 10% off the total, you pay?", answer: 810,
        explanation: "Total 900. 10% off is 90. 900 - 90 = 810.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["discounts"]
    },
    {
        id: "MM_M_068", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Interest on ₹12,000 at 10% for 6 months (Simple Interest)?", answer: 600,
        explanation: "Annual is 1200. Half is 600.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["interest"]
    },
    {
        id: "MM_M_069", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "You have ₹2,000. Movie ticket ₹250, popcorn ₹150. Money left?", answer: 1600,
        explanation: "2000 - (250 + 150) = 1600.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["expenses"]
    },
    {
        id: "MM_M_070", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Price of a ₹1,500 share falls by 4%. New price?", answer: 1440,
        explanation: "4% of 1500 = 60. 1500 - 60 = 1440.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["investing"]
    },
    {
        id: "MM_M_071", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Exchange $50 to INR if 1 USD = ₹82.50.?", answer: 4125,
        explanation: "50 * 82.5 = 4125.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["currency"]
    },
    {
        id: "MM_M_072", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "A ₹10,000 loan at 12% SI for 1 year. Monthly interest?", answer: 100,
        explanation: "Total annual interest 1200. 1200 / 12 = 100.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["banking"]
    },
    {
        id: "MM_M_073", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Split ₹4,800 between A and B in 3:1 ratio. A's share?", answer: 3600,
        explanation: "4800 / 4 = 1200. A gets 1200 * 3 = 3600.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["ratio"]
    },
    {
        id: "MM_M_074", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Discount of 30% on ₹2,500. Selling price?", answer: 1750,
        explanation: "30% of 2500 is 750. 2500 - 750 = 1750.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["discounts"]
    },
    {
        id: "MM_M_075", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Buy 5 items for ₹120 each. Total with 18% GST?", answer: 708,
        explanation: "Cost 600. 18% of 600 is 108. Total 708.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["taxes"]
    },
    {
        id: "MM_M_076", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "If inflation is 5%, what will ₹1,000 be worth in purchasing power next year?", answer: 950,
        explanation: "Loss of 50. 1000 - 50 = 950.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["inflation"]
    },
    {
        id: "MM_M_077", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Salary hike of 8% on ₹40,000. New salary?", answer: 43200,
        explanation: "8% of 40000 = 3200. Total 43200.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["salary"]
    },
    {
        id: "MM_M_078", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "FD return of 7% on ₹20,000. Total after 1 year?", answer: 21400,
        explanation: "Interest 1400. Total 21400.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["banking"]
    },
    {
        id: "MM_M_079", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Cost of 250g gold if 10g costs ₹60,000.?", answer: 1500000,
        explanation: "60000 * 25 = 15,00,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["commodities"]
    },
    {
        id: "MM_M_080", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "A stock goes from ₹400 to ₹380. % loss?", answer: 5,
        explanation: "Loss of 20. (20 / 400) * 100 = 5%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["investing"]
    },
    {
        id: "MM_M_081", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "You save ₹250/week. Total in 1 year (52 weeks)?", answer: 13000,
        explanation: "250 * 52 = 13000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["savings"]
    },
    {
        id: "MM_M_082", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Buying a ₹20,000 laptop on 4 months 0% EMI. Monthly payment?", answer: 5000,
        explanation: "20000 / 4 = 5000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["banking"]
    },
    {
        id: "MM_M_083", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "If ₹12,000 is 20% of your savings, total savings?", answer: 60000,
        explanation: "12000 * 5 = 60000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["budgeting"]
    },
    {
        id: "MM_M_084", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "GST 28% on a ₹5,000 item. Price including tax?", answer: 6400,
        explanation: "28% of 5000 = 1400. 5000 + 1400 = 6400.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["taxes"]
    },
    {
        id: "MM_M_085", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Divide ₹1,00,000 into 70:30 for debt:equity. Equity amount?", answer: 30000,
        explanation: "30% of 1,00,000 = 30000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["investing"]
    },
    {
        id: "MM_M_086", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Profit of 25% on CP ₹800. SP?", answer: 1000,
        explanation: "800 + 200 = 1000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["profit_loss"]
    },
    {
        id: "MM_M_087", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Loss of 10% on SP ₹900. CP was?", answer: 1000,
        explanation: "900 is 90% of CP. CP = 900 / 0.9 = 1000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["profit_loss"]
    },
    {
        id: "MM_M_088", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Fuel price 100/L. Car gives 15km/L. Cost for 60km trip?", answer: 400,
        explanation: "4 Liters needed. 4 * 100 = 400.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["expenses"]
    },
    {
        id: "MM_M_089", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Electricity bill ₹2,400. Late fee 2%. Total if late?", answer: 2448,
        explanation: "2% of 2400 is 48. 2400 + 48 = 2448.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["expenses"]
    },
    {
        id: "MM_M_090", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "If you spend 40% of ₹30,000 salary on rent, how much is rent?", answer: 12000,
        explanation: "30000 * 0.4 = 12000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["budgeting"]
    },
    {
        id: "MM_M_091", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Price of 1kg apples is ₹180. Cost of 3.5kg?", answer: 630,
        explanation: "180 * 3 + 90 = 540 + 90 = 630.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["expenses"]
    },
    {
        id: "MM_M_092", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Dividend of ₹5 per share. You own 250 shares. Total dividend?", answer: 1250,
        explanation: "250 * 5 = 1250.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["investing"]
    },
    {
        id: "MM_M_093", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "A ₹2 Lakh loan at 10% SI for 3 years. Total interest?", answer: 60000,
        explanation: "200000 * 0.1 * 3 = 60000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["banking"]
    },
    {
        id: "MM_M_094", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Price rises from ₹50 to ₹65. % increase?", answer: 30,
        explanation: "Increase of 15. (15/50) * 100 = 30%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["inflation"]
    },
    {
        id: "MM_M_095", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "You pay ₹3,300 for a ₹3,000 dinner. What % tip did you give?", answer: 10,
        explanation: "Tip is 300. (300/3000) * 100 = 10%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["daily_math"]
    },
    {
        id: "MM_M_096", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Cost of 50 shares at ₹420 each.?", answer: 21000,
        explanation: "50 * 420 = 21000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["investing"]
    },
    {
        id: "MM_M_097", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Markup 50% on ₹1,200. New price?", answer: 1800,
        explanation: "1200 + 600 = 1800.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["profit_loss"]
    },
    {
        id: "MM_M_098", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "If 1 Gram of gold is ₹6,200. How much for 8 Grams?", answer: 49600,
        explanation: "6200 * 8 = 49600.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["commodities"]
    },
    {
        id: "MM_M_099", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Buying ₹5,000 stocks, 0.2% brokerage. Brokerage amount?", answer: 10,
        explanation: "5000 * 0.002 = 10.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["equity"]
    },
    {
        id: "MM_M_100", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "SIP of ₹3,000 monthly for 1 year. Total principal?", answer: 36000,
        explanation: "3000 * 12 = 36000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 12, tags: ["investing"]
    },
    {
        id: "MM_H_001", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "₹10,000 invested at 8% for 10 years CI. Final value = ?", answer: 21589, explanation: "10000 * (1.08^10) approx 21589", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10000 * (1.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_H_002", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "SIP ₹5,000/month for 12 months at 12%. Maturity = ?", answer: 63412, explanation: "Future value of annuity calculation", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Future value of annuity calculation.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_H_003", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Rule of 72: At 9% CI, ₹1L doubles in approx how many years = ?", answer: 8, explanation: "72 / 9 = 8", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 72 / 9 = 8.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_H_004", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Invest ₹2L at 15% for 5 years CI. Profit = ?", answer: 202271, explanation: "Compound profit calculation", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Compound profit calculation.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_H_005", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Buy call at ₹15 premium, strike ₹500. Breakeven price = ?", answer: 515, explanation: "Strike + Premium = 515", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Strike + Premium = 515.",
        timeLimit: 8, tags: ["derivatives"]
    },
    {
        id: "MM_H_006", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Put option premium ₹20, strike ₹300. Max profit if stock goes to ₹0 = ?", answer: 280, explanation: "Strike - Premium = 280", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Strike - Premium = 280.",
        timeLimit: 8, tags: ["derivatives"]
    },
    {
        id: "MM_H_007", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Futures: buy at ₹1,050, sell at ₹1,120. P&L = ?", answer: 70, explanation: "1120 - 1050 = 70", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 1120 - 1050 = 70.",
        timeLimit: 8, tags: ["derivatives"]
    },
    {
        id: "MM_H_008", type: "money_math", topic: "taxation", difficulty: 3, minRating: 1300,
        question: "Income ₹12L. Tax at 20% on amount above ₹10L = ?", answer: 40000, explanation: "2L * 20% = 40000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 2L * 20% = 40000.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_H_009", type: "money_math", topic: "taxation", difficulty: 3, minRating: 1300,
        question: "STCG ₹80,000 at 15% tax. Tax payable = ?", answer: 12000, explanation: "15% of 80000 = 12000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 15% of 80000 = 12000.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_H_010", type: "money_math", topic: "taxation", difficulty: 3, minRating: 1300,
        question: "LTCG ₹1,50,000 (exemption ₹1L). Tax at 10% on excess = ?", answer: 5000, explanation: "Tax on 50000 at 10% = 5000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Tax on 50000 at 10% = 5000.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_H_011", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Price 500, PE 20. Earnings = ?", answer: 25, explanation: "500 / 20 = 25", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 500 / 20 = 25.",
        timeLimit: 8, tags: ["investing"]
    },
    {
        id: "MM_H_012", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "12% of 5000 + 8% of 2500 = ?", answer: 800, explanation: "600 + 200 = 800", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 600 + 200 = 800.",
        timeLimit: 8, tags: ["mental_math"]
    },
    {
        id: "MM_H_013", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Lot size 50. Premium moves 5. Profit = ?", answer: 250, explanation: "50 * 5 = 250", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 50 * 5 = 250.",
        timeLimit: 8, tags: ["derivatives"]
    },
    {
        id: "MM_H_014", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Buy Call 100, Sell Call 110. Net debit 4. Max loss = ?", answer: 4, explanation: "Max loss is net debit paid", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! Max loss is net debit paid.",
        timeLimit: 8, tags: ["derivatives"]
    },
    {
        id: "MM_H_015", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "2 lots of Nifty (50 qty each), 20 points profit. Total = ?", answer: 2000, explanation: "100 * 20 = 2000", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 100 * 20 = 2000.",
        timeLimit: 8, tags: ["derivatives"]
    },
    {
        id: "MM_H_016", type: "money_math", topic: "equity_markets", difficulty: 3, minRating: 1300,
        question: "Dividend yield 2%. Stock price 500. Dividend = ?", answer: 10, explanation: "2% of 500 = 10", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 2% of 500 = 10.",
        timeLimit: 8, tags: ["equity_markets"]
    },
    {
        id: "MM_H_017", type: "money_math", topic: "taxation", difficulty: 3, minRating: 1300,
        question: "GST 18% on ₹10,000 service. Total bill = ?", answer: 11800, explanation: "10000 + 1800 = 11800", feedbackCorrect: "✓ Spot on! The calculation is correct.",
        feedbackWrong: "✗ Close! 10000 + 1800 = 11800.",
        timeLimit: 8, tags: ["taxation"]
    },
    {
        id: "MM_H_018", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
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
        id: "MM_H_021", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Compound Interest on ₹50,000 at 10% for 2 years (compounded annually)?", answer: 10500,
        explanation: "Amount = 50000 * 1.21 = 60500. CI = 10500.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["compound_interest"]
    },
    {
        id: "MM_H_022", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A stock has EPS of ₹45 and PE ratio of 18. Stock price = ?", answer: 810,
        explanation: "Price = EPS * PE = 45 * 18 = 810.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["valuation"]
    },
    {
        id: "MM_H_023", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Market cap is ₹5,000 Cr. Outstanding shares 25 Cr. Share price = ?", answer: 200,
        explanation: "Price = 5000 / 25 = 200.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_024", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "GST inclusive price is ₹1,180 (18% GST). Base price = ?", answer: 1000,
        explanation: "Base = 1180 / 1.18 = 1000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_025", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Dividend yield 4% on CMP of ₹450. DPS = ?", answer: 18,
        explanation: "DPS = 4% of 450 = 18.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_026", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A ₹10L loan at 9% for 1 year. Total payment if interest is SI?", answer: 1090000,
        explanation: "Interest 90,000. Total 10,90,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["banking"]
    },
    {
        id: "MM_H_027", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Option payoff: Long Call at ₹1200 strike, premium ₹40. Price at ₹1280. Profit?", answer: 40,
        explanation: "Intr. Value = 1280 - 1200 = 80. Profit = 80 - 40 = 40.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["derivatives"]
    },
    {
        id: "MM_H_028", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Option payoff: Long Put at ₹500 strike, premium ₹25. Price at ₹450. Profit?", answer: 25,
        explanation: "Intr. Value = 500 - 450 = 50. Profit = 50 - 25 = 25.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["derivatives"]
    },
    {
        id: "MM_H_029", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Rule of 72: How long to quadruple money at 12% CI? (Approx years)", answer: 12,
        explanation: "Doubles in 6 years. Quadruples in 2 * 6 = 12 years.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_030", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A ₹25,000 investment falls 20% then rises 25%. Final value?", answer: 25000,
        explanation: "25000 * 0.8 = 20000. 20000 * 1.25 = 25000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_031", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Buying 2 lots of Nifty (50 qty each). Entry 19200, Exit 19350. Profit?", answer: 15000,
        explanation: "150 points * 100 qty = 15000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["derivatives"]
    },
    {
        id: "MM_H_032", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Taxable income ₹8L. Tax at 5% for ₹2.5-5L and 10% for ₹5-8L. Total tax?", answer: 42500,
        explanation: "12500 + 30000 = 42500.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_033", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Inflation-adjusted return: 15% nominal, 6% inflation. Real return ≈ ?", answer: 9,
        explanation: "Approx 15 - 6 = 9%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_034", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "FD interest 6.5%. TDS at 10% on interest. Net interest rate?", answer: 5.85,
        explanation: "6.5 - (10% of 6.5) = 6.5 - 0.65 = 5.85%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["banking"]
    },
    {
        id: "MM_H_035", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Price to Book (PB) ratio for ₹800 price and ₹250 BVPS?", answer: 3.2,
        explanation: "800 / 250 = 3.2.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["valuation"]
    },
    {
        id: "MM_H_036", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "SIP ₹10,000/mo. Return 1% per month. Total value after 2 months?", answer: 20301,
        explanation: "10000 * 1.01 * 1.01 + 10000 * 1.01 = 10201 + 10100 = 20301.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_037", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Mutual fund Expense Ratio 0.8%. Assets ₹5,000 Cr. Annual fee Cr?", answer: 40,
        explanation: "0.8% of 5000 = 40.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_038", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Gold price ₹60,000/10g. GST 3%. Making charge 5%. Total price for 10g?", answer: 64800,
        explanation: "Making: 3000. Sum: 63000. GST: 3% of 60000 is 1800. Total 64800.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["commodities"]
    },
    {
        id: "MM_H_039", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Short selling 100 shares at ₹450, buying back at ₹410. Profit?", answer: 4000,
        explanation: "(450 - 410) * 100 = 4000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_040", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A bond pays 8% semi-annually. Par ₹1,000. Each coupon payment amount?", answer: 40,
        explanation: "4% of 1000 = 40.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["bonds"]
    },
    {
        id: "MM_H_041", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Dividend Payout Ratio 40%. Net Profit ₹500 Cr. Total Dividend in Cr?", answer: 200,
        explanation: "40% of 500 = 200.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_042", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Total expense ₹24,000 including 20% service charge. Base cost?", answer: 20000,
        explanation: "24000 / 1.2 = 20000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["daily_math"]
    },
    {
        id: "MM_H_043", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "1 lot Bank Nifty (15 qty). Entry ₹44,000, Sell ₹44,800. Profit?", answer: 12000,
        explanation: "800 * 15 = 12000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["derivatives"]
    },
    {
        id: "MM_H_044", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Income ₹10L. 80C deduction ₹1.5L. Health insurance ₹25k. Net taxable income?", answer: 825000,
        explanation: "10,00,000 - 1,50,000 - 25,000 = 8,25,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_045", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Cost of living increases 4% annually. A ₹50,000 lifestyle today costs how much in 5 years? (Approx)", answer: 60833,
        explanation: "50000 * (1.04^5) approx 60833.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["inflation"]
    },
    {
        id: "MM_H_046", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Credit card APR 36%. Monthly interest factor?", answer: 3,
        explanation: "36 / 12 = 3%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["banking"]
    },
    {
        id: "MM_H_047", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A stock split 1:5. Price was ₹1,200. New price?", answer: 240,
        explanation: "1200 / 5 = 240.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_048", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A company has 10 Cr shares. CMP ₹850. Face Value ₹10. Market Cap in Cr?", answer: 8500,
        explanation: "10 * 850 = 8500.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_049", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Buy Call Option at ₹45 premium. Break-even if Strike is ₹1,000?", answer: 1045,
        explanation: "1000 + 45 = 1045.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["derivatives"]
    },
    {
        id: "MM_H_050", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "GST total ₹540 at 18%. Base price?", answer: 3000,
        explanation: "540 is 18% of Base. Base = 540 / 0.18 = 3000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_051", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Capital Gain on ₹2L investment sold for ₹3.5L after 2 years?", answer: 150000,
        explanation: "3.5L - 2L = 1.5L.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_052", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Annual compounding: ₹1L at 12% for 3 years. Interest amount?", answer: 40492,
        explanation: "100000 * (1.12^3 - 1) = 40492.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["compound_interest"]
    },
    {
        id: "MM_H_053", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Beta of a portfolio is 1.2. If market rises 10%, portfolio rises?", answer: 12,
        explanation: "1.2 * 10 = 12%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_054", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "ROI on ₹80k investment yielding ₹12k profit?", answer: 15,
        explanation: "(12/80) * 100 = 15%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_055", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "EPF balance ₹5L. Annual interest 8.15%. Interest earned?", answer: 40750,
        explanation: "500000 * 0.0815 = 40750.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["retirement"]
    },
    {
        id: "MM_H_056", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A car depreciates 15% annually. Value of ₹10L car after 1 year?", answer: 850000,
        explanation: "10,00,000 * 0.85 = 8,50,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["daily_math"]
    },
    {
        id: "MM_H_057", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Personal loan ₹1L, 14% interest for 1 year, zero processing fee. Total repayment?", answer: 114000,
        explanation: "100000 + 14000 = 114000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["banking"]
    },
    {
        id: "MM_H_058", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "LTCG tax 10% on profit above ₹1L. Total LTCG profit ₹4L. Tax?", answer: 30000,
        explanation: "Profit above 1L is 3L. 10% of 3L = 30000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_059", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Dividend ₹2.CMP ₹100. Yield?", answer: 2,
        explanation: "2/100 * 100 = 2%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_060", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Monthly Interest on ₹2L Savings Account at 4% p.a.?", answer: 667,
        explanation: "200000 * 0.04 / 12 = 8000 / 12 approx 667.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["banking"]
    },
    {
        id: "MM_H_061", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A ₹5,000 SIP grew to ₹8.2 Lakhs in 8 years. Total principal invested?", answer: 480000,
        explanation: "5000 * 12 * 8 = 5000 * 96 = 4,80,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_062", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Buying 1 BTC at $30,000, selling at $45,000. Profit in USD?", answer: 15000,
        explanation: "45000 - 30000 = 15000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["crypto"]
    },
    {
        id: "MM_H_063", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Dividend Yield 5% on CMP ₹200. If price rises to ₹250, new yield (if DPS constant)?", answer: 4,
        explanation: "DPS = 10. New yield = (10/250) * 100 = 4%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_064", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A 100-share portfolio split 1:10. New share count?", answer: 1000,
        explanation: "100 * 10 = 1000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_065", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Corporate Tax rate 25%. Profit before tax ₹400 Cr. Net Profit?", answer: 300,
        explanation: "Tax 100. Net Profit 300.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_066", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Property value ₹1 Cr. Rental yield 3%. Monthly rent?", answer: 25000,
        explanation: "Annual 3L. Monthly 3,00,000 / 12 = 25,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["real_estate"]
    },
    {
        id: "MM_H_067", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Price of oil rises from $70 to $91. % rise?", answer: 30,
        explanation: "Rise of 21. (21/70) * 100 = 3/10 * 100 = 30%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["macroeconomics"]
    },
    {
        id: "MM_H_068", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Loan ₹20L, ROI 8.5%, 20 years. Approx total interest is ₹20L. Total repayment?", answer: 4000000,
        explanation: "20L + 20L = 40 Lakhs.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["banking"]
    },
    {
        id: "MM_H_069", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Gold purity 22K (91.6%). Price of 24K is ₹6000/g. Price of 22K/g approx?", answer: 5500,
        explanation: "6000 * 0.916 approx 5496 (rounded to 5500).",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["commodities"]
    },
    {
        id: "MM_H_070", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A bond pays ₹80 coupon on ₹1,000 price. Current yield?", answer: 8,
        explanation: "(80/1000) * 100 = 8%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["bonds"]
    },
    {
        id: "MM_H_071", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Buying 4 lots of Nifty (50 qty each) at 19500. Margin needed 10%? (In Lakhs)", answer: 3.9,
        explanation: "Total value = 200 * 19500 = 39,00,000. 10% margin = 3,90,000 = 3.9L.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["derivatives"]
    },
    {
        id: "MM_H_072", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "An investment of ₹1L doubles every 6 years. Value after 18 years? (In Lakhs)", answer: 8,
        explanation: "3 doublings: 1 -> 2 -> 4 -> 8L.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_073", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Inflation 7% for 2 years. Initial price ₹100. Final price?", answer: 114.49,
        explanation: "100 * 1.07 * 1.07 = 114.49.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["macroeconomics"]
    },
    {
        id: "MM_H_074", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Term insurance ₹1 Cr cover, premium ₹15k/year. If policyholder dies in year 5, payout?", answer: 10000000,
        explanation: "Full sum assured ₹1 Cr.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["insurance"]
    },
    {
        id: "MM_H_075", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Gratuity formula: (15/26) * Last Basic * Years. Basic 50k, 10 years service. Gratuity?", answer: 288461,
        explanation: "0.5769 * 50000 * 10 = 288461.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["retirement"]
    },
    {
        id: "MM_H_076", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Buy Put at ₹30 premium, Strike ₹800. Breakeven Price?", answer: 770,
        explanation: "800 - 30 = 770.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["derivatives"]
    },
    {
        id: "MM_H_077", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Net National Income = NNP at market price - ? (Factor Cost adjustment)", answer: "Indirect Taxes",
        explanation: "NNP at Factor Cost = NNP(MP) - Indirect Taxes + Subsidies.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["macroeconomics"]
    },
    {
        id: "MM_H_078", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Current Ratio for Current Assets ₹5L, Current Liabilities ₹2L.?", answer: 2.5,
        explanation: "5 / 2 = 2.5.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["valuation"]
    },
    {
        id: "MM_H_079", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A business has Debt ₹40L, Equity ₹60L. Debt-to-Equity ratio?", answer: 0.67,
        explanation: "40 / 60 = 2/3 approx 0.67.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["valuation"]
    },
    {
        id: "MM_H_080", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "If you earn ₹1.5L/month, 50-30-20 rule says savings should be?", answer: 30000,
        explanation: "20% of 1.5L = 30000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["budgeting"]
    },
    {
        id: "MM_H_081", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Buying property ₹50L. Stamp duty 6%, Registration 1%. Total govt fees?", answer: 350000,
        explanation: "7% of 50L = 3,50,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["real_estate"]
    },
    {
        id: "MM_H_082", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "ROI on ₹25,000 that grew to ₹32,500 in 1 year?", answer: 30,
        explanation: "(7500 / 25000) * 100 = 3/10 * 100 = 30%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_083", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A company declares 200% dividend on Face Value ₹2. Dividend per share?", answer: 4,
        explanation: "200% of 2 = 4.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["equity"]
    },
    {
        id: "MM_H_084", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Convert 1000 GBP to INR if 1 GBP = ₹105.?", answer: 105000,
        explanation: "1000 * 105 = 1,05,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["currency"]
    },
    {
        id: "MM_H_085", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Price of stock ₹500. Expected Dividend ₹10. Growth rate 5%. Cost of equity (Gordon Model)?", answer: 7,
        explanation: "(10/500) + 0.05 = 0.02 + 0.05 = 7%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["valuation"]
    },
    {
        id: "MM_H_086", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "An FD pays 6% quarterly compounding. Effective Annual Rate (Approx)?", answer: 6.14,
        explanation: "(1 + 0.06/4)^4 - 1 = 1.015^4 - 1 approx 6.14%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["banking"]
    },
    {
        id: "MM_H_087", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Price inclusive of 12% GST is ₹672. GST amount?", answer: 72,
        explanation: "Base = 672 / 1.12 = 600. GST = 72.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_088", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Average cost of 3 shares bought at ₹100, ₹120, ₹140.?", answer: 120,
        explanation: "(100+120+140)/3 = 360/3 = 120.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_089", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A ₹10k credit card bill unpaid for 1 month at 3% monthly interest. Late fee ₹500. Total due?", answer: 10800,
        explanation: "10000 + 300 + 500 = 10800.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["banking"]
    },
    {
        id: "MM_H_090", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "If 10-year G-Sec yield rises from 7% to 7.5%, bond prices will?", answer: "Fall",
        explanation: "Yield and Price have inverse relationship.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["bonds"]
    },
    {
        id: "MM_H_091", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Portfolio: ₹60k equity, ₹40k debt. Equity falls 10%, debt rises 5%. New total?", answer: 96000,
        explanation: "54000 + 42000 = 96000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["investing"]
    },
    {
        id: "MM_H_092", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "A stock has Beta 0. Risk-free rate 6%. Expected return by CAPM?", answer: 6,
        explanation: "Return = 6 + 0 * (Market-6) = 6%.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["valuation"]
    },
    {
        id: "MM_H_093", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "If cash reserve ratio (CRR) is 4.5%, for ₹100 deposit, bank must keep how much with RBI?", answer: 4.5,
        explanation: "4.5% of 100.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["banking"]
    },
    {
        id: "MM_H_094", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Value of Perpetuity: ₹10,000 annually at 10% discount rate?", answer: 100000,
        explanation: "10000 / 0.1 = 1,00,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["valuation"]
    },
    {
        id: "MM_H_095", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "GST total on ₹1L at 18%, shared equally between Center and State. SGST amount?", answer: 9000,
        explanation: "Total 18000. SGST = 9000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_096", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Days Inventory Outstanding (DIO) if COGS ₹12L and Avg Inventory ₹1L.?", answer: 30,
        explanation: "(1/12) * 365 approx 30 days.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["valuation"]
    },
    {
        id: "MM_H_097", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Nifty at 20000. 1 lot call premium ₹200. Total cost of buy?", answer: 10000,
        explanation: "50 qty * 200 premium = 10000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["derivatives"]
    },
    {
        id: "MM_H_098", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Price to Sales ratio for Market Cap ₹1000 Cr and Sales ₹500 Cr.?", answer: 2,
        explanation: "1000 / 500 = 2.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["valuation"]
    },
    {
        id: "MM_H_099", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "If you withdraw ₹1L from PF before 5 years, TDS @ 10% is deducted. Amt received?", answer: 90000,
        explanation: "100000 - 10000 = 90000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["taxation"]
    },
    {
        id: "MM_H_100", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Market Lot for Nifty is 50. Total contract value if Nifty is 20,000?", answer: 1000000,
        explanation: "50 * 20000 = 10,00,000.",
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: 15, tags: ["derivatives"]
    }
];
