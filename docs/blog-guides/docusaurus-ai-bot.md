---
slug: docusaurus-ai-bot
title: Docusaurus 自动化生成文章总结
tags:
  - 博客
  - Docusaurus
keywords:
  - Docusaurus
  - Probot
  - Gemini
  - AI summarizer
date: 2024-01-14T00:00:00.000Z
description: 利用 Gemini AI 搭配 Github Bot 实现自动化生成文章总结
sidebar_position: 1
summary: >-
  最近，谷歌发布了 AI 模型
  Gemini，我打算将其集成到我的静态博客中，为文章自动生成摘要。由于博客没有服务端，我决定在构建时对文章进行摘要生成，并将摘要插入到文档的前置内容中。经过调研，我选择了使用
  Github 机器人来实现这一功能，并将其部署在 Zeabur
  的免费计划上。机器人会在检测到新的文章时自动生成摘要，并将摘要添加到文章的前置内容中。目前，我还在探索如何使用 Github Action
  来运行机器人，并计划在未来添加自动翻译功能。
---

先看效果
![20240114223129](https://raw.githubusercontent.com/3Alan/images/master/img/20240114223129.png)
![20240114223229](https://raw.githubusercontent.com/3Alan/images/master/img/20240114223229.png)

最近谷歌的 AI 模型 Gemini 发布了，本着白嫖的原则，准备给我的博客加上 AI 总结的功能。由于我的博客是一个静态网站，没有服务端并且我也不想引入服务端，所有没有办法在上面写接口。于是在调研了一些方案后决定在 build 时对文章进行总结并将总结的内容插入到文档的 front matter 中，这样就可以在没有服务端的情况下直接读取到总结的内容了。

## 方案

我一共想到了几种方案

1. 通过 Github Action 监听 push 事件，然后在 Action 中调用 Gemini API 生成总结，最后将总结的内容插入到文档的 front matter 中。
2. 通过 Github Bot 监听 Github Webhook 事件，然后在 Bot 中调用 Gemini API 生成总结，最后将总结的内容插入到文档的 front matter 中，由 Bot 提交 PR，整个工作流比较顺滑，你只需要 Review 并合并 Bot 的 PR 即可。
3. 直接在页面上请求 Gemini API 生成总结然后展示在页面上。

首先第三种方案由于博客是静态页面，出于安全考虑没办法将 API KEY 直接发送给客户端，所以这种方案直接排除了。
第一种方案虽然可行但是没有第二种方案能实现的功能多，并且第二种方案社区有成熟的框架 [Probot](https://probot.github.io/) 使用，所以我最后选择了第二种方案。

于是我自己开发了一个 Github 机器人来完成自动化总结的功能， [项目地址](https://github.com/3Alan/docs-ai-bot)

## 部署机器人

本来想使用 Vercel 部署的，可是 Vercel 的免费版的 Serverless Function 有 10s 的超时时间，而总结的时间是远超过 10s 的，我总结 55 篇文章大概耗费了 3 分钟。在调研了一些服务后，我最后使用了 [Zeabur](https://zeabur.com?referralCode=3Alan) 的免费计划来部署，不过它的免费计划针对一些服务可能会将其无故关闭，后面看是否能找到一些能够白嫖的服务。
![20240114215619](https://raw.githubusercontent.com/3Alan/images/master/img/20240114215619.png)

### 部署到 Zeabur

直接使用下面我创建好的模版

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/EZOGJM?referralCode=3Alan)

![20240114220851](https://raw.githubusercontent.com/3Alan/images/master/img/20240114220851.png)

### 创建 Github App

首先将[项目代码](https://github.com/3Alan/docs-ai-bot)拉取下来，然后执行以下命令

```
npm install

npm start
```

打开 `http://localhost:3000`
![20240114221333](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221333.png)
注册属于你自己的 bot
![20240114221511](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221511.png)
![20240114221600](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221600.png)

完成这些步骤后在你的项目中会出现一个 `.env` 文件

![20240114221743](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221743.png)

将这个文件中的环境变量内容复制到 Zeabur 的环境变量中
![20240114221904](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221904.png)

### 获取 Gemini API KEY

打开[地址](https://makersuite.google.com/app/prompts/new_freeform)

![20240114222123](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222123.png)

将这个 API KEY 添加到 Zeabur 的环境变量 `GEMINI_API_KEY` 中，完成这些操作后 **重新部署一次**

![20240114222317](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222317.png)

### 获取 Webhook 地址

![20240114222515](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222515.png)

将该地址回填到 Github App 的 Webhook 地址中。

1. 访问 https://github.com/settings/apps
2. 找到你刚才创建的 Github App，点击 Edit
3. 填入你的 Webhook 地址
4. 点击保存

![20240114222809](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222809.png)

到此所有安装工作全部完成

## 触发总结所有博文

首先新建一个 issue，然后给你这个 issue 添加一个 `summarizer` label，这样机器人就会开始总结你的博文了，具体完成的速度看你的仓库中有多少文章，我 55 篇文章大概花费了 3 分钟时间。

![20240114223129](https://raw.githubusercontent.com/3Alan/images/master/img/20240114223129.png)

## 添加总结组件

安装三方库

```
yarn add typed.js
```

首先确保你之前 Swizzling 过 `DocItem/Layout` 和 `BlogPostPage` 组件，具体步骤参考 [这篇文章](/posts/blog-guides/docusaurus-comment#swizzling-docusaurus-内部组件)，这里我不在过多赘述。

具体修改查看 [这个提交](https://github.com/3Alan/site/commit/ce04cf23f0ae36c118db2bb8d359b2ee85f2676c)

## 总结

目前由于手中没有可用的服务器，所有只能使用 Zeabur 的免费计划来部署机器人，后期可能会调研如何使用 Github Action 运行。

关于功能需求，后期可能会增加自动翻译工作流。
