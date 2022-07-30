<template>
  <div class="invoice-card">
    <div
      class="
        flex
        justify-between
        mb-5
        md:items-center md:mb-0 md:gap-6 md:basis-1/2
      "
    >
      <p class="font-bold md:min-w-[72px]">
        <span class="text-anodyne-500">#</span>{{ detail.invoice_no }}
      </p>
      <p
        class="
          text-lg text-anodyne-500
          dark:text-anodyne-300
          mb-1
          hidden
          md:block md:min-w-[144px]
        "
      >
        Due {{ detail.due_date }}
      </p>
      <p class="text-anodyne-500 dark:text-anodyne-300 md:flex-1">
        {{ detail.name }}
      </p>
    </div>
    <div class="flex justify-between items-center md:gap-6">
      <div class="md:flex md:items-center">
        <p
          class="text-lg text-anodyne-500 dark:text-anodyne-300 mb-1 md:hidden"
        >
          Due {{ detail.due_date }}
        </p>
        <p class="text-2xl font-bold">
          {{ $currency(detail.amount) }}
        </p>
      </div>
      <Badge :variant="detail.status">
        <span class="text-3xl">•</span>
        <span class="capitalize">{{ detail.status }}</span>
      </Badge>
      <ChevronRightIcon class="right-chevron" />
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from "@heroicons/vue/solid";

export default {
  name: "InvoiceCard",
  components: {
    ChevronRightIcon,
  },
  props: {
    detail: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.invoice-card {
  @apply rounded-lg;
  @apply cursor-pointer;
  @apply transition-colors;
  @apply bg-anodyne-100 hover:bg-anodyne-100/60 dark:bg-anodyne-700 hover:dark:bg-anodyne-600;
  @apply p-6;
  @apply md:flex md:justify-between;
}
.right-chevron {
  @apply hidden md:block;
  @apply h-6 w-6;
  @apply transition-all;
  @apply text-anodyne-600 dark:text-shade-200;
}
.invoice-card:hover .right-chevron {
  @apply h-7 w-7 text-shade-200;
}
</style>