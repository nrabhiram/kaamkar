/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html'],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
      colors: {
        dark: {
          50: '#444444',
          100: '#282424',
          200: '#2A2A2A',
          300: '#191919'
        },
        light: {
          100: '#FFFFFF',
          200: '#EEEEEE',
          300: '#DDDDDD',
          400: '#d5d5d5',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
