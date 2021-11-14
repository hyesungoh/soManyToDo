<template>
  <div>
    <h1>oh to dos vue</h1>
    <TodoList :todoList="todoList" :deleteTodo="deleteTodo" />
    <TodoForm :createTodo="createTodo" />
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import { refreshTodos, createTodo, deleteTodo } from "./api/todo";

export default {
  name: "App",
  components: {
    TodoList,
    TodoForm,
  },
  data() {
    return {
      todoList: [],
    };
  },
  methods: {
    refreshTodos,
    createTodo,
    deleteTodo,
  },
  mounted() {
    this.refreshTodos();
  },
};
</script>

<style></style>
