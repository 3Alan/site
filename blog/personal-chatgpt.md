---
slug: personal-chatgpt
title: 搭建属于自己的 ChatGPT
tags:
  - chatgpt
keywords:
  - chatgpt
  - chatgpt 私有化部署
  - chatgpt 部署
authors: Alan
description: 整理了一些当前比较流行且 UI 还不错的开源 ChatGPT 项目，方便大家快速搭建属于自己的 ChatGPT，同时提供部署方法及安全建议，防止被有心人利用。
---

我整理了一些当前比较流行且 UI 还不错的开源 ChatGPT 项目，方便大家快速搭建属于自己的 ChatGPT，大部分都支持 Vercel 部署，可以直接使用 Vercel 的免费服务。有一部分项目是包括后端代码的所以无法在 Vercel 上部署，需要自己部署到服务器上。

<!--truncate-->

## 开源 chatgpt 项目

排名不分先后

| 仓库                                                            | Vercel 部署 | Star 数                                                                                              |
| --------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| [chatbot-ui](https://github.com/mckaywrigley/chatbot-ui)        | ✅          | ![chatbot-ui stars](https://img.shields.io/github/stars/mckaywrigley/chatbot-ui?style=social)        |
| [chatgpt-demo](https://github.com/ddiu8081/chatgpt-demo)        | ✅          | ![chatgpt-demo stars](https://img.shields.io/github/stars/ddiu8081/chatgpt-demo?style=social)        |
| [ChuanhuChatGPT](https://github.com/GaiZhenbiao/ChuanhuChatGPT) | ❌          | ![ChuanhuChatGPT stars](https://img.shields.io/github/stars/GaiZhenbiao/ChuanhuChatGPT?style=social) |
| [chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web)        | ❌          | ![chatgpt-web stars](https://img.shields.io/github/stars/Chanzhaoyu/chatgpt-web?style=social)        |
| [ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web) | ✅          | ![ChatGPT-Next-Web stars](https://img.shields.io/github/stars/Yidadaa/ChatGPT-Next-Web?style=social) |
| [yakGPT](https://github.com/yakGPT/yakGPT)                      | ✅          | ![yakGPT stars](https://img.shields.io/github/stars/yakGPT/yakGPT?style=social)                      |

挑选一个自己喜欢的项目，然后根据项目的 README.md 文件进行部署即可。
这里举一个例子，我之前选择了 chatgpt-demo 这个项目，它支持 Vercel 部署，所以直接在 Vercel 上部署了，部署完后再绑定自己的域名（Vercel 域名国内已墙）就可随时随地使用了。

## 关于安全

我最近发现我部署的 chatgpt 总是存在一些莫名流量，而且发现我的域名最近 SEO 变得不好，好在我之前在项目中加了分析代码，顺着网站的来源我发现了有一些垃圾站在引用了我的网站，最后发现我的网站被人爬取了，顺着线索找到了这个[仓库](https://github.com/lzwme/chatgpt-sites)（为什么会有这种仓库 🤬），好在网站上了密码所以 API KEY 没有被人刷，不过这也导致我的域名 SEO 受到了影响。

在发现问题后，我赶紧删除了我的 chatgpt 项目并修改成了私仓，并且关掉了主域名的解析用了一个不怎么用的域名来部署。

大家部署时最好做好以下几点防止被有心人利用

- 使用 Vercel 部署的，推荐将仓库私有化，如果实在要公开仓库，必须关闭 Vercel 评论功能（正是上面那个仓库利用的地方）。
  关闭方法，在根目录下创建 `vercel.json` 文件，内容如下：

  ```json
  {
    "github": {
      "silent": true
    }
  }
  ```

- 对于 API KEY 存在服务端的项目（即配置环境变量后每次使用不需要输入 API KEY），开启项目提供的网站密码功能，并且尽量将密码设复杂一点，防止网站被爬到后密码被暴力破解

- 防止搜索引擎收录你的网站，如果使用 Vercel 部署的项目，配置 `vercel.json` 文件，内容如下：

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

- 不要使用自己的主域名去部署 chatgpt 项目，防止被垃圾站引用，影响主域名 SEO

就算做到了以上几点也不能保证你的网站不会有心人被爬取，你可以在网站上加上统计代码，每隔一段时间查看一下网站的访问数据，及时发现异常流量。
