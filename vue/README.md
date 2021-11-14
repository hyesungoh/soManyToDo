# To Dos with Vue

## 사용해보며 느낀 점

## 배운 점

- ### few cli

```bash
# cli 설치
npm i -g @vue/cli

# Project 생성
vue create projectName

# 서버 실행
npm start serve
yarn serve
```

- ### Using component

```vue
<template><div></div></template>

<script>
export default {
  name: "ComponentName",
};
</script>

// 지역 스타일링
<style scoped></style>
```

위와 같이 `Template`, `Script`, `Style`을 구분하여 한 파일에 작성 가능

- ### Using data and vue model

```vue
<template>
  <div>
    <h1>{{ name }}</h1>
    <input type="text" v-model="input" />
  </div>
</template>

<script>
export default {
    name: "ComponentName",
    data() {
        return {
            title: "todo"
            input: ""
        }
    }
}
</script>
```

`data`를 함수형식으로 선언 후 반환 오브젝트의 key 값을 이용해서 데이터와 VM 바인딩 가능

- ### Event Binding

```vue
<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" v-model="input" />
  </form>
</template>

<script>
export default {
  name: "ComponentName",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    onSubmit: function () {
      console.log(this.input);
      this.input = "";
    },
  },
};
</script>
```

`methods`에 이벤트시 실행될 메소드를 선언 후, `v-on` 키워드를 이용해 바인딩 가능

`.prevent`는 `e.preventDefault`, `.stop`은 `e.stopPropagation` 처럼 여러 키워드로 이벤트 제어 가능

- ### Component Props

```vue
// 자식 컴포넌트
<script>
export default {
  props: ["propName"],
};
</script>
```

```vue
// 부모 컴포넌트
<template>
  <ChildCompo :propName="data" />
</template>
```

- ### Life Cycle

기본적으로 `created`, `mounted`, `updated`, `unmounted`등이 여러가지 life cycle에 접근할 수 있다.

```vue
<script>
export default {
  name: "App",
  mounted() {
    console.log("mounted");
  },
};
</script>
```

- ### Deep reactivity

vue의 반응성 시스템 `proxy` 떄문에 높은 러닝커브를 느꼈다.

이것이 vue를 다른 기술과 구분짓는 비간섭적인 반응성 시스템이라고 하는데, 내 개발자 경험은 좋지 않았다고 먼저 기술한다.

일단 내 상황은 API에서 fetch한 데이터를 Props로 내려 해당 컴포넌트에서 렌더링하는 과정이였는데, 해당 자식 컴포넌트에서 props로 받은 데이터가 proxy 객체였다.

proxy 객체의 target에 접근하는 방법은 공식 문서에서 기술되어 있는 대로 작성하여도 해결이 되지 않았고 여러 stackoverflow 게시물에서 접할 수 있는 JSON 객체를 사용한 방법으로 해결하였다.

props로 받은 데이터를 바로 렌더링에 활용할 수 있지 않아, `computed` 속성을 사용하였다.

```vue
<script>
export default {
  name: "TodoList",
  props: ["todoList"],
  computed: {
    todos: function () {
      const p = new Proxy(this.todoList, {});
      return JSON.parse(JSON.stringify(p));
    },
  },
};
</script>
```

JSON 객체를 사용한 부분이 퍼포먼스적으로도 안좋으며 상당히 비효율적이 코드 구조라고 생각되었다. React의 State가 굉장히 그리워졌다.

- ### List Rendering

```vue
<template>
  <div>
    <ul v-for="todo in todos" :key="todo.id">
      <li>{{ todo.fields.name }}</li>
    </ul>
  </div>
</template>
```

일반 정적인 배열 혹은 오브젝트에 대해서 위와 같이 `v-for`을 이용해 렌더링이 가능하다.

하지만 재렌더링이 되는 경우를 위해 `key` 속성을 줄 수 있다.

> 나는 fetch된 데이터를 렌더링하는 경우에서 key 값을 제외하고 사용 시 렌더링이 되지 않았다.
