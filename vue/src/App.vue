<template>
  <div>
    <h1>oh to dos vue</h1>
    <todo-list />
    <todo-form />
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoList,
    TodoForm,
  },
};
</script>

<style></style>
