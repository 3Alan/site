---
slug: chatgpt-pdf
title: Implementing a PDF Reader Demo with ChatGPT
tags:
  - chatgpt
keywords:
  - chatgpt pdf
  - chatgpt pdf reader
  - OpenAI API
  - chatpdf implementation principle
  - PostgresSql
  - embedding
  - cosine similarity algorithm
authors: Alan
description: >-
  This document explains the implementation principle of chatpdf. It uses the
  OpenAI API to convert PDF text fragments into vectors and matches the
  questions posed by users to the text fragments using the cosine similarity
  algorithm, thereby implementing a question-and-answer system for long texts.
summary: >-
  Recently, with the OpenAI API becoming more accessible, there has been an
  increase in AI applications. The chatpdf project caught my attention as it
  extracts text from PDFs, segments the text into fragments that are smaller
  than the token limit, generates vectors using the OpenAI Embedding API, and
  saves them to a database. It then converts user-provided questions into
  vectors and matches them with the vectors in the database using the cosine
  similarity algorithm to find the most similar text fragment. Finally, the text
  fragment is fed to ChatGPT to answer the user's question. This project
  utilizes technologies such as PostgresSql, Next.js, and Supabase.
ai_translation: true
---

Recently, with the OpenAI API becoming more accessible, there has been an increase in AI applications. The chatpdf project caught my attention. How does it overcome the token limit of the API to read such long texts?

<!--truncate-->

:::tip
🎉🎉 My new project [DocsMind](https://github.com/3Alan/DocsMind) has now been open-sourced. It supports Markdown, PDF, and Docker deployment. Feel free to star and contribute via PR.
:::

Out of curiosity about the principles of chatpdf, I started researching related applications on the market and created a simple demo for learning purposes. In the process, I also familiarized myself with the usage of the OpenAI API.

## Demo

In this demo, you can ask ChatGPT questions related to the content of a PDF:

Demo: https://chatpdf-demo.alanwang.site/

Github: https://github.com/3Alan/chatgpt-pdf-demo

The demo is a prepared data for the "GitHub Privacy Policy." Currently, the prompt has not been fine-tuned to its optimal state, so some answers may not be very accurate. You can try asking some simple questions, such as "What personal information is collected in the GitHub Privacy Policy?"

## General Principle

1. Extract the text from the PDF for further processing.
2. Since the OpenAI API has a limit on the number of tokens, we need to segment the PDF text into fragments smaller than the token limit.
3. Use the OpenAI Embedding API to generate vectors for each fragment and save them in a Postgres database.
4. Start asking questions.
5. Convert the user-provided question into a vector.
6. Use the cosine similarity algorithm to compare the question vector with the vectors in the database and find the most similar text fragment.
7. Feed the fragment text to ChatGPT to generate an answer to the user's question.

These are just the general principles. The specific code implementation involves:

- How to extract the text?
- What criteria to use for segmentation? How to ensure that each fragment is semantically related?

Since the extracted PDF text consists of words, we can only segment it based on word count and use sentences as the segmentation criteria. We simply split the text into fragments using the separators ".", and "。". If it is Markdown, it is easier since we can segment it based on paragraphs. This way, we can ensure that each fragment is semantically related (the task of semantic segmentation is actually delegated to the person who writes the Markdown).

## Technologies Used

- PostgresSql
- Next.js
- Supabase: Used to save vectors and text fragments.

Currently, due to rate limits imposed by the OpenAI API, controlling the API call frequency is necessary when generating vectors for large PDF files.

## Glossary

Here are some terms, and I'll share the understanding of these terms by ChatGPT:

### Embedding

Embedding is a technique that converts discrete data (e.g., words, characters, images) into continuous vectors. In natural language processing, embedding technology can map words or characters to a low-dimensional continuous vector space, thus representing semantic information better. For example, the words "cat" and "dog" may be mapped to vectors that are close together in the embedding space because they both represent animals, while the words "cat" and "table" may be mapped to vectors that are far apart in the embedding space because they represent different things.

In the ChatGPT PDF project, we use the OpenAI Embedding API to convert PDF text fragments into vectors and save these vectors to a database. This approach allows us to better represent the semantic information of text fragments and thereby improve the accuracy of question matching.

### Cosine Similarity Algorithm

The cosine similarity algorithm is a method for calculating the similarity between two vectors. It calculates the cosine value of the angle between two vectors to determine their similarity.

In the ChatGPT PDF project, we first calculate the cosine similarity between the user's question vector and the vectors of each text fragment in the database. We then select the most similar text fragment as the context for ChatGPT to answer.

## Running the Demo Locally

:::warning
Please make sure you can access https://api.openai.com

```bash
curl https://api.openai.com
```

If you receive the following result, it means you can access the API. Otherwise, you will need to configure the OPENAI_API_PROXY environment variable to proxy https://api.openai.com

```
{
  "error": {
    "message": "Invalid URL (GET /)",
    "type": "invalid_request_error",
    "param": null,
    "code": null
  }
}

```

:::

### Cloning the Project

1. Clone the project.
2. Create an `.env` file and fill in the environment variables. You can refer to `.env.example`.
   ![20230325110936](https://raw.githubusercontent.com/3Alan/images/master/img/20230325110936.png)

### Creating the Database Using Supabase

Copy the contents of the `schema.sql` file in the project's root directory to Supabase and run it.
![supabase](https://raw.githubusercontent.com/3Alan/images/master/img/img20230325104103.png)

After running it, you will have the `chatgpt` table.

### Running the Project

```
yarn
```

```
yarn dev
```

1. Delete the default displayed [pdf](https://github.com/3Alan/chatgpt-pdf-demo/blob/main/src/pages/index.tsx#LL45C51-L45C72).
2. Modify `disabledUpload` to `false` in [this line](https://github.com/3Alan/chatgpt-pdf-demo/blob/7c8daa32a9d2450f037224a06cc821ff682f5c36/src/pages/index.tsx#L46).

Once you have completed these steps, you will see
![20230325105607](https://raw.githubusercontent.com/3Alan/images/master/img/img20230325105607.png)

Then, upload your PDF and click "start reading." This will take some time (depending on the size of your PDF), during which you can use the browser console to view network requests.

:::warning
If your file is too large, you may encounter failures due to the rate limits of the OpenAI API.
:::

After the PDF has been processed, you will see the embedded values in your Supabase.
![20230325105953](https://raw.githubusercontent.com/3Alan/images/master/img/img20230325105953.png)

After completing these steps, you can start asking questions. You can fine-tune the [prompt](https://github.com/3Alan/chatgpt-pdf-demo/blob/588135cc265eb702b39d9ee9a853264173c45dc5/src/utils/openaiStream.ts#L19) to make the answers more accurate.

### Adjusting the PDF Display

After completing the above steps, you can:

1. Move your PDF to the "public" directory.
2. Change the default displayed PDF to the path of your uploaded PDF.
3. Change `disabledUpload` to `true` so you won't see the file upload module.

## References

- https://github.com/mckaywrigley/paul-graham-gpt
- https://github.com/openai/openai-cookbook/blob/main/examples/How_to_stream_completions.ipynb
- https://github.com/ddiu8081/chatgpt-demo

If this project has inspired you in any way, feel free to give it a [star](https://github.com/3Alan/chatgpt-pdf-demo).
