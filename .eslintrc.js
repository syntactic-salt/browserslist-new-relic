module.exports = {
    env: {
        commonjs: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:jsdoc/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2019,
    },
    plugins: ['jsdoc'],
    rules: {
        'jsdoc/require-jsdoc': [
            1,
            { publicOnly: true, require: { ArrowFunctionExpression: true } },
        ],
    },
};
