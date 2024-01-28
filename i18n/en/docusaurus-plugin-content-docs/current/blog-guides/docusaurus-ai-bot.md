---
slug: docusaurus-ai-bot
title: Docusaurus Automated Article Summarization
tags:
  - Blog
  - Docusaurus
keywords:
  - Docusaurus
  - Probot
  - Gemini
  - AI summarizer
date: 2024-01-14T00:00:00.000Z
description: >-
  This article introduces a method for automatically generating summaries for
  blog articles using a Gemini AI bot without the need for a server. The method
  utilizes the Gemini API to generate summaries and inserts them into the front
  matter of the documents using either Github Actions or a Github bot. The
  article also explains how to deploy the bot and trigger it to summarize all
  blog posts. Finally, the author summarizes the advantages and disadvantages of
  using this method and proposes future feature enhancements.
sidebar_position: 1
summary: >-
  The author introduces a method for automatically generating article summaries
  for blog articles without a server by using a Github bot. This method utilizes
  the Gemini API to generate summaries and inserts them into the front matter of
  the documents. The author also explains how to deploy the bot and trigger it
  to summarize all blog posts. Finally, the author summarizes the current
  advantages and disadvantages of using this method and proposes future feature
  enhancements. 
ai_translation: true
---

First, let's take a look at the result.
![20240114223129](https://raw.githubusercontent.com/3Alan/images/master/img/20240114223129.png)
![20240114223229](https://raw.githubusercontent.com/3Alan/images/master/img/20240114223229.png)

Recently, Google's AI model Gemini was released. Based on the principle of freeloading, I decided to add AI summarization functionality to my blog. Since my blog is a static website without a server, and I don't want to introduce a server, I couldn't write an API on it. Therefore, after researching several solutions, I decided to summarize the articles during build and insert the summaries into the front matter of the documents, so that I could directly retrieve the summaries without a server.

## Solutions

I came up with several solutions:

1. Use Github Actions to listen for push events, call the Gemini API to generate summaries in the Actions, and then insert the summaries into the front matter of the documents.
2. Use a Github bot to listen for Github Webhook events, call the Gemini API to generate summaries in the bot, and then insert the summaries into the front matter of the documents. The entire workflow is smooth, and you only need to review and merge the bot's PR.
3. Request the Gemini API directly on the webpage to generate summaries and display them.

First, the third solution is excluded because the blog is a static webpage and it is not safe to send the API key directly to the client-side. Although the first solution is feasible, it does not have as many features as the second solution and the second solution utilizes a mature framework called [Probot](https://probot.github.io/). Therefore, I finally chose the second solution.

So, I developed a Github bot to automate the summarization functionality, [project link](https://github.com/3Alan/docs-ai-bot).

## Deploying the Bot

I initially wanted to deploy it on Vercel, but the free version of Vercel's Serverless Function has a timeout of 10 seconds, while the summarization process takes much longer than 10 seconds. It took me about 3 minutes to summarize 55 articles. After researching some services, I ended up using the free plan of [Zeabur](https://zeabur.com?referralCode=3Alan) to deploy it. However, their free plan may randomly shut down certain services, so I will see if I can find some other services to use for free.
![20240114215619](https://raw.githubusercontent.com/3Alan/images/master/img/20240114215619.png)

### Deploying to Zeabur

Simply use the template I created below.

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/EZOGJM?referralCode=3Alan)

![20240114220851](https://raw.githubusercontent.com/3Alan/images/master/img/20240114220851.png)

### Creating a Github App

First, clone the [project code](https://github.com/3Alan/docs-ai-bot) and run the following commands:

```
npm install

npm start
```

Open `http://localhost:3000`
![20240114221333](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221333.png)
Register your own bot
![20240114221511](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221511.png)
![20240114221600](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221600.png)

After completing these steps, an `.env` file will appear in your project.

![20240114221743](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221743.png)

Copy the contents of the environment variables in this file to the environment variables in Zeabur.
![20240114221904](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221904.png)

### Obtaining the Gemini API KEY

Open the [link](https://makersuite.google.com/app/prompts/new_freeform)

![20240114222123](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222123.png)

Add this API KEY to the environment variable `GEMINI_API_KEY` in Zeabur. After completing these operations, **deploy again**.

![20240114222317](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222317.png)

### Obtaining the Webhook URL

![20240114222515](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222515.png)

Insert this URL into the Github App's Webhook URL field.

1. Go to https://github.com/settings/apps
2. Find the Github App you just created, click Edit
3. Fill in your Webhook URL
4. Click Save

![20240114222809](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222809.png)

With this, all installation work is complete.

## Triggering the Summarization of All Blog Posts

First, create an issue and add a `summarizer` label to it. This will trigger the bot to start summarizing your blog posts. The speed of completion depends on the number of articles in your repository. It took about 3 minutes for me to summarize 55 articles.

![20240114223129](https://raw.githubusercontent.com/3Alan/images/master/img/20240114223129.png)

## Adding the Summary Component

Install the third-party library:

```
yarn add typed.js
```

First, make sure you have previously swizzled the `DocItem/Layout` and `BlogPostPage` components. Refer to [this article](/posts/blog-guides/docusaurus-comment#swizzling-docusaurus-内部组件) for the specific steps. I won't go into too much detail here.

For specific modifications, refer to [this commit](https://github.com/3Alan/site/commit/ce04cf23f0ae36c118db2bb8d359b2ee85f2676c).

## Conclusion

Currently, I can only use Zeabur's free plan to deploy the bot because I don't have an available server. Later, I may research how to use Github Actions to run it.

Regarding feature requirements, I may add an automatic translation workflow in the future.
