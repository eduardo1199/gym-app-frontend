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
        'primary-gray': '#797D8C',
        'secondary-gray': '#54657E',
        'secondary-purple': '#3D29D0',
        'tertiary-gray': '#D3CBFB',
        'tertiary-pink': '#8A7DD0',
        'primary-blue': '#04103B',
        'secondary-blue': '#1F192F',
        'secondary-green': '#43BE83',
        'secondary-orange': '#FF8057',
        'primary-yellow': '#FFC629',
        'alert-danger': '#F8342E',
        'primary-pink': '#EA8F95',
        'secondary-pink': '#F5F3FF',
        'gradient-linear': 'linear-gradient(229.42deg, #3D29D0 26.93%, #C25FFF 98.11%)',
      },
      dropShadow: {
        'regular': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
