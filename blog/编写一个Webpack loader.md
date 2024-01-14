---
slug: webpack-loader
title: 编写一个Webpack loader
draft: true
summary: >-
  Webpack loader 是一种用于转换或处理 Webpack 中资源的工具。它允许你自定义资源的处理方式，例如，你可以使用 loader 来编译
  Sass 文件、压缩图像或转换视频。


  编写 Webpack loader 需要遵循一定的步骤，包括创建 loader 函数、导出 loader 函数、在 Webpack 配置文件中注册
  loader。


  Webpack loader 可以用于各种各样的目的，例如，你可以使用 loader 来：


  * 清除代码中的 console 语句

  * 在代码中添加 MIT 协议

  * 加载视频文件并将其转换为可播放的格式
---

> https://advancedweb.hu/how-to-write-a-webpack-loader/
>
> https://redd.one/blog/writing-custom-webpack-loader

## 例子

- 清除代码中的 console replace-loader?
- 代码中添加 mit 协议
- 加载 video 视频 emitFile
