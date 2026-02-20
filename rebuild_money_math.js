const fs = require('fs');

const easyQuestions = [
    // MM_E_001 to MM_E_030 (Summarized for the script, I will fill these from the actual file or regenerate them if they were good)
    // Actually I will use a smarter approach: read the file, extract all VALID questions by ID, and deduplicate.
];

const filePath = 'c:/FinIQ/src/data/questions/moneyMath.ts';
const content = fs.readFileSync(filePath, 'utf-8');

// Extraction logic for existing questions
const questions = [];
const seenIds = new Set();

// Improved regex to find objects
const objectRegex = /\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?\}/g;
let match;
while ((match = objectRegex.exec(content)) !== null) {
    const id = match[1];
    const objText = match[0];

    // Skip empty or clearly broken objects
    if (objText.includes('question:') && objText.includes('answer:')) {
        if (!seenIds.has(id)) {
            let cleanObj = objText.trim();
            // Ensure tags
            if (!cleanObj.includes('tags:')) {
                const topicMatch = cleanObj.match(/topic:\s*['"]([^'"]+)['"]/);
                const topic = topicMatch ? topicMatch[1] : 'general';
                cleanObj = cleanObj.replace(/(timeLimit: \d+)/, `$1, tags: ["${topic}"]`);
            }
            // Ensure no double braces from previous failed edits
            cleanObj = cleanObj.replace(/^\{\s*\{/, '{').replace(/\}\s*\}$/, '}');

            questions.push(cleanObj);
            seenIds.add(id);
        }
    }
}

// Now I have all the "good" ones from the file.
// I will add the missing Medium questions (MM_M_066 to MM_M_100)
const newMediums = [];
for (let i = 66; i <= 100; i++) {
    const id = `MM_M_${String(i).padStart(3, '0')}`;
    if (!seenIds.has(id)) {
        // Generate a new medium question
        // Note: In a real script I'd have a list, but I'll provide a placeholder structure 
        // that I will replace with real questions in a second pass or just hardcode the ones I want here.
    }
}

// Actually, I'll just hardcode the new batch of Medium questions here to be safe.
const mediumBatch2 = [
    { id: "MM_M_066", q: "A ₹3,000 grocery bill has 5% tax. Total?", a: 3150, ex: "5% of 3000 = 150. 3000 + 150 = 3150.", t: ["taxes"] },
    { id: "MM_M_067", q: "If you buy 2 products for ₹450 each and get 10% off the total, you pay?", a: 810, ex: "Total 900. 10% off is 90. 900 - 90 = 810.", t: ["discounts"] },
    { id: "MM_M_068", q: "Interest on ₹12,000 at 10% for 6 months (Simple Interest)?", a: 600, ex: "Annual is 1200. Half is 600.", t: ["interest"] },
    { id: "MM_M_069", q: "You have ₹2,000. Movie ticket ₹250, popcorn ₹150. Money left?", a: 1600, ex: "2000 - (250 + 150) = 1600.", t: ["expenses"] },
    { id: "MM_M_070", q: "Price of a ₹1,500 share falls by 4%. New price?", a: 1440, ex: "4% of 1500 = 60. 1500 - 60 = 1440.", t: ["investing"] },
    { id: "MM_M_071", q: "Exchange $50 to INR if 1 USD = ₹82.50.?", a: 4125, ex: "50 * 82.5 = 4125.", t: ["currency"] },
    { id: "MM_M_072", q: "A ₹10,000 loan at 12% SI for 1 year. Monthly interest?", a: 100, ex: "Total annual interest 1200. 1200 / 12 = 100.", t: ["banking"] },
    { id: "MM_M_073", q: "Split ₹4,800 between A and B in 3:1 ratio. A's share?", a: 3600, ex: "4800 / 4 = 1200. A gets 1200 * 3 = 3600.", t: ["ratio"] },
    { id: "MM_M_074", q: "Discount of 30% on ₹2,500. Selling price?", a: 1750, ex: "30% of 2500 is 750. 2500 - 750 = 1750.", t: ["discounts"] },
    { id: "MM_M_075", q: "Buy 5 items for ₹120 each. Total with 18% GST?", a: 708, ex: "Cost 600. 18% of 600 is 108. Total 708.", t: ["taxes"] },
    { id: "MM_M_076", q: "If inflation is 5%, what will ₹1,000 be worth in purchasing power next year?", a: 950, ex: "Loss of 50. 1000 - 50 = 950.", t: ["inflation"] },
    { id: "MM_M_077", q: "Salary hike of 8% on ₹40,000. New salary?", a: 43200, ex: "8% of 40000 = 3200. Total 43200.", t: ["salary"] },
    { id: "MM_M_078", q: "FD return of 7% on ₹20,000. Total after 1 year?", a: 21400, ex: "Interest 1400. Total 21400.", t: ["banking"] },
    { id: "MM_M_079", q: "Cost of 250g gold if 10g costs ₹60,000.?", a: 1500000, ex: "60000 * 25 = 15,00,000.", t: ["commodities"] },
    { id: "MM_M_080", q: "A stock goes from ₹400 to ₹380. % loss?", a: 5, ex: "Loss of 20. (20 / 400) * 100 = 5%.", t: ["investing"] },
    { id: "MM_M_081", q: "You save ₹250/week. Total in 1 year (52 weeks)?", a: 13000, ex: "250 * 52 = 13000.", t: ["savings"] },
    { id: "MM_M_082", q: "Buying a ₹20,000 laptop on 4 months 0% EMI. Monthly payment?", a: 5000, ex: "20000 / 4 = 5000.", t: ["banking"] },
    { id: "MM_M_083", q: "If ₹12,000 is 20% of your savings, total savings?", a: 60000, ex: "12000 * 5 = 60000.", t: ["budgeting"] },
    { id: "MM_M_084", q: "GST 28% on a ₹5,000 item. Price including tax?", a: 6400, ex: "28% of 5000 = 1400. 5000 + 1400 = 6400.", t: ["taxes"] },
    { id: "MM_M_085", q: "Divide ₹1,00,000 into 70:30 for debt:equity. Equity amount?", a: 30000, ex: "30% of 1,00,000 = 30000.", t: ["investing"] },
    { id: "MM_M_086", q: "Profit of 25% on CP ₹800. SP?", a: 1000, ex: "800 + 200 = 1000.", t: ["profit_loss"] },
    { id: "MM_M_087", q: "Loss of 10% on SP ₹900. CP was?", a: 1000, ex: "900 is 90% of CP. CP = 900 / 0.9 = 1000.", t: ["profit_loss"] },
    { id: "MM_M_088", q: "Fuel price 100/L. Car gives 15km/L. Cost for 60km trip?", a: 400, ex: "4 Liters needed. 4 * 100 = 400.", t: ["expenses"] },
    { id: "MM_M_089", q: "Electricity bill ₹2,400. Late fee 2%. Total if late?", a: 2448, ex: "2% of 2400 is 48. 2400 + 48 = 2448.", t: ["expenses"] },
    { id: "MM_M_090", q: "If you spend 40% of ₹30,000 salary on rent, how much is rent?", a: 12000, ex: "30000 * 0.4 = 12000.", t: ["budgeting"] },
    { id: "MM_M_091", q: "Price of 1kg apples is ₹180. Cost of 3.5kg?", a: 630, ex: "180 * 3 + 90 = 540 + 90 = 630.", t: ["expenses"] },
    { id: "MM_M_092", q: "Dividend of ₹5 per share. You own 250 shares. Total dividend?", a: 1250, ex: "250 * 5 = 1250.", t: ["investing"] },
    { id: "MM_M_093", q: "A ₹2 Lakh loan at 10% SI for 3 years. Total interest?", a: 60000, ex: "200000 * 0.1 * 3 = 60000.", t: ["banking"] },
    { id: "MM_M_094", q: "Price rises from ₹50 to ₹65. % increase?", a: 30, ex: "Increase of 15. (15/50) * 100 = 30%.", t: ["inflation"] },
    { id: "MM_M_095", q: "You pay ₹3,300 for a ₹3,000 dinner. What % tip did you give?", a: 10, ex: "Tip is 300. (300/3000) * 100 = 10%.", t: ["daily_math"] },
    { id: "MM_M_096", q: "Cost of 50 shares at ₹420 each.?", a: 21000, ex: "50 * 420 = 21000.", t: ["investing"] },
    { id: "MM_M_097", q: "Markup 50% on ₹1,200. New price?", a: 1800, ex: "1200 + 600 = 1800.", t: ["profit_loss"] },
    { id: "MM_M_098", q: "If 1 Gram of gold is ₹6,200. How much for 8 Grams?", a: 49600, ex: "6200 * 8 = 49600.", t: ["commodities"] },
    { id: "MM_M_099", q: "Buying ₹5,000 stocks, 0.2% brokerage. Brokerage amount?", a: 10, ex: "5000 * 0.002 = 10.", t: ["equity"] },
    { id: "MM_M_100", q: "SIP of ₹3,000 monthly for 1 year. Total principal?", a: 36000, ex: "3000 * 12 = 36000.", t: ["investing"] },
];

const hardBatch1 = [
    { id: "MM_H_021", q: "Compound Interest on ₹50,000 at 10% for 2 years (compounded annually)?", a: 10500, ex: "Amount = 50000 * 1.21 = 60500. CI = 10500.", t: ["compound_interest"] },
    { id: "MM_H_022", q: "A stock has EPS of ₹45 and PE ratio of 18. Stock price = ?", a: 810, ex: "Price = EPS * PE = 45 * 18 = 810.", t: ["valuation"] },
    { id: "MM_H_023", q: "Market cap is ₹5,000 Cr. Outstanding shares 25 Cr. Share price = ?", a: 200, ex: "Price = 5000 / 25 = 200.", t: ["equity"] },
    { id: "MM_H_024", q: "GST inclusive price is ₹1,180 (18% GST). Base price = ?", a: 1000, ex: "Base = 1180 / 1.18 = 1000.", t: ["taxation"] },
    { id: "MM_H_025", q: "Dividend yield 4% on CMP of ₹450. DPS = ?", a: 18, ex: "DPS = 4% of 450 = 18.", t: ["equity"] },
    { id: "MM_H_026", q: "A ₹10L loan at 9% for 1 year. Total payment if interest is SI?", a: 1090000, ex: "Interest 90,000. Total 10,90,000.", t: ["banking"] },
    { id: "MM_H_027", q: "Option payoff: Long Call at ₹1200 strike, premium ₹40. Price at ₹1280. Profit?", a: 40, ex: "Intr. Value = 1280 - 1200 = 80. Profit = 80 - 40 = 40.", t: ["derivatives"] },
    { id: "MM_H_028", q: "Option payoff: Long Put at ₹500 strike, premium ₹25. Price at ₹450. Profit?", a: 25, ex: "Intr. Value = 500 - 450 = 50. Profit = 50 - 25 = 25.", t: ["derivatives"] },
    { id: "MM_H_029", q: "Rule of 72: How long to quadruple money at 12% CI? (Approx years)", a: 12, ex: "Doubles in 6 years. Quadruples in 2 * 6 = 12 years.", t: ["investing"] },
    { id: "MM_H_030", q: "A ₹25,000 investment falls 20% then rises 25%. Final value?", a: 25000, ex: "25000 * 0.8 = 20000. 20000 * 1.25 = 25000.", t: ["investing"] },
    { id: "MM_H_031", q: "Buying 2 lots of Nifty (50 qty each). Entry 19200, Exit 19350. Profit?", a: 15000, ex: "150 points * 100 qty = 15000.", t: ["derivatives"] },
    { id: "MM_H_032", q: "Taxable income ₹8L. Tax at 5% for ₹2.5-5L and 10% for ₹5-8L. Total tax?", a: 42500, ex: "12500 + 30000 = 42500.", t: ["taxation"] },
    { id: "MM_H_033", q: "Inflation-adjusted return: 15% nominal, 6% inflation. Real return ≈ ?", a: 9, ex: "Approx 15 - 6 = 9%.", t: ["investing"] },
    { id: "MM_H_034", q: "FD interest 6.5%. TDS at 10% on interest. Net interest rate?", a: 5.85, ex: "6.5 - (10% of 6.5) = 6.5 - 0.65 = 5.85%.", t: ["banking"] },
    { id: "MM_H_035", q: "Price to Book (PB) ratio for ₹800 price and ₹250 BVPS?", a: 3.2, ex: "800 / 250 = 3.2.", t: ["valuation"] },
    { id: "MM_H_036", q: "SIP ₹10,000/mo. Return 1% per month. Total value after 2 months?", a: 20301, ex: "10000 * 1.01 * 1.01 + 10000 * 1.01 = 10201 + 10100 = 20301.", t: ["investing"] },
    { id: "MM_H_037", q: "Mutual fund Expense Ratio 0.8%. Assets ₹5,000 Cr. Annual fee Cr?", a: 40, ex: "0.8% of 5000 = 40.", t: ["investing"] },
    { id: "MM_H_038", q: "Gold price ₹60,000/10g. GST 3%. Making charge 5%. Total price for 10g?", a: 64800, ex: "Making: 3000. Sum: 63000. GST: 3% of 60000 is 1800. Total 64800.", t: ["commodities"] },
    { id: "MM_H_039", q: "Short selling 100 shares at ₹450, buying back at ₹410. Profit?", a: 4000, ex: "(450 - 410) * 100 = 4000.", t: ["equity"] },
    { id: "MM_H_040", q: "A bond pays 8% semi-annually. Par ₹1,000. Each coupon payment amount?", a: 40, ex: "4% of 1000 = 40.", t: ["bonds"] },
    { id: "MM_H_041", q: "Dividend Payout Ratio 40%. Net Profit ₹500 Cr. Total Dividend in Cr?", a: 200, ex: "40% of 500 = 200.", t: ["equity"] },
    { id: "MM_H_042", q: "Total expense ₹24,000 including 20% service charge. Base cost?", a: 20000, ex: "24000 / 1.2 = 20000.", t: ["daily_math"] },
    { id: "MM_H_043", q: "1 lot Bank Nifty (15 qty). Entry ₹44,000, Sell ₹44,800. Profit?", a: 12000, ex: "800 * 15 = 12000.", t: ["derivatives"] },
    { id: "MM_H_044", q: "HRA ₹15,000/mo. Rent ₹20,000/mo. Basic ₹40,000/mo. Least of (HRA, Rent-10%Basic, 50%Basic) is exempt. Exempt amt?", a: 11000, ex: "Rent - 10% Basic = 20000 - 4000 = 16000. Least is HRA 15k vs 16k vs 20k. Wait: Rent-10%Basic is 16k. HRA is 15k. So 11k? No. (Calculated based on standard rules).", a: 11000, ex: "Rent(20k) - 10%Basic(4k) = 16k. HRA=15k. Basic50%=20k. Least is 15k... wait calculation correction: 20000-4000=16000. So 15k is the answer normally. Let me simplify the question.", q: "Income ₹10L. 80C deduction ₹1.5L. Health insurance ₹25k. Net taxable income?", a: 825000, ex: "10,00,000 - 1,50,000 - 25,000 = 8,25,000.", t: ["taxation"] },
    { id: "MM_H_045", q: "Cost of living increases 4% annually. A ₹50,000 lifestyle today costs how much in 5 years? (Approx)", a: 60833, ex: "50000 * (1.04^5) approx 60833.", t: ["inflation"] },
    { id: "MM_H_046", q: "Credit card APR 36%. Monthly interest factor?", a: 3, ex: "36 / 12 = 3%.", t: ["banking"] },
    { id: "MM_H_047", q: "A stock split 1:5. Price was ₹1,200. New price?", a: 240, ex: "1200 / 5 = 240.", t: ["equity"] },
    { id: "MM_H_048", q: "A company has 10 Cr shares. CMP ₹850. Face Value ₹10. Market Cap in Cr?", a: 8500, ex: "10 * 850 = 8500.", t: ["equity"] },
    { id: "MM_H_049", q: "Buy Call Option at ₹45 premium. Break-even if Strike is ₹1,000?", a: 1045, ex: "1000 + 45 = 1045.", t: ["derivatives"] },
    { id: "MM_H_050", q: "GST total ₹540 at 18%. Base price?", a: 3000, ex: "540 is 18% of Base. Base = 540 / 0.18 = 3000.", t: ["taxation"] },
    { id: "MM_H_051", q: "Capital Gain on ₹2L investment sold for ₹3.5L after 2 years?", a: 150000, ex: "3.5L - 2L = 1.5L.", t: ["taxation"] },
    { id: "MM_H_052", q: "Annual compounding: ₹1L at 12% for 3 years. Interest amount?", a: 40492, ex: "100000 * (1.12^3 - 1) = 40492.", t: ["compound_interest"] },
    { id: "MM_H_053", q: "Beta of a portfolio is 1.2. If market rises 10%, portfolio rises?", a: 12, ex: "1.2 * 10 = 12%.", t: ["investing"] },
    { id: "MM_H_054", q: "ROI on ₹80k investment yielding ₹12k profit?", a: 15, ex: "(12/80) * 100 = 15%.", t: ["investing"] },
    { id: "MM_H_055", q: "EPF balance ₹5L. Annual interest 8.15%. Interest earned?", a: 40750, ex: "500000 * 0.0815 = 40750.", t: ["retirement"] },
    { id: "MM_H_056", q: "A car depreciates 15% annually. Value of ₹10L car after 1 year?", a: 850000, ex: "10,00,000 * 0.85 = 8,50,000.", t: ["daily_math"] },
    { id: "MM_H_057", q: "Personal loan ₹1L, 14% interest for 1 year, zero processing fee. Total repayment?", a: 114000, ex: "100000 + 14000 = 114000.", t: ["banking"] },
    { id: "MM_H_058", q: "LTCG tax 10% on profit above ₹1L. Total LTCG profit ₹4L. Tax?", a: 30000, ex: "Profit above 1L is 3L. 10% of 3L = 30000.", t: ["taxation"] },
    { id: "MM_H_059", q: "Dividend ₹2.CMP ₹100. Yield?", a: 2, ex: "2/100 * 100 = 2%.", t: ["equity"] },
    { id: "MM_H_060", q: "Monthly Interest on ₹2L Savings Account at 4% p.a.?", a: 667, ex: "200000 * 0.04 / 12 = 8000 / 12 approx 667.", t: ["banking"] },
];

const hardBatch2 = [
    { id: "MM_H_061", q: "A ₹5,000 SIP grew to ₹8.2 Lakhs in 8 years. Total principal invested?", a: 480000, ex: "5000 * 12 * 8 = 5000 * 96 = 4,80,000.", t: ["investing"] },
    { id: "MM_H_062", q: "Buying 1 BTC at $30,000, selling at $45,000. Profit in USD?", a: 15000, ex: "45000 - 30000 = 15000.", t: ["crypto"] },
    { id: "MM_H_063", q: "Dividend Yield 5% on CMP ₹200. If price rises to ₹250, new yield (if DPS constant)?", a: 4, ex: "DPS = 10. New yield = (10/250) * 100 = 4%.", t: ["equity"] },
    { id: "MM_H_064", q: "A 100-share portfolio split 1:10. New share count?", a: 1000, ex: "100 * 10 = 1000.", t: ["equity"] },
    { id: "MM_H_065", q: "Corporate Tax rate 25%. Profit before tax ₹400 Cr. Net Profit?", a: 300, ex: "Tax 100. Net Profit 300.", t: ["taxation"] },
    { id: "MM_H_066", q: "Property value ₹1 Cr. Rental yield 3%. Monthly rent?", a: 25000, ex: "Annual 3L. Monthly 3,00,000 / 12 = 25,000.", t: ["real_estate"] },
    { id: "MM_H_067", q: "Price of oil rises from $70 to $91. % rise?", a: 30, ex: "Rise of 21. (21/70) * 100 = 3/10 * 100 = 30%.", t: ["macroeconomics"] },
    { id: "MM_H_068", q: "Loan ₹20L, ROI 8.5%, 20 years. Approx total interest is ₹20L. Total repayment?", a: 4000000, ex: "20L + 20L = 40 Lakhs.", t: ["banking"] },
    { id: "MM_H_069", q: "Gold purity 22K (91.6%). Price of 24K is ₹6000/g. Price of 22K/g approx?", a: 5500, ex: "6000 * 0.916 approx 5496 (rounded to 5500).", t: ["commodities"] },
    { id: "MM_H_070", q: "A bond pays ₹80 coupon on ₹1,000 price. Current yield?", a: 8, ex: "(80/1000) * 100 = 8%.", t: ["bonds"] },
    { id: "MM_H_071", q: "Buying 4 lots of Nifty (50 qty each) at 19500. Margin needed 10%? (In Lakhs)", a: 3.9, ex: "Total value = 200 * 19500 = 39,00,000. 10% margin = 3,90,000 = 3.9L.", t: ["derivatives"] },
    { id: "MM_H_072", q: "An investment of ₹1L doubles every 6 years. Value after 18 years? (In Lakhs)", a: 8, ex: "3 doublings: 1 -> 2 -> 4 -> 8L.", t: ["investing"] },
    { id: "MM_H_073", q: "Inflation 7% for 2 years. Initial price ₹100. Final price?", a: 114.49, ex: "100 * 1.07 * 1.07 = 114.49.", t: ["macroeconomics"] },
    { id: "MM_H_074", q: "Term insurance ₹1 Cr cover, premium ₹15k/year. If policyholder dies in year 5, payout?", a: 10000000, ex: "Full sum assured ₹1 Cr.", t: ["insurance"] },
    { id: "MM_H_075", q: "Gratuity formula: (15/26) * Last Basic * Years. Basic 50k, 10 years service. Gratuity?", a: 288461, ex: "0.5769 * 50000 * 10 = 288461.", t: ["retirement"] },
    { id: "MM_H_076", q: "Buy Put at ₹30 premium, Strike ₹800. Breakeven Price?", a: 770, ex: "800 - 30 = 770.", t: ["derivatives"] },
    { id: "MM_H_077", q: "Net National Income = NNP at market price - ? (Factor Cost adjustment)", a: "Indirect Taxes", ex: "NNP at Factor Cost = NNP(MP) - Indirect Taxes + Subsidies.", t: ["macroeconomics"] },
    { id: "MM_H_078", q: "Current Ratio for Current Assets ₹5L, Current Liabilities ₹2L.?", a: 2.5, ex: "5 / 2 = 2.5.", t: ["valuation"] },
    { id: "MM_H_079", q: "A business has Debt ₹40L, Equity ₹60L. Debt-to-Equity ratio?", a: 0.67, ex: "40 / 60 = 2/3 approx 0.67.", t: ["valuation"] },
    { id: "MM_H_080", q: "If you earn ₹1.5L/month, 50-30-20 rule says savings should be?", a: 30000, ex: "20% of 1.5L = 30000.", t: ["budgeting"] },
    { id: "MM_H_081", q: "Buying property ₹50L. Stamp duty 6%, Registration 1%. Total govt fees?", a: 350000, ex: "7% of 50L = 3,50,000.", t: ["real_estate"] },
    { id: "MM_H_082", q: "ROI on ₹25,000 that grew to ₹32,500 in 1 year?", a: 30, ex: "(7500 / 25000) * 100 = 3/10 * 100 = 30%.", t: ["investing"] },
    { id: "MM_H_083", q: "A company declares 200% dividend on Face Value ₹2. Dividend per share?", a: 4, ex: "200% of 2 = 4.", t: ["equity"] },
    { id: "MM_H_084", q: "Convert 1000 GBP to INR if 1 GBP = ₹105.?", a: 105000, ex: "1000 * 105 = 1,05,000.", t: ["currency"] },
    { id: "MM_H_085", q: "Price of stock ₹500. Expected Dividend ₹10. Growth rate 5%. Cost of equity (Gordon Model)?", a: 7, ex: "(10/500) + 0.05 = 0.02 + 0.05 = 7%.", t: ["valuation"] },
    { id: "MM_H_086", q: "An FD pays 6% quarterly compounding. Effective Annual Rate (Approx)?", a: 6.14, ex: "(1 + 0.06/4)^4 - 1 = 1.015^4 - 1 approx 6.14%.", t: ["banking"] },
    { id: "MM_H_087", q: "Price inclusive of 12% GST is ₹672. GST amount?", a: 72, ex: "Base = 672 / 1.12 = 600. GST = 72.", t: ["taxation"] },
    { id: "MM_H_088", q: "Average cost of 3 shares bought at ₹100, ₹120, ₹140.?", a: 120, ex: "(100+120+140)/3 = 360/3 = 120.", t: ["investing"] },
    { id: "MM_H_089", q: "A ₹10k credit card bill unpaid for 1 month at 3% monthly interest. Late fee ₹500. Total due?", a: 10800, ex: "10000 + 300 + 500 = 10800.", t: ["banking"] },
    { id: "MM_H_090", q: "If 10-year G-Sec yield rises from 7% to 7.5%, bond prices will?", a: "Fall", ex: "Yield and Price have inverse relationship.", t: ["bonds"] },
    { id: "MM_H_091", q: "Portfolio: ₹60k equity, ₹40k debt. Equity falls 10%, debt rises 5%. New total?", a: 96000, ex: "54000 + 42000 = 96000.", t: ["investing"] },
    { id: "MM_H_092", q: "A stock has Beta 0. Risk-free rate 6%. Expected return by CAPM?", a: 6, ex: "Return = 6 + 0 * (Market-6) = 6%.", t: ["valuation"] },
    { id: "MM_H_093", q: "If cash reserve ratio (CRR) is 4.5%, for ₹100 deposit, bank must keep how much with RBI?", a: 4.5, ex: "4.5% of 100.", t: ["banking"] },
    { id: "MM_H_094", q: "Value of Perpetuity: ₹10,000 annually at 10% discount rate?", a: 100000, ex: "10000 / 0.1 = 1,00,000.", t: ["valuation"] },
    { id: "MM_H_095", q: "GST total on ₹1L at 18%, shared equally between Center and State. SGST amount?", a: 9000, ex: "Total 18000. SGST = 9000.", t: ["taxation"] },
    { id: "MM_H_096", q: "Days Inventory Outstanding (DIO) if COGS ₹12L and Avg Inventory ₹1L.?", a: 30, ex: "(1/12) * 365 approx 30 days.", t: ["valuation"] },
    { id: "MM_H_097", q: "Nifty at 20000. 1 lot call premium ₹200. Total cost of buy?", a: 10000, ex: "50 qty * 200 premium = 10000.", t: ["derivatives"] },
    { id: "MM_H_098", q: "Price to Sales ratio for Market Cap ₹1000 Cr and Sales ₹500 Cr.?", a: 2, ex: "1000 / 500 = 2.", t: ["valuation"] },
    { id: "MM_H_099", q: "If you withdraw ₹1L from PF before 5 years, TDS @ 10% is deducted. Amt received?", a: 90000, ex: "100000 - 10000 = 90000.", t: ["taxation"] },
    { id: "MM_H_100", q: "Market Lot for Nifty is 50. Total contract value if Nifty is 20,000?", a: 1000000, ex: "50 * 20000 = 10,00,000.", t: ["derivatives"] },
];

const newBatches = [...mediumBatch2, ...hardBatch1, ...hardBatch2];

// Add combined batches to the collection
newBatches.forEach(m => {
    if (!seenIds.has(m.id)) {
        const diff = m.id.startsWith('MM_M') ? 2 : 3;
        const rating = m.id.startsWith('MM_M') ? 1000 : 1300;
        const type = "money_math";
        const topic = "mental_math"; // Default or mapped
        const time = m.id.startsWith('MM_M') ? 12 : 15;

        const obj = `    {
        id: "${m.id}", type: "${type}", topic: "${topic}", difficulty: ${diff}, minRating: ${rating},
        question: "${m.q}", answer: ${m.a}, 
        explanation: "${m.ex}", 
        feedbackCorrect: "✓ Well done!",
        feedbackWrong: "✗ Not quite right.",
        timeLimit: ${time}, tags: ${JSON.stringify(m.t)}
    }`;
        questions.push(obj);
        seenIds.add(m.id);
    }
});

// Final check: sort questions by ID to keep file organized
// We need a custom sort for MM_E_001 etc.
const sortedQuestions = questions.sort((a, b) => {
    const idA = a.match(/id:\s*['"]([^'"]+)['"]/)[1];
    const idB = b.match(/id:\s*['"]([^'"]+)['"]/)[1];

    // Format: TYPE_DIFFICULTY_NUMBER (e.g. MM_E_001)
    // We want difficulty order E, M, H, then number.
    const diffOrder = { 'E': 1, 'M': 2, 'H': 3 };
    const partsA = idA.split('_');
    const partsB = idB.split('_');

    if (diffOrder[partsA[1]] !== diffOrder[partsB[1]]) {
        return diffOrder[partsA[1]] - diffOrder[partsB[1]];
    }
    return partsA[2].localeCompare(partsB[2]);
});

const fileHeader = `import { Question } from '../../types/game';

/**
 * Money Math Question Bank (Target: 250 questions)
 * difficulty: 0 (Starter), 1 (Easy), 2 (Medium), 3 (Hard)
 * Current: ~190 questions
 */
export const moneyMathQuestions: Question[] = [
`;

const fileFooter = `];
`;

const finalContent = fileHeader + sortedQuestions.join(',\n') + '\n' + fileFooter;

fs.writeFileSync(filePath, finalContent);
console.log(`Rebuilt moneyMath.ts with ${sortedQuestions.length} questions.`);
