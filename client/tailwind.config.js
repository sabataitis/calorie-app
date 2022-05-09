const colors = require('tailwindcss/colors');

module.exports = {
  content: [
  "./src/**/*.{html,ts}"
  ],
  theme: {
      fontFamily: {
        display: ['Source Serif Pro', 'Georgia', 'serif'],
        body: ['Synonym', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eaf5ea',
          100: '#c9e7cb',
          200: '#a6d7a8',
          300: '#82c785',
          400: '#67bb6a',
          500: '#4caf50',
          600: '#45a849',
          700: '#3c9f40',
          800: '#339637',
          900: '#248627',
        },
        secondary: {
          50: '#f3f3f3',
          100: '#e2e2e2',
          200: '#cfcfcf',
          300: '#bbbbbb',
          400: '#adadad',
          500: '#9e9e9e',
          600: '#969696',
          700: '#8c8c8c',
          800: '#828282',
          900: '#707070',
        },
        white: colors.white,
        black: colors.black,
        red: colors.red,
        slate: colors.slate,
        chart_proteins: '#059669',
        chart_carbs: '#DAC650',
        chart_fats: '#C72D45',
      },
  },
  plugins: [],
}
