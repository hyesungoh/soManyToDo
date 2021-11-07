# To Dos with jQuery

## 사용해보며 느낀 점

해당 프로젝트를 진행하며 느낀 차이점이라면 fetch보다 jQuery의 `ajax`가 지원하는 기능이 다양한 점, querySelector보다 요소를 간단히 가져올 수 있는 점, eventListener 대신 `$().submit`처럼 간단히 접근할 수 있는 여러 메소드가 있는 점이였다.

fetch를 제외한 다른 차이점들은 vanilla가 더욱 명시적이라고 생각이 되어 장점이라고는 생각이 들지 않았다. fetch 마저도 axios로 대체하여 사용하는 것이 더욱 이점이 많다고 생각한다.

vanilla의 버전 업데이트로 인해 확실히 사용할 이유가 체감되지는 않았지만, vanilla가 발전하기 전이라면 충분히 사용할 만한, 사용해야만 했었던 라이브러리라고 생각된다.

현재의 시점에서는 사용할 이유가 없다는 것이 내 전체적인 느낌이다.

## 배운 점

-   ### Get element

```js
$("input"); // tag
$("#js-list"); // id
$(".js-form"); // class
```

`querySelector`와 매우 유사하나 반환값이 `jQuery` 오브젝트이다.

선언 후 jQuery 오브젝트가 아닌 dom에 접근하기 위해서는 `$()[0]`, `$().get(0)`과 사용해야 했다.

-   ### Ajax

```js
// setup
$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${bearerToken}`);
    },
});

// get
const response = await $.get(`${baseUrl}/todo`);

// post
await $.post(`${baseUrl}/todo`, { fields: { name: todoString } });

// delete
await $.ajax({
    type: "DELETE",
    url: `${baseUrl}/todo/${id}`,
});
```

`axios`를 사용하지 않고 jQuery의 ajax를 사용하였다.

`ajaxSetup`을 이용해 header를 설정할 수 있었지만 `baseUrl`의 부재와 객체를 모듈화해서 사용할 수 없는 점이 아쉬워 만약 jQuery를 다시 사용한다면 axios는 채용할 것 같다.

-   ### Method

```js
$("form").submit(handleSubmit);
$("#js-list").append(foo);
```

위 예제와 같이 vanilla의 메소드와 비슷한 성격을 가진 메소드들을 사용할 수 있다.
