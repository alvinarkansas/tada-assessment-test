<template>
  <div
    class="
      rounded-lg
      bg-success-200
      text-success-100 text-lg
      py-2
      px-4
      flex
      justify-center
      items-center
      gap-2
      font-semibold
      min-w-[128px]
    "
    :class="[
      { 'bg-success-100 dark:bg-success-300 text-success-200 text-lg': variant === 'success' },
      { 'bg-warning-100 dark:bg-warning-300 text-warning-200 text-lg': variant === 'warning' },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Badge",
  props: {
    variant: {
      type: String,
      default: "success",
    },
  },
};
</script>