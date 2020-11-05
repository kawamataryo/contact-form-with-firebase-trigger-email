<template>
  <transition name="fade">
    <div
      v-show="visible"
      class="notification is-light mt-2"
      :class="`is-${color}`"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "@vue/runtime-core";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const timeoutId = ref<number | null>(null);
    watchEffect(() => {
      if (!props.visible) {
        return;
      }
      if (timeoutId.value) {
        clearTimeout(timeoutId.value);
      }
      timeoutId.value = setTimeout(() => {
        emit("close");
      }, 4000);
    });
    return {};
  }
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
