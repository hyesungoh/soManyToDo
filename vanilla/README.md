# To Dos with Vanilla JS

## 배운 점

-   ### Webpack

#### 사용 이유

Vanilla JS를 모듈화함과 동시에 axios 패키지를 사용하는데 많은 에러를 겪었습니다.

이참에 Webpack을 도입하는 것부터 해보고자 도입하였습니다.

#### 사용 방법

```bash
npm install webpack webpack-cli --save-dev
```

```html
<!-- index.html -->
<script src="dist/main.js"></script>
```

```json
// package.json
{
    "scripts": {
        "build": "webpack"
    }
}
```
