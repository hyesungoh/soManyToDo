import { Injectable } from '@angular/core';

import { IToDo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  todos: IToDo[] = [{ name: '이름' }, { name: '이름' }, { name: '이름2' }];
  constructor() {}

  getTodos = () => {
    return this.todos;
  };

  createTodo = (todoString: string) => {
    this.todos.push({ name: todoString });
  };
}
