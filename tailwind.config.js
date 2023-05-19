/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-button':'#5b9a66',
        // 'secondary-button':'#0d1406',
        'secondary-button':'#699f65',
        'background':'#131d0c',
        'text': '#e7f1df',
        'accent': '#361f47',
        'accent2': '#63992e',
      }
    },
  },
  plugins: [],
}

