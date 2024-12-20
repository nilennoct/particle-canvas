module.exports = {
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 120,
    overrides: [
        {
            files: ['*.json', '*.yml', '*.yaml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
