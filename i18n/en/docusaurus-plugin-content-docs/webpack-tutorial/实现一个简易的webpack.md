---
slug: simple-webpack
title: Implementing a simple webpack
tags:
  - webpack4.0
categories:
  - Front-end
  - webpack4.0 learning summary
references:
  - name: >-
      From basics to practice, hand in hand to master the new version of
      Webpack4.0
    url: 'https://coding.imooc.com/class/chapter/316.html#Anchor'
  - name: webpack official website
    url: 'https://webpack.js.org/'
  - name: babel official website
    url: 'https://www.babeljs.cn/docs/'
date: 2020-06-05T10:24:19.000Z
updated: 2020-06-13T16:06:00.000Z
keywords:
  - webpack learning summary
  - custom loader
  - custom plugin
  - webpack implementation
description: webpack learning summary
sidebar_position: 7
summary: |-
  Write simple loaders, Plugins, and simple webpack.

  - Write a simple loader that can replace strings.
  - Write a simple Plugin that can generate a file.
  - Analyze the entry file to find all import files.
  - Analyze all file dependencies from the entry file.
  - Generate code.
ai_translation: true
---

Write simple loaders, Plugins, and simple webpack.

<!--truncate-->

## Write a simple loader

Catalog

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

This example is very simple, it is to replace the **webpack** string in the project with the string configured in webpack through the self-built loader. `myLoader.js` can accept the options parameter configured in webpack through `this.query`. More [property references](https://webpack.js.org/api/loaders/#the-loader-context) on this (including asynchronous processing, callbacks...)

After packaging with the above example, the code is as follows

```js
console.log('hello my option value!');
```

In **webpack5**, you can directly use `this.getOptions (schema)` to get the options parameter

**webpack resolveLoader:**

Similar to the use of resolve mentioned earlier, it is to be lazy 😂

Rewrite wepack.config.js after using `resolveLoader`:

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

After the above example, you can directly use the name `myLoader`. webpack will search for the corresponding Loader in `node_modules` and `./loaders`.

:::warning
Do not use arrow functions in custom loaders, which will cause this pointer problems
:::

## Write a simple Plugin

Catalog

```
myPlugin
 ├── package.json
 ├── plugins
 │   └── date-webpack-plugin.js
 ├── src
 │   └── index.js
 └── webpack.config.js
```

[complier provides many hooks](https://webpack.js.org/api/compiler-hooks/), which allows us to perform different processing at different times during packaging. Here we use the `emit` hook

The following uses a custom plugin to implement generating an `author.txt` file in the dist directory

<!-- tab date-webpack-plugin.js -->

```js
class DateWebpackPlugin {
  constructor(options) {
    // options are the parameters passed in when new plugins are created
    this.options = options;
  }

  apply(compiler) {
    const _this = this;
    compiler.hooks.emit.tapAsync('DateWebpackPlugin', (compilation, cb) => {
      compilation.assets['author.txt'] = {
        // Returned resources
        source: function () {
          return `created by ${_this.options.author} ${new Date()}`;
        },
        // The final size of the generated file
        size: function () {
          return 19;
        }
      };
      // Since emit is an asynchronous operation, the callback function must be executed at the end
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

After packaging, an author.txt file will be automatically generated in the dist directory, with the following content

```
created by AlanSun Jun 07 2020 11:49:42 GMT+0800 (GMT+08:00)
```

## Implement simple webpack packaging

First install the following required plug-ins in advance

```
npm i @babel/parser -D // Convert js content to abstract syntax tree
npm i @babel/traverse -D // Used to traverse the abstract syntax tree
npm i @babel/core -D
npm i @babel/preset-env -D //es6->es5
npm i cli-highlight -D // Optional, command line highlighting plugin
```

Prerequisites:

**node：**

- [fs.readFileSync](http://nodejs.cn/api/fs.html#fs_fs_readfilesync_path_options)(Synchronously read file content)
- [path_dirname](http://nodejs.cn/api/path.html#path_path_dirname_path)(Get the directory of the file)

**Project directory：**

```
bundler
 ├── bundler.js  // Main file
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

I will divide the entire project into 2 parts for analysis

### Process the entry file to find all import files

Ideas：

1. Use fs.readFileSync to read the content of index.js
2. Use @babel/parser to convert the read content into an AST abstract syntax tree
3. Use @babel/traverse to traverse and find all import statements
4. Analyze the referenced files and save their paths

Code：

```js
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
// Command line highlighting tool
const highlight = require('cli-highlight').highlight;

const moduleAnalysis = filename => {
  // Read out the content of the index.js file
  const content = fs.readFileSync(filename, 'utf-8');
  // Convert file content to abstract syntax tree
  const ast = parser.parse(content, {
    sourceType
