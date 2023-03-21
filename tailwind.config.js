/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        ctext: '#776e65',
        gameboxbg: '#bbada0',
        cbg: '#faf8ef',
        gridCell: 'rgba(238, 228, 218, 0.35)'
      }
    },
  },
  plugins: [],
}
