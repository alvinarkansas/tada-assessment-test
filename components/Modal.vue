<template>
  <transition name="fade" appear>
    <div
      v-if="modelValue"
      class="
        w-screen
        h-screen
        bg-black bg-opacity-50
        fixed
        inset-y-0
        left-0
        z-50
      "
      @click="overlayClick"
    />
  </transition>
  <transition :name="screenWidth < 640 ? 'mobile-slide-up' : 'slide-up'" appear>
    <div
      v-if="modelValue"
      class="
        fixed
        modal-style
        p-4
        md:p-12 md:pl-28
        rounded-t-2xl
        md:rounded-tl-none md:rounded-r-2xl
        z-50
        transition-colors
        duration-500
        transform
      "
      :class="violated ? 'bg-error-100' : 'bg-anodyne-200 dark:bg-anodyne-800'"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import store from "@/stores";

export default {
  name: "Modal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    permanent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      violated: false,
    };
  },
  computed: {
    screenWidth() {
      return store.computed.screenWidth.get();
    },
  },
  methods: {
    overlayClick() {
      if (this.$attrs.onOverlayClick) {
        this.$emit("overlayClick");
      } else {
        if (!this.permanent) {
          this.$emit("update:modelValue", false);
        } else {
          this.violated = true;
          setTimeout(() => {
            this.violated = false;
          }, 500);
        }
      }
    },
  },
};
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active,
.mobile-slide-up-enter-active,
.mobile-slide-up-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateX(-50vw) !important;
}

.mobile-slide-up-enter-from,
.mobile-slide-up-leave-to {
  transform: translateX(100vw) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  z-index: 0;
}

.modal-style {
  @apply bottom-0 inset-x-0 md:right-auto md:top-0 md:left-0 overflow-y-auto md:max-w-[900px];
}
.modal-style::-webkit-scrollbar {
  width: 6px;
}
.modal-style::-webkit-scrollbar-track {
  @apply bg-anodyne-600;
}
.modal-style::-webkit-scrollbar-thumb {
  @apply bg-anodyne-500;
}
.modal-style::-webkit-scrollbar-thumb:hover {
  @apply bg-shade-200;
}
.inner-modal-fixed {
  height: 85vh;
}
.inner-modal-auto {
  height: auto;
}
.modal-xl {
  @screen sm {
    width: 85vw;
    height: 87.5vh;
  }
}
.modal-lg {
  @screen sm {
    min-width: 57.5vw;
    max-height: 75vh;
  }
}
.modal-md {
  @screen sm {
    min-width: 440px;
    max-width: 27.5vw;
    height: auto;
    max-height: 75.5vh;
  }
}
.modal-sm {
  @screen sm {
    min-width: 320px;
    max-width: 27.5vw;
    height: auto;
    max-height: 75.5vh;
  }
}
</style>
