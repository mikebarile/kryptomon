module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  // "settings": {
  //     "import/resolver": {
  //         "babel-module": {}
  //     }
  // },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": "warn",
    "no-debugger": "warn",
    "no-warning-comments": [
      "warn",
      {
        "terms": ["fixme", "xxx", "bug"],
        "location": "start"
      },
    ],
    "react/prop-types": "off",
    "no-alert": "error",
    "comma-dangle": ["error", "always-multiline"],
    "func-names": ["error", "always"],
    "indent": ["error", 2],
    "max-len": ["warn", 80],
    "no-multiple-empty-lines": ["error", {
      "max": 2,
      "maxBOF": 0,
      "maxEOF": 0,
    }],
    "no-trailing-spaces": "error",
    "no-duplicate-imports": "error",
    "prefer-const": "error",

    "prefer-rest-params": "error",
    "prefer-spread": "error",
  }
};
