import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

function App() {
  const { todos, createTodo } = useTodos();

  return (
    <div>
      <h1>oh to do react</h1>
      <TodoList todos={todos} />
      <TodoForm createTodo={createTodo} />
    </div>
  );
}

export default App;
