<template>
  <div>
    <h1>oh to dos vue</h1>
    <TodoList :todoList="todoList" />
    <TodoForm />
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import { get } from "./lib/api";

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
    async refreshTodos() {
      const response = await get("/todo");
      this.todoList = response.records;
    },
  },
  mounted() {
    this.refreshTodos();
  },
};
</script>

<style></style>
