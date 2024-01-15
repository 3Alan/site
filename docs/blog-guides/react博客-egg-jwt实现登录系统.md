---
slug: react-auth-jwt
title: react博客-egg-jwt实现登录系统
tags:
  - 博客
  - React
  - ReactHook
  - jwt
categories:
  - 前端
  - React
date: 2020-05-13T16:11:11.000Z
out_dated: true
summary: |-
  1. JWT（JSON Web Token）是一种开放标准（RFC 7519），它定义了紧凑且独立的自包含方式，用于在各方之间安全地传输信息。
  2. egg-jwt 是一个 Egg.js 插件，它可以帮助你轻松地使用 JWT 来保护你的 API。
  3. 你需要在你的 Egg.js 项目中安装 egg-jwt，然后在你的配置文件中进行配置。
  4. 你可以使用 egg-jwt 来生成和验证 JWT，并使用它来保护你的 API。
  5. 你可以在你的前端代码中使用 axios 来封装对后端的请求，并自动在请求头中携带 JWT。
---

react 博客系列文章

<!-- more-->

## 何为 jwt

## egg-jwt

### 安装 egg-jwt

`yarn add egg-jwt`

### 配置 egg-jwt

1. 配置`config/plugin.js`文件

```js
exports.jwt = {
  enable: true,
  package: 'egg-jwt'
};
```

2. 配置`config/config.default.js`文件

```js
// 自己设定的密钥，用于对信息进行签名
config.jwt = {
  secret: 'xxxxxx'
};
```

## 实例

### 后台实现登录操作返回 token

1. 路由层

在第二个参数上加上 jwt 即可实现对该路由的鉴权

下面的 jwt 是自定义的中间件`auth.js`，该文件在下一部分介绍

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
  // 需要鉴权的路由再第二个参数上加上jwt
  router.get('/admin/get_type_list', jwt, admin.getTypeList);
};
```

2. controller 层

使用`jwt.sign(加密数据, 密钥, [options, callback])` 来生成 token

相关配置可以查看[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```js
async login() {
    const { app, ctx } = this;
    const { username, password } = ctx.request.body;
    const checkValidate = await ctx.service.admin.admin.checkUserValidate(username, password);
    if (checkValidate) {
        // 将信息使用jwt进行签名加密生成token，expiresIn（token有效时间）
        const token = app.jwt.sign({ username, password }, app.config.jwt.secret, { expiresIn: '2h' });
        ctx.body = {
            code: '0001',
            msg: '登录成功',
            token,
        };
    } else {
        ctx.body = {
            code: '0002',
            msg: '用户名或者密码错误，请重试！',
        };
    }
}
```

3. service 层

```js
async checkUserValidate(username, password) {
  const isValidate = await this.app.mysql.get('admin', { username, password });
  return !!isValidate;
}
```

4. 使用 postman 进行测试

![image-20200502125430201](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200502125430201.png)

将生成的 token 返回给前台后使用`localStorage.setItem`把`token`保存到本地

### 前台传递 token 进行鉴权

#### 封装 axios

新建 axios 文件对 axio 进行封装，通过 axios 的拦截器来实现每次请求时自动在 headers 上携带 token 数据到后台，后台使用`jwt.verify`来检验 token 的正确性

_axios.js_

```js
import axios from 'axios';

axios.interceptors.request.use(config => {
  // 登录成功后保存在本地的token
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(response => {
  // code是后台接口设置的
  const { code } = response.data;
  if (code === '0003' || code === '0004') {
    window.location.href = '/login';
  }
  return response;
});

export default axios;
```

封装好后，之后都使用该封装好后的 axios 进行请求。

#### 后台校验处理

_auth.js_

```js
'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    // 获取前台通过axios封装后穿过来的token
    const token = ctx.header.authorization;
    if (token) {
      try {
        // 验证并对token进行解码
        const decode = ctx.app.jwt.verify(token.split(' ')[1], options.secret);
        console.log(decode);
        await next();
      } catch (error) {
        console.log(error.name);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
          // 这里的错误有许多种情况：1.token错误，2.token过期... 这里统一处理为鉴权失败
          ctx.body = {
            code: '0003',
            msg: '用户鉴权失败，请重新登录'
          };
        } else {
          throw error;
        }
      }
    } else {
      ctx.body = {
        code: '0004',
        msg: '您没有登录，请先登录'
      };
    }
  };
};
```

后台通过`/middleware/auth.js`中间件来实现给需要鉴权的接口进行鉴权，通过对前台传过来的 token 数据进行验证`jwt.verify`来识别登录状态。对`JsonWebTokenError`错误统一处理，应为`auth.js`作为中间件，所以接口中出现的其他错误也会在这里被 catch 到，对于不是`JsonWebTokenError`的错误，直接把错误抛出去。
