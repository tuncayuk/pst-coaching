module.exports = {
  // singleQuote: false,
  // trailingComma: "es5",
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 120,
  arrowParens: 'avoid',
  tabWidth: 2,
  endOfLine: 'lf',
  importOrder: ['^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports']
};
