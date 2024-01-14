---
slug: simple-webpack
title: 实现一个简易的webpack
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
  - name: babel官网
    url: 'https://www.babeljs.cn/docs/'
date: 2020-06-05T10:24:19.000Z
updated: 2020-06-13T16:06:00.000Z
keywords:
  - webpack学习总结
  - 手写loader
  - 手写plugin
  - webpack实现
description: webpack学习总结
sidebar_position: 7
summary: >-
  手写了一个简单的 loader，可以将项目中的字符串替换成 webpack 中配置的字符串。手写了一个简单的 Plugin，可以在 dist 目录下生成一个
  author.txt 文件。实现了简单的 webpack 打包，可以将所有文件依赖分析出来，并生成可以浏览器运行的代码。
---

手写简单的 loader、Plugin、简单的 webpack

<!--truncate-->

## 手写简单的 loader

目录

```
myLoader
 ├── loaders
 │   └── myLoader.js
 ├── package.json
 ├── src
 │   └── index.js
 └── webpack.config.js
```

<!-- tab index.js -->

```js
console.log('hello webpack!');
```

<!-- endtab -->

<!-- tab webpack.config.js -->

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: path.resolve(__dirname, './loaders/myLoader.js'),
            options: {
              key: 'my option value'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
```

<!-- endtab -->

<!-- tab myLoader.js -->

```js
module.exports = function (source) {
  return source.replace('webpack', this.query.key);
};
```

<!-- endtab -->

这个例子非常简单，就是通过自建的 loader 将项目中的**webpack**字符串替换成 webpack 中配置的字符串。`myLoader.js`中可以通过`this.query`接受 webpack 中配置的 options 参数。更多 this 上的[属性参考](https://webpack.js.org/api/loaders/#the-loader-context)（包括异步处理、回调...）

上面的例子通过打包后代码如下

```js
console.log('hello my option value!');
```

**webpack5**中可以直接通过`this.getOptions (schema)`来获取 options 参数

**webpack resolveLoader:**

和之前提到的 resolve 的使用类似，就是用来偷懒的 😂

使用`resolveLoader`改写后的 wepack.config.js

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'myLoader',
            options: {
              key: 'my option'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
```

上面这个例子可以直接使用`myLoader`名，webpack 会在`node_modules` 和`./loaders`中寻找对应的 Loader。

:::warning
自定义的 loader 中不要使用箭头函数，会产生 this 指向问题
:::

## 手写简单的 Plugin

目录

```
myPlugin
 ├── package.json
 ├── plugins
 │   └── date-webpack-plugin.js
 ├── src
 │   └── index.js
 └── webpack.config.js
```

[complier 提供了许多钩子](https://webpack.js.org/api/compiler-hooks/)，可以让我们在打包的不同时刻来进行不同的处理，这里使用了`emit`钩子

下面通过手写的 plugin 来实现在 dist 目录下生成一个`author.txt`文件

<!-- tab date-webpack-plugin.js -->

```js
class DateWebpackPlugin {
  constructor(options) {
    // options是new插件时传进来的参数
    this.options = options;
  }

  apply(compiler) {
    const _this = this;
    compiler.hooks.emit.tapAsync('DateWebpackPlugin', (compilation, cb) => {
      compilation.assets['author.txt'] = {
        // 返回的资源
        source: function () {
          return `created by ${_this.options.author} ${new Date()}`;
        },
        // 最后生成的文件大小
        size: function () {
          return 19;
        }
      };
      // 由于emit是异步操作，所以最后要执行回调函数
      cb();
    });
  }
}

module.exports = DateWebpackPlugin;
```

<!-- endtab -->

<!-- tab webpack.config.js -->

```js
const path = require('path');
const DateWebpackPlugin = require('./plugins/date-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new DateWebpackPlugin({
      author: 'Alan'
    })
  ]
};
```

<!-- endtab -->

打包后会在 dist 目录下自动生成一个 author.txt 文件，内容如下

```
created by AlanSun Jun 07 2020 11:49:42 GMT+0800 (GMT+08:00)
```

## 实现简单的 webpack 打包

先提前安装以下需要的插件

```
npm i @babel/parser -D // 将js内容转化为抽象语法树
npm i @babel/traverse -D // 用来遍历抽象语法树
npm i @babel/core -D
npm i @babel/preset-env -D //es6->es5
npm i cli-highlight -D // 可选，命令行高亮插件
```

前置知识：

**node：**

- [fs.readFileSync](http://nodejs.cn/api/fs.html#fs_fs_readfilesync_path_options)(同步读取文件内容)
- [path_dirname](http://nodejs.cn/api/path.html#path_path_dirname_path)(获取文件的目录)

**项目目录：**

```
bundler
 ├── bundler.js  // 主要文件
 └── src
     ├── course.js
     ├── index.js
     └── learn.js
```

<!-- tab index.js -->

```js
import notify from './learn.js';

console.log(notify);
```

<!-- endtab -->

<!-- tab learn.js -->

```js
import { course } from './course.js';

const learnNotify = `time to learn ${course}`;

export default learnNotify;
```

<!-- endtab -->

<!-- tab course.js -->

```js
export const course = 'webpack';
```

<!-- endtab -->

我将整个项目拆分成 2 个部分来分析

### 处理入口文件找到所有 import 文件

思路：

1. 通过 fs.readFileSync 读取 index.js 的内容
2. 使用@babel/parser 将读取的内容转化为 AST 抽象语法树
3. 使用@babel/traverse 遍历找到所有 import 语句
4. 分析出引用的文件，保存其路径

代码：

```js
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
// 命令行高亮工具
const highlight = require('cli-highlight').highlight;

const moduleAnalysis = filename => {
  // 读取出index.js文件内容
  const content = fs.readFileSync(filename, 'utf-8');
  // 将文件内容转化为抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  // 遍历抽象语法树
  traverse(ast, {
    ImportDeclaration({ node }) {
      console.log(node);
    }
  });
  // console.log(highlight(ast));
  console.log(ast.program.body);
};
moduleAnalysis('./src/index.js');
```

![通过parser转化成的抽象语法树](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200612111622662.png)

通过上图可以清楚看到我们现在要做的事情就是找到所有为 type 为`importDeclaration`的 node 属性

![使用traverse得到的ImportDeclaration](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200612112106327.png)

最后对 js 文件进行 babel 处理，转化成浏览器能够识别的代码

完整代码

```js
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const babel = require('@babel/core');
// 命令行高亮工具
const highlight = require('cli-highlight').highlight;

const moduleAnalysis = filename => {
  // 读取出index.js文件内容
  const content = fs.readFileSync(filename, 'utf-8');
  // 将文件内容转化为抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  const dependencies = {};
  // 遍历抽象语法树
  traverse(ast, {
    ImportDeclaration({ node }) {
      // 文件对应目录./src
      const dirPath = path.dirname(filename);
      // 绝对路径./src/learn.js(window操作系统)
      let filePath = ('./' + path.join(dirPath, node.source.value)).replace(
        '\\',
        '/'
      );
      dependencies[node.source.value] = filePath;
      // { './learn.js': './src/learn.js' }
      console.log(dependencies);
    }
  });
  // 转化成浏览器可以执行的代码
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  });
  console.log(highlight(code));
  return {
    filename,
    dependencies,
    code
  };
};
moduleAnalysis('./src/index.js');
```

### 通过入口文件分析出所有文件依赖

上面已经分析出了入口文件的一些依赖，接下来可以通过递归遍历来分析出所有的文件依赖并保存在变量中，先分析一些经过上面函数处理后的数据

```js
{
  filename: './src/index.js',
  dependencies: { './learn.js': './src/learn.js' },
  code: '"use strict";\n' +
    '\n' +
    'var _learn = _interopRequireDefault(require("./learn.js"));\n' +
    '\n' +
    'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
    '\n' +
    'console.log(_learn["default"]);'
}
```

我们只需要遍历对象中的 dependencies 属性，把里面的路径名传入到上面的`moduleAnalysis`函数中，最终获取所有的依赖信息。

具体代码如下

```js
const analysisDependenciesGraph = entry => {
  const entryModule = moduleAnalysis(entry);
  const graphList = [entryModule];
  for (let i = 0; i < graphList.length; i++) {
    const item = graphList[i];
    const { dependencies } = item;
    if (dependencies) {
      for (let i in dependencies) {
        graphList.push(moduleAnalysis(dependencies[i]));
      }
    }
  }
  const graph = {};
  graphList.forEach(({ filename, dependencies, code }) => {
    graph[filename] = {
      dependencies,
      code
    };
  });
  return graph;
};
```

分析出的所有依赖对象

```js
{
  './src/index.js': {
    dependencies: { './learn.js': './src/learn.js' },
    code: '"use strict";\n' +
      '\n' +
      'var _learn = _interopRequireDefault(require("./learn.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      'console.log(_learn["default"]);'
  },
  './src/learn.js': {
    dependencies: { './course.js': './src/course.js' },
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports["default"] = void 0;\n' +
      '\n' +
      'var _course = require("./course.js");\n' +
      '\n' +
      'var learnNotify = "time to learn ".concat(_course.course);\n' +
      'var _default = learnNotify;\n' +
      'exports["default"] = _default;'
  },
  './src/course.js': {
    dependencies: {},
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports.course = void 0;\n' +
      "var course = 'webpack';\n" +
      'exports.course = course;'
  }
}
```

### 生成代码

```js
const generateCode = entry => {
  const graph = JSON.stringify(analysisDependenciesGraph(entry));
  return `
		(function(graph){
			function require(module) { 
				function localRequire(relativePath) {
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`;
};
```

生成后的代码就可以直接在浏览器运行了

![image-20200613160248899](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200613160248899.png)

完整代码

```js
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const babel = require('@babel/core');
// 命令行高亮工具
const highlight = require('cli-highlight').highlight;

const moduleAnalysis = filename => {
  // 读取出index.js文件内容
  const content = fs.readFileSync(filename, 'utf-8');
  // 将文件内容转化为抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  const dependencies = {};
  // 遍历抽象语法树
  traverse(ast, {
    ImportDeclaration({ node }) {
      // 文件对应目录./src
      const dirPath = path.dirname(filename);
      // 绝对路径./src/learn.js(window操作系统)
      let filePath = ('./' + path.join(dirPath, node.source.value)).replace(
        '\\',
        '/'
      );
      dependencies[node.source.value] = filePath;
      // { './learn.js': './src/learn.js' }
      console.log(dependencies);
    }
  });
  // 转化成浏览器可以执行的代码
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  });
  return {
    filename,
    dependencies,
    code
  };
};

const analysisDependenciesGraph = entry => {
  const entryModule = moduleAnalysis(entry);
  const graphList = [entryModule];
  for (let i = 0; i < graphList.length; i++) {
    const item = graphList[i];
    const { dependencies } = item;
    if (dependencies) {
      for (let j in dependencies) {
        graphList.push(moduleAnalysis(dependencies[j]));
      }
    }
  }
  const graph = {};
  graphList.forEach(({ filename, dependencies, code }) => {
    graph[filename] = {
      dependencies,
      code
    };
  });
  return graph;
};

const generateCode = entry => {
  const graph = JSON.stringify(analysisDependenciesGraph(entry));
  return `
		(function(graph){
			function require(module) { 
				function localRequire(relativePath) {
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`;
};

const code = generateCode('./src/index.js');

console.log(highlight(code));
```

## 总结

到这里总算是对 webpack 有了大体的了解了。奈何当我学完 webpack 后看到了**vite**这个东西 😒。。。

![image-20200615160241265](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200615160241265.png)
