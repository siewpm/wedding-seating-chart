module.exports = {
    root: true,

    extends: [
        "eslint-config-airbnb-base/rules/errors",
        "eslint-config-airbnb-base/rules/node",
        "eslint-config-airbnb-base/rules/style",
        "eslint-config-airbnb-base/rules/variables",
        "eslint-config-airbnb-base/rules/es6",
    ]
        .map(require.resolve),

    env: {
        browser: true,
    },

    plugins: ["import"],

    rules: {
        "max-len": ["off", {
            "code": 150
        }],
        "no-nested-ternary": ["off"],
        "no-underscore-dangle": ["off"],
        "object-curly-spacing": ["off"],
        "require-jsdoc": ["off"],
        "no-invalid-this": ["off"],
        "sort-imports": ["off", {
            "ignoreCase": false,
            "ignoreDeclarationSort": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["none", "all", "single", "multiple"],
            "allowSeparatedGroups": false
        }],
        "import/no-extraneous-dependencies": [
            "off", {
                devDependencies: false,
            },
        ],
    },
};