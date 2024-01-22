---
slug: react-auth-jwt
title: react blog - Login system implemented with egg-jwt
tags:
  - Blog
  - React
  - ReactHook
  - jwt
categories:
  - Front-end
  - React
date: 2020-05-13T16:11:11.000Z
out_dated: true
summary: >-
  1. JWT is a JSON Web Token used to securely transmit information between two
  systems.

  2. egg-jwt is an Egg.js plugin used to implement JWT authentication.

  3. You need to configure egg-jwt in `config/plugin.js` and
  `config/config.default.js`.

  4. You can use the `jwt` middleware in the routing to implement authentication
  for the routing.

  5. The front end can use the encapsulated axios to automatically carry the
  token data on the headers to the back end each time a request is made. The
  back end uses `jwt.verify` to verify the correctness of the token.
ai_translation: true
---

React blog series of articles

<!-- more-->

## What is jwt

## egg-jwt

### Install egg-jwt

`yarn add egg-jwt`

### Configure egg-jwt

1. Configure the `config/plugin.js` file

```js
exports.jwt = {
  enable: true,
  package: 'egg-jwt'
};
```

2. Configure the `config/config.default.js` file

```js
// Your own set of keys used to sign information
config.jwt = {
  secret: 'xxxxxx'
};
```

## Example

### Back end implements login operation and returns token

1. Routing layer

Add jwt to the second parameter to implement authentication for the routing

The following jwt is a custom middleware `auth.js`. This file is introduced in the next section

```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, config } = app;
  const { admin } = controller.admin;
  const jwt = middleware.auth(config.jwt);
  router.post('/admin/login', admin.login);
  // Add jwt to the second parameter for routing that requires authentication
  router.get('/admin/get_type_list', jwt, admin.getTypeList);
};
```

2. Controller layer

Use `jwt.sign(encrypted data, key, [options, callback])` to generate a token

For related configurations, see [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```js
async login() {
    const { app, ctx } = this;
    const { username, password } = ctx.request.body;
    const checkValidate = await ctx.service.admin.admin.checkUserValidate(username, password);
    if (checkValidate) {
        // Use jwt to sign and encrypt information to generate a token, expiresIn (token validity period)
        const token = app.jwt.sign({ username, password }, app.config.jwt.secret, { expiresIn: '2h' });
        ctx.body = {
            code: '0001',
            msg: 'Login successful',
            token,
        };
    } else {
        ctx.body = {
            code: '0002',
            msg: 'Incorrect username or password, please try again!',
        };
    }
}
```

3. Service layer

```js
async checkUserValidate(username, password) {
  const isValidate = await this.app.mysql.get('admin', { username, password });
  return !!isValidate;
}
```

4. Use postman for testing

![image-20200502125430201](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200502125430201.png)

After the generated token is returned to the front end, use `localStorage.setItem` to save the `token` locally

### Front end passes token for authentication

#### Encapsulate axios

Create a new axios file to encapsulate axio. Use the axios interceptor to automatically carry the token data on the headers to the back end each time a request is made. The back end uses `jwt.verify` to verify the correctness of the token

_axios.js_

```js
import axios from 'axios';

axios.interceptors.request.use(config => {
  // Token saved locally after successful login
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(response => {
  // code is set by the back-end interface
  const { code } = response.data;
  if (code === '0003' || code === '0004') {
    window.location.href = '/login';
  }
  return response;
});

export default axios;
```

After encapsulation, use the encapsulated axios for subsequent requests.

#### Back-end verification and processing

_auth.js_

```js
'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    // Get the token passed through the front end after axios encapsulation
    const token = ctx.header.authorization;
    if (token) {
      try {
        // Verify and decode the token
        const decode = ctx.app.jwt.verify(token.split(' ')[1], options.secret);
        console.log(decode);
        await next();
      } catch (error) {
        console.log(error.name);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
          // There are many cases for errors here: 1. Incorrect token, 2. Expired token... Here, they are uniformly processed as authentication failures
          ctx.body = {
            code: '0003',
            msg: 'User authentication failed, please log in again'
          };
        } else {
          throw error;
        }
      }
    } else {
      ctx.body = {
        code: '0004',
        msg: 'You are not logged in, please log in first'
      };
    }
  };
};
```

The back end uses the `/middleware/auth.js` middleware to authenticate the interfaces that require authentication. It verifies the token data passed from the front end through `jwt.verify` to identify the login status. For the `JsonWebTokenError` error, it is processed uniformly. Because `auth.js` is a middleware, other errors that occur in the interface will also be caught here. For errors other than `JsonWebTokenError`, the errors are directly thrown out.
