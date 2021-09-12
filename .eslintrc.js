module.exports = {
    env: {
        commonjs: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2019,
    },
};
