<template>
  <div>
    <ul v-for="todo in todos" :key="todo.id">
      <li>{{ todo.fields.name }}</li>
    </ul>
  </div>
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