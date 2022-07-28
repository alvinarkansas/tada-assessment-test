<template>
  <NuxtLayout>
    <div
      class="
        text-anodyne-800
        dark:text-anodyne-300
        bg-anodyne-200
        dark:bg-anodyne-800
      "
    >
      <Navbar />
      <main class="mt-16 md:mt-0 md:ml-16 dark:bg-anodyne-800">
        <div>
          <NuxtPage />
        </div>
      </main>
    </div>
  </NuxtLayout>
</template>

<script>
import store from "@/stores";

export default {
  methods: {
    handleResize() {
      console.log("???");
      // store.$patch({ screenWidth: window.innerWidth });
      store.computed.setScreenWidth(window.innerWidth);
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
};
</script>

<style>
main {
  min-height: calc(100vh - 4rem);
  @apply md:min-h-screen;
}
main > div {
  @apply p-6 md:py-24;
  @apply md:max-w-3xl md:mx-auto;
}
</style>