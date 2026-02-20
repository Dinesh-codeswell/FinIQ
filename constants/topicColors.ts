export const TOPIC_CONFIG: Record<string, { color: string; emoji: string; label: string }> = {
    investing: { color: '#00D68F', emoji: '📈', label: 'Investing' },
    personal_finance: { color: '#4ECDC4', emoji: '💰', label: 'Personal Finance' },
    banking: { color: '#45B7D1', emoji: '🏦', label: 'Banking' },
    macroeconomics: { color: '#96CEB4', emoji: '🌐', label: 'Macroeconomics' },
    crypto: { color: '#F7DC6F', emoji: '₿', label: 'Crypto' },
    mental_math: { color: '#BB8FCE', emoji: '🧮', label: 'Mental Math' },
    equity_markets: { color: '#F0B27A', emoji: '📊', label: 'Equity Markets' },
    taxation: { color: '#85C1E9', emoji: '🧾', label: 'Taxation' },
    default: { color: '#00D68F', emoji: '⚔️', label: 'Finance' }
};

export const getTopicConfig = (topic: string) => {
    const key = topic.toLowerCase().replace('-', '_');
    return TOPIC_CONFIG[key] || TOPIC_CONFIG.default;
};
