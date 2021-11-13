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
