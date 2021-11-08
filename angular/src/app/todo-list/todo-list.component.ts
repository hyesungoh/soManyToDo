import { Component, OnInit } from '@angular/core';
import { IToDo } from '../todo';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor(private todoDataService: TodoDataService) {}

  todos: IToDo[] = [];

  getTodos = () => {
    this.todos = this.todoDataService.getTodos();
  };

  ngOnInit(): void {
    this.getTodos();
  }
}
