---
slug: react-ssr
title: React 服务端渲染简单实现
date: 2022-01-14T14:45:02.000Z
tags:
  - React
  - SSR
  - React Router
categories:
  - 前端
  - React
keywords:
  - React 服务端渲染
  - React SSR
  - React Router
description: React 服务端渲染的简单实现原理
authors: Alan
summary: |-
  React 服务端渲染（SSR）可以将 React 组件渲染成静态 HTML，然后在服务器端发送给客户端。这样可以提高页面的加载速度和性能。

  这个实现使用了 React、Express 和 Redux 技术栈，并提供了详细的源代码和流程图。

  服务端主要负责查找相应组件、处理 Redux 和 `getServerSideProps`，客户端则负责注水和初始化工作。

  组件可以定义 `getServerSideProps` 方法来获取服务端数据，并在组件中使用 `useSelector` 钩子来访问这些数据。

  总体来说，这个实现展示了 React SSR 的基本原理和实现方法，可以帮助理解和使用 React SSR。
---

关于概念，我觉得这篇[文章](https://segmentfault.com/a/1190000038336185)讲的很形象

<!--truncate-->

## 技术栈

- React
- Express
- Redux

## 源码

[查看](https://github.com/3Alan/simple-ssr)

## 大致流程

![流程图](https://raw.githubusercontent.com/3Alan/images/master/img/20220114232321.png)

## 服务端

服务端主要是对相应组件进行缩水处理（renderToString），处理 Redux，处理`getServerSideProps`， api 仿照了 `Next.js`。

### 查找相应组件

首先，为了方便双端路由的统一管理，我们单独维护一个 `routes` 列表。

```js
import React from 'react';
import Detail from './pages/Detail';
import List from './pages/List';

const routes = [
  {
    path: '/',
    element: <List />
  },
  {
    path: '/detail/:name',
    element: <Detail />
  }
];

export default routes;
```

首先拿到用户访问的 `url` 并通过 `matchRoutes` 查找路由对应的组件。

```js
import { renderToString } from 'react-dom/server';
import { matchRoutes, renderMatches } from 'react-router-dom';

app.get('*', (req, res) => {
  const matchedComponent = matchRoutes(routes, req.url);

  let reduxState = {};
  if (matchedComponent) {
    const { getServerSideProps } = matchedComponent[0].route.element.type;
    if (getServerSideProps) {
      const res = getServerSideProps();
      reduxState = { ...reduxState, ...res };
    }
  }

  const store = configureStore(reduxState);

  // renderMatches是react-router提供的渲染matchRoutes结果的api，最后的content为注入了redux数据的组件，缩水/脱水过程
  const content = renderToString(<Provider store={store}>{renderMatches(matches)}</Provider>);

  // 将content拼接到提前设置好的html模板中
  const response = template(store.getState(), content);

  // 将html返回给用户
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
});
```

## 客户端

### 注水

上面的 `template` 的代码如下

```js
function template(initialState = {}, content = '') {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/assets/style.css">
      </head>
      <body>
        <div id="app">
          ${content}
        </div>

        <script>
          window.__STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/assets/bundle/client.js"></script>
      </body>
    </html>
    `;
}
```

注水/水合操作

```js
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const state = window.__STATE__;
delete window.__STATE__;

// 初始化store，保持双端统一
const store = configureStore(state);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
);
```

## 组件写法

```jsx
import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { name } = useParams();
  const serverData = useSelector(state => state.serverData);

  return (
    <div>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div>{name}</div>

      <h4>
        <strong style={{ color: 'red' }}>{serverData}</strong>{' '}
      </h4>
    </div>
  );
};

Detail.getServerSideProps = () => {
  return {
    serverData: 'content init from serverSide'
  };
};

export default Detail;
```

## 总结

简单点来说就是服务端通过 url 查找到需要渲染的组件，注入 `getServerSideProps` 返回的数据到组件中后使用 `renderToString` 进行缩水并返回到客户端。

客户端通过 hydrate 进行注水，这一阶段 React 会尽可能的复用 HTML 结构，React 会根据服务端返回的 HTML 结构进行初始化工作。
