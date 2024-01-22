---
slug: react-auth-jwt
title: React blog - Login system implemented with egg-jwt
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

  4. You can use the `jwt` middleware in the route to implement authentication
  for the route.

  5. The front end can use the axios encapsulation to automatically carry the
  token data on the headers to the background each time a request is made. The
  background uses `jwt.verify` to verify the correctness of the token.
ai_translation: true
---

React blog series

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
// Your own secret key, used to sign the information
config.jwt = {
  secret: 'xxxxxx'
};
```

## Example

### Background implementation of login operation to return token

1. Routing layer

Add jwt to the second parameter to implement authentication for the route

The following jwt is a custom middleware `auth.js`, which is introduced in the
next section

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
  // Add jwt to the second parameter of the route that needs to be authenticated
  router.get('/admin/get_type_list', jwt, admin.getTypeList);
};
```

2. Controller layer

Use `jwt.sign(encrypted data, key, [options, callback])` to generate token

For related configurations, please refer to [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```js
async login() {
    const { app, ctx } = this;
    const { username, password } = ctx.request.body;
    const checkValidate = await ctx.service.admin.admin.checkUserValidate(username, password);
    if (checkValidate) {
        // Use jwt to sign and encrypt the information to generate a token, expiresIn (token validity period)
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

Create a new axios file to encapsulate axio. Use the axios interceptor to automatically carry the token data on the headers to the background each time a request is made. The background uses `jwt.verify` to verify the correctness of the token

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
  // code is set by the background interface
  const { code } = response.data;
  if (code === '0003' || code === '0004') {
    window.location.href = '/login';
  }
  return response;
});

export default axios;
```

After encapsulation, all subsequent requests use the encapsulated axios.

#### Background verification and processing

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
          // There are many cases of errors here: 1. wrong token, 2. expired token... Here, they are uniformly processed as authentication failures
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

The background uses the `/middleware/auth.js` middleware to implement authentication for the interface that needs to be authenticated. It authenticates the login status by verifying the token data passed from the front end `jwt.verify`. For the `JsonWebTokenError` error, it is uniformly processed, because `auth.js` is used as a middleware, so other errors in the interface will also be caught here. For errors other than `JsonWebTokenError`, throw the error directly.
