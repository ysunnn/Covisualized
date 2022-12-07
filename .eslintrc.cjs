/* eslint-env node */

module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
	},
	extends: [
		"eslint:recommended",
		"plugin:svelte/recommended",
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module",
	},
	"rules": {
		"indent": ["error", "tab"],
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
		"no-trailing-spaces": "error",
		"eol-last": ["error", "always"],

		"comma-dangle": ["warn", "always-multiline"],
		"quotes": ["warn", "double"],
		"semi": ["warn", "always"],
		"array-bracket-spacing": ["warn", "never"],
		"object-curly-spacing": ["warn", "always"],
		"space-infix-ops": ["warn", { "int32Hint": false }],

		"eqeqeq": ["error", "always"],
		"no-var": "error",
		"prefer-const": "error",
		"no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],

		"svelte/valid-compile": ["error", { "ignoreWarnings": true }],
		"svelte/no-dom-manipulating": "error",
		"svelte/no-dupe-on-directives": "error",
		"svelte/no-dupe-use-directives": "error",
		"svelte/require-store-reactive-access": "warn",
		"svelte/no-at-html-tags": "off",
		"svelte/no-target-blank": "warn",
		"svelte/no-reactive-functions": "error",
		"svelte/no-reactive-literals": "error",
		"svelte/no-useless-mustaches": "warn",
		"svelte/prefer-destructured-store-props": "warn",
		"svelte/require-optimized-style-attribute": "warn",

		"svelte/derived-has-same-inputs-outputs": "error",
		"svelte/first-attribute-linebreak": "warn",
		"svelte/html-closing-bracket-spacing": "warn",
		"svelte/html-quotes": "warn",
		"svelte/html-self-closing": "warn",
		"svelte/mustache-spacing": "warn",
		"svelte/no-extra-reactive-curlies": "warn",
		"svelte/no-spaces-around-equal-signs-in-attribute": "warn",
		"svelte/prefer-class-directive": "warn",
		"svelte/prefer-style-directive": "warn",
		"svelte/shorthand-attribute": "warn",
		"svelte/shorthand-directive": "warn",
		"svelte/spaced-html-comment": "warn",
	},
	"overrides": [
		{
			"files": ["*.svelte"],
			"rules": {
				"indent": "off",
				"svelte/indent": ["error", { "indent": "tab" }],
				"no-self-assign": "off",
			},
		},
	],
};
