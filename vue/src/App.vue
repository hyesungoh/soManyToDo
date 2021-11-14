<template>
  <div>
    <h1>oh to dos vue</h1>
    <TodoList :todoList="todoList" :deleteTodo="deleteTodo"/>
    <TodoForm :createTodo="createTodo" />
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import { get, post, del } from "./lib/api";

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
      this.todoList.splice(0, this.todoList.length);
      this.todoList.push(...response.records);
    },
    async createTodo(todoString) {
      await post("/todo", { fields: { name: todoString } });
      this.refreshTodos();
    },
    async deleteTodo(todoId) {
      await del(`/todo/${todoId}`);
      this.refreshTodos();
    },
  },
  mounted() {
    this.refreshTodos();
  },
};
</script>

<style></style>
