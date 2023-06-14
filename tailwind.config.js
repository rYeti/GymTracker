/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'secondary-button':'#699f65',
        'background':'#4F5873',
        'text': '#e7f1df',
        'accent': '#361f47',
        'accent2': '#63992e',
        'primary-button': {
          '50': '#dafee8',
          '100': '#b8fad3',
          '200': '#80f5b2',
          '300': '#42e689',
          '400': '#17bf60',
          '500': '#0eab52',
          '600': '#0f8643',
          '700': '#126939',
          '800': '#105731',
      },
      'negative-line': '#FF0000',
      'positive-line': '#0eab52',
      
      }
    },
  },
  plugins: [],
}

