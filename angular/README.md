# To Dos with Angular

## 사용해보며 느낀 점

프레임워크에서 오는 장점과 단점을 많이 느꼈다.

일단 다양한 기능을 지원하는 cli는 초기에는 편하기 떄문에 장점으로 느껴졌으나 하나의 컴포넌트를 생성하는데 여러가지 파일이 필요함에 따라 cli 의존도가 높아짐과 동시에 개인적으로 여러 파일로 나누어져 있는 모습이 장점처럼 느껴지지는 않았다.

기본 라이브러리들로 거의 모든 기능을 구현할 수 있다는 것 또한 선택을 할 이유가 없어져서 초기에는 편하게 느껴졌으나 확장성, flexible(융통성?) 적인 면에서 단점으로 생각되었다.

물론 장점이라고 생각되는 것도 있었는데 `service`의 DI 개념이 마음에 들었다. 물론 다른 프레임워크도 이처럼 사용할 수는 있으나, 추가적인 라이브러리없이 angular처럼 여러 컴포넌트에서 구독하여 사용할 수는 없다고 생각이 된다. (아직 vue, svelte를 체험하지 않은 상태)
Service 사용하므로써 데이터와 UI에 관한 분리를 조금 더 명확히 할 수 있기에 좋다고 생각이 들었다.

하지만 이 때문에 생긴 단점도 있는데, 그것은 러닝커브가 높다는 것이였다. 나의 경우 Django, RubyonRails 등 BE 프레임워크를 접해봐서 그런지 어렵지 않게 접근할 수 있었지만, 기존 React 혹은 Vanilla만 접했던 개발자라면 처음 러닝커브가 높을 수 밖에 없는 난이도라고 생각되었다. 이 외에 'rxjs'에 관한 지식이 있어야 하는 단점이 있었으나 나는 일단 공식문서를 따라하는 정도로 학습하였다.

높은 러닝커브 때문에 Angular를 잘 다루는 인원들로 이루어졌을 때, 속히 말하는 Angular의 장점인 엔터프라이즈 레벨에 접합하다, 유지보수가 쉽다 등의 장점이 이루어질 것이라 생각이 들었다.

추가적으로는 공식문서가 잘되어 있는 점 (거의 공식문서만 참고하여 개발할 수 있었다), SSR을 자체적으로 지원한다는 점 (사용해보진 않음)이 장점으로 생각되었으며 단점으로는 익히 들었던 번들링 사이즈가 큰 점이 있을 것 같다.

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

- ### Http call

```ts
// app.module.ts
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  // ...
  imports: [HttpClientModule]
})
```

```ts
// service
import { HttpClient } from "@angular/common/http";

// ...
export class TodoDataService {
  constructor(private http: HttpClient) {}

  todos: ITodo[] = [];

  refreshTodos = () => {
    this.http.get<IGetTodo>("url").subscribe((data) => {
      this.todos.splice(0, this.todos.length);
      this.todos.push(...data.records);
    });
  };
}
```

프레임워크이기에 추가적인 라이브러리 설치 없이 모듈에 `HttpClientModule`을 적용 후, 아래 예제와 같이 사용가능하다.

일반적인 Ajax 요청이 아닌 rxjs의 `observable` 객체를 반환하여 subscribe 후 요청이 이루어진다.

```ts
// ...
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
      .subscribe((_) => this.refreshTodos());
  };

  deleteTodo = (todoId: string) => {
    this.http
      .delete<IGetToDos>(`${environment.baseUrl}/todo/${todoId}`)
      .subscribe((_) => this.refreshTodos());
  };
}
```

그렇기에 나는 컴포넌트에서 바로 가공된 데이터를 사용할 수 있도록 하기 위해 subscribe를 담당하는 `refresh` 메소드를 두어 분리, 재사용하였다.

덕분에 컴포넌트에서는 해당 서비스의 `getTodos` 메소드를 사용하여 변경을 감지할 수 있었다.

> 변경 감지에 대한 말이 나와서 그런데, `this.todos = data.records`와 같이 대입하면 컴포넌트에서 변경을 감지못하고 `this.todos.push()`와 같이 메소드를 활용해야 변경을 감지할 수 있었다. 출력해본 결과 값은 변경을 하는데... 유추해본 봐로는 해당 변수의 주소를 구독하고 있어서 그런 것 같으나 자세히는 몰라 stackoverflow에 질문을 올려봐야겠다.

- ### Http interceptor

`airtable` api의 경우 header에 bearer token 값을 넣어주어야 사용할 수 있다. 그렇기에 axios를 사용했던 vanilla todo의 경우는 axios interceptor를, jQuery의 경우 ajaxSetup 메소드를 이용하였다.

Angular는 axios interceptor와 가장 유사한 interceptor 기능을 제공하였다.

```ts
// HttpInterceprotService
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request: HttpRequest<any>;
    request = req.clone({
      setHeaders: { Authorization: `Bearer ${environment.apiKey}` },
    });

    return next.handle(request);
  }

  constructor() {}
}
```

```ts
// app.module.ts
@NgModule({
  // ...
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorService,
        multi: true,
      },
    ],
})
```

위 예제처럼 Interceptor service를 `HttpInterceptor`를 구현하여 생성한 후, 모듈에 적용하면 끝이다.

프레임워크임에 확실히 정해진 대로 해야만 하는 느낌을 받았다. axios가 그리워지는 밤이다.
