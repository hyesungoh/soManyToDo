import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

function App() {
  const { getTodos } = useTodos();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1>oh to do react</h1>
      <TodoList />
      <TodoForm />
    </div>
  );
}

export default App;
