/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#093576',
        secondary: '#07329E',
        tertiary: '#130976',
        'white-opacity': 'rgba(255, 255, 255, 0.35)',
        'blue-custom': '#EBF2FF',
        'custom-start': '#077D89',
        'custom-end': '#3E041F',
        'custom-primary': '#B44D6F',
        'custom-gray': '#717171',
        'gray-light': '#994461',
        'custom-gray-text': '#737373',
        'custom-gray-light': '#F1F1F1',
        'gradient-gray-from': 'rgba(33, 34, 41, 1)',
        'gradient-gray-to': 'rgba(33, 37, 41, 1)',
        'gradient-primary-start': 'rgba(8, 159, 174, 1)',
        'gradient-primary-end': 'rgba(7, 125, 137, 1)',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        merryweather: ['Merriweather', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
