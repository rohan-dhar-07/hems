// postcss.config.cjs

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- This is the new, correct name
    autoprefixer: {},
  },
};