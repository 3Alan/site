---
title: webpack4.0学习总结（三）
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
date: 2020-05-17 10:05:14
updated: 2020-05-16 13:33:00
sidebar_position: 3
---

这节介绍了webpack一些常用的plugins的使用



<!--truncate-->

我的总结篇的第一节中提到了index.html是需要我们手动移动到打包后的dist目录下的，那我比较懒能不能让webpack来帮我完成呢。🤔

这个时候plugins就派上了用场。

### html-webpack-plugin

> The [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using [lodash templates](https://lodash.com/docs#template), or use your own [loader](https://webpack.js.org/loaders).

官网介绍到，它可以帮我们自动创造HTML文件，并且还可以使用自定义的HTML模板。

直接看例子：

```yaml
npm i html-webpack-plugin -D
```

```
webpacktest
 ├── package-lock.json
 ├── package.json
 ├── src
 │   └── index.js
 └── webpack.config.js
```

index.js

```js
var root = document.getElementById('root');

root.innerHTML = '<div>Hello Webpack</div>'
```

webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 默认为production
  entry: {
    main: './src/index.js', // 打包入口文件
  },
  output: {
    // 输出文件配置
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

`npm run build`进行打包看下结果

```
webpacktest
 ├── dist
 │   ├── bundle.js
 │   └── index.html
 ├── package-lock.json
 ├── package.json
 ├── src
 │   └── index.js
 └── webpack.config.js
```

HtmlWebpackPlugin插件自动为我们生成了index.html，但是...浏览器打开index.html一看什么都没有。这是咋回事，来看一看生成的index.html文件发现了问题

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"></head>
  <body>
  <script src="bundle.js"></script></body>
</html>
```

生成的文件中是没有`#root`节点的，那怎么办？我们还需要配置一下HtmlWebpackPlugin，前面官网的介绍中也提到了

> You can either let the plugin generate an HTML file for you, supply your own template using [lodash templates](https://lodash.com/docs#template), or use your own [loader](https://webpack.js.org/loaders)

我们需要自己提供一个HTML模板，于是在src目录下创建一个index.html作为HtmlWebpackPlugin打包的模板

{% tabs 2 %}

<!-- tab index.html -->

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>html template</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

<!-- endtab -->

<!-- tab webpack.config.js -->

```js
plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
})]
```

<!-- endtab -->

{% endtabs%}



再打包一次看一下dist目录下生成的index.html文件和我们定义的html模板是一样的了。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>html template</title>
</head>
<body>
  <div id="root"></div>
<script src="bundle.js"></script></body>
</html>
```

打开浏览器发现Hello Webpack也正确显示出来了。🎉



### clean-webpack-plugin

https://www.npmjs.com/package/clean-webpack-plugin

它的作用就是在每次打包前会将webpack中配置的`out.path`(dist目录)清空

```
npm i clean-webpack-plugin -D
```

为了验证是否清空了dist目录，我们先在dist目录下自己创建一个文件my.js

```
dist
 ├── bundle.js
 ├── index.html
 └── my.js
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 默认为production
  entry: {
    main: './src/index.js', // 打包入口文件
  },
  output: {
    // 输出文件配置
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  }), new CleanWebpackPlugin()]
};
```

`npm run build`打包

```
dist
 ├── bundle.js
 └── index.html
```

我们发现之前创建的my.js文件已经被CleanWebpackPlugin给清除了。



### 多入口文件

有时我们的打包入口文件有多个，这时候就要通过设置entry来完成打包。并通过[name]占位符来设置打包出来的文件的名称。

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 默认为production
  entry: {
    main: './src/index.js', // 打包入口文件
    enrty: './src/entry.js',
  },
  output: {
    // 输出文件配置
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  }), new CleanWebpackPlugin()]
};
```

`npm run build`打包结果

```
dist
 ├── enrty.js
 ├── index.html
 └── main.js
```

看一看index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>html template</title>
</head>
<body>
  <div id="root"></div>
<script src="main.js"></script><script src="enrty.js"></script></body>
</html>
```

可以看到HtmlWebpackPlugin帮我们把`main.js`和`entry.j`2个文件都自动引入到html文件当中了。



在实际业务场景中，为了优化服务器性能，我们会将打包好的dist目录中的一部分文件丢到cdn中来加快访问速度。这时候我们就要将cdn的地址手动复制到打包后的html文件中了，不过我们可以通过设置output的publicPath来完成。

```js
output: {
  // 输出文件配置
  filename: '[name].js',
  publicPath: 'https://cdn.example.com/assets',
  path: path.resolve(__dirname, 'dist'),
},
```

打包后的效果

```html
<script src="https://cdn.example.com/assets/main.js"></script><script src="https://cdn.example.com/assets/enrty.js"></script>
```



### SourceMap

sourcemap是什么，我们修改一下index.js文件内容并且在webpack配置中关闭sourcemap(devtool: 'none')

index.js

```js
var root = document.getElementById('root');

errfun();

root.innerHTML = '<div>Hello Webpack</div>'
```

webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 默认为production
  devtool: 'none',
  entry: {
    main: './src/index.js', // 打包入口文件
    enrty: './src/entry.js',
  },
  output: {
    // 输出文件配置
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  }), new CleanWebpackPlugin()]
};
```

index.js中使用了一个不存在的函数errfun()，打包运行一下是会报错的。

![image-20200517134620514](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200517134620514.png)

这个时候我们想要调试代码，但是它这里提示的错误行是打包后的main.js所在的位置。

现在我们配置sourcemap看看。

```js
devtool: 'source-map',
```

![image-20200517135446504](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200517135446504.png)

这个时候我们就能定位到错误是出现在我们index.js的第三行了。

{% note info, 配置不同sourceMap会不同程度上增加应用的打包时间或消耗性能 %}

官网提供了多种sourceMap配置，不同sourceMap打包消耗时间不同，[详情](https://webpack.js.org/configuration/devtool/)。

sourcemap其实就是main.js和index.js之间的一种映射关系，在代码存在错误时，它能根据映射关系找到index.js中的错误所在处，有利于我们debug代码。