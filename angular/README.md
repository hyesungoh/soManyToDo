# To Dos with Angular

## 사용해보며 느낀 점

## 배운 점

- ### few cli

```bash
# Project 생성
ng new projectName

# 서버 실행
ng serve --open

# Component 생성
ng generate component componentName

# Service 생성
ng generate service serviceName
```

- ### Using component

컴포넌트 생성 후, `ts` 파일의 `decorator`를 확인하면 다음과 같은 구문이 있다.

```ts
@Component({
  selector: 'app-todo-form',
  ...
})
```

해당 문자열을 이용하여 컴포넌트의 부모 html에 다음과 같이 사용할 수 있다.

```html
<app-todo-form></app-todo-form>
```

- ### Form builder

```ts
// ts
// ...
import { FormBuilder } from "@angular/forms";

// @Component ...
export class TodoFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  todoForm = this.formBuilder.group({ todo: "" });

  onSubmit = () => {
    console.log(this.todoForm.value);
    this.todoForm.reset();
  };
}
```

```html
<!-- html -->
<form [formGroup]="todoForm"></form>
```

```ts
// app.module.ts
@NgModule({
    // ...
    imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
    // ...
})
```

`FormBuilder`를 사용하여 form에 대해 접근, 제어 가능

- ### Event binding

```html
<form [formGroup]="todoForm" (ngSubmit)="onSubmit()"></form>
```

위 예제 컴포넌트에서 생성한 `onSubmit` 메소드를 `ngSubmit`을 이용해 바인딩 가능

- ### Service

`Component`는 데이터를 핸들링하지 않고, UI에 관한 로직만 위치하게 하고

`Service`를 만들어 데이터를 처리하는 로직을 위임하는 것이 좋다고 한다.

```ts
// service
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TodoDataService {
  todos: IToDo[] = [{ name: "이름" }, { name: "이름" }, { name: "이름2" }];
  constructor() {}

  getTodos = (): IToDo[] => {
    return this.todos;
  };

  createTodo = (todoString: string) => {
    this.todos.push({ name: todoString });
    console.log(this.todos);
  };
}
```

해당 서비스는 `new` 키워드로 인스턴스를 직접 생성하지 않고, Angular의 `DI` 매커니즘에 따라 컴포넌트의 생성자로 주입된다.

```ts
// ...
import { TodoDataService } from "../todo-data.service";
// @Component
export class TodoFormComponent implements OnInit {
  constructor(
    // ...
    private todoDataService: TodoDataService
  ) {}

  // ...
  onSubmit = (): void => {
    this.todoDataService.createTodo(this.todoForm.value["todo"]);
    this.todoForm.reset();
  };
}
```

여러 클래스에서 사용되는 정보를 공유하려면 서비스를 사용하는 방법이 가장 좋다고 한다.

> 내 상황에서는 todoForm에서 입력을, todoList에서 출력을 담당하여 서비스를 적용하였다

- ### Display data

```ts
// Component
// ...
export class TodoListComponent implments OnInit {
    constructor(private todoDataService: TodoDataService) {}

    todos: IToDo[] = [];

    getTodos = () => {
        this.todos = this.todoDataService.getTodos();
    }

    ngOnInit(): void {
        this.getTodos();
    }
}
```

```html
<ul *ngFor="let todo of todos">
  <li>{{ todo.name }}</li>
</ul>
```

예제와 같이 클래스에 선언된 변수에 대해 접근이 가능하며 `ngFor`을 사용하여 데이터를 렌더링 할 수 있다.
