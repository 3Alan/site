---
slug: personal-chatgpt
title: Building your own ChatGPT using Vercel
tags:
  - chatgpt
keywords:
  - chatgpt
  - private deployment of chatgpt
  - chatgpt deployment
  - chatgpt setup
authors: Alan
description: >-
  I have compiled some popular and well-designed open-source ChatGPT projects
  that can be deployed on Vercel, making it convenient for everyone to quickly
  build their own ChatGPT. I also provide deployment methods and security
  recommendations to prevent malicious exploitation.
summary: >-
  I have compiled some popular and well-designed open-source ChatGPT projects
  that can be deployed on Vercel, making it convenient for everyone to quickly
  build their own ChatGPT. Most of these projects support Vercel deployment and
  can be used with Vercel's free service. However, some projects include backend
  code and cannot be deployed on Vercel directly. For those, you will need to
  deploy them on your own server.


  When deploying, it is recommended to take the following precautions to prevent
  malicious exploitation: If using Vercel for deployment, it is recommended to
  make the repository private; for projects where API keys are stored on the
  server, enable the website password feature provided by the project; prevent
  search engines from indexing your website; do not use your own main domain
  name to deploy the chatgpt project.
ai_translation: true
---

I have compiled some popular and well-designed open-source ChatGPT projects that can be deployed on Vercel, making it convenient for everyone to quickly build their own ChatGPT. Most of these projects support Vercel deployment and can be used with Vercel's free service. However, some projects include backend code and cannot be deployed on Vercel directly. For those, you will need to deploy them on your own server.

<!--truncate-->

## Open-source ChatGPT projects

The ranking is not in any particular order.

| Repository                                                      | Vercel Deploy | Number of Stars                                                                                      |
| --------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------- |
| [chatbot-ui](https://github.com/mckaywrigley/chatbot-ui)        | ✅            | ![chatbot-ui stars](https://img.shields.io/github/stars/mckaywrigley/chatbot-ui?style=social)        |
| [chatgpt-demo](https://github.com/ddiu8081/chatgpt-demo)         | ✅            | ![chatgpt-demo stars](https://img.shields.io/github/stars/ddiu8081/chatgpt-demo?style=social)         |
| [BetterChatGPT](https://github.com/ztjhz/BetterChatGPT)           | ✅            | ![BetterChatGPT stars](https://img.shields.io/github/stars/ztjhz/BetterChatGPT?style=social)         |
| [ChuanhuChatGPT](https://github.com/GaiZhenbiao/ChuanhuChatGPT)   | ❌            | ![ChuanhuChatGPT stars](https://img.shields.io/github/stars/GaiZhenbiao/ChuanhuChatGPT?style=social) |
| [chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web)          | ❌            | ![chatgpt-web stars](https://img.shields.io/github/stars/Chanzhaoyu/chatgpt-web?style=social)        |
| [ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web)   | ✅            | ![ChatGPT-Next-Web stars](https://img.shields.io/github/stars/Yidadaa/ChatGPT-Next-Web?style=social) |
| [yakGPT](https://github.com/yakGPT/yakGPT)                        | ✅            | ![yakGPT stars](https://img.shields.io/github/stars/yakGPT/yakGPT?style=social)                      |
| [Chatpad](https://github.com/deiucanta/chatpad)                   | ❓            | ![Chatpad stars](https://img.shields.io/github/stars/deiucanta/chatpad?style=social)                 |
| [Anse](https://github.com/anse-app/anse)                          | ✅            | ![anse stars](https://img.shields.io/github/stars/anse-app/anse?style=social)                        |
| [ChatChat](https://github.com/okisdev/ChatChat)                   | ✅            | ![ChatChat stars](https://img.shields.io/github/stars/okisdev/ChatChat?style=social)                 |

Choose a project that you like and follow the instructions in the project's README.md file to deploy it. Here's an example: I chose the chatgpt-demo project and since it supports Vercel deployment, I deployed it directly on Vercel. After deployment, I bound my domain name to it (please note that Vercel domain is blocked in China), and now I can use it anytime, anywhere.

## About Security

Recently, I noticed that my deployed chatgpt project was receiving unusual traffic, and I also found that the SEO of my domain was deteriorating. Fortunately, I had added analytics code to my website, so by following the website referrers, I discovered that some spam sites were referencing my website. Eventually, I found that my website had been scraped and traced it to this [repository](https://github.com/lzwme/chatgpt-sites) (why such a repository exists 🤬). Luckily, I had set a password on my website, so my API key was not abused, but it did impact the SEO of my domain.

After discovering the problem, I quickly deleted my chatgpt project and changed it to a private repository. I also turned off the DNS resolution of my main domain and used a less frequently used domain for deployment.

For better security, it is recommended to take the following precautions when deploying:

- For projects deployed on Vercel, it is recommended to make the repository private. If you must make the repository public, make sure to disable the Vercel comment feature (which is what that previous repository exploited). To disable it, create a `vercel.json` file in the root directory with the following content:

  ```json
  {
    "github": {
      "silent": true
    }
  }
  ```

- For projects where API keys are stored on the server (i.e., after configuring environment variables and not having to enter the API key each time), enable the website password feature provided by the project, and try to set a strong password to prevent it from being brute-forced if your website gets crawled.

- Prevent search engines from indexing your website. If you are using Vercel for deployment, configure the `vercel.json` file with the following content:

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

- Do not use your own main domain name to deploy the chatgpt project to prevent it from being referenced by spam sites and affecting the SEO of your main domain.

Even if you follow all of the above precautions, it does not guarantee that your website will not be exploited. You can add analytics code to your website and regularly check the website's visit data to promptly detect any abnormal traffic.
