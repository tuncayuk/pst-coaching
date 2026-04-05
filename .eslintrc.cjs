module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: ["expo", "prettier"],
  settings: {
    react: {
      version: "detect"
    }
  },
  ignorePatterns: ["**/node_modules/**", "**/dist/**", "**/coverage/**", "**/.expo/**"],
  rules: {
    // @typescript-eslint/ban-types was removed in v8; disable to avoid config-expo conflict
    "@typescript-eslint/ban-types": "off"
  }
};
