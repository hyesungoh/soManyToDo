import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

function App() {
  const { todos, createTodo, deleteTodo } = useTodos();

  return (
    <div>
      <h1>oh to do react</h1>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <TodoForm createTodo={createTodo} />
    </div>
  );
}

export default App;
