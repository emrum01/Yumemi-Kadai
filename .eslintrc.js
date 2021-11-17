module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["vue", "prettier"],
  rules: {
    semi: ["error", "always"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "no-unused-vars": "off", //使っていない変数を許可
    "vue/html-self-closing": "off", //空タグを許可する
  },
};
