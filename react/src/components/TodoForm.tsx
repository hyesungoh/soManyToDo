import { FormEvent, useRef } from "react";

interface TodoFormProps {
  createTodo: (todoString: string) => void;
}

function TodoForm({ createTodo }: TodoFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;

    createTodo(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">확인</button>
    </form>
  );
}

export default TodoForm;
