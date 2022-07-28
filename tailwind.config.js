/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./app.vue",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["League Spartan", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        anodyne: {
          100: "#FCFFFF",
          200: "#9092A9",
          300: "#7077A5",
          400: "#2B2D44",
          500: "#1F2038",
          600: "#131426",
        },
        shade: {
          100: "#9278FF",
          200: "#7E5CF8",
        },
        warning: {
          100: "#FC9201",
          200: "#2B2833",
        },
        success: {
          100: "#38D1A6",
          200: "#1D2C3F",
        },
        error: {
          100: "#FB474E",
          200: "#5A1518",
        },
      },
    },
  },
  plugins: [],
};
