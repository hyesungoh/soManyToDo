<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" v-model="input" />
    <button type="submit">확인</button>
  </form>
</template>

<script>
export default {
  name: "TodoForm",
  props: ["createTodo"],
  data() {
    return { input: "" };
  },
  methods: {
    onSubmit: function () {
      this.createTodo(this.input);
      this.input = "";
    },
  },
};
</script>

<style scoped>
</style>