const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './index.html', './src/**/*.{ts,tsx}'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
