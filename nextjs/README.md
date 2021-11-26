# To Dos with Next.js

## 사용해보며 느낀 점

React 프레임워크답게, React to do와 상당히 유사한 방법으로 개발하였다.

data fetch를 ssr을 지원하도록 개발할까 했으나, 지속적으로 업데이트되는 특성을 가진 해당 프로젝트에서는 적합하지 않다고 판단되어 적용하지 않았다.

더욱 자세히 공부하기 위해서는 다른 주제로 개발을 해야겠다고 생각되었지만, app을 생성하고 사용하는데 기본을 익힐 수 있어 만족스러운 경험이였다.

## 배운 점

- ### few cli

```bash
npx create-next-app@latest
# or
yarn create next-app

# TypeScript
npx create-next-app@latest --ts
# or
yarn create next-app --typescript
```

- ### Data fetching

[`getInitialProps`, `getStaticProps`, `getStaticPaths`, `getServerSideProps`](https://yceffort.kr/2020/03/nextjs-02-data-fetching)

fetch할 데이터에 대해 서버사이드 렌더링을 가능하게 하는 방법들이 있다. 하지만 해당 프로젝트에서는 적합하지 않다고 판단되어 사용하지는 않았다.
