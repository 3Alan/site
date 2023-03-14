---
slug: chatgpt-pdf
title: 基于 ChatGPT 实现一个 PDF 阅读器
tags:
  - chatgpt
keywords:
  - chatgpt pdf
  - chatgpt pdf reader
  - OpenAI API
  - token
  - PostgresSql
  - embedding
  - 余弦相似度算法
authors: Alan
description: 利用 OpenAI API 将 PDF 文本片段转换为向量，并使用余弦相似度算法匹配用户提出的问题和文本片段，从而实现对长文本的问答。
---

最近随着 OpenAI 开放了相关 API， 市面上出现了越来越多的 AI 应用，chatpdf 这个项目吸引了我的注意，它是如何突破 API 最大 token 的限制来读取这种长文本的呢？

<!--truncate-->

基于对 chatpdf 原理的好奇，我开始研究起市面上相关的应用，于是简单了解后写了个简单的 demo 用于学习，顺便熟悉了下 OpenAI API 的使用。

## Demo

在这个 Demo 中，你可以向 ChatGPT 提问 PDF 中的相关问题：

Demo: https://chatgpt-pdf-demo.vercel.app/

Github: https://github.com/3Alan/chatgpt-pdf-demo

Demo 是我提前跑好数据的 "GitHub 隐私协议"。目前 Prompt 还没调试到最佳状态，所以有些问题回答的不算很好。你可以尝试提问一些简单的问题，例如 "GitHub 隐私协议中有哪些个人信息被收集"。

## 大致原理

1. 提取 pdf 文本，以便后续处理。
2. 由于 OpenAI API 对 Token 数量有限制，我们需要将 PDF 文本切分成小于 Token 限制的片段。
3. 将每个片段使用 OpenAI 的 Embedding API 生成向量并保存到数据库（Postgres）中
4. 开始提问题
5. 将用户提出的问题转换为向量。
6. 使用余弦相似度算法将用户提出的问题向量与数据库中的向量进行比较，找到与问题最相似的文本片段。
7. 将片段文本喂给 ChatGPT，让它基于这些片段回答用户提出的问题。

## 使用到的技术栈

- PostgresSql
- Next.js
- Supabase：用于保存向量和文本片段。

目前由于 OpenAI API 调用频率受限，大文件 pdf 在生成向量时需要控制好接口调用频率

## 专有名词

以下是一些专有名词，毕竟我也不是专业搞 AI 的，我就贴一下 ChatGPT 对这些词的理解

### Embedding

Embedding 是一种将离散数据（例如单词、字符、图像等）转换为连续向量的技术。在自然语言处理中，Embedding 技术可以将单词或字符映射到一个低维的连续向量空间中，从而能够更好地表示语义信息。例如，"cat" 和 "dog" 这两个单词在 Embedding 空间中可能会被映射到离得比较近的向量，因为它们都表示动物，而 "cat" 和 "table" 这两个单词在 Embedding 空间中则可能会被映射到离得比较远的向量，因为它们表示的是不同的事物。

在 ChatGPT PDF 项目中，我们使用了 OpenAI 的 Embedding API 将 PDF 文本片段转换为向量，并将这些向量保存到数据库中。这样做的好处是可以更好地表示文本片段的语义信息，从而提高问题匹配的准确率。

### 余弦相似度算法

余弦相似度算法是一种用于计算两个向量之间相似度的方法。它的原理是通过计算两个向量的夹角余弦值来判断它们之间的相似度。

在 ChatGPT PDF 项目中，我们首先将用户提出的问题向量与数据库中的每个文本片段向量进行余弦相似度计算，然后选择最相似的那个文本片段作为上下文向 ChatGPT 提问。

## 参考资料

- https://github.com/mckaywrigley/paul-graham-gpt
- https://github.com/openai/openai-cookbook/blob/main/examples/How_to_stream_completions.ipynb
- https://github.com/ddiu8081/chatgpt-demo

如果这个项目对你有所启发，不妨给我点个 star 吧
