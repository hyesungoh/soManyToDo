<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" v-model="input" />
    <button type="submit">확인</button>
  </form>
</template>

<script>
export default {
  name: "TodoForm",
  data() {
    return { input: "" };
  },
  methods: {
    onSubmit: function () {
      console.log(this.input);
      this.input = "";
    },
  },
};
</script>

<style scoped>
</style>