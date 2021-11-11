import { useEffect, useState } from "react";
import { get, post, del } from "../lib/api";

export interface ITodo {
  id: string;
  fields: {
    name: string;
  };
}

interface IGetTodos {
  records: ITodo[];
}

function useTodos() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const refreshTodos = async () => {
    const response = await get<IGetTodos>("/todo");
    setTodos(response.records);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const createTodo = async (todoString: string) => {
    await post("/todo", { fields: { name: todoString } });
    refreshTodos();
  };

  const deleteTodo = async (todoId: string) => {
    await del(`/todo/${todoId}`);
    refreshTodos();
  };

  return { todos, createTodo, deleteTodo };
}

export default useTodos;
