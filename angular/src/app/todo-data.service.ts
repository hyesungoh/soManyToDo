import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IGetToDos, IToDo } from './todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  todos: IToDo[] = [{ id: '123', fields: { name: 'ㅎㅇ' } }];

  constructor(private http: HttpClient) {}

  getTodos = (): Observable<IGetToDos> => {
    return this.http.get<IGetToDos>(`${environment.baseUrl}/todo`, {
      headers: { Authorization: `Bearer ${environment.apiKey}` },
    });
  };

  createTodo = (todoString: string) => {
    // this.todos.push({ name: todoString });
  };
}
