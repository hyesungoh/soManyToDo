import { useRef } from "react";

function TodoForm() {
  const inputRef = useRef();

  function onSubmit(e) {
    e.preventDefault();
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">확인</button>
    </form>
  );
}

export default TodoForm;
