import { Question } from './schema';

export const moneyMathQuestions: Question[] = [
    // EASY (Difficulty 1, MinRating 0)
    {
        id: "MM_E_001", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "15% of ₹4,000 = ?", answer: 600, explanation: "10% is 400, 5% is 200. Total = 600", timeLimit: 8
    },
    {
        id: "MM_E_002", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "25% of ₹12,000 = ?", answer: 3000, explanation: "25% is 1/4th. 12000 / 4 = 3000", timeLimit: 8
    },
    {
        id: "MM_E_003", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "10% of ₹85,000 = ?", answer: 8500, explanation: "Remove one zero from the end.", timeLimit: 8
    },
    {
        id: "MM_E_004", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "30% of ₹2,500 = ?", answer: 750, explanation: "10% is 250. 30% is 250 * 3 = 750", timeLimit: 8
    },
    {
        id: "MM_E_005", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "50% of ₹7,400 = ?", answer: 3700, explanation: "Half of 7400 is 3700", timeLimit: 8
    },
    {
        id: "MM_E_006", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "20% of ₹45,000 = ?", answer: 9000, explanation: "10% is 4500. 20% is double that.", timeLimit: 8
    },
    {
        id: "MM_E_007", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "5% of ₹1,00,000 = ?", answer: 5000, explanation: "10% is 10,000. 5% is half of that.", timeLimit: 8
    },
    {
        id: "MM_E_008", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "40% of ₹3,250 = ?", answer: 1300, explanation: "10% is 325. 40% is 325 * 4 = 1300", timeLimit: 8
    },
    {
        id: "MM_E_009", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "75% of ₹8,000 = ?", answer: 6000, explanation: "3/4ths of 8000 is 6000", timeLimit: 8
    },
    {
        id: "MM_E_010", type: "money_math", topic: "mental_math", difficulty: 1, minRating: 0,
        question: "60% of ₹15,000 = ?", answer: 9000, explanation: "50% is 7500, 10% is 1500. Total = 9000", timeLimit: 8
    },
    {
        id: "MM_E_011", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹10,000 at 5% for 1 year = ?", answer: 500, explanation: "SI = P*R*T/100 = 10000*5*1/100", timeLimit: 8
    },
    {
        id: "MM_E_012", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹20,000 at 10% for 2 years = ?", answer: 4000, explanation: "Interest is 20% total. 20% of 20000 = 4000", timeLimit: 8
    },
    {
        id: "MM_E_013", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹50,000 at 8% for 1 year = ?", answer: 4000, explanation: "8% of 50000 = 4000", timeLimit: 8
    },
    {
        id: "MM_E_014", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹1,00,000 at 6% for 3 years = ?", answer: 18000, explanation: "Total rate = 18%. 18% of 1 Lakh is 18000", timeLimit: 8
    },
    {
        id: "MM_E_015", type: "money_math", topic: "banking", difficulty: 1, minRating: 0,
        question: "SI on ₹5,000 at 12% for 2 years = ?", answer: 1200, explanation: "Total rate 24%. 24% of 5000 = 1200", timeLimit: 8
    },
    {
        id: "MM_E_016", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Buy at ₹100, sell at ₹120. Profit % = ?", answer: 20, explanation: "Profit is 20 on base 100", timeLimit: 8
    },
    {
        id: "MM_E_017", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Buy at ₹500, sell at ₹400. Loss % = ?", answer: 20, explanation: "Loss is 100 on base 500. 100/500 = 1/5 = 20%", timeLimit: 8
    },
    {
        id: "MM_E_018", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Buy at ₹200, sell at ₹250. Profit = ?", answer: 50, explanation: "250 - 200 = 50", timeLimit: 8
    },
    {
        id: "MM_E_019", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Buy at ₹1000, sell at ₹800. Loss = ?", answer: 200, explanation: "1000 - 800 = 200", timeLimit: 8
    },
    {
        id: "MM_E_020", type: "money_math", topic: "taxation", difficulty: 1, minRating: 0,
        question: "Cost ₹150, profit 20%. Selling price = ?", answer: 180, explanation: "20% of 150 is 30. 150 + 30 = 180", timeLimit: 8
    },
    {
        id: "MM_E_021", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Invest ₹10,000. Get back ₹11,000. Return % = ?", answer: 10, explanation: "Gain 1000 on 10000 = 10%", timeLimit: 8
    },
    {
        id: "MM_E_022", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Invest ₹5,000. Get back ₹5,500. Return % = ?", answer: 10, explanation: "Gain 500 on 5000 = 10%", timeLimit: 8
    },
    {
        id: "MM_E_023", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "₹2,000 grows to ₹2,500. Gain = ?", answer: 500, explanation: "2500 - 2000 = 500", timeLimit: 8
    },
    {
        id: "MM_E_024", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "Invest ₹50,000. Lose 10%. Remaining = ?", answer: 45000, explanation: "10% loss is 5000. 50000 - 5000 = 45000", timeLimit: 8
    },
    {
        id: "MM_E_025", type: "money_math", topic: "investing", difficulty: 1, minRating: 0,
        question: "₹1,00,000 grows by 15%. New value = ?", answer: 115000, explanation: "15% is 15000. Total 1,15,000", timeLimit: 8
    },
    {
        id: "MM_E_026", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Monthly salary ₹30,000. Annual salary = ?", answer: 360000, explanation: "30000 * 12 = 360000", timeLimit: 8
    },
    {
        id: "MM_E_027", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Spend ₹15,000/month. Annual spend = ?", answer: 180000, explanation: "15000 * 12 = 180000", timeLimit: 8
    },
    {
        id: "MM_E_028", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Save ₹3,000/month for 12 months. Total = ?", answer: 36000, explanation: "3000 * 12 = 36000", timeLimit: 8
    },
    {
        id: "MM_E_029", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "EMI ₹8,000/month for 24 months. Total paid = ?", answer: 192000, explanation: "8000 * 24 = 192000", timeLimit: 8
    },
    {
        id: "MM_E_030", type: "money_math", topic: "personal_finance", difficulty: 1, minRating: 0,
        question: "Electricity bill ₹2,400 for 3 months. Per month = ?", answer: 800, explanation: "2400 / 3 = 800", timeLimit: 8
    },

    // MEDIUM (Difficulty 2, MinRating 1000)
    {
        id: "MM_M_001", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "CI on ₹10,000 at 10% for 2 years (annual) = ?", answer: 12100, explanation: "10000 * 1.1 * 1.1 = 12100", timeLimit: 8
    },
    {
        id: "MM_M_002", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "CI on ₹50,000 at 8% for 2 years = ?", answer: 58320, explanation: "50000 * 1.08 * 1.08 = 58320", timeLimit: 8
    },
    {
        id: "MM_M_003", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "CI on ₹1,00,000 at 12% for 1 year, half-yearly = ?", answer: 112360, explanation: "Effective rate approx 12.36%", timeLimit: 8
    },
    {
        id: "MM_M_004", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Invested ₹20,000. After 3 years at 10% CI, amount = ?", answer: 26620, explanation: "20000 * 1.331 = 26620", timeLimit: 8
    },
    {
        id: "MM_M_005", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "₹10,000 doubles in 7 years at CI. Approx rate = ?", answer: 10, explanation: "Rule of 72: 72/7 approx 10%", timeLimit: 8
    },
    {
        id: "MM_M_006", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Price rises from ₹200 to ₹250. % increase = ?", answer: 25, explanation: "50 increase on 200 base = 25%", timeLimit: 8
    },
    {
        id: "MM_M_007", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Price falls from ₹500 to ₹400. % decrease = ?", answer: 20, explanation: "100 decrease on 500 base = 20%", timeLimit: 8
    },
    {
        id: "MM_M_008", type: "money_math", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Stock was ₹150, now ₹135. % fall = ?", answer: 10, explanation: "15 fall on 150 = 10%", timeLimit: 8
    },
    {
        id: "MM_M_009", type: "money_math", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Salary was ₹40,000, hiked to ₹46,000. % hike = ?", answer: 15, explanation: "6000 hike on 40000 = 15%", timeLimit: 8
    },
    {
        id: "MM_M_010", type: "money_math", topic: "personal_finance", difficulty: 2, minRating: 1000,
        question: "Revenue was ₹10L, now ₹8L. % decline = ?", answer: 20, explanation: "2L decline on 10L = 20%", timeLimit: 8
    },
    {
        id: "MM_M_011", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Invest ₹60,000 in A and ₹40,000 in B. A's weight % = ?", answer: 60, explanation: "Total 100k. 60k/100k = 60%", timeLimit: 8
    },
    {
        id: "MM_M_012", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Port returns: A +20%, B -10%, equal weight. Net % = ?", answer: 5, explanation: "Average of +20 and -10 is +5", timeLimit: 8
    },
    {
        id: "MM_M_013", type: "money_math", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Buy 50 shares at ₹200. Sell all at ₹240. Profit = ?", answer: 2000, explanation: "50 * 40 = 2000", timeLimit: 8
    },
    {
        id: "MM_M_014", type: "money_math", topic: "equity_markets", difficulty: 2, minRating: 1000,
        question: "Buy 100 shares at ₹150. Brokerage 1%. Total cost = ?", answer: 15150, explanation: "Cost 15000 + 150 brokerage = 15150", timeLimit: 8
    },
    {
        id: "MM_M_015", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Invest ₹25,000 at 15% p.a. for 2 years CI. Profit = ?", answer: 8062.5, explanation: "25000 * (1.15^2 - 1) = 8062.5", timeLimit: 8
    },
    {
        id: "MM_M_016", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "₹10,000 grows to ₹14,641 in 4 years. CAGR = ?", answer: 10, explanation: "1.1^4 = 1.4641, so 10%", timeLimit: 8
    },
    {
        id: "MM_M_017", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "₹1,00,000 becomes ₹1,21,000 in 2 years. CAGR = ?", answer: 10, explanation: "Square root of 1.21 is 1.1, so 10%", timeLimit: 8
    },
    {
        id: "MM_M_018", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "₹50,000 grows to ₹72,900 in 3 years. CAGR = ?", answer: 13.4, explanation: "Approx 13.4%", timeLimit: 8
    },
    {
        id: "MM_M_019", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Nominal return 12%, inflation 7%. Real return ≈ ?", answer: 5, explanation: "Approx 12 - 7 = 5%", timeLimit: 8
    },
    {
        id: "MM_M_020", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "FD returns 6%, inflation 4.5%. Real return ≈ ?", answer: 1.5, explanation: "Approx 6 - 4.5 = 1.5%", timeLimit: 8
    },
    {
        id: "MM_M_021", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "Loan ₹5L, 10% p.a., 5 years. Total interest approx = ?", answer: 137500, explanation: "Using EMI calculators, approx total interest.", timeLimit: 8
    },
    {
        id: "MM_M_022", type: "money_math", topic: "banking", difficulty: 2, minRating: 1000,
        question: "EMI ₹15,000/month for 3 years at 12%. Principal approx = ?", answer: 450000, explanation: "Back calculation from EMI", timeLimit: 8
    },
    {
        id: "MM_M_023", type: "money_math", topic: "investing", difficulty: 2, minRating: 1000,
        question: "Rule of 72: Rate 8%. Years to double = ?", answer: 9, explanation: "72 / 8 = 9", timeLimit: 8
    },
    {
        id: "MM_M_024", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "10% of 250 + 20% of 500 = ?", answer: 125, explanation: "25 + 100 = 125", timeLimit: 8
    },
    {
        id: "MM_M_025", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "50% of 60 + 25% of 40 = ?", answer: 40, explanation: "30 + 10 = 40", timeLimit: 8
    },
    {
        id: "MM_M_026", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "15% of 2000 - 5% of 2000 = ?", answer: 200, explanation: "10% of 2000 = 200", timeLimit: 8
    },
    {
        id: "MM_M_027", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "1/5th of 5000 + 1/2 of 1000 = ?", answer: 1500, explanation: "1000 + 500 = 1500", timeLimit: 8
    },
    {
        id: "MM_M_028", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "Square of 12 + Square of 5 = ?", answer: 169, explanation: "144 + 25 = 169", timeLimit: 8
    },
    {
        id: "MM_M_029", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "20 * 15 + 100 = ?", answer: 400, explanation: "300 + 100 = 400", timeLimit: 8
    },
    {
        id: "MM_M_030", type: "money_math", topic: "mental_math", difficulty: 2, minRating: 1000,
        question: "1000 / 4 * 2 = ?", answer: 500, explanation: "250 * 2 = 500", timeLimit: 8
    },

    // HARD (Difficulty 3, MinRating 1300)
    {
        id: "MM_H_001", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "₹10,000 invested at 8% for 10 years CI. Final value = ?", answer: 21589, explanation: "10000 * (1.08^10) approx 21589", timeLimit: 8
    },
    {
        id: "MM_H_002", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "SIP ₹5,000/month for 12 months at 12%. Maturity = ?", answer: 63412, explanation: "Future value of annuity calculation", timeLimit: 8
    },
    {
        id: "MM_H_003", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Rule of 72: At 9% CI, ₹1L doubles in approx how many years = ?", answer: 8, explanation: "72 / 9 = 8", timeLimit: 8
    },
    {
        id: "MM_H_004", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Invest ₹2L at 15% for 5 years CI. Profit = ?", answer: 202271, explanation: "Compound profit calculation", timeLimit: 8
    },
    {
        id: "MM_H_005", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Buy call at ₹15 premium, strike ₹500. Breakeven price = ?", answer: 515, explanation: "Strike + Premium = 515", timeLimit: 8
    },
    {
        id: "MM_H_006", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Put option premium ₹20, strike ₹300. Max profit if stock goes to ₹0 = ?", answer: 280, explanation: "Strike - Premium = 280", timeLimit: 8
    },
    {
        id: "MM_H_007", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Futures: buy at ₹1,050, sell at ₹1,120. P&L = ?", answer: 70, explanation: "1120 - 1050 = 70", timeLimit: 8
    },
    {
        id: "MM_H_008", type: "money_math", topic: "taxation", difficulty: 3, minRating: 1300,
        question: "Income ₹12L. Tax at 20% on amount above ₹10L = ?", answer: 40000, explanation: "2L * 20% = 40000", timeLimit: 8
    },
    {
        id: "MM_H_009", type: "money_math", topic: "taxation", difficulty: 3, minRating: 1300,
        question: "STCG ₹80,000 at 15% tax. Tax payable = ?", answer: 12000, explanation: "15% of 80000 = 12000", timeLimit: 8
    },
    {
        id: "MM_H_010", type: "money_math", topic: "taxation", difficulty: 3, minRating: 1300,
        question: "LTCG ₹1,50,000 (exemption ₹1L). Tax at 10% on excess = ?", answer: 5000, explanation: "Tax on 50000 at 10% = 5000", timeLimit: 8
    },
    {
        id: "MM_H_011", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "Price 500, PE 20. Earnings = ?", answer: 25, explanation: "500 / 20 = 25", timeLimit: 8
    },
    {
        id: "MM_H_012", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "12% of 5000 + 8% of 2500 = ?", answer: 800, explanation: "600 + 200 = 800", timeLimit: 8
    },
    {
        id: "MM_H_013", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Lot size 50. Premium moves 5. Profit = ?", answer: 250, explanation: "50 * 5 = 250", timeLimit: 8
    },
    {
        id: "MM_H_014", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "Buy Call 100, Sell Call 110. Net debit 4. Max loss = ?", answer: 4, explanation: "Max loss is net debit paid", timeLimit: 8
    },
    {
        id: "MM_H_015", type: "money_math", topic: "derivatives", difficulty: 3, minRating: 1300,
        question: "2 lots of Nifty (50 qty each), 20 points profit. Total = ?", answer: 2000, explanation: "100 * 20 = 2000", timeLimit: 8
    },
    {
        id: "MM_H_016", type: "money_math", topic: "equity_markets", difficulty: 3, minRating: 1300,
        question: "Dividend yield 2%. Stock price 500. Dividend = ?", answer: 10, explanation: "2% of 500 = 10", timeLimit: 8
    },
    {
        id: "MM_H_017", type: "money_math", topic: "taxation", difficulty: 3, minRating: 1300,
        question: "GST 18% on ₹10,000 service. Total bill = ?", answer: 11800, explanation: "10000 + 1800 = 11800", timeLimit: 8
    },
    {
        id: "MM_H_018", type: "money_math", topic: "investing", difficulty: 3, minRating: 1300,
        question: "XIRR approx for 10% return monthly? ~ ?", answer: 21, explanation: "Monthly compounding effect", timeLimit: 8
    },
    {
        id: "MM_H_019", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "Cube of 6 = ?", answer: 216, explanation: "6 * 6 * 6 = 216", timeLimit: 8
    },
    {
        id: "MM_H_020", type: "money_math", topic: "mental_math", difficulty: 3, minRating: 1300,
        question: "250 * 40 / 100 = ?", answer: 100, explanation: "25 * 4 = 100", timeLimit: 8
    }
];
