---
slug: chatText
title: Implementing chatpdf with llama-index
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
  Analyzing the implementation principle of chatpdf, using OpenAI API to convert
  PDF text snippets into vectors, and using cosine similarity algorithm to match
  user questions and text snippets, thus implementing question-answering for
  long texts.
summary: >-
  Recently, I wrote a program in my spare time to help you read and understand
  text using artificial intelligence. This program supports reading text in PDF,
  Markdown, HTML, and TXT formats. During the development process, I learned a
  lot of new knowledge and encountered some problems.

  This program uses a library called `llama-index`, which provides various
  retrieval methods. I use Markdown to chunk the text, which helps the AI better
  understand the text. For PDF files, I use a library called `pdf2htmlex` to
  convert them into HTML.
ai_translation: true
---

Recently, I wrote a program in my spare time to help you read and understand texts with the help of AI. It supports reading texts in PDF, Markdown, HTML, and TXT formats. During the development process, I learned a lot of new knowledge and encountered some problems. This article aims to summarize them.

<!--truncate-->

## Demo

Video or GIF

## Implementation Principle

For a rough idea of how to make AI read long texts, you can refer to my article [here](https://www.alanwang.site/blog/chatgpt-pdf).

I used the well-established `llama-index` library, which provides various retrieval methods.

## Chunking

- Splitting the text semantically, which can be easily achieved using Markdown.

## Preprocessing Files

### Markdown Files

During the indexing process, I performed additional processing on the generated HTML to associate HTML element nodes with chunk blocks in the index, enabling the highlighting of the source.

### PDF Files

Initially, the idea was to convert the PDF into HTML. After researching most of the available libraries, almost all of them could only convert to plain text, except for the library `pdf2htmlex`, which could perfect the conversion. However, the resulting output did not meet the requirements.
