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

  return { todos };
}

export default useTodos;
