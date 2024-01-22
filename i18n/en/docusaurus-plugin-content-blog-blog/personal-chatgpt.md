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
  I have compiled a list of popular open-source ChatGPT projects with great UIs
  that can be deployed on Vercel, allowing you to quickly set up your own
  ChatGPT. I also provide deployment methods and security recommendations to
  prevent malicious use.
summary: >-
  I have compiled a list of popular open-source ChatGPT projects with great UIs,
  allowing you to quickly set up your own ChatGPT. Most of them support Vercel
  deployment, and you can use Vercel's free services. Some projects include
  backend code and cannot be deployed on Vercel. You need to deploy them on your
  own server.


  When deploying, it's best to take the following precautions to prevent
  malicious use: For Vercel deployments, it's recommended to make the repository
  private. For projects where the API KEY is stored on the server, enable the
  website password feature provided by the project. Prevent search engines from
  indexing your website. Do not use your primary domain to deploy ChatGPT
  projects.
ai_translation: true
---

I have compiled a list of popular open-source ChatGPT projects with great UIs, allowing you to quickly set up your own ChatGPT. Most of them support Vercel deployment, and you can use Vercel's free services. Some projects include backend code and cannot be deployed on Vercel. You need to deploy them on your own server.

<!--truncate-->

## Open-source ChatGPT Projects

In no particular order

| Repository                                                           | Vercel Deployment | Star Count                                                                                               |
| ---------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| [chatbot-ui](https://github.com/mckaywrigley/chatbot-ui)               | ✅                 | ![chatbot-ui stars](https://img.shields.io/github/stars/mckaywrigley/chatbot-ui?style=social)               |
| [chatgpt-demo](https://github.com/ddiu8081/chatgpt-demo)               | ✅                 | ![chatgpt-demo stars](https://img.shields.io/github/stars/ddiu8081/chatgpt-demo?style=social)               |
| [BetterChatGPT](https://github.com/ztjhz/BetterChatGPT)                | ✅                 | ![BetterChatGPT stars](https://img.shields.io/github/stars/ztjhz/BetterChatGPT?style=social)                |
| [ChuanhuChatGPT](https://github.com/GaiZhenbiao/ChuanhuChatGPT)        | ❌                 | ![ChuanhuChatGPT stars](https://img.shields.io/github/stars/GaiZhenbiao/ChuanhuChatGPT?style=social)        |
| [chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web)               | ❌                 | ![chatgpt-web stars](https://img.shields.io/github/stars/Chanzhaoyu/chatgpt-web?style=social)               |
| [ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web)        | ✅                 | ![ChatGPT-Next-Web stars](https://img.shields.io/github/stars/Yidadaa/ChatGPT-Next-Web?style=social)        |
| [yakGPT](https://github.com/yakGPT/yakGPT)                           | ✅                 | ![yakGPT stars](https://img.shields.io/github/stars/yakGPT/yakGPT?style=social)                           |
| [Chatpad](https://github.com/deiucanta/chatpad)                      | ❓                 | ![Chatpad stars](https://img.shields.io/github/stars/deiucanta/chatpad?style=social)                      |
| [Anse](https://github.com/anse-app/anse)                             | ✅                 | ![anse stars](https://img.shields.io/github/stars/anse-app/anse?style=social)                             |
| [ChatChat](https://github.com/okisdev/ChatChat)                      | ✅                 | ![ChatChat stars](https://img.shields.io/github/stars/okisdev/ChatChat?style=social)                      |

Choose a project you like and follow the project's README.md file for deployment.
Here's an example: I chose the chatgpt-demo project, which supports Vercel deployment. I deployed it on Vercel and then bound my domain name (Vercel domains are blocked in China) to it. Now I can use it anytime, anywhere.

## About Security

I recently discovered that my deployed ChatGPT was receiving some strange traffic. I also noticed that my domain's SEO had been affected. Fortunately, I had added analytics code to my website. By following the website's source, I found that some spam sites were referencing my website. Eventually, I found this [repository](https://github.com/lzwme/chatgpt-sites) (why do such repositories exist 🤬). Luckily, I had set a password for my website, so my API KEY was not compromised. However, my domain's SEO was still affected.

After discovering the problem, I quickly deleted my ChatGPT project, made the repository private, and changed the解析 to a rarely used domain.

When deploying, it's best to take the following precautions to prevent malicious use:

- For Vercel deployments, it's recommended to make the repository private. If you really need to make the repository public, you must disable the Vercel comments feature (which is where the repository mentioned above comes in).
  To disable it, create a `vercel.json` file in the root directory with the following content:

  ```json
  {
    "github": {
      "silent": true
    }
  }
  ```

- For projects where the API KEY is stored on the server (i.e., you don't need to enter the API KEY every time you use it after configuring the environment variables), enable the website password feature provided by the project. Also, try to make the password complex to prevent brute-force attacks if the website is crawled.

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

- Do not use your primary domain to deploy ChatGPT projects. This will prevent spam sites from referencing it and affecting your primary domain's SEO.

Even if you follow all of the above steps, there is no guarantee that your website will not be crawled by malicious users. You can add statistical code to your website and check the website's traffic data periodically to detect any abnormal traffic.
