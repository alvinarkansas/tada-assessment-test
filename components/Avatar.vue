<template>
  <div
    v-if="!src"
    :style="avatarStyle"
    class="bg-shade-200 rounded-full flex flex-col justify-center items-center cursor-default select-none"
  >
    <p class="text-white font-medium">{{ placeholder[0] }}</p>
    <slot />
  </div>
  <div v-else :style="avatarStyle" class="grid place-items-center rounded-full cursor-default select-none">
    <img :src="src" alt="avatar" :style="avatarStyle" class="rounded-full object-cover w-full" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    size: {
      type: Number,
      default: 32,
    },
    src: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  computed: {
    avatarStyle() {
      return {
        width: `${this.size.toString()}px`,
        height: `${this.size.toString()}px`,
      };
    },
  },
};
</script>
