---
title: react博客-egg-jwt实现登录系统
tags:
  - 博客
  - React
  - ReactHook
  - jwt
categories:
  - 前端
  - React
abbrlink: 3b0a6cbe
date: 2020-05-13 16:11:11
---

react博客系列文章

<!-- more-->

## 何为jwt

## egg-jwt

### 安装egg-jwt

`yarn add egg-jwt`

### 配置egg-jwt

1. 配置`config/plugin.js`文件

```js
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
```

2. 配置`config/config.default.js`文件

```js
// 自己设定的密钥，用于对信息进行签名
config.jwt = {
  secret: 'xxxxxx',
};
```

## 实例

### 后台实现登录操作返回token

1. 路由层

在第二个参数上加上jwt即可实现对该路由的鉴权 

下面的jwt是自定义的中间件`auth.js`，该文件在下一部分介绍

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

2. controller层

使用`jwt.sign(加密数据, 密钥, [options, callback])` 来生成token

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

3. service层

```js
async checkUserValidate(username, password) {
  const isValidate = await this.app.mysql.get('admin', { username, password });
  return !!isValidate;
}
```

4. 使用postman进行测试

![image-20200502125430201](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200502125430201.png)

将生成的token返回给前台后使用`localStorage.setItem`把`token`保存到本地

### 前台传递token进行鉴权

#### 封装axios

新建axios文件对axio进行封装，通过axios的拦截器来实现每次请求时自动在headers上携带token数据到后台，后台使用`jwt.verify`来检验token的正确性

*axios.js*

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

封装好后，之后都使用该封装好后的axios进行请求。

#### 后台校验处理

*auth.js*

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
            msg: '用户鉴权失败，请重新登录',
          };
        } else {
          throw error;
        }
      }
    } else {
      ctx.body = {
        code: '0004',
        msg: '您没有登录，请先登录',
      };
    }
  };
};
```

后台通过`/middleware/auth.js`中间件来实现给需要鉴权的接口进行鉴权，通过对前台传过来的token数据进行验证`jwt.verify`来识别登录状态。对`JsonWebTokenError`错误统一处理，应为`auth.js`作为中间件，所以接口中出现的其他错误也会在这里被catch到，对于不是`JsonWebTokenError`的错误，直接把错误抛出去。
