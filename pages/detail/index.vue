<template>
  <NuxtLayout name="default">
    <header class="flex justify-between mb-8">
      <h1 class="text-2xl font-bold">#XM9141</h1>
      <div class="flex items-center gap-4">
        <Button class="hidden md:flex bg-anodyne-500">Edit</Button>
        <Button class="hidden md:flex bg-error-200">Delete</Button>
        <Button>Mark as Paid</Button>
      </div>
    </header>

    <section class="flex flex-col mb-8">
      <h2>Lorem, ipsum dolor.</h2>
    </section>

    <section class="flex flex-col gap-4 md:hidden">
      <Button class="bg-anodyne-500">Edit</Button>
      <Button class="bg-error-200">Delete</Button>
    </section>
  </NuxtLayout>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "DetailPage",
  setup() {
    definePageMeta({ layout: false });
  },
  components: {
    Button,
  },
  mounted() {
    console.log("Detail Page");
  },
};
</script>

<style scoped>
header,
section {
  @apply p-8;
  @apply rounded-lg;
  @apply bg-anodyne-100 dark:bg-anodyne-700;
}
</style>