module.exports = {
    env: {
        browser: false,
        es6: true,
        node: true,
    },
    extends: ['plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': [
            2,
            {
                printWidth: 130,
                tabWidth: 4,
                singleQuote: true,
                bracketSpacing: false,
            },
        ],
    },
};
