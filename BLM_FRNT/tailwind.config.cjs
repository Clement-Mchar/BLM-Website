/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      resolve: ['Resolve', 'sans-serif'], // Ajoute "Resolve" à Tailwind
    },},
  },
  plugins: [],
}