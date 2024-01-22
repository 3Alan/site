---
slug: chatText
title: Implementing chatpdf using llama-index
draft: true
tags:
  - chatgpt
  - chatpdf
keywords:
  - chatgpt pdf
  - chatgpt pdf reader
  - OpenAI API
  - chatpdf implementation principle
  - llama-index
authors: Alan
description: >-
  Analyze the implementation principle of chatpdf, use the OpenAI API to convert
  PDF text fragments into vectors, and use the cosine similarity algorithm to
  match user questions and text fragments, thereby realizing Q&A for long texts.
summary: >-
  Recently, I wrote a program in my spare time that uses artificial intelligence
  to help you read and understand text. This program supports reading text in
  PDF, Markdown, HTML and TXT formats. During the development process, I learned
  a lot of new knowledge and encountered some problems.


  This program uses a library called `llama-index`, which provides a variety of
  retrieval methods. I use Markdown to chunk the text, so that the AI can better
  understand the text. For PDF files, I use a library called `pdf2htmlex` to
  convert them to HTML.
ai_translation: true
---

Recently, I used my spare time to write a program that uses AI to help you read and understand text. It supports reading text in pdf, markdown, html, and txt formats. During the development process, I also learned a lot of new knowledge and encountered many problems. This article will summarize it.

<!--truncate-->

## Demo

Video or gif

## Implementation principle

For the general principle of how AI reads long text, you can read my [article](https://www.alanwang.site/blog/chatgpt-pdf)

Here I use the `llama-index` on the market, which provides a variety of retrieval methods.

## Chunk

- Divide semantically, and md can do this very well

## Preprocess files

### Markdown files

Here, when generating the index, the final displayed html is post-processed, and the html element nodes and the chunk blocks in the index are associated, so that the source highlighting function can be realized.

### PDF files

The original idea was to process PDF into html. After investigating most of the libraries on the market, almost all of them can only convert pdf2text. Only the pdf2htmlex library can convert perfectly, but the generated product does not meet the requirements.
