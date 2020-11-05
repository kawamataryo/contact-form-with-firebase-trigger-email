<template>
  <div class="has-text-centered mt-5">
    <h1 class="is-size-3 mb-5">お問い合わせ</h1>
    <ContactForm/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ContactForm from "@/components/ContactForm.vue";

export default defineComponent({
  components: {
    ContactForm
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
