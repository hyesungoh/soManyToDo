# To Dos with Svelte

## 사용해보며 느낀 점

## 배운 점

- ### few cli

```bash
# 프로젝트 생성
npx degit sveltejs/template projectName

# 프로젝트 실행
npm run dev
```

- ### Using component

```svelte
<script></script>

<!-- Cool.. -->
<p></p>

<style></style>
```

위와 같은 구조로 구분하여 한 파일에 작성 가능

- ### Nested component

```svelte
<!-- Foo.svelte -->
<script></script>

<p>Im foo</p>
```

```svelte
<!-- Parents.svelte -->
<script>
    import Foo from "./Foo.svelte";
</script>

<p>Im parents</p>
<Foo />
```

매우 간단한 방법으로 component를 생성, 개발, 사용이 가능하다

- ### Store

Svelte는 Angular의 service와 거의 동일한 기능을 제공하며 더욱 간단히 사용할 수 있는 `Store` 기능을 제공하고 있다

```js
// store.js
import { writable } from "svelte/store";

function createCount() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0),
  };
}

export const count = createCount();
```

```svelte
<!-- main.svelte -->
<script>
	import { count } from './stores.js';
</script>

<h1>The count is {$count}</h1>


<!-- button.svelte -->
<script>
	import { count } from './stores.js';
</script>

<button on:click={count.increment}>+</button>
<button on:click={count.decrement}>-</button>
<button on:click={count.reset}>reset</button>
```

위와 같이 `wriable`을 사용하여 전역 state를 생성할 수 있으며, `$` 키워드를 이용하여 구독한 값을 참조할 수 있다.

이를 이용해 `store` 파일에 data fetch에 대한 위임을 할 수 있다.

- ### Life cycle

```svelte
<script>
    import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";

    onMount(()=>{
        console.log("");
    })
</script>
```

`onMount`, `onDestroy`, `beforeUpdate`, `afterUpdate`를 import하여 컴포넌트의 life cycle에 접근 할 수 있다.

- ### List rendering

```svelte
<script>
    const todos = [
        {id: 1, name: "foo"},
        {id: 2, name: "bar"},
        {id: 3, name: "baz"},
    ];
</script>

{#each todos as todo (todo.id)}
    <p>{todo.name}</p>
{/each}
```

`#each`를 이용하여 리스트 렌더링을 할 수 있다. `(todo.id)` 구문처럼 해당 렌더링 객체의 `key` 값을 할당할 수 있다.
