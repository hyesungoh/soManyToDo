import { MouseEvent } from "react";
import { ITodo } from "../hooks/useTodos";

interface TodoListProps {
  todos: ITodo[];
  deleteTodo: (todoId: string) => void;
}

function TodoList({ todos, deleteTodo }: TodoListProps) {
  const onClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const { parentNode } = e.currentTarget;
    const { id } = parentNode as HTMLElement;
    deleteTodo(id);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li id={todo.id}>
          {todo.fields.name}

          <button onClick={onClickDelete}>X</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
