import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IGetToDos, IToDo } from './todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  todos: IToDo[] = [];

  constructor(private http: HttpClient) {}

  refreshTodos = () => {
    this.http
      .get<IGetToDos>(`${environment.baseUrl}/todo`)
      .subscribe((data) => {
        this.todos.splice(0, this.todos.length);
        this.todos.push(...data.records);
      });
  };

  getTodos = () => {
    this.refreshTodos();
    return this.todos;
  };

  createTodo = async (todoString: string) => {
    this.http
      .post<IGetToDos>(`${environment.baseUrl}/todo`, {
        fields: { name: todoString },
      })
      .subscribe((_) => {
        this.refreshTodos();
      });
  };

  deleteTodo = (todoId: string) => {
    this.http
      .delete<IGetToDos>(`${environment.baseUrl}/todo/${todoId}`)
      .subscribe((_) => this.refreshTodos());
  };
}
