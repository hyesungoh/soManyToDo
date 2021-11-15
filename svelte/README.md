# To Dos with Svelte

## 사용해보며 느낀 점

Svelte의 가장 큰 특징이라면, Virtual DOM을 사용하지 않는다는 점이다.

기존 프레임워크에서 Virtual DOM은 일반적인 상황에서 성능이 보장된다는 점과 함께 선언적, 상태 중심 UI 개발을 상태 전환에 대해 생각하지 않고 개발을 진행할 수 있기 떄문에 가치가 있다고 하는데 이와 같은 점을 Virtual DOM 없이 가능하다는 것을 Svelte가 알려주고 있다.

> [Svelte 공식문서 참고](https://svelte.dev/blog/virtual-dom-is-pure-overhead)

Svelte는 앞서 기술했듯이 Virtual DOM을 사용하지 않고 Compile이란 방법을 택하였다. 사용해보니 체감은 물론, 성능적으로 무리가 없는 방법이라고 생각되었다. 다양한 성능의 테스트 결과는 [핀란드 투르크 대학교의 논문](https://www.doria.fi/bitstream/handle/10024/177433/levlin_mattias.pdf?sequence=2&isAllowed=y) 66쪽부터 확인할 수 있다.

성능적인 면은 축약하고 개발 경험에 대해서 기술하자면 제일 최근에 개발된 프레임워크라 그런지 굉장히 짧고 깔끔한 코드로 다른 프레임워크들의 기능을 구현할 수 있었다.

전체적인 느낌을 기술하자면 template와 script에 대한 분리는 `vue`와 닮았으며 template binding, logic은 `react`와, 데이터의 플로우는 `angular`와 닮았다고 생각되었다.

특히 angular의 service와 같은 용도로 사용할 수 있는 svelte의 `store` 기능은 상당히 매력적으로 느껴졌다. 추가적인 라이브러리 설치없이 `recoil`을 사용할 수 있 것처럼 느껴졌다.

비교하였을 때 아쉬운 점이라면 `router`에 대한 지원이 없다는 것이였다. 커스텀 router를 개발하거나 라이브러리를 사용할 수는 있지만, 공식적으로 지원하는 router의 부재는 아쉽게 느껴졌다.

앞서서 vue를 사용하며 느낀 점에서 빠른 프로토타이핑을 원할 시에 사용할 것 같다고 기술하였는데, svelte를 경험해보니 빠른 프로토타이핑을 요구하는 SPA일 시 svelte가 가장 적합할 것 같다고 느껴졌다. vue에 비해서도 낮은 러닝커브를 가지고 있으며 반응성에 대한 구현이 상대적으로 매우 쉽게 느껴져 가장 사랑받는 프레임워크 1위를 달성한 이유를 알 것 같다고 느껴졌다. 앞으로 svelte의 생태계가 커지면 좋을 것 같다고 생각된다.

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
