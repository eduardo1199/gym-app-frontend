/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif']
      },
      colors: {
        'primary-white': '#FFFFFF',
        'primary-purple': '#5041BC',
        'primary-blue': '#04103B',
        'secondary-green': '#43BE83',
        'secondary-orange': '#FF8057',
        'alert-danger': '#F8342E',
        'gradient-linear': 'linear-gradient(229.42deg, #3D29D0 26.93%, #C25FFF 98.11%)',
      }
    },
  },
  plugins: [],
}
