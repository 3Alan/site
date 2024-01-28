---
slug: react-ssr
title: Simple Implementation of React Server-side Rendering
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
description: >-
  A simple explanation of the implementation principles of React server-side
  rendering.
authors: Alan
summary: >-
  This article introduces how to use React, Express, and Redux to build a simple
  server-side rendering application. The server is responsible for handling
  component rendering, Redux, and API requests. The client is responsible for
  hydration. Components can define a `getServerSideProps` method to fetch data
  on the server. This approach enables server-side rendering and improves the
  performance of the application.
ai_translation: true
---

Regarding the concept, I think this [article](https://segmentfault.com/a/1190000038336185) explains it well.

<!--truncate-->

## Tech Stack

- React
- Express
- Redux

## Source Code

[View](https://github.com/3Alan/simple-ssr)

## Overview

![Flowchart](https://raw.githubusercontent.com/3Alan/images/master/img/20220114232321.png)

## Server-side

The server-side mainly handles component rendering (renderToString), Redux, `getServerSideProps`, and an API that emulates `Next.js`.

### Finding the Corresponding Component

To facilitate unified management of client-side and server-side routing, we maintain a separate `routes` list.

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

First, we obtain the user's accessed URL and use `matchRoutes` to find the route that matches the URL.

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

  // renderMatches is an API provided by react-router for rendering the results of matchRoutes,
  // where the content is a component injected with Redux data, representing the hydration and dehydration process
  const content = renderToString(<Provider store={store}>{renderMatches(matches)}</Provider>);

  // Concatenate the content into the pre-set HTML template
  const response = template(store.getState(), content);

  // Return the HTML to the user
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
});
```

## Client-side

### Hydration

Here is the code for the above-mentioned `template` function:

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

Hydration process:

```js
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const state = window.__STATE__;
delete window.__STATE__;

// Initialize the store to maintain consistency between the client and the server
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

## Component Syntax

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

In simple terms, the server-side finds the component to be rendered based on the URL, injects the data returned from `getServerSideProps` into the component, and then uses `renderToString` to render and send it to the client-side.

The client-side performs hydration, during which React tries to reuse the HTML structure as much as possible. React initializes based on the HTML structure returned from the server.

