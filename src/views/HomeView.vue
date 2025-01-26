<template>
  <div class="home">
    <h1>Home</h1>
    <button class="ui primary button">Save</button>
    <button class="ui button">Discard</button>
  </div>
</template>

<script>
import BasicLayout from "@/layouts/BasicLayout.vue";

export default {
  name: "HomeView",
  components: {
    BasicLayout,
  },
};
</script>
