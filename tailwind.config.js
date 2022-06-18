/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'ash': {
        '50': '#ffffff', 
        '100': '#ffffff', 
        '200': '#fefefe', 
        '300': '#fdfdfd', 
        '400': '#fcfcfc', 
        '500': '#fafafa', 
        '600': '#e1e1e1', 
        '700': '#bcbcbc', 
        '800': '#969696', 
        '900': '#7b7b7b'
    },
        'Darkblue': {
          '50': '#f5f5f6', 
          '100': '#eaeaed', 
          '200': '#cbccd3', 
          '300': '#abadb8', 
          '400': '#6c6f82', 
          '500': '#2d314d', 
          '600': '#292c45', 
          '700': '#22253a', 
          '800': '#1b1d2e', 
          '900': '#161826'
      },
      'Limegreen': {
        '50': '#f5fdf7', 
        '100': '#eafbef', 
        '200': '#ccf4d6', 
        '300': '#adedbe', 
        '400': '#6fe08d', 
        '500': '#31d35c', 
        '600': '#2cbe53', 
        '700': '#259e45', 
        '800': '#1d7f37', 
        '900': '#18672d'
    },
    'cyan': {
      '50': '#f4fbfd', 
      '100': '#eaf8fb', 
      '200': '#caedf6', 
      '300': '#aae2f0', 
      '400': '#6bcde5', 
      '500': '#2bb7da', 
      '600': '#27a5c4', 
      '700': '#2089a4', 
      '800': '#1a6e83', 
      '900': '#155a6b'
  }
      }
    },
  },
  plugins: [],
}
