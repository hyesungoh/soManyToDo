import { writable } from "svelte/store";
import { get, post, del } from "../api";

function todoAction() {
  const { subscribe, set } = writable([]);

  const refreshTodo = async () => {
    const response = await get("/todo");
    set(response.records);
  };

  const createTodo = async (todoString) => {
    await post("/todo", { fields: { name: todoString } });
    refreshTodo();
  };

  const deleteTodo = async (todoId) => {
    await del(`/todo/${todoId}`);
    refreshTodo();
  };

  return { subscribe, refreshTodo, createTodo, deleteTodo };
}

export const todos = todoAction();
