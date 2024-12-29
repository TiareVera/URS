// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ruler: {
    'prettier/prettier': 'error'
  },
  ignorePatterns: ['/dist/*'],
};
