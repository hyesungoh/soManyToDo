<script>
  import { todos } from "../store/todo";

  let input = "";

  function onSubmit() {
    todos.createTodo(input);
    input = "";
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <input type="text" bind:value={input} />
  <button type="submit">확인</button>
</form>
