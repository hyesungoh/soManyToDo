import { writable } from "svelte/store";
import { get, post } from "../api";

function todoAction() {
  const { subscribe, set, update } = writable([]);

  const refreshTodo = async () => {
    const response = await get("/todo");
    set(response.records);
  };

  const createTodo = async (todoString) => {
    await post("/todo", { fields: { name: todoString } });
    refreshTodo();
  };

  return { subscribe, refreshTodo, createTodo };
}

export const todos = todoAction();
