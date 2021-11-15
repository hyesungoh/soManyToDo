<script>
  import { onMount } from "svelte";
  import { todos } from "../store/todo";

  onMount(() => {
    todos.refreshTodo();
  });
</script>

<ul>
  {#each $todos as todo (todo.id)}
    <li>{todo.fields.name}</li>
  {/each}
</ul>
