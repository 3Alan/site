---
slug: personal-chatgpt
title: Build Your Own ChatGPT with Vercel
tags:
  - chatgpt
keywords:
  - chatgpt
  - chatgpt private deployment
  - chatgpt deployment
  - chatgpt setup
authors: Alan
description: >-
  I have compiled a list of some of the most popular and user-friendly
  open-source ChatGPT projects that can be deployed on Vercel, allowing you to
  quickly set up your own ChatGPT. I will also provide deployment methods and
  security recommendations to prevent malicious use.
summary: >-
  I have compiled a list of some of the most popular and user-friendly
  open-source ChatGPT projects, allowing you to quickly set up your own ChatGPT.
  Most of them support Vercel deployment, and you can use Vercel's free services
  directly. Some projects include backend code and cannot be deployed on Vercel;
  you need to deploy them to a server yourself.


  When deploying, it is best to take the following steps to prevent malicious
  use: For those using Vercel deployment, it is recommended to privatize the
  repository; for projects with API KEYs on the server-side, enable the website
  password function provided by the project; prevent search engines from
  indexing your website; and do not use your primary domain name to deploy the
  ChatGPT project.
ai_translation: true
---

I have compiled a list of some of the most popular and user-friendly open-source ChatGPT projects, allowing you to quickly set up your own ChatGPT. Most of them support Vercel deployment, and you can use Vercel's free services directly. Some projects include backend code and cannot be deployed on Vercel; you need to deploy them to a server yourself.

<!--truncate-->

## Open-source ChatGPT projects

In no particular order

| Repository                                                               | Vercel Deployment | Star Count                                                                                                |
| ----------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| [chatbot-ui](https://github.com/mckaywrigley/chatbot-ui)                  | ✅                 | ![chatbot-ui stars](https://img.shields.io/github/stars/mckaywrigley/chatbot-ui?style=social)                  |
| [chatgpt-demo](https://github.com/ddiu8081/chatgpt-demo)                  | ✅                 | ![chatgpt-demo stars](https://img.shields.io/github/stars/ddiu8081/chatgpt-demo?style=social)                  |
| [BetterChatGPT](https://github.com/ztjhz/BetterChatGPT)                   | ✅                 | ![BetterChatGPT stars](https://img.shields.io/github/stars/ztjhz/BetterChatGPT?style=social)                   |
| [ChuanhuChatGPT](https://github.com/GaiZhenbiao/ChuanhuChatGPT)           | ❌                 | ![ChuanhuChatGPT stars](https://img.shields.io/github/stars/GaiZhenbiao/ChuanhuChatGPT?style=social)           |
| [chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web)                  | ❌                 | ![chatgpt-web stars](https://img.shields.io/github/stars/Chanzhaoyu/chatgpt-web?style=social)                  |
| [ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web)           | ✅                 | ![ChatGPT-Next-Web stars](https://img.shields.io/github/stars/Yidadaa/ChatGPT-Next-Web?style=social)           |
| [yakGPT](https://github.com/yakGPT/yakGPT)                                | ✅                 | ![yakGPT stars](https://img.shields.io/github/stars/yakGPT/yakGPT?style=social)                                |
| [Chatpad](https://github.com/deiucanta/chatpad)                           | ❓                 | ![Chatpad stars](https://img.shields.io/github/stars/deiucanta/chatpad?style=social)                           |
| [Anse](https://github.com/anse-app/anse)                                  | ✅                 | ![anse stars](https://img.shields.io/github/stars/anse-app/anse?style=social)                                  |
| [ChatChat](https://github.com/okisdev/ChatChat)                           | ✅                 | ![ChatChat stars](https://img.shields.io/github/stars/okisdev/ChatChat?style=social)                           |

Choose a project you like and deploy it according to the project's README.md file.
For example, I chose the chatgpt-demo project, which supports Vercel deployment, so I deployed it directly on Vercel. After the deployment, I bound my domain name (Vercel domain names are blocked in China) and could use it anytime, anywhere.

## About security

I recently discovered that my deployed ChatGPT always had some inexplicable traffic. I also found that my domain name's SEO had recently become poor. Fortunately, I had previously added analysis code to the website. Following the website's source, I found that some spam websites were referencing my website. Finally, I found this [repository](https://github.com/lzwme/chatgpt-sites) (why is there such a repository 🤬). Fortunately, I had set a password for the website, so the API KEY was not used by others. However, this also affected my domain name's SEO.

After discovering the problem, I quickly deleted my ChatGPT project, made it a private repository, and turned off the resolution of the primary domain name. I used a rarely used domain name for deployment.

It is best to take the following steps to prevent malicious use when deploying:

- For those using Vercel deployment, it is recommended to privatize the repository. If you really need to make the repository public, you must disable the Vercel comment function (which is where the repository mentioned above comes in).
  To disable it, create a `vercel.json` file in the root directory with the following content:

  ```json
  {
    "github": {
      "silent": true
    }
  }
  ```

- For projects where the API KEY is on the server-side (i.e., you don't need to enter the API KEY each time after configuring environment variables), enable the website password function provided by the project and try to make the password complex to prevent the website from being crawled and the password from being cracked by brute force.

- Prevent search engines from indexing your website. If you are using a Vercel-deployed project, configure the `vercel.json` file with the following content:

  ```json
  {
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          {
            "key": "X-Robots-Tag",
            "value": "noindex, nofollow"
          }
        ]
      }
    ]
  }
  ```

- Do not use your primary domain name to deploy the ChatGPT project to prevent spam websites from referencing it and affecting your primary domain name's SEO.

Even if you follow all the steps above, there is no guarantee that your website will not be crawled by malicious users. You can add statistical code to your website and check the website's access data regularly to discover abnormal traffic in a timely manner.
