<template>
  <nav
    class="
      h-16
      md:h-full
      w-full
      md:w-16
      fixed
      inset-x-0
      md:inset-x-auto md:left-0 md:rounded-r-[16px]
      top-0
      flex
      md:flex-col
      justify-between
      bg-anodyne-100
      dark:bg-anodyne-700
      text-anodyne-300
      z-[60]
    "
  >
    <div>
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0H50.4615C57.9386 0 64 6.06138 64 13.5385V50.4615C64 57.9386 57.9386 64 50.4615 64H0V0Z"
          fill="#7E5CF8"
        />
        <path
          d="M64 31.3846H13.5385C6.06137 31.3846 0 37.446 0 44.9231V64H50.4615C57.9386 64 64 57.9386 64 50.4615V31.3846Z"
          fill="#9278FF"
        />
        <path
          d="M36.9746 20.2361C39.5531 21.425 41.6552 23.4491 42.9407 25.9808C44.2263 28.5126 44.6201 31.404 44.0585 34.1874C43.4969 36.9707 42.0128 39.4833 39.8461 41.3185C37.6795 43.1537 34.957 44.2044 32.1192 44.3005C29.2814 44.3966 26.4941 43.5325 24.2083 41.848C21.9225 40.1635 20.2718 37.7571 19.5232 35.0181C18.7746 32.2791 18.972 29.3677 20.0833 26.7548C21.1946 24.1418 23.155 21.9802 25.6472 20.6196L31.6923 31.6923L36.9746 20.2361Z"
          fill="#FCFFFF"
        />
      </svg>
    </div>
    <div
      class="
        h-full
        md:h-auto
        flex
        md:flex-col
        gap-3
        md:gap-5
        items-center
        divide-x divide-anodyne-200
        dark:divide-anodyne-500/40
        divide-solid
        md:divide-x-0 md:divide-y
      "
    >
      <SunIcon
        @click="toggleTheme"
        v-if="$colorMode.preference === 'dark'"
        class="h-6 md:h-10 w-6 md:w-10 text-anodyne-500 cursor-pointer"
      />
      <MoonIcon
        @click="toggleTheme"
        v-else
        class="h-6 md:h-10 w-6 md:w-10 text-anodyne-500 cursor-pointer"
      />
      <div class="py-4 md:py-3 px-6 md:px-4 h-full grid place-items-center">
        <Avatar
          src="https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import { MoonIcon, SunIcon } from "@heroicons/vue/solid";

export default {
  data() {
    return {
      darkTheme: true,
    };
  },
  components: {
    MoonIcon,
    SunIcon,
  },
  methods: {
    toggleTheme() {
      this.$colorMode.preference =
        this.$colorMode.preference === "light" ? "dark" : "light";
    },
  },
};
</script>
