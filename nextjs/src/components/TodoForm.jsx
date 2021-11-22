import { useRef } from "react";
import useTodos from "../hooks/useTodos";

function TodoForm() {
  const { createTodo } = useTodos();
  const inputRef = useRef();

  function onSubmit(e) {
    e.preventDefault();
    createTodo(inputRef.current.value);
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
