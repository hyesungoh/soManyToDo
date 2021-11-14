<template>
  <div>
    <ul v-for="todo in todos" :key="todo.id">
      <li :id="todo.id">
        {{ todo.fields.name }}
        <button v-on:click="onDeleteClick">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: ["todoList", "deleteTodo"],
  computed: {
    todos: function () {
      const p = new Proxy(this.todoList, {});
      return JSON.parse(JSON.stringify(p));
    },
  },
  methods: {
    onDeleteClick: function (e) {
      const { id } = e.target.parentNode;
      this.deleteTodo(id);
    },
  },
};
</script>

<style scoped>
</style>