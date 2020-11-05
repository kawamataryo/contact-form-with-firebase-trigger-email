<template>
  <Contact />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Contact from "@/pages/Contact.vue";

export default defineComponent({
  name: "App",
  components: {
    Contact
  }
});
</script>
