---
title: webpack4.0学习总结（四）
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
abbrlink: 35b500c6
date: 2020-05-18 10:24:19
updated: 2020-05-20 15:19:00
sidebar_position: 4
---



webpack的devServer热更新以及HMR局部热更新

<!-- more -->

### DevServer

DevServer可以起一个本地服务并且实现代码的热更新。可以省去我们每次更新代码后重启服务额操作。

```
npm i webpack-dev-server -D
```

配置文件

package.json 

```json
"scripts": {
    "build": "webpack",
    "start": "webpack-dev-server"
},
```

webpack.config.js

```js
devServer: {
    contentBase: './dist',
    open: true, // 自动打开浏览器
    port: 3001, // 服务器端口号
},
```

我们之后只需要使用`npm run start`就可以把服务跑起来了，之后只要改动代码就会自动更新了，开发效率提高了很多有没有😝

**devServer[更多配置内容](https://webpack.js.org/configuration/dev-server/#devserver)**



### HMR实现局部热更新

HMR（Hot Module Replacement）

当我们更改了部分文件后，我们发现webpack-dev-server帮我们重新渲染所有内容，假如我只改动了一小部分，只想更新这一部分内容就可以用了使用HMR来实现了。

说再多不如看一个例子

index.js

```js
import './index.css';

var root = document.getElementById('root');

root.innerHTML = '<button id="btn">add new block</button>';

document.getElementById('btn').onclick = function() {
  var newBlock = document.createElement('p');
  newBlock.innerHTML = 'new Block';
  root.append(newBlock);
}
```

index.css

```css
p {
  width: 100px;
}
p:nth-child(6) {
  background: red;
}
```

这里例子就是点击按钮添加一个p元素，第6个p元素显示为红色背景

![](https://raw.githubusercontent.com/3Alan/images/master/img/hrmtest.gif)

这个时候我觉得红色不好看，想换成黄色，修改，保存一气呵成。

![image-20200518122346853](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200518122346853.png)

结果webpack-dev-server给我全部重新渲染了，我还要再点6下才能看到效果，这里如果是1000（虽然不太可能）呢，那我岂不是要点1000下😱。



这个时候配置HRM就可以轻松解决这个问题了。

只需要再webpack.config.js中配置

```js
devServer: {
    contentBase: './dist', // Tell the server where to serve content from
    open: true, // 自动打开浏览器
    port: 3001, // 服务器端口号
    hot: true, // 开启HRM
},
```

![](https://raw.githubusercontent.com/3Alan/images/master/img/blockTest.gif)

搞定😎，不过这里由于有css-loader帮我们做了一些更新的任务，所以我们并没有写过多的代码。那如果没有css-loader处理那怎么办？下面看一下具体配置。



{% tabs 3%}

<!-- tab index.js -->

```js
import Counter from './counter'
import Number from './number'

Counter();
Number();
```

<!-- endtab -->

<!-- tab counter.js -->

```js
function Counter() {
  var root = document.getElementById('root');
  var counter = document.createElement('div');
  counter.innerHTML = 0;
  counter.onclick = function () {
    counter.innerHTML = parseInt(counter.innerHTML, 10) + 1;
  }
  root.append(counter);
  
}

export default Counter;
```

<!-- endtab -->

<!-- tab number.js -->

```js
function Number() {
  var root = document.getElementById('root');
  var data = document.createElement('div');
  data.setAttribute('id', 'number');
  data.innerHTML = '2000';
  root.append(data);
}

export default Number;
```

<!-- endtab -->

{% endtabs %}

![](https://raw.githubusercontent.com/3Alan/images/master/img/test3.gif)

可以看到当我一改变number，counter中的状态又重新渲染变成0了😩。

这里我们就要通过一部分代码来处理一下了（css-loader就是帮我们完成了这部分工作）

```js
import Counter from './counter'
import Number from './number'

Counter();
Number();

if (module.hot) { // 如果开启HMR
  module.hot.accept('./number.js', () => {
    var root = document.getElementById('root');
    root.removeChild(document.getElementById('number'));
    console.log('number is updated');
    Number();
    // 一旦number.js文件改变，进行一系列处理
  })
}
```

![](https://raw.githubusercontent.com/3Alan/images/master/img/test4.gif)

{% note link, [HMR详细文档](https://webpack.js.org/guides/hot-module-replacement/) %}



### 处理ES6语法

我们先用ES6写一些代码

```js
const name = 'Alan';
const list = [1, 8, 4, 6];

const resultList = list.filter(item => item > 5);

new Promise(() => {
  console.log('666');
})

console.log(resultList);
```

`npm run build`打包看一下chrome效果

![image-20200520142019038](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200520142019038.png)

奈何这个世界上还有IE这种东西😣，IE上看一下效果

![image-20200520142207197](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200520142207197.png)

可以看一下报错的地方：

```js
eval("const name = 'Alan';\r\nconst list = [1, 8, 4, 6];\r\n\r\nconst resultList = list.filter(item => item > 5);\r\n\r\nnew Promise(() => {\r\n  console.log('666');\r\n})\r\n\r\nconsole.log(resultList);\r\n\n\n//# sourceURL=webpack:///./src/index.js?");
```



**看来IE是识别不了ES6语法的**，那我们这里就要借助babel处理了。

```js
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

`@babel/preset-env`把ES6转化为ES5

`@babel/core`babel核心内容

配置webpack

```js
{
    test: /\.js$/,
        exclude: /node_modules/, // 不对node_modules下的js文件处理
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
},
```

再打包看一看

![image-20200520143428061](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200520143428061.png)

打包后的index.js文件

```js
var name = 'Alan';
var list = [1, 8, 4, 6];
var resultList = list.filter(function (item) {
  return item > 5;
});
new Promise(function () {
  console.log('666');
});
console.log(resultList);
```

虽然处理了一些ES6语法（箭头函数，const），但是像filter和Promise还是没有处理的。

这里就要使用`@babel-polyfill`，它会模拟一个ES5环境

```
npm install --save @babel/polyfill
```

安装后在文件开头引入就可以了

```js
import '@babel/polyfill';

const name = 'Alan';
const list = [1, 8, 4, 6];

const resultList = list.filter(item => item > 5);

new Promise(() => {
  console.log('666');
})

console.log(resultList);
```

再次打包运行

![image-20200520144125415](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200520144125415.png)

虽然效果完成了，但是对比一下没使用`@babel/polyfil`l和使用了`@babel/polyfill`打包后的大小😮

![image-20200520144511050](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200520144511050.png)

就引入了一个`@babel-polyfill`，体积就增加了这么多？

其实是因为`@babel-polyfill`模拟了所有的ES5环境，而我们这里只使用了Promise和filter，所以我们可以通过配置`useBuiltIns`让它只模拟我们使用到的。

配置了`useBuiltIns`后，它是会自动帮我们引入`@babel/polyfill`所以这里我们无需再引入。

```js
{
    test: /\.js$/,
        exclude: /node_modules/, // 不对node_modules下的js文件处理
         loader: 'babel-loader',
          options: {
              presets: [['@babel/preset-env', {
                  useBuiltIns: 'usage'
              }]]
          }
},
```

```js
main.js   68.6 KiB    main  [emitted]  main
```

再看一下打包后的文件小了很多有没有？



babel的配置是可以单独放在`.babelrc`文件中的，直接将options中的内容放到.babelrc目录下即可

```json
{
  "presets": [["@babel/preset-env", {
    "useBuiltIns": "usage"
  }]]
}
```





### 使用@babel/preset-react打包React文件

```
npm install --save-dev @babel/preset-react
```

{% tabs 4 %}

<!-- tab .babelrc -->

```json
{
  "presets": [["@babel/preset-env", {
    "useBuiltIns": "usage"
  }],
  "@babel/preset-react"
  ]
}
```

<!-- endtab -->

<!-- tab index.js -->

```js
import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
  render() { 
    return (
      <div>Hello React</div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
```

<!-- endtab -->

{% endtabs %}

这里有一点需要注意一下，presets顺序是从后往前的，和css-loader一样，也就是js文件是先被`@babel/preset-react`处理的再被`@babel/preset-env`处理的。



### 总结使用的babel

`@babel/preset-react`处理react的jsx语法

`@babel-polyfill`处理低版本浏览器无法处理的语法，类似Promise、Array.from、Object.assign

`@babel/preset-env`把ES6转化为ES5

`@babel/core`babel核心内容

`useBuiltIns:usage`按需引入

{% note link, 更多配置参考[babel官网](https://babeljs.io/docs/en/) %}