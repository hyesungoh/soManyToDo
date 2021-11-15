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

