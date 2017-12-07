module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
    },
    "plugins": ["jest"],
    "extends": [
      "eslint:recommended",
      "prettier",
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            "error",
            2
        ],
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
            "never"
        ]
    }
};
