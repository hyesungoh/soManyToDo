import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoDataService } from '../todo-data.service';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private todoDataService: TodoDataService
  ) {}

  todoForm = this.formBuilder.group({ todo: '' });

  ngOnInit(): void {}

  onSubmit = (): void => {
    this.todoDataService.createTodo(this.todoForm.value['todo'])
    this.todoForm.reset();
  };
}
