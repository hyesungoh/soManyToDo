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

  onDeleteClick = (e: Event) => {
    const { parentNode } = e.target as Element;
    const { id } = parentNode as Element;
    this.todoDataService.deleteTodo(id);
  };

  ngOnInit(): void {
    this.getTodos();
  }
}
