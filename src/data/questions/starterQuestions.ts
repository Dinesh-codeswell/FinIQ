import { Question } from './schema';

export const starterQuestions: Question[] = [
    // PART A: 40 STARTER MONEY MATH QUESTIONS (ST_MM_001 to ST_MM_040)
    { id: "ST_MM_001", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You buy a coffee for ₹100 and pay with ₹500. Change = ?", answer: 400, explanation: "₹500 − ₹100 = ₹400. Always calculate your change before leaving the counter!" },
    { id: "ST_MM_002", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You spend ₹200 on Monday and ₹300 on Tuesday. Total spend = ?", answer: 500, explanation: "₹200 + ₹300 = ₹500. Tracking daily spending is the first step to saving money." },
    { id: "ST_MM_003", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "A meal costs ₹150. You eat out 4 times this week. Total food cost = ?", answer: 600, explanation: "₹150 × 4 = ₹600. Small recurring expenses add up fast over a month." },
    { id: "ST_MM_004", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You earn ₹10,000 this month and spend ₹7,000. How much did you save?", answer: 3000, explanation: "₹10,000 − ₹7,000 = ₹3,000. Savings = Income − Expenses. That's personal finance in one formula." },
    { id: "ST_MM_005", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You split a ₹1,000 dinner bill equally among 4 friends. Your share = ?", answer: 250, explanation: "₹1,000 ÷ 4 = ₹250. Splitting bills fairly keeps friendships intact and wallets honest." },
    { id: "ST_MM_006", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "A ₹500 book is on sale for ₹50 off. Sale price = ?", answer: 450, explanation: "₹500 − ₹50 = ₹450. Discounts reduce the marked price by a fixed amount." },
    { id: "ST_MM_007", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You save ₹500 every week. After 4 weeks, total savings = ?", answer: 2000, explanation: "₹500 × 4 = ₹2,000. Even small regular savings build a meaningful cushion over time." },
    { id: "ST_MM_008", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "Groceries cost ₹2,000 per month. Annual grocery bill = ?", answer: 24000, explanation: "₹2,000 × 12 = ₹24,000. Multiplying monthly costs by 12 reveals your true yearly spending." },
    { id: "ST_MM_009", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You have ₹5,000 and spend ₹1,500. Remaining = ?", answer: 3500, explanation: "₹5,000 − ₹1,500 = ₹3,500. Knowing your balance after spending is basic financial awareness." },
    { id: "ST_MM_010", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You buy 5 notebooks at ₹20 each. Total cost = ?", answer: 100, explanation: "₹20 × 5 = ₹100. Unit price × quantity = total cost. Works for everything from groceries to stocks." },
    { id: "ST_MM_011", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "10% of ₹1,000 = ?", answer: 100, explanation: "10% of any number = move the decimal one place left. ₹1,000 → ₹100. Simple rule to remember always." },
    { id: "ST_MM_012", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "50% of ₹500 = ?", answer: 250, explanation: "50% means half. ₹500 ÷ 2 = ₹250. Half-price sales work on this exact math." },
    { id: "ST_MM_013", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "10% of ₹5,000 = ?", answer: 500, explanation: "10% of ₹5,000 = ₹500. If your FD earns 10% annually on ₹5,000, you get ₹500 extra." },
    { id: "ST_MM_014", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "10% of ₹10,000 = ?", answer: 1000, explanation: "10% = ₹1,000. A 10% salary hike on ₹10,000 means ₹1,000 more per month." },
    { id: "ST_MM_015", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "50% of ₹10,000 = ?", answer: 5000, explanation: "₹10,000 ÷ 2 = ₹5,000. Investing 50% of your income is an ambitious but powerful savings goal." },
    { id: "ST_MM_016", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "25% of ₹1,000 = ?", answer: 250, explanation: "25% = one quarter. ₹1,000 ÷ 4 = ₹250. Knowing fractions of your money helps you budget better." },
    { id: "ST_MM_017", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "20% of ₹500 = ?", answer: 100, explanation: "20% = one-fifth. ₹500 ÷ 5 = ₹100. A 20% discount on ₹500 saves you ₹100." },
    { id: "ST_MM_018", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "10% of ₹50,000 = ?", answer: 5000, explanation: "10% of ₹50,000 = ₹5,000. A 10% down payment on ₹50,000 item = ₹5,000 upfront." },
    { id: "ST_MM_019", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "50% of ₹1,00,000 = ?", answer: 50000, explanation: "Half of ₹1 lakh = ₹50,000. Knowing fractions of large numbers helps with monthly planning." },
    { id: "ST_MM_020", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "25% of ₹10,000 = ?", answer: 2500, explanation: "₹10,000 ÷ 4 = ₹2,500. If your ₹10,000 investment grows 25%, you earn ₹2,500 extra." },
    { id: "ST_MM_021", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You buy a phone for ₹10,000 and sell for ₹12,000. Profit = ?", answer: 2000, explanation: "Profit = Selling price − Cost price. ₹12,000 − ₹10,000 = ₹2,000. You came out ahead!" },
    { id: "ST_MM_022", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You lend a friend ₹1,000. They return ₹1,100. Extra you earned = ?", answer: 100, explanation: "₹1,100 − ₹1,000 = ₹100. That ₹100 extra is essentially the 'return' on your loan." },
    { id: "ST_MM_023", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You put ₹5,000 in a savings account. After a year, you have ₹5,500. Interest earned = ?", answer: 500, explanation: "₹5,500 − ₹5,000 = ₹500 earned as interest. That's a 10% annual return on your savings." },
    { id: "ST_MM_024", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You invest ₹1,000. It grows to ₹1,500. How much did it grow by?", answer: 500, explanation: "₹1,500 − ₹1,000 = ₹500 growth. Tracking growth in rupee terms is the simplest return measure." },
    { id: "ST_MM_025", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You buy a TV for ₹20,000 and sell for ₹15,000. Loss = ?", answer: 5000, explanation: "₹20,000 − ₹15,000 = ₹5,000 loss. Most electronics lose value over time." },
    { id: "ST_MM_026", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "Save ₹1,000/month for 5 months. Total savings = ?", answer: 5000, explanation: "₹1,000 × 5 = ₹5,000. Consistent saving, even small amounts, creates a meaningful fund." },
    { id: "ST_MM_027", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "Your salary is ₹20,000. You save ₹5,000 this month. How much did you spend?", answer: 15000, explanation: "₹20,000 − ₹5,000 = ₹15,000 spent. Savings first, spending second is the ideal order." },
    { id: "ST_MM_028", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You get a ₹2,000 bonus. You spend ₹500 and save the rest. Saved = ?", answer: 1500, explanation: "₹2,000 − ₹500 = ₹1,500 saved. Saving most of unexpected income is a great wealth habit." },
    { id: "ST_MM_029", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "A jacket costs ₹2,000. It's discounted by ₹500. New price = ?", answer: 1500, explanation: "₹2,000 − ₹500 = ₹1,500. Fixed amount discounts directly reduce the price by that amount." },
    { id: "ST_MM_030", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You earn ₹500 interest on ₹5,000 kept in bank for 1 year. How much total do you have?", answer: 5500, explanation: "₹5,000 + ₹500 = ₹5,500. Total = Original amount + Interest. Your money grew by doing nothing." },
    { id: "ST_MM_031", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You pay ₹1,000/month for a loan. After 6 months, total paid = ?", answer: 6000, explanation: "₹1,000 × 6 = ₹6,000. Monthly payment × number of months = total amount paid." },
    { id: "ST_MM_032", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "Monthly expenses: Rent ₹5,000, Food ₹2,000, Travel ₹1,000. Total = ?", answer: 8000, explanation: "₹5,000 + ₹2,000 + ₹1,000 = ₹8,000. A basic monthly budget tracks all your expense categories." },
    { id: "ST_MM_033", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You earn ₹15,000 and your rent is ₹5,000. Rent takes what fraction of income?", answer: 0.33, explanation: "₹5,000 ÷ ₹15,000 ≈ 1/3 of income on rent. Keeping rent below 30% is a common goal." },
    { id: "ST_MM_034", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "Monthly payment is ₹2,000 for 12 months. Total repaid = ?", answer: 24000, explanation: "₹2,000 × 12 = ₹24,000 total repaid. If you borrowed ₹20,000, you paid ₹4,000 extra as interest." },
    { id: "ST_MM_035", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "Your phone bill is ₹500/month. Annual phone bill = ?", answer: 6000, explanation: "₹500 × 12 = ₹6,000/year. Seeing annual costs makes you evaluate subscriptions more carefully." },
    { id: "ST_MM_036", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You have ₹10,000 budget. Spent ₹3,000 in week 1. Remaining for rest of the month = ?", answer: 7000, explanation: "₹10,000 − ₹3,000 = ₹7,000 left. Tracking spend against a budget prevents month-end surprises." },
    { id: "ST_MM_037", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "Subscription costs ₹150/month. Yearly cost = ?", answer: 1800, explanation: "₹150 × 12 = ₹1,800/year. Small monthly charges can add up to significant annual costs." },
    { id: "ST_MM_038", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You borrow ₹5,000 from a friend and pay back ₹500/month. Paid back in how many months?", answer: 10, explanation: "₹5,000 ÷ ₹500 = 10 months. Dividing total debt by monthly payment tells you your payoff timeline." },
    { id: "ST_MM_039", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "Salary ₹25,000. Tax deducted ₹2,500. In-hand salary = ?", answer: 22500, explanation: "₹25,000 − ₹2,500 = ₹22,500 take-home. Your total pay and in-hand salary differ because of deductions." },
    { id: "ST_MM_040", type: "money_math", topic: "mental_math", difficulty: 0, isStarter: true, confidenceTag: "quick_win", minRating: 0, timeLimit: 10, question: "You spend ₹100/day on average. Monthly spend (30 days) = ?", answer: 3000, explanation: "₹100 × 30 = ₹3,000/month. Daily spending habits define your monthly financial picture." },

    // PART B: 40 STARTER TRUE/FALSE QUESTIONS (ST_TF_001 to ST_TF_040)
    { id: "ST_TF_001", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Saving money every month helps you build financial security.", answer: "TRUE", explanation: "Consistent saving creates a buffer for emergencies and a foundation for future plans." },
    { id: "ST_TF_002", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "You need a lot of money to start saving.", answer: "FALSE", explanation: "You can start saving with as little as ₹100/month. The habit matters far more than the amount." },
    { id: "ST_TF_003", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "A bank account is safer than keeping large amounts of cash at home.", answer: "TRUE", explanation: "Bank deposits are protected. Large cash at home risks theft, fire, or loss." },
    { id: "ST_TF_004", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Keeping cash under your mattress is a safe way to store money.", answer: "FALSE", explanation: "Cash at home has no protection and loses value over time as prices of things rise." },
    { id: "ST_TF_005", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Spending less than you earn is the first rule of personal finance.", answer: "TRUE", explanation: "Living below your means is the foundation every financial expert agrees on." },
    { id: "ST_TF_006", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "A credit card is the same as free money.", answer: "FALSE", explanation: "A credit card is a short-term loan. Unpaid balances attract high interest charges." },
    { id: "ST_TF_007", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "If you borrow money, you usually have to pay back more than you borrowed.", answer: "TRUE", explanation: "The extra amount you pay back is called interest — the cost of borrowing money." },
    { id: "ST_TF_008", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Rich people don't need to budget.", answer: "FALSE", explanation: "Many wealthy people budget carefully. Budgeting is how you stay wealthy, not just how you get there." },
    { id: "ST_TF_009", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "A credit card lets you buy now and pay later.", answer: "TRUE", explanation: "Credit cards provide short-term loans. Pay in full by due date to avoid extra charges." },
    { id: "ST_TF_010", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "If a product is expensive, it's always better quality.", answer: "FALSE", explanation: "Price doesn't always equal quality. Comparing reviews is smarter than assuming price = quality." },
    { id: "ST_TF_011", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Prices of most things tend to rise over time.", answer: "TRUE", explanation: "This is called inflation. ₹100 today buys less than ₹100 did 10 years ago." },
    { id: "ST_TF_012", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Taking a loan is always a bad financial decision.", answer: "FALSE", explanation: "Loans for productive things like education or property can be smart when managed well." },
    { id: "ST_TF_013", type: "true_false", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Investing money can help it grow faster than keeping it idle.", answer: "TRUE", explanation: "Idle money loses value. Investments in FDs or funds can grow faster than inflation." },
    { id: "ST_TF_014", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "You only need to think about retirement when you're 50.", answer: "FALSE", explanation: "Starting retirement savings at 25 vs 50 can mean much more money saved due to time." },
    { id: "ST_TF_015", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "You should read what you're signing before taking a loan.", answer: "TRUE", explanation: "Loan agreements contain terms about interest and repayment — always read them." },
    { id: "ST_TF_016", type: "true_false", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "All investments are equally risky.", answer: "FALSE", explanation: "FDS carry very low risk. Stocks carry high risk. Risk varies greatly." },
    { id: "ST_TF_017", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Having an emergency fund helps you avoid taking loans during a crisis.", answer: "TRUE", explanation: "Experts recommend 3-6 months of expenses saved as an emergency fund." },
    { id: "ST_TF_018", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Banks give you free money when you open an account.", answer: "FALSE", explanation: "Banks pay interest on deposits, but only on the amount saved and only while it's with them." },
    { id: "ST_TF_019", type: "true_false", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Starting to save at a young age gives your money more time to grow.", answer: "TRUE", explanation: "The earlier you start, the longer your money has to grow. Time is a powerful tool." },
    { id: "ST_TF_020", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Winning a lot of money means you'll never have financial problems.", answer: "FALSE", explanation: "Many lottery winners go broke. Managing money is a skill, not just about the amount." },
    { id: "ST_TF_021", type: "true_false", topic: "insurance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Insurance helps you cover large unexpected expenses.", answer: "TRUE", explanation: "Health or life insurance protects you from major events for a small regular cost." },
    { id: "ST_TF_022", type: "true_false", topic: "insurance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Insurance is a waste of money if you don't make a claim.", answer: "FALSE", explanation: "Insurance is buying peace of mind. Not claiming means you were lucky, not that you wasted money." },
    { id: "ST_TF_023", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Your income minus your expenses equals your savings.", answer: "TRUE", explanation: "Savings = Income − Expenses. This is the starting point of financial planning." },
    { id: "ST_TF_024", type: "true_false", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "The stock market always goes up in the short term.", answer: "FALSE", explanation: "Stocks can fall significantly in the short term. Long-term trends are usually upward." },
    { id: "ST_TF_025", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "A shop selling something for 50% off means you pay half the price.", answer: "TRUE", explanation: "50% off = half price. A ₹1,000 item at 50% off costs ₹500." },
    { id: "ST_TF_026", type: "true_false", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "You should always withdraw all your money if the stock market falls.", answer: "FALSE", explanation: "Selling during a fall locks in your losses. Markets historically recover over time." },
    { id: "ST_TF_027", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Paying your bills on time helps maintain a good credit history.", answer: "TRUE", explanation: "Timely payments are the biggest factor in building a strong credit reputation." },
    { id: "ST_TF_028", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Splitting a restaurant bill equally is the only fair way.", answer: "FALSE", explanation: "Fairness depends on what each person ordered. Equal splitting is just one option." },
    { id: "ST_TF_029", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Comparing prices before buying can save you money.", answer: "TRUE", explanation: "Price comparison is one of the easiest ways to spend less for the same thing." },
    { id: "ST_TF_030", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "A zero bank balance is fine as long as you have a credit card.", answer: "FALSE", explanation: "Over-relying on credit leads to debt. A savings buffer is always safer." },
    { id: "ST_TF_031", type: "true_false", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Compound interest means you earn interest on your interest.", answer: "TRUE", explanation: "Your interest gets added to your total, and next time you earn interest on the larger amount." },
    { id: "ST_TF_032", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "If something is on monthly payments (EMI), it's affordable for you.", answer: "FALSE", explanation: "Payments can stretch beyond your means. Always check if total payments fit your budget." },
    { id: "ST_TF_033", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Spending money on things that lose value (like electronics) is higher risk than on things that grow (like property).", answer: "TRUE", explanation: "Electronics lose value quickly. Borrowing to buy them means you owe money on something worth less each day." },
    { id: "ST_TF_034", type: "true_false", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Bigger loans always have smaller interest rates.", answer: "FALSE", explanation: "Interest rates depend on the type of loan and your credit score, not necessarily the loan size." },
    { id: "ST_TF_035", type: "true_false", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Diversifying means not putting all your money in one place.", answer: "TRUE", explanation: "Spreading money across different assets reduces the risk of losing everything if one fails." },
    { id: "ST_TF_036", type: "true_false", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "You can trust any investment that promises guaranteed high returns.", answer: "FALSE", explanation: "Guaranteed high returns are a major warning sign. High returns always come with higher risk." },
    { id: "ST_TF_037", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "A higher salary doesn't automatically mean more savings.", answer: "TRUE", explanation: "Expenses often rise with income. Savings depend on your habits, not just your income size." },
    { id: "ST_TF_038", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Your salary is the only measure of your financial health.", answer: "FALSE", explanation: "Net worth, savings rate, and debt level matter more than salary for true financial health." },
    { id: "ST_TF_039", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "Tracking your spending helps you understand where your money goes.", answer: "TRUE", explanation: "Most people underestimate certain costs until they write them down. Awareness is the first step." },
    { id: "ST_TF_040", type: "true_false", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "common_sense", minRating: 0, timeLimit: 7, question: "It's impossible to save money when your salary is low.", answer: "FALSE", explanation: "Saving even a small part of any income builds the habit. The amount grows as your income does." },

    // PART C: 40 STARTER SCENARIO MCQ QUESTIONS (ST_MCQ_001 to ST_MCQ_040)
    {
        id: "ST_MCQ_001", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "You want to buy a phone worth ₹30,000 but only have ₹15,000. What's the smartest first step?",
        options: ["Save more money until you can afford it", "Immediately take a credit card loan", "Buy it anyway and worry later", "Ask your boss for a ₹30,000 advance"],
        answer: "Save more money until you can afford it",
        explanation: "Saving up avoids debt and interest costs. Patience is a financial superpower."
    },
    {
        id: "ST_MCQ_002", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "You get ₹10,000 as a Diwali bonus. What should you do FIRST?",
        options: ["Spend it all on shopping — it's a bonus!", "Set aside some for savings or an emergency fund first", "Lend it to a friend", "Convert it all to cash and keep at home"],
        answer: "Set aside some for savings or an emergency fund first",
        explanation: "Unexpected income is a great opportunity to build savings. Spend what's left, not the other way round."
    },
    {
        id: "ST_MCQ_003", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Two shops sell the same bag — Shop A for ₹800, Shop B for ₹650. What's the smart choice?",
        options: ["Buy from Shop A — it must be better quality", "Buy from Shop B — same product, lower price", "Don't buy at all", "Flip a coin"],
        answer: "Buy from Shop B — same product, lower price",
        explanation: "If the product is identical, always pay less. Comparing prices is basic smart spending."
    },
    {
        id: "ST_MCQ_004", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Your monthly expenses are ₹15,000 but your salary is ₹12,000. What's the problem?",
        options: ["Your salary is too high", "You are spending more than you earn — this creates debt", "Your expenses are perfectly fine", "You need to work fewer hours"],
        answer: "You are spending more than you earn — this creates debt",
        explanation: "Spending more than you earn means borrowing or using up savings — unsustainable over time."
    },
    {
        id: "ST_MCQ_005", type: "scenario_mcq", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "A friend offers you high returns guaranteed in just 1 month. You should:",
        options: ["Invest everything immediately — this is a great deal", "Be very suspicious — guaranteed high returns are a major warning sign", "Tell all your family to invest too", "Ask for even higher returns"],
        answer: "Be very suspicious — guaranteed high returns are a major warning sign",
        explanation: "Guaranteed high returns in a short time are almost always scams. If it sounds too good to be true, it is."
    },
    {
        id: "ST_MCQ_006", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "You have ₹50,000 saved. An essential repair costs ₹20,000. You should:",
        options: ["Take a personal loan immediately", "Use your savings — this is what an emergency fund is for", "Ignore the repair", "Ask your employer for a salary advance"],
        answer: "Use your savings — this is what an emergency fund is for",
        explanation: "Emergency funds exist for exactly this — unexpected essential costs. Using savings beats paying loan interest."
    },
    {
        id: "ST_MCQ_007", type: "scenario_mcq", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Which is the best way to avoid forgetting to pay your credit card bill?",
        options: ["Hope you remember each month", "Set up an automatic payment or calendar reminder", "Stop using the credit card entirely", "Pay only when the bank calls you"],
        answer: "Set up an automatic payment or calendar reminder",
        explanation: "Automation removes the chance of human error. One missed payment can hurt your credit reputation."
    },
    {
        id: "ST_MCQ_008", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Your monthly income is ₹20,000. How much should you ideally save at minimum?",
        options: ["₹0 — spend everything", "At least ₹2,000 (10%) — start small and build the habit", "₹19,000 — save almost everything", "Whatever is left after fun spending"],
        answer: "At least ₹2,000 (10%) — start small and build the habit",
        explanation: "10% is a classic starting savings rule. The habit matters more than the amount at this stage."
    },
    {
        id: "ST_MCQ_009", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "You want to buy something costing ₹5,000 but have only ₹3,000. Which option costs the least total?",
        options: ["Buy on credit card with high interest", "Take a personal loan", "Save the remaining ₹2,000 over 2 months and pay cash", "Ask for a discount"],
        answer: "Save the remaining ₹2,000 over 2 months and pay cash",
        explanation: "Paying cash after saving means zero interest. Every loan option costs more than the original price."
    },
    {
        id: "ST_MCQ_010", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Which habit best helps you know if you're overspending?",
        options: ["Checking your bank balance once a year", "Tracking your spending every week", "Spending until your account is empty", "Asking a friend to guess"],
        answer: "Tracking your spending every week",
        explanation: "Weekly tracking gives you real-time awareness and allows small corrections before problems grow large."
    },
    {
        id: "ST_MCQ_011", type: "scenario_mcq", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Choosing between keeping large cash at home or putting it in a bank Fixed Deposit (FD):",
        options: ["Cash at home is better — you can see it", "Bank FD is better — it's safer and earns interest", "Both are exactly the same", "Keep half in cash and hide the other half"],
        answer: "Bank FD is better — it's safer and earns interest",
        explanation: "Bank deposits are protected and help your money grow. Cash at home risks loss and earns nothing."
    },
    {
        id: "ST_MCQ_012", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "When deciding whether to buy a house or rent one, what's a key factor?",
        options: ["Buying is always better for everyone", "Renting is always a waste of money", "Compare your monthly budget and how long you plan to stay", "Ask your neighbor what they did"],
        answer: "Compare your monthly budget and how long you plan to stay",
        explanation: "The right choice depends on your specific financial situation and future plans, not a single rule."
    },
    {
        id: "ST_MCQ_013", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "A friend is pressuring you to join a 'wealth club' that requires ₹5,000 and recruiting others. You should:",
        options: ["Join immediately — friends know best", "Be careful — this sounds like a pyramid scheme which is risky and often illegal", "Invest ₹10,000 instead", "Wait until next week"],
        answer: "Be careful — this sounds like a pyramid scheme which is risky and often illegal",
        explanation: "If an 'investment' relies on recruiting people rather than selling a product, it's a major warning sign."
    },
    {
        id: "ST_MCQ_014", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "On a salary slip, what is the difference between 'Gross Pay' and 'Net Pay'?",
        options: ["Gross is what you take home, Net is total before taxes", "Net is what you take home, Gross is total before taxes", "They are exactly the same", "Gross is for managers, Net is for others"],
        answer: "Net is what you take home, Gross is total before taxes",
        explanation: "Net pay (take-home) is Gross pay minus deductions like taxes or insurance."
    },
    {
        id: "ST_MCQ_015", type: "scenario_mcq", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "When comparing two loans, which one is generally better for you?",
        options: ["The one with the higher interest rate", "The one with the lower total cost of repayment", "The one from a bigger bank", "The one with the longest name"],
        answer: "The one with the lower total cost of repayment",
        explanation: "Always look at the total amount you'll pay back, including all interest and fees."
    },
    {
        id: "ST_MCQ_016", type: "scenario_mcq", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What does it mean when a bank says your FD will earn 6% per year?",
        options: ["You get 6 rupees back total", "You earn 6 extra rupees for every ₹100 you deposit, every year", "You must pay the bank ₹6 every year", "You can only withdraw 6% of your money"],
        answer: "You earn 6 extra rupees for every ₹100 you deposit, every year",
        explanation: "6% per year means ₹6 earned per ₹100 deposited annually. On ₹10,000, that's ₹600 extra."
    },
    {
        id: "ST_MCQ_017", type: "scenario_mcq", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What is a 'loan'?",
        options: ["Free money given by the government", "Money you borrow and must repay with extra charges", "A type of investment that grows", "Money your employer gives as a gift"],
        answer: "Money you borrow and must repay with extra charges",
        explanation: "A loan is borrowed money. You repay the original amount plus interest (the borrowing cost)."
    },
    {
        id: "ST_MCQ_018", type: "scenario_mcq", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Why do banks pay you interest on savings?",
        options: ["Because they feel generous", "Because they use your money to give loans to others and share some profit with you", "It's a government rule for customers only", "Banks don't actually pay interest"],
        answer: "Because they use your money to give loans to others and share some profit with you",
        explanation: "Banks take deposits, lend at higher rates, and share some of that as interest to you."
    },
    {
        id: "ST_MCQ_019", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What does 'spending within your means' mean?",
        options: ["Only buying expensive things", "Spending only what you can afford without going into debt", "Always buying the cheapest option", "Never spending money on fun"],
        answer: "Spending only what you can afford without going into debt",
        explanation: "Living within your means = not spending more than you earn. It's a fundamental principle."
    },
    {
        id: "ST_MCQ_020", type: "scenario_mcq", topic: "insurance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What is the main purpose of health insurance?",
        options: ["To save money on groceries", "To cover large medical costs so they don't hurt your finances", "To make you healthier", "To avoid going to doctors"],
        answer: "To cover large medical costs so they don't hurt your finances",
        explanation: "Health insurance protects you from paying massive hospital bills out of pocket in an emergency."
    },
    {
        id: "ST_MCQ_021", type: "scenario_mcq", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "If you invest ₹1,000 and earn 10% in a year, how much total do you have?",
        options: ["₹10,000", "₹1,100", "₹1,010", "₹900"],
        answer: "₹1,100",
        explanation: "10% of ₹1,000 = ₹100. Total = ₹1,000 + ₹100 = ₹1,100. Your money grew while you waited."
    },
    {
        id: "ST_MCQ_022", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What happens to your money's value when prices of things rise (inflation)?",
        options: ["You can buy more with the same money", "You can buy less with the same money", "Nothing changes", "Your salary automatically increases"],
        answer: "You can buy less with the same money",
        explanation: "Inflation means ₹100 buys fewer things over time. This is why investing is important."
    },
    {
        id: "ST_MCQ_023", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What is a 'budget'?",
        options: ["A list of everything you own", "A plan for how much you will earn and spend", "A type of bank account", "A loan for starting a business"],
        answer: "A plan for how much you will earn and spend",
        explanation: "A budget helps you track where your money goes and ensures you save for your future."
    },
    {
        id: "ST_MCQ_024", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What is 'Net Worth'?",
        options: ["Total amount you earn in a year", "Everything you own minus everything you owe", "The balance in your main bank account", "The cost of your most expensive possession"],
        answer: "Everything you own minus everything you owe",
        explanation: "Net worth is the true measure of your wealth. It's assets minus liabilities."
    },
    {
        id: "ST_MCQ_025", type: "scenario_mcq", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What is a 'credit score'?",
        options: ["Points you get for shopping", "A number that shows how reliable you are at paying back loans", "The amount of money you have in the bank", "Your ranking compared to other customers"],
        answer: "A number that shows how reliable you are at paying back loans",
        explanation: "A good credit score helps you get loans easier and at better interest rates."
    },
    {
        id: "ST_MCQ_026", type: "scenario_mcq", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Why should you diversify your investments?",
        options: ["To make things more complicated", "To reduce the risk of losing all your money if one thing fails", "To pay more fees to the bank", "Because the government requires it"],
        answer: "To reduce the risk of losing all your money if one thing fails",
        explanation: "Diversifying — or spreading your money — protects you from losing everything in a single crash."
    },
    {
        id: "ST_MCQ_027", type: "scenario_mcq", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "In simple terms, what is a 'Mutual Fund'?",
        options: ["A loan you give to a friend", "A pool of money from many people used to buy many different investments together", "A private bank account", "A type of credit card"],
        answer: "A pool of money from many people used to buy many different investments together",
        explanation: "Mutual funds allow you to own a slice of many investments even with a small amount of money."
    },
    {
        id: "ST_MCQ_028", type: "scenario_mcq", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Why is it better to start investing when you're young?",
        options: ["Because young people have more luck", "Because your money has a lot more time to grow through compounding", "Because banks only like young customers", "It's not actually better"],
        answer: "Because your money has a lot more time to grow through compounding",
        explanation: "Starting early is the biggest advantage you can have. Even small amounts grow large over decades."
    },
    {
        id: "ST_MCQ_029", type: "scenario_mcq", topic: "taxation", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "In simple terms, what is 'income tax'?",
        options: ["A fee you pay to use a bank", "A part of your earnings that goes to the government to pay for public services", "A bonus your boss gives you", "The cost of opening a business"],
        answer: "A part of your earnings that goes to the government to pay for public services",
        explanation: "The government uses tax money for things like roads, schools, and hospitals."
    },
    {
        id: "ST_MCQ_030", type: "scenario_mcq", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What is an 'EMI'?",
        options: ["A type of fast payment", "A fixed amount you pay every month to repay a loan", "An email notification from your bank", "A special savings account"],
        answer: "A fixed amount you pay every month to repay a loan",
        explanation: "EMI stands for Equated Monthly Installment. It helps you pay back a large loan in small, equal parts."
    },
    {
        id: "ST_MCQ_031", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Your first salary just arrived. Friends want you to celebrate with an expensive dinner. You should:",
        options: ["Spend a huge amount — you earned it!", "Celebrate reasonably within a budget, then save the rest", "Not celebrate at all", "Pay for everyone using a credit card loan"],
        answer: "Celebrate reasonably within a budget, then save the rest",
        explanation: "Celebrating is fine! The key is deciding a budget before you spend, not after."
    },
    {
        id: "ST_MCQ_032", type: "scenario_mcq", topic: "banking", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "You just got your first credit card. What is the safest habit?",
        options: ["Max out the limit immediately", "Use it for planned things and pay the full bill before the due date", "Never use it at all", "Pay only the minimum amount due each month"],
        answer: "Use it for planned things and pay the full bill before the due date",
        explanation: "Full payment means no extra interest and a strong credit reputation."
    },
    {
        id: "ST_MCQ_033", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Your essential costs take ₹18,000 of your ₹22,000 salary. What should you do?",
        options: ["Ignore it — ₹18,000 is small", "Look for ways to spend less or earn more — ₹4,000 extra is very tight", "Take a loan to feel more comfortable", "Immediately quit your job"],
        answer: "Look for ways to spend less or earn more — ₹4,000 extra is very tight",
        explanation: "Only ₹4,000 left after essentials leaves almost no room for savings or emergencies."
    },
    {
        id: "ST_MCQ_034", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "You get a small raise at work. The smartest move is:",
        options: ["Immediately move to a more expensive house", "Keep your expenses the same and save the extra amount", "Spend it all on a luxury watch", "Quit and travel until the money is gone"],
        answer: "Keep your expenses the same and save the extra amount",
        explanation: "Saving your salary increases is the fastest way to build real wealth."
    },
    {
        id: "ST_MCQ_035", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Which of these is a 'Good Debt'?",
        options: ["Credit card loan for a vacation", "Education loan to improve your career", "Payday loan for a new phone", "None — all debt is bad"],
        answer: "Education loan to improve your career",
        explanation: "Good debt is used for things that grow in value or increase your earning power."
    },
    {
        id: "ST_MCQ_036", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What is an 'Asset'?",
        options: ["Something you own that has value or earns you money", "Something you owe to others", "A monthly expense like rent", "The total tax you pay"],
        answer: "Something you own that has value or earns you money",
        explanation: "Assets include savings, property, and investments. They help build your wealth."
    },
    {
        id: "ST_MCQ_037", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What is a 'Liability'?",
        options: ["Something you own that is valuable", "A debt or obligation you owe to others", "Your total income for a year", "A type of insurance"],
        answer: "A debt or obligation you owe to others",
        explanation: "Liabilities include loans and credit card balances. They reduce your total wealth."
    },
    {
        id: "ST_MCQ_038", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Which habit helps you prepare for the unexpected?",
        options: ["Spending everything as soon as you get it", "Building an emergency fund of 3-6 months' expenses", "Hope for the best and don't worry", "Lending all your extra money to friends"],
        answer: "Building an emergency fund of 3-6 months' expenses",
        explanation: "An emergency fund is your financial safety net for things like medical bills or job loss."
    },
    {
        id: "ST_MCQ_039", type: "scenario_mcq", topic: "personal_finance", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "Why should you track your spending?",
        options: ["To see where your money is going and find ways to save", "Because it's a fun hobby", "Because the bank charges you if you don't", "To show off to your friends"],
        answer: "To see where your money is going and find ways to save",
        explanation: "Tracking is the only way to know if your spending matches your goals."
    },
    {
        id: "ST_MCQ_040", type: "scenario_mcq", topic: "investing", difficulty: 0, isStarter: true, confidenceTag: "everyday_money", minRating: 0, timeLimit: 12,
        question: "What is the simplest way to explain 'Risk' in investing?",
        options: ["The chance that you might lose some or all of your money", "The total profit you earn", "The cost of opening a demat account", "The time it takes to get your money back"],
        answer: "The chance that you might lose some or all of your money",
        explanation: "Higher risk usually means higher potential returns, but also more chance of losing money."
    }
];
