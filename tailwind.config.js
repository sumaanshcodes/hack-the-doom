/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          900: '#020604',
          800: '#030B07',
          700: '#06120C',
          600: '#081A10',
        },
        gamma: {
          400: '#7CFFB2',
          500: '#39FF88',
          600: '#00FF66',
        },
        darkGreen: {
          800: '#062E19',
          900: '#0B4827',
        },
        metal: {
          400: '#A8AEA9',
          600: '#737A75',
          800: '#343936',
        },
        gold: {
          500: '#C8A85B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
