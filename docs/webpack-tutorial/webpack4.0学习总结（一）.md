---
title: webpack4.0学习总结（一）
tags:
  - webpack4.0
categories:
  - 前端
  - webpack4.0学习总结
references:
  - name: 从基础到实战 手把手带你掌握新版Webpack4.0
    url: 'https://coding.imooc.com/class/chapter/316.html#Anchor'
  - name: webpack官网
    url: 'https://webpack.js.org/'
abbrlink: ff905629
date: 2020-05-14 16:01:46
sidebar_position: 1
---

这一篇文章主要简单介绍了webpack是什么以及webpack的一些简单配置，你只要跟着我敲完这些代码后一定会对webpack有一个基本的了解的。😎

<!--truncate-->

## webpack是一个模块打包器

> 本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

上面引用了webpack官网的一段介绍，我们可以简单的理解webpack是一个模块打包器，那什么是模块打包器呢？😂先看一个简单的例子

{% tabs 1 %}

<!-- tab index.html -->

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src="./index.js"></script>
</body>
</html>
```

<!-- endtab -->

<!-- tab index.js -->

```js
// ES Moudule 模块化引入
import ComponentB from './componentB';

var root = document.getElementById('root');

// CommonJs 模块引入
var ComponentA = require('./componentA');

new ComponentA();
new ComponentB(); 
```

<!-- endtab -->

<!-- tab componentA.js -->

```js
function ComponentA() {
  var componentA = document.createElement('div');
  componentA.innerHTML = 'ComponentA';
  root.append(componentA);
}

module.exports = ComponentA;
```

<!-- endtab -->

<!-- tab componentB.js -->

```js
function ComponentB() {
  var componentB = document.createElement('div');
  componentB.innerHTML = 'ComponentB';
  root.append(componentB);
}

export default ComponentB;
```

<!-- endtab -->

{% endtabs %}

这里的模块可以理解成`componentA`和`componentB`，这种写法在`vue`和`react`中非常常见，写完这些文件后打开`index.html`文件，浏览器是会报错的。

{% note error, Uncaught SyntaxError: Cannot use import statement outside a module %}

这是由于这里使用了es6中的模板引入的方式，浏览器是识别不了这种方式的，那怎么办呢？😥



这个时候webpack就派上用场了，首先初始化该项目

```
npm init -y
```

初始化后会生成`package.json`文件

**安装webpack-cli和webpack**（不建议全局安装）

```
npm install webpack-cli -D
npm install webpack -S
```

安装固定版本的webpack

```
npm install webpack@版本号
npm info webpack  // 查看包信息
```



打包index.js

```
npx webpack index.js
```

> 这里如果不使用npx的话node会默认在全局环境中找寻webpack，加上npx的话就会使用项目中安装的webpack来执行命令 

打包后可以看到根目录下多了一个dist文件夹（webpack默认设置好的，后面会讲如何改变），里面有一个main.js文件，这个文件就是经过webpack处理后的index.js。

然后我们修改一下`index.html`的代码

```html
<script src="./dist/main.js"></script>
```

这下浏览器就能正常识别html中的js文件了，到这里为止理解webpack是一个模块打包器应该不是很难了吧。webpack将模块`componentA`和`componentB`打包生成了最后的`main.js`。



## webpack配置文件

webpack的配置文件名默认是`webpack.config.js`，当然我们也可以指定配置文件。

开始之前我们先修改一下项目目录

```
webpacktest
 ├── index.html
 ├── package-lock.json
 ├── package.json
 ├── src
 │   ├── componentA.js
 │   ├── componentB.js
 │   └── index.js
 └── webpack.config.js
```

在项目根目录下新建配置文件webpack.config.js：

```js
const path = require('path');

module.exports = {
  mode: 'development', // 默认为production
  entry: {
    main: './src/index.js' // 打包入口文件
  },
  output: { // 输出文件配置
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

上面引用的path是node中的一个模块，`__dirname`表示webpack.config.js所在的目录。

*entry可以简写为entry: './src/index.js'*

{% note info, mode中的development和production有什么区别呢 %}

我们看一下打包出来的文件bundle.js就知道了，production模式下的代码是一整行的，体积更小。而development模式下的代码不是一整行的有利于调试。

{% note link, node path的 [更多](http://nodejs.cn/api/path.html#path_path_resolve_paths)  %}

执行下面命令后即可完成打包，效果和上一节一样

```
npx webpack
```

当然也可以使用自定义配置文件

```
npx webpack --config 自定义配置文件
```



写过项目的小伙伴应该都发现平时都是使用`npm run xxx`来打包项目的，下面就来介绍一下如何配置

修改package.json文件中的script

```json
"scripts": {
    "build": "webpack"
},
```

这样就可以通过`npm run build`来进行打包了，不过看过第一节的小伙伴肯定有疑问了，这样配置会不会使用全局的webpack去进行打包呢🙄，其实并不会，这里`npm script`命令会在项目的`node_modules`文件中去寻找webpack并执行。



打包好后我们打开index.html看看，发现是会报错的，这里注意：我们要手动把index.html移动到dist目录下并修改一下js路径，因为webpack并没有将index.html打包到dist目录下。

```html
<script src="./bundle.js"></script>
```

这下再运行index.html就没有任何问题了。🎉

