---
title: webpack4.0学习总结（二）
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
date: 2020-05-15 20:00:22
updated: 2020-05-16 13:33:00
sidebar_position: 2
---

这节主要讲一讲一些常见的Loder的使用。包括`file-loader`、`url-loader`以及`css-loader`和`style-loader`。

<!--truncate-->

## Loader

### file-loader

上一节简单介绍了webpack是什么，webpack是一个模块打包器，可以将es的模块文件进行打包。上一节我们只打包了js文件，那我们能不能打包其他类型的文件呢，先来试一试打包图片吧。

这里使用到了file-loader

```
npm i file-loader -D
```

index.js

```js
// ES Moudule 模块化引入
import ComponentB from './componentB';

var root = document.getElementById('root');

// CommonJs 模块引入
var ComponentA = require('./componentA');
var img1 = require('./IMG_3294.jpg');
console.log(img1);
var img = new Image();
img.src = img1;
root.append(img);

new ComponentA();
new ComponentB(); 
```

webpack.config.js

```js
const path = require('path');

module.exports = {
  mode: 'development', // 默认为production
  entry: {
    main: './src/index.js' // 打包入口文件
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  output: { // 输出文件配置
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

`npm run build`进行打包，我们看一下控制台打印出来的img1

![](https://raw.githubusercontent.com/3Alan/images/master/img/20200515205827.png)

这里可以看到img1是一个`Module`。

我们可以通过img1.default来获取路径或者直接通过import形式来引入，这样图片就成功得显示出来了😄

```js
import img1 from './IMG_3294.jpg'
```



通过这个例子可以知道了loader的大致作用方法了，通过`test`来匹配特定文件使用（`use`)特定的`loader`来对文件进行打包处理。

我们再看一下打包出来的文件

```
dist
 ├── a2099657cfcaf9f019ccf08e9dc8747d.jpg
 ├── bundle.js
 └── index.html
```

发现我们的图片名称被改变成了一长串字符，那我怎么让它不改变名字呢。这时候loader的**options**就派上用场了😎

```js
rules: [
    {
        test: /\.(jpg|png)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }
    }
]
```

这里的`[name]`和`[ext]`是loader中的**placeholder**,分别表示文件的名字和后缀名，当然loader中还有很多的[placeholder](https://webpack.js.org/loaders/file-loader/#placeholders)。

设置好后进行打包得到如下结果

```
dist
 ├── bundle.js
 ├── IMG_3294.jpg
 └── index.html
```

现在有一个问题，当我们的图片一旦多起来那全部打包放在根目录下拿岂不是很乱，这个时候就可以使用options中的output来规定经过loader处理后的输出路径了。

```js
options: {
    name: '[name].[ext]',
    outputPath: 'images/'
}
```

打包看一下结果成功👌，运行一下html文件图片也可以正常显示。

```
dist
 ├── bundle.js
 ├── images
 │   └── IMG_3294.jpg
 └── index.html
```

到这里我们就了解了**file-loader**的基本使用了。

### url-loader

url-loader也可以打包文件，但是和file-loader不同的是，它会将我们的图片转化成base64编码，那如果我不想转化呢，我们可以使用options中的limit属性来限制文件在小于多少时转化成base64编码，一旦大于这个值打包出来的效果就和file-loader一样了。

看一下例子就清楚了

```
npm i url-loader -D
```

这里准备两个图片，一个大小300k，一个大小7k

webpack配置

```js
const path = require('path');

module.exports = {
  mode: 'development', // 默认为production
  entry: {
    main: './src/index.js' // 打包入口文件
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 10240
          }
        }
      }
    ]
  },
  output: { // 输出文件配置
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

看一下打包后的文件

```
dist
 ├── bundle.js
 ├── images
 │   └── 300k.jpg
 └── index.html
```

结果是大于10240的300k.jpg文件被以图片形式打包出来了，那7k.jpg文件去哪了呢，我们在bundle.js文件中可以找到了它，它被转化成了base64编码。

```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...
```

当然limit也可以设置为true/false，[更多配置](https://webpack.js.org/loaders/url-loader/#limit)

我在操作中发现了如果html中没有使用到7k.jpg，url-loader是不会对它进行打包的。

> 这里并不建议把大文件转化为base64，这样会增加bundle.js的体积，对项目优化不太友好



### 样式文件

接着上面的例子，我现在想要为页面中的图片添加一些样式

index.js

```js
// ES Moudule 模块化引入
import ComponentB from './componentB';
import './index.css';

var root = document.getElementById('root');

// CommonJs 模块引入
var ComponentA = require('./componentA');
import img1 from './300k.jpg';
console.log(img1);

var img = new Image();
img.src = img1;
img.classList.add('circle');
root.append(img);

new ComponentA();
new ComponentB(); 
```

index.css

```css
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
```

现在我想要打包css文件该怎么办呢😶，我们要用到两个loader，`css-loader`和`style-loader`

安装

```
npm i style-loader css-loader -D
```

webpack配置

```js
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}
```

打包成功，打开网页看一看效果生效了

![image-20200515222855901](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200515222855901.png)

这里简单介绍一下style-loader和css-loader的作用，首先它们执行有先后顺序的，先使用css-loader对css文件进行打包，再用style-loader把打包后的css文件内容以`<style></style>`加到页面的header中。

![image-20200515223148666](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200515223148666.png)

{% note info, 有时候我们要为css加上浏览器引擎前缀-webkit，这里有一个loader可以帮我们完成postcss-loader %}

安装

```
npm i postcss-loader autoprefixer -D
```

webpack配置

```js
{
    test: /\.css$/,
        use: ['style-loader', 'css-loader', {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                pulgins: [
                    require('autoprefixer')
                ]
            }
        }],
},
```

这里貌似有点问题，后期我再研究研究。



## 扩展

### css模块化

先看一个场景

{% tabs 3%}

<!-- tab index.js -->

```js
import './index.css';
import img1 from './300k.jpg';
import ComponentA from './componentA';

var root = document.getElementById('root');

var img = new Image();
img.src = img1;
img.classList.add('circle');
root.append(img);

ComponentA();
```

<!-- endtab -->

<!-- tab componentA.js -->

```js
import img1 from './300k.jpg';

function ComponentA() {
  var img = new Image();
  img.src = img1;
  img.classList.add('circle');
  var root = document.getElementById('root');
  root.append(img);
}

export default ComponentA;
```

<!-- endtab -->

{% endtabs %}

![image-20200516121515523](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200516121515523.png)

我们看到circle样式同样作用在了componentA上了，也就是说circle已经等同于是全局样式了😥。还好我们可以通过配置`css-loader`的options来使用css的模块化来解决这个问题。

```js
{
    test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    pulgins: [require('autoprefixer')],
                },
            },
        ],
},
```

配置好后我们在要使用样式的地方使用下面这种写法

```js
import circle from './index.css';

img.classList.add(circle.circle);
```

这样我们再修改样式就不会影响到其他地方了。



### css外部引入

这里主要介绍css-loader的options`importLoaders`。

我们在index.css文件中引入外部css文件

```css
@import './import.css';
```

假设我们有以下几个loader处理css文件

`['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']`

当webpack处理index.css文件时按照postcss-loader->sass-loader->css-loader顺序来执行css文件的

当遇到@import时处理import.css时，如果不做处理的话，import.css将直接从css-loader开始处理的，那我想让它从postcss-loader从头处理的话就要设置imortLoaders数目了。

```js
{
    loader: 'css-loader',
    options: {
        importLoaders: 1,
    }
},
```

这里的1表示处理@import引入的css文件是，先要被前面的1个loader处理，也就是import.css的处理顺序是sass-loader->css-loader-style-loader。



### 处理字体文件

直接使用`file-loader`处理就可以了

{% tabs 4 %}

<!-- tab webpack.config.js -->

```js
{
    test: /\.(eot|ttf|svg|woff)$/,
    use: {
    	loader: 'file-loader',
    },
},
```

<!-- endtab -->

<!-- tab index.js -->

```js
import './font/iconfont.css';

var root = document.getElementById('root');

root.innerHTML = '<div class="iconfont icon-smile"></div>'
```

<!-- endtab -->

<!-- tab iconfont.css -->

```js
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1589604469136'); /* IE9 */
  src: url('iconfont.eot?t=1589604469136#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,这里base64代码太长删除掉了') format('woff2'),
  url('iconfont.woff?t=1589604469136') format('woff'),
  url('iconfont.ttf?t=1589604469136') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1589604469136#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-smile:before {
  content: "\e783";
}
```

<!-- endtab -->

{% endtabs %}

ok!这章到此介绍。现在我们已经能够处理一些常见文件的打包了，对webpack的认识也应该算一个简单的入门了。😁

