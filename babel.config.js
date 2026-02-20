module.exports = function (api) {
    api.cache(true);
    return {
        presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
        plugins: [
            'react-native-reanimated/plugin',
            // Remove console.* calls in production builds
            ...(process.env.NODE_ENV === 'production'
                ? [['transform-remove-console', { exclude: ['error', 'warn'] }]]
                : []),
        ],
    };
};