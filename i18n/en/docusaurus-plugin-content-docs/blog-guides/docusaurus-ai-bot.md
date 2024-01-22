---
slug: docusaurus-ai-bot
title: Docusaurus Automatic Article Summary Generation
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
  This article introduces a method to automatically generate summaries for blog
  posts using a GitHub bot without a backend. The method utilizes the Gemini API
  to generate summaries and inserts them into the document's front matter via
  GitHub Action or GitHub Bot. The author also explains how to deploy the bot
  and trigger it to summarize all blog posts. Finally, the author summarizes the
  advantages and disadvantages of using this method and proposes ideas for
  future feature requirements.
ai_translation: true
---

Let's see the effect first
![20240114223129](https://raw.githubusercontent.com/3Alan/images/master/img/20240114223129.png)
![20240114223229](https://raw.githubusercontent.com/3Alan/images/master/img/20240114223229.png)

Google's AI model Gemini was recently released, and in the spirit of freebies, I'm going to add an AI summary feature to my blog. Since my blog is a static site with no backend and I don't want to introduce a backend, there's no way to write an interface on it. So after researching some solutions, I decided to summarize articles during build and insert the summary content into the document's front matter. This way, I can directly read the summary content without a backend.

## Solution

I came up with a total of three solutions

1. Use GitHub Action to listen for push events, then call the Gemini API in the Action to generate a summary, and finally insert the summary content into the document's front matter.
2. Use GitHub Bot to listen for GitHub Webhook events, then call the Gemini API in the Bot to generate a summary, and finally insert the summary content into the document's front matter. The bot submits a PR, and the entire workflow is smooth. You only need to review and merge the bot's PR.
3. Request the Gemini API directly on the page to generate a summary and then display it on the page.

First of all, the third solution is directly ruled out because the blog is a static page, and for security reasons, the API KEY cannot be sent directly to the client.
Although the first solution is feasible, it does not have as many functions as the second solution, and the second solution has a mature framework [Probot](https://probot.github.io/) in the community, so I finally chose the second solution.

So I developed a GitHub bot myself to complete the automatic summary function, [project address](https://github.com/3Alan/docs-ai-bot)

## Deploy the bot

I originally wanted to use Vercel for deployment, but Vercel's free Serverless Function has a 10s timeout, and the summary time is far more than 10s. It took me about 3 minutes to summarize 55 articles. After researching some services, I finally used [Zeabur](https://zeabur.com?referralCode=3Alan)'s free plan for deployment, but its free plan may shut down some services for no reason. Later, I will see if I can find some services that can be free.
![20240114215619](https://raw.githubusercontent.com/3Alan/images/master/img/20240114215619.png)

### Deploy to Zeabur

Use the template I created directly below

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/EZOGJM?referralCode=3Alan)

![20240114220851](https://raw.githubusercontent.com/3Alan/images/master/img/20240114220851.png)

### Create a GitHub App

First, pull down the [project code](https://github.com/3Alan/docs-ai-bot), then execute the following command

```
npm install

npm start
```

Open `http://localhost:3000`
![20240114221333](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221333.png)
Register your own bot
![20240114221511](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221511.png)
![20240114221600](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221600.png)

After completing these steps, a `.env` file will appear in your project

![20240114221743](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221743.png)

Copy the environment variable content in this file to the environment variable in Zeabur
![20240114221904](https://raw.githubusercontent.com/3Alan/images/master/img/20240114221904.png)

After completing these operations, **redeploy once**

![20240114222317](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222317.png)

### Get Gemini API KEY

Open [address](https://makersuite.google.com/app/prompts/new_freeform)

![20240114222123](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222123.png)

Add this API KEY to Zeabur's environment variable `GEMINI_API_KEY`, and after completing these operations, **redeploy once**

![20240114222515](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222515.png)

Fill in your Webhook address here.

1. Visit https://github.com/settings/apps
2. Find the GitHub App you just created and click Edit
3. Fill in your Webhook address
4. Click Save

![20240114222809](https://raw.githubusercontent.com/3Alan/images/master/img/20240114222809.png)

All installation work is complete at this point

## Trigger summary of all blog posts

First, create a new issue, then add a `summarizer` label to this issue, and the bot will start summarizing your blog posts. The specific completion speed depends on how many articles are in your repository. It took me about 3 minutes to summarize 55 articles.

![20240114223129](https://raw.githubusercontent.com/3Alan/images/master/img/20240114223129.png)

## Add summary component

Install third-party library

```
yarn add typed.js
```

First, make sure you have previously Swizzled the `DocItem/Layout` and `BlogPostPage` components. For specific steps, please refer to [this article](/posts/blog-guides/docusaurus-comment#swizzling-docusaurus-内部组件). I won't go into too much detail here.

View specific modifications [this commit](https://github.com/3Alan/site/commit/ce04cf23f0ae36c118db2bb8d359b2ee85f2676c)

## Summary

Currently, since there is no available server, I can only use Zeabur's free plan to deploy the bot. Later, I may investigate how to use GitHub Action to run.

Regarding functional requirements, an automatic translation workflow may be added later.
