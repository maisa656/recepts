/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        olive: "#40583b",
        leaf: "#76916a",
        cream: "#f7f6f0",
        ink: "#242820",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["DM Serif Display", "serif"],
      },
    },
  },
  plugins: [],
};
