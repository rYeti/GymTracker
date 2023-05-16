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
        'secondary-button':'#0d1406',
        'background':'#000000',
        'text': '#daeafb',
        'accent': '#b574f1',
      }
    },
  },
  plugins: [],
}

