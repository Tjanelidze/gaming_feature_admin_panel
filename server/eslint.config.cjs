module.exports = [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            'padding-line-between-statements': [
                'error',
                {blankLine: 'always', prev: '*', next: ['block', 'block-like']},
                {blankLine: 'always', prev: '*', next: 'return'}
            ],
            'no-param-reassign': [
                'error',
                {props: true, ignorePropertyModificationsFor: ['req', 'res', 'next']}
            ],

            'no-restricted-syntax': [
                'error',
                {selector: 'ExportDefaultDeclaration', message: 'Prefer named exports'}
            ],
        },
    },
];