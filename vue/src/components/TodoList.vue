<template>
  <ul></ul>
</template>

<script>
export default {
  name: "TodoList",
  props: ["todoList"],
  created() {
    console.log(JSON.parse(JSON.stringify(this.todoList)));
  },
};
</script>

<style scoped>
</style>