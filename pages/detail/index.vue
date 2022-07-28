<template>
  <header
    class="
      flex
      justify-between
      mb-8
      p-8
      bg-anodyne-100
      dark:bg-anodyne-700
      rounded-lg
    "
  >
    <h1>#XM9141</h1>
    <div class="flex items-center gap-4">
      <Button bg-color="anodyne-700">Edit</Button>
      <Button bg-color="error-200">Delete</Button>
      <Button>Mark as Paid</Button>
    </div>
  </header>

  <section
    class="flex flex-col p-8 bg-anodyne-100 dark:bg-anodyne-700 rounded-lg"
  >
    <h2>Lorem, ipsum dolor.</h2>
  </section>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "DetailPage",
  components: {
    Button,
  },
  mounted() {
    console.log("Detail Page");
  },
};
</script>