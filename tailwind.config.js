/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const formKitTailwind = require("@formkit/themes/tailwindcss");

module.exports = {
  darkMode: "class",
  content: [
    "./app.vue",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./formkit.config.js",
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
          200: "#E6E7F0",
          300: "#D5D6E3",
          400: "#9092A9",
          500: "#7077A5",
          600: "#2B2D44",
          700: "#1F2038",
          800: "#131426",
        },
        shade: {
          100: "#9278FF",
          200: "#7E5CF8",
        },
        warning: {
          100: "#FFEBD0",
          200: "#FC9201",
          300: "#2B2833",
        },
        success: {
          100: "#D9F8EF",
          200: "#38D1A6",
          300: "#1D2C3F",
        },
        error: {
          100: "#FFD6D7",
          200: "#FB474E",
          300: "#5A1518",
        },
      },
    },
  },
  plugins: [formKitTailwind],
};
