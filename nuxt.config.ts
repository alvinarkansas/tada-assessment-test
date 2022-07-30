import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  buildModules: [
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@nuxt-hero-icons/solid/nuxt",
  ],
  modules: [
    "@nuxtjs/color-mode",
    "@formkit/nuxt",
    "@nuxtjs/strapi",
    "@nuxtjs/dayjs",
  ],
  colorMode: {
    classSuffix: "",
  },
  googleFonts: {
    display: "swap",
    families: {
      "League Spartan": {
        wght: [300, 400, 500, 600, 700],
      },
    },
  },
  css: ["~/assets/css/tailwind.css"],
});
