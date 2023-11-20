/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('c', '& > *') //stands for children
    },
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
