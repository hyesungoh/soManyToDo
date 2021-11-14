<template>
  <ul :v-for="todo in this.todos">
    <li v-if="todo">{{ todo.id }}</li>
  </ul>
</template>

<script>
export default {
  name: "TodoList",
  props: ["todoList"],
  computed: {
    todos: function () {
      const p = new Proxy(this.todoList, {});
      return JSON.parse(JSON.stringify(p));
    },
  },
};
</script>

<style scoped>
</style>