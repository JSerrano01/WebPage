/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'custom': ['YourCustomFont', 'sans-serif'], // Agrega tu fuente personalizada aquí
    },
  },
  plugins: [],
}