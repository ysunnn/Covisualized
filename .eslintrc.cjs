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
		"linebreak-style": ["error", "unix"],

		"comma-dangle": ["warn", "always-multiline"],
		"quotes": ["warn", "double"],
		"semi": ["warn", "always"],
		"eqeqeq": ["error", "always"],
		"no-var": "error",
		"no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],

		"svelte/valid-compile": ["error", { "ignoreWarnings": true }],
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
