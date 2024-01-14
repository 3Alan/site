---
slug: chatText
title: 使用 llama-index 来实现 chatpdf
draft: true
tags:
  - chatgpt
  - chatpdf
keywords:
  - chatgpt pdf
  - chatgpt pdf reader
  - OpenAI API
  - chatpdf 实现原理
  - llama-index
authors: Alan
description: >-
  解析 chatpdf 实现原理，利用 OpenAI API 将 PDF
  文本片段转换为向量，并使用余弦相似度算法匹配用户提出的问题和文本片段，从而实现对长文本的问答。
summary: >-
  最近，我开发了一个借助 AI 来帮助你阅读理解文本的程序。它支持阅读 PDF、Markdown、HTML 和 TXT
  格式的文本。该程序的实现原理是将文本片段转换为向量，并使用余弦相似度算法匹配用户提出的问题和文本片段，从而实现对长文本的问答。我使用了功能完善的
  `llama-index` 库来实现这一功能。Markdown 文件在生成索引时会对最终展示的 HTML 进行预处理，将 HTML
  元素节点和索引中的块关联起来，以便实现高亮源代码的功能。
---

最近利用业余时间写了一个借助 AI 来帮助你阅读理解文本的程序，支持阅读 pdf,markdown,html,txt 格式的文本，开发过程中也是学习了不少新知识也遇到了不少问题，这篇文章就来总结一下

<!--truncate-->

## Demo

视频或者 gif

## 实现原理

关于如何让 AI 阅读长文本的大致原理可以看下我的这篇[文章](https://www.alanwang.site/blog/chatgpt-pdf)

这里用到了市面上功能比较完善的 `llama-index`，它提供了多种检索方式。

## 分 chunk

- 在语义上进行分割，使用 md 可以很好做到这一点

## 预处理文件

### Markdown 文件

这里在生成索引时对最终展示的 html 进行里处理，将 html 元素节点和索引中的 chunk 块进行了关联，这样就可以实现高亮 source 的功能

### PDF 文件

最初的想法是将 PDF 处理成 html，调研了市面上大部分的库，几乎都是只能 pdf2text，只有 pdf2htmlex 这个库能够完美转换，但是生成的产物并不符合要求
