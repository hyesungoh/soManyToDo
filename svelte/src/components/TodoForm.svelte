<script>
  let input = "";

  function onSubmit() {
    console.log(input);
    input = "";
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <input type="text" bind:value={input} />
  <button type="submit">확인</button>
</form>
