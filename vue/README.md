# To Dos with Vue

## 사용해보며 느낀 점

vue는 익히 들었듯이 angular와 react를 교묘히 잘 섞은 듯한 느낌을 받았다.

template을 사용하는 점에서 angular와 굉장히 닮았다고 생각하였으나, service나 hook과 같은 기본적으로 내재된 데이터 핸들링 방법의 부재는 크게 단점으로 생각됐다.

> 공식적으로 지원하는 vuex를 사용할 수 있지만, axios외에 추가적인 설치없이 개발하는 것을 목표로 하였기에 사용하지 않았다.

`.vue` 파일에 `<template>`, `<script>`, `<style>`을 배치하는 방법은 굉장히 색다르게 느껴졌다. 물론 template 파일을 분리하여 사용하는 방법도 제공하지만 한 파일에 모아서 작성하는 것이 CSS-in-JS를 사용하는 React와 닮았다는 인상을 받았다.

CSS-in-JS가 나와서 기술하자면, vue는 추가적인 라이브러리없이 컴포넌트 scope 스타일링이 가능하며, 이를 통해 한 컴포넌트에 적용된 스타일을 한 파일에서 볼 수 있다는 점이 장점이라고 생각되었다. 추가적으로 `styled-components`, `emotion`을 지원한다고 공식문서에 기재되어 있다.

가장 특이하게 느껴진 점은 template에서 사용될 부분과 life cycle에 대한 접근을 `export default`문을 이용하여 작성하는 점이었다. 간단한 서비스를 개발할 때는 가독성이 매우 높을 것으로 예상되나 복잡한 기능을 가진 서비스를 구현한다면 오히려 러닝커브가 높을 것 같다는 느낌을 받았다.

Todo 앱을 개발하며 가장 힘들었던 부분은 vue의 `반응성` 시스템이였다. 이는 아래에 코드와 함께 자세히 기술하니, 해당 부분을 확인해보면 좋을 것 같다. 간단히 기술하자면, proxy 객체를 사용하면서 이에 대한 접근법이 명확하게 느껴지지 않았다는 점이다. 많은 stackoverflow 게시물에서 확인할 수 있었던 야매같은 방법으로 사용해, 썩 기분이 좋지만 않은 경험이었다.

이외에 개인적으로 느낀 점이라면 공식 문서가 매우 잘되어 있는 편이지만, 가독성이 좋게 느껴지지는 않았다. 주로 공식문서의 자습서를 보고 개발을 하며 필요한 부분을 배우는 방식으로 진행해왔어서, 해당 부분이 단순히 예제로 기술되어 있는 점이 이렇게 느껴지게 만들지 않았나 생각된다.

전체적인 느낌은 빠른 프로토타이핑을 원하거나, 규모가 작은 서비스를 개발할 때 적합한 프레임워크라고 생각되었다. 추가적인 라이브러리가 많이 필요하지 않고 자체적으로 route, component scope style 등을 사용할 수 있는 점을 살려 그렇게 생각하게 되었으며 공식문서에도 프로토타이핑에 적합하다고 기술되어 있어 이렇게 생각되는 것 같다.

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
