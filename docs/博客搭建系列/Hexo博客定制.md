---
title: Hexo博客定制
tags:
  - Hexo
  - Valine国际版
  - Hexo评论系统
  - DIY博客
categories:
  - Hexo博客
references:
  - name: valine-admin document
    url: 'https://deserts.io/valine-admin-document/'
    date: 2020-05-16T16:02:00.000Z
abbrlink: b050203a
---

{% note info, 介绍了评论系统以及一些自定义配置 %}

<!-- more -->

## 评论系统

### 注册一个LeanCloud国际版账号（国内的好像需要绑定域名和备案）

注册地址👉https://console.leancloud.app/login.html#/signup

之后创建一个应用，名字随便取



在设置中找到应用keys,把appid和appkey复制到hexo对应的配置当中。由于本文重点讲邮件回复功能，这一部分就不多过赘述了😝。直接进入正题。



- 修改邮件模板

  ![image-20200516161903124](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200516161903124.png)

```html
<p>Hi, {{username}}</p>
<p>
你在 {{appname}} 的评论收到了新的回复，请点击查看：
</p>
<p><a href="https://alanwang.site" style="display: inline-block; padding: 10px 20px; border-radius: 4px; background-color: #3090e4; color: #fff; text-decoration: none;">马上查看</a></p>
```



### 部署valine-admin

首先进行配置

![image-20200516163804087](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200516163804087.png)

更多配置参考：https://github.com/DesertsP/Valine-Admin

```
https://github.com/DesertsP/Valine-Admin.git
```

网上的zhaojun1998版本我之前也试过，但是在国际版部署是会报错的，看错误信息应该是node版本太低了，而且就算部署成功了，后台也是登录不了的。这个版本我实测是没有问题的。

**部署分支默认为master**

点击部署即可

![image-20200516164223578](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200516164223578.png)

点击该链接访问后台管理系统（这里需要用户名和密码登录，需要到存储中的_User中自行创建）

![image-20200516164422299](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200516164422299.png)

这里只需要填写username、password、email即可，添加后在后台管理系统输入邮箱和密码就可以成功登录了。

![image-20200516164630798](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200516164630798.png)



设置定时唤醒

```js
0 */30 7-23 * * ?
```

![image-20200516164138651](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200516164138651.png)



## 添加百度统计

完成以下操作

- 注册百度统计账号
- 复制统计代码

![image-20200604101820220](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200604101820220.png)

- 将代码粘贴到`G:\blog\themes\volantis\layout\_partial`下的footer.ejs
- 配置`G:\blog\_config.yml`

```
baidu_analytics_key: 上面图片中的key值
```

- 查看是否配置成功

直接使用官网的代码检查就可以，如果没有用可以使用下面这种方法。

在控制台network中查看自己的网站是否有**hm**开头的请求，有就代表了成功了，大概20分钟后就可以在百度统计中看到数据了。

![image-20200604102323835](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200604102323835.png)

## 使用hexo-admin管理
安装hexo-admin
```
npm i hexo-admin -S
```
运行命令
```
hexo s -d
```
通过localhost:4000/admin访问即可
如需使用hexo-admin中的deploy，只需在_config.yml中配置
```yml
admin:
	deployCommand: './hexo-deploy.sh'
```



## hexo-abbrlink生成永久链

没修改前的链接是这样的

![image-20200612183542458](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200612183542458.png)

我们一旦修改了文章的发布日期， 那么这个链接就会失效了。

那我们通过`hexo-abbrlink`处理一下

首先安装

```yml
npm i hexo-abbrlink -S
```

修改_config.yml下的配置

```yml
permalink: posts/:abbrlink/
abbrlink:  
  alg: crc32
  rep: hex
```

详细配置可以查看[官网](https://github.com/rozbo/hexo-abbrlink)

当然如果你想让链接变成你的标题的话，不需要安装`hexo-abbrlink`插件，只需要修改配置
```yml
permalink: posts/:title
```

## 给外链添加nofollow
使用 [`hexo-filter-nofollow`](https://github.com/hexojs/hexo-filter-nofollow) 自动给外链添加 `nofollow ` 属性防止外链减低本站的SEO权重



## 搜索引擎url自动上传

使用插件[hexo-submit-urls-to-search-engine](https://github.com/cjh0613/hexo-submit-urls-to-search-engine)


## 使用vercel部署Hexo

目前国内vercel的访问速度已经非常可以了，并且由于`github page`禁止了百度爬虫所以我就从之前的`github page`转移到了vercel部署。



由于vercel内置`hexo`模板，所以每次部署不行要再像之前一样敲一大堆命令了。

```yml
hexo clean
hexo g
hexo d
```



配置package.json

```json
  "scripts": {
    "build": "hexo generate && yarn deploy",
    "deploy": "hexo deploy",
  },
```



vercel配置

![image-20211016103341684](https://raw.githubusercontent.com/3Alan/images/master/img/image-20211016103341684.png)



这样以后写完文章后直接push一下代码就可以自动部署了。



## TODO

- 优化seo
- 样式微调
- 去除消耗加载速度的插件
- 使用cdn


## `hexo d` 部署后页面404
当我在mac上部署时发现页面404了，经过对比排查后发现是由node版本造成的，故使用对应的node版本即可解决。