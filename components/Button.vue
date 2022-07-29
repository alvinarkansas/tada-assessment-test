<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    class="
      flex
      items-center
      justify-center
      font-semibold
      hover:bg-opacity-80
      rounded-full
      bg-shade-200
      transition-all
    "
    :class="[
      hasIconSlot ? 'p-1 pr-3' : 'py-[16.5px] px-6',
      {
        'cursor-not-allowed bg-opacity-30 hover:bg-opacity-30 text-anodyne-400':
          loading || disabled,
      },
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
        <p v-if="!loading" class="leading-[15px] text-anodyne-100">
          <slot></slot>
        </p>
        <template v-else>
          <p v-if="loadingLabel" class="leading-[15px] text-anodyne-100">
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
      default: "button",
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
    getBgColor() {
      return "bg-" + this.bgColor;
    },
  },
};
</script>

<style>
</style>