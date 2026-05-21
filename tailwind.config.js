/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#064e3b', // emerald-950
          teal: '#0d9488', // teal-600
          gold: '#d97706', // amber-600
          sand: '#fef3c7', // amber-100
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
