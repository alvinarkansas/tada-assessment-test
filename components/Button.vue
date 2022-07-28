<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    class="flex items-center justify-center font-semibold transition-all"
    :class="[
      `bg-${bgColor} text-${color} hover:bg-opacity-80 rounded-full`,
      hasIconSlot ? 'p-1 pr-3' : 'py-[16.5px] px-6',
      { 'cursor-not-allowed bg-opacity-30 hover:bg-opacity-30 text-anodyne-400': loading || disabled },
    ]"
  >
    <div class="grid grid-flow-col auto-cols-max gap-2">
      <div
        v-if="hasIconSlot"
        class="h-full w-full flex items-center justify-center"
      >
        <LoadingIcon v-if="loading" :size="10" class="animate-spin" />
        <slot v-else name="icon"></slot>
      </div>
      <div
        v-if="!hasIconSlot && loading"
        class="h-full w-full flex items-center justify-center"
      >
        <LoadingIcon :class="{ 'animate-spin': loading }" />
      </div>
      <div v-if="hasDefaultSlot" class="h-full w-full flex items-center">
        <p v-if="!loading" class="leading-[15px]">
          <slot></slot>
        </p>
        <template v-else>
          <p v-if="loadingLabel" class="leading-[15px]">
            {{ loadingLabel }}
          </p>
        </template>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    bgColor: {
      type: String,
      default: "shade-200",
    },
    color: {
      type: String,
      default: "anodyne-100",
    },
    label: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingLabel: {
      type: String,
      default: "Loading...",
    },
    type: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    hasIconSlot() {
      return !!this.$slots["icon"];
    },
  },
};
</script>

<style>
</style>