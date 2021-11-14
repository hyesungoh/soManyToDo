import { get, post, del } from "./index";

export async function refreshTodos() {
  const response = await get("/todo");
  this.todoList.splice(0, this.todoList.length);
  this.todoList.push(...response.records);
}

export async function createTodo(todoString) {
  await post("/todo", { fields: { name: todoString } });
  this.refreshTodos();
}

export async function deleteTodo(todoId) {
  await del(`/todo/${todoId}`);
  this.refreshTodos();
}
