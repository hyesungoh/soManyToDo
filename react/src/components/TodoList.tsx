import { ITodo } from "../hooks/useTodos";

interface TodoListProps {
  todos: ITodo[];
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <li>{todo.fields.name}</li>
      ))}
    </ul>
  );
}

export default TodoList;
