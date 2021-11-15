<script>
  import { onMount } from "svelte";
  import { todos } from "../store/todo";

  onMount(() => {
    todos.refreshTodo();
  });

  function onClickDelete(e) {
    const { id } = e.target.parentNode;
    todos.deleteTodo(id);
  }
</script>

<ul>
  {#each $todos as todo (todo.id)}
    <li id={todo.id}>
      {todo.fields.name}

      <button on:click={onClickDelete}>X</button>
    </li>
  {/each}
</ul>
