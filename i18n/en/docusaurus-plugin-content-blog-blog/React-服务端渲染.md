---
slug: react-ssr
title: Simple implementation of React server-side rendering
date: 2022-01-14T14:45:02.000Z
tags:
  - React
  - SSR
  - React Router
categories:
  - Front-end
  - React
keywords:
  - React server-side rendering
  - React SSR
  - React Router
description: Simple implementation of React server-side rendering
authors: Alan
summary: >-
  This article introduces how to build a simple server-side rendering
  application using React, Express and Redux. The server is mainly responsible
  for finding the corresponding components, handling Redux and API. The client
  is responsible for injection and hydration operations. Components can define a
  `getServerSideProps` method to get server-side data. In this way, server-side
  rendering can be achieved to improve the performance of the application.
ai_translation: true
---

I think this [article](https://segmentfault.com/a/1190000038336185) explains the concept very vividly.

<!--truncate-->

## Technology stack

- React
- Express
- Redux

## Source code

[View](https://github.com/3Alan/simple-ssr)

## General process

![Flowchart](https://raw.githubusercontent.com/3Alan/images/master/img/20220114232321.png)

## Server

The server mainly handles the shrinking (renderToString) of the corresponding components, handles Redux, handles `getServerSideProps`, and the api is modeled after `Next.js`.

### Find the corresponding component

First, in order to facilitate the unified management of dual-end routing, we maintain a `routes` list separately.

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

First get the `url` visited by the user and find the component corresponding to the route through `matchRoutes`.

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

  // renderMatches is an api provided by react-router to render the results of matchRoutes, the final content is the component injected with redux data, the shrinking/dehydration process
  const content = renderToString(<Provider store={store}>{renderMatches(matches)}</Provider>);

  // Splice the content into the previously set html template
  const response = template(store.getState(), content);

  // Return html to the user
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
});
```

## Client

### Injection

The code of the above `template` is as follows

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

Injection/hydration operation

```js
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const state = window.__STATE__;
delete window.__STATE__;

// Initialize store, keep both ends unified
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

## Component writing

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

## Summary

To put it simply, the server finds the component that needs to be rendered through the url, injects the data returned by `getServerSideProps` into the component, and then uses `renderToString` to shrink it and return it to the client.

The client uses hydrate for injection, and during this phase React will reuse the HTML structure as much as possible, and React will initialize the work based on the HTML structure returned by the server.
