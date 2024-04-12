/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      "black": "#000000",
      "dark": "#1d1d1d"
    },
    extend: {
      colors: {
        'tahiti': {
          light: '#67e8f9',
          DEFAULT: '#06b6d4',
          dark: '#67e8f9'
        },
        'orderify-logo': {
          light: '#EEEEEE',
          dark: '#292929'
        },

        "success": "#afffcc",
        "warning": "#fff7af",
        "error": "#ffafaf",

        "form_error": '#c07676',
        "form_outline_error": "#c0767677",

        "border_primary": '#8696b5',
        "outline_primary": "#8696b577",
        
        "primary": {
          light: '#d9e3ff',
          dark: '#8696b5',
        },
        "secondary": {
          light: '#bfe0ff',
          dark: '#8ea7bc'
        },
      }
    },
  },
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [],
}

