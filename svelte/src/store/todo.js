import { writable } from "svelte/store";
import { get } from "../api";

function todoAction() {
  const { subscribe, set, update } = writable([]);

  const refreshTodo = async () => {
    const response = await get("/todo");
    set(response.records);
  };

  return { subscribe, refreshTodo };
}

export const todos = todoAction();
