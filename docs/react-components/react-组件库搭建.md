---
title: react 组件库搭建
tags:
  - React
  - 组件库
categories:
  - 前端
  - React
abbrlink: d8051f67
date: 2021-08-22 16:22:55
keywords: ['react组件库开发', 'react组件库打包']
description: react组件库搭建
---

一直都想搭建一套属于自己的组件库、脚手架，这次总算是开始动手了。

<!-- more -->

## 技术选型
- react
- sass
- typescript
- create-react-app
- storybook
- jest
- lerna


## 积累的知识点
- `package.json` 中的 `peerDependencies` 三方库版本依赖于宿主环境，三方库不提供。
- node-sass已经弃用，现在使用sass(dart-sass) [issue](https://stackoverflow.com/questions/63943756/replace-node-sass-with-dart-sass-in-create-react-app-v3-x)
- [`rollup` 打包](https://www.codefeetime.com/post/rollup-config-for-react-component-library-with-typescript-scss/) 

## 待了解
package.json 的 module和types

## 代码质量相关
配置eslint
npx eslint --init

配置prettier
`eslint-plugin-prettier` `eslint-config-prettier`

配置husky + lint-staged
```
npx mrm@2 lint-staged
```

配置commitlint
使用`commitizen`简化流程

## 奇怪的问题
rollup打包后进程没有关闭： https://github.com/rollup/rollup/issues/4213

## npm发布
### 先置条件

- npm账号
- 打包后的组件文件
- **npm已经绑定账号**

### 先置知识
#### package.json
```json
  "name": "@3alan/ui", // 包名，@后跟的是组织名
  "version": "0.2.10", // 包版本号，每次发版需要自行变更版本号
  "private": false, // 是否为私有包
  "main": "dist/index.cjs.js", // 包入口文件
  "module": "dist/index.esm.js",
  "types": "dist/types/index.d.ts", // typescript声明文件
  "license": "MIT", // 开源协议
  "description": "hand drawn react components", // 包描述
  "author": "3Alan", // 作者
  "homepage": "https://alan-ui.vercel.app/", // 网站
  "repository": {
    "type": "git",
    "url": "https://github.com/3Alan/alan-ui"
  },
  "files": [
    "dist"
  ], // 需要上传到npm上的文件
  "keywords": [
    "react",
    "components",
    "ui",
    "hand drawn"
  ], // 关键字：用来描述你的包
  "dependencies": {
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }, // 宿主（即需要使用改包的项目）需要具备的依赖
```

![image-20210910105028280](https://raw.githubusercontent.com/3Alan/images/master/img/image-20210910105028280.png)



### 打包组件库

#### 使用rollup打包

在根目录下创建`rollup.config.js`文件

文件中使用的插件自行安装

```js
import typescript from '@rollup/plugin-typescript';
// 用来处理import 'xxx.scss'问题
import postcss from 'rollup-plugin-postcss';
// 压缩代码
import { terser } from 'rollup-plugin-terser';
// 类似webpack-bundle-analyzer
import { visualizer } from 'rollup-plugin-visualizer';
// 拷贝静态资源
import copy from 'rollup-plugin-copy';

// 将package.json中的依赖打包
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const copyRight = `/*!
Copyright (c) 2021 3Alan.
Licensed under the MIT License (MIT)
*/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      footer: copyRight
    },
    {
      file: pkg.module,
      format: 'esm',
      footer: copyRight
    }
  ],
  plugins: [
    // roughjs将会被一同打包进dist中
    resolve({ resolveOnly: ['roughjs'] }),
    commonjs(),
    // 将ts转化成es5语法并生成类型文件
    typescript({
      tsconfig: './tsconfig.build.json',
      // 生成d.ts文件以及生成路径
      declaration: true,
      declarationDir: 'types'
    }),
    copy({
      targets: [{ src: 'src/components/style/*.ttf', dest: 'dist' }]
    }),
    postcss(),
    terser(),
    visualizer()
  ]
};
```

#### 打包脚本

安装删除工具（用来每次打包前清除dist目录）

```shell
yarn add rimraf -D 
```



```json
"build:sass": "sass ./src/components/style/index.scss ./dist/index.css
"clean": "rimraf ./dist",
"build": "yarn clean && rollup -c && yarn build:sass",
```

打包后的目录：

dist
 ├── index.cjs.js
 ├── index.css
 ├── index.css.map
 ├── index.esm.js
 ├── Stanberry.ttf
 └── types

### 发布npm

#### 先置条件

- npm已登录

- npm镜像源没有切换过，可以使用`npm whoami`验证，如果能正确返回npm用户名即可
- `package.json`中`version`高于上次发布的版本号



#### 发布脚本

- npm publish

- 可在package.json中配置钩子发布前自动打包

  ```json
  "prepublishOnly": "yarn build",
  ```