/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{scss,html,js}"],
  theme: {
    extend: {
      colors: {
        'primary'   : 'rgb(21, 21, 23)',
        'secondary' : 'rgb(40, 40, 40)',
        'light'     : 'rgb(240, 240, 240)',
        'lighter'   : 'rgb(220, 220, 220)',
        'dark'      : 'rgb(200, 200, 200)',

        'nxtpurple' : 'rgb(140, 27, 171)',
        'nxtpink'   : 'rgb(247, 97, 161)',
        'test'    : 'rgb(89, 90, 200)',
      },
      zIndex: {
        '90': '90',
        '100': '100',
        '110': '110',
        '120': '120'
      }
    },
  },
  plugins: [],
}