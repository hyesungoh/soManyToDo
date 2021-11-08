import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  todoForm = this.formBuilder.group({ todo: '' });

  ngOnInit(): void {}

  onSubmit = (): void => {
    console.log(this.todoForm.value);
    this.todoForm.reset();

  };
}
