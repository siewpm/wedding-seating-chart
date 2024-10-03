module.exports = {
    extends: ["./base", "eslint-config-airbnb/rules/react"]
        .map(require.resolve)
        .concat(["plugin:react/recommended"]),

    rules: {        
        "react/prop-types": "off",
        "react/require-default-props": "off",

        "react/jsx-filename-extension": ["off", { extensions: [".tsx", ".jsx"] }],
        "react/prefer-stateless-function": "off",
        "react/jsx-no-bind": "off",
        "react/sort-comp": [
            "off", {
                order: [
                    "displayName",
                    "statics",
                    "static-methods",
                    "defaultProps",
                    "state",
                    "constructor",
                    "render",
                    "/^(_)?render.+$/",
                    "componentWillMount",
                    "componentDidMount",
                    "componentWillReceiveProps",
                    "shouldComponentUpdate",
                    "componentWillUpdate",
                    "componentDidUpdate",
                    "componentWillUnmount",
                    "/^on[A-Z].+$/",
                    "everything-else",
                    "/^_.+$/",
                ],
            },
        ],
    },
};