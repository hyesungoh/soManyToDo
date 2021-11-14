<script>
  import { onMount } from "svelte";
  import TodoList from "./components/TodoList.svelte";
  import TodoForm from "./components/TodoForm.svelte";
  import { todo } from "./store/todo";

  onMount(() => {
    console.log("asdf");
	console.log($todo);
  });
</script>

<main>
  <h1>oh to do svelte</h1>
  <TodoList />
  <TodoForm />
</main>
