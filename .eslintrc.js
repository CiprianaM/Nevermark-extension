module.exports = {
  env: {
    "browser": true,
    "es6": true,
    "jquery": true,
    "node": true,
    "mocha": true
  },
  "extends": "eslint:recommended" ,
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-undef":"off", // only for a chrome exension. With the chrome object everywhere
    'no-use-before-define':["error", { "functions": false,"variables": false }],
    'quotes': ["error", "single", { "avoidEscape": true }],
    "indent": ["error", 2],
    "key-spacing": ["error", {"beforeColon": true, "beforeColon": true}],
    "semi-spacing": ["error", {"before": false, "after": false}],
     'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
     'no-extra-parens': "error",
     'no-multi-spaces': "error",
     "space-before-blocks": "error",
     'space-before-function-paren': "error",
     "space-in-parens": ["error", "never"],
     "space-infix-ops" : "error",
     'comma-spacing': ["error", { "before": false, "after": false }],
     'brace-style': "error",
     'computed-property-spacing': [ "error", "never"],
     "keyword-spacing": "error",
    "linebreak-style": "error",
    "semi": "error",
  }
};