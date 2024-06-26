// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const getI18nContent = require('./src/utils/getI18nContent');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.oceanicNext;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Alan Wang',
  titleDelimiter: '|',
  tagline: '此刻想举重若轻，之前必要负重前行',
  url: 'https://www.alanwang.site',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/posts',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.scss')
        },
        gtag: {
          trackingID: 'G-B7NWL5SZ52'
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords',
          content: getI18nContent({
            defaultContent:
              'Alan Wang,博客,Blog,前端,React,Vue,Webpack,Node.js,Typescript',
            en: 'Alan Wang,Blog,Front-end,React,Vue,Webpack,Node.js,Typescript'
          })
        },
        {
          name: 'description',
          content: getI18nContent({
            defaultContent: '一个专注于前端开发的小白, 分享前端开发知识',
            en: 'A front-end developer, sharing front-end development knowledge'
          })
        }
      ],
      announcementBar: {
        id: 'friend_link',
        // content: '⭐️ 欢迎前来交换 🔗 <a rel="noopener noreferrer" href="/friends">友链</a>！'
        // content: '🔥🔥<a rel="noopener noreferrer" href="/blog/personal-chatgpt">利用 Vercel 搭建属于自己的 ChatGPT</a>'
        content:
          '🎉 <a rel="noopener noreferrer" href="/posts/source-analysis/mitt">Mitt 源码动画解析</a>'
      },
      navbar: {
        title: 'Alan',
        logo: {
          alt: 'Alan|前端博客',
          src: 'img/logo.svg',
          width: 30
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '系列文章'
          },
          {
            type: 'doc',
            docId: 'knowledge-system/intro',
            position: 'left',
            label: '知识体系'
          },
          { to: '/blog', label: '博文', position: 'left' },
          {
            type: 'localeDropdown',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '系列教程',
            items: [
              {
                label: '博客搭建',
                to: '/posts/index/blog-guides'
              },
              {
                label: 'react 组件库',
                to: '/posts/index/react-component-guides'
              },
              {
                label: 'webpack',
                to: '/posts/index/webpack-guides'
              }
            ]
          },
          {
            title: '推荐阅读',
            items: [
              {
                label: 'PDF 阅读器 Demo',
                to: '/blog/chatgpt-pdf'
              },
              {
                label: 'Expo 开发 Airbnb Clone 全栈应用',
                to: '/blog/expo-airbnb-clone'
              },
              {
                label: 'Docusaurus AI 总结',
                to: '/posts/blog-guides/docusaurus-ai-bot'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: '友情链接',
                to: '/friends'
              },
              {
                label: '网站统计数据',
                href: 'https://analytics.alanwang.site/share/wRwxxz0r/Alan-Blog',
                'data-umami-event': 'analytics-link'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/3Alan'
              }
            ]
          }
        ],
        copyright: `Copyright © 2020-${new Date().getFullYear()} Alan's Blog.`
      },
      prism: {
        additionalLanguages: ['bash', 'diff', 'json'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' }
          },
          {
            className: 'code-block-add-line',
            line: 'highlight-add-line',
            block: { start: 'highlight-add-start', end: 'highlight-add-end' }
          },
          {
            className: 'code-block-update-line',
            line: 'highlight-update-line',
            block: {
              start: 'highlight-update-start',
              end: 'highlight-update-end'
            }
          }
        ]
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true
        }
      },
      colorMode: {
        disableSwitch: true,
        defaultMode: 'dark'
      },
      giscus: {
        repo: '3Alan/site',
        repoId: 'R_kgDOH0FBrg',
        category: 'Announcements',
        categoryId: 'DIC_kwDOH0FBrs4CRscX'
      },
      algolia: {
        appId: '3ADKUPU1LI',
        apiKey: '313f27fd54c251b088fccb9ccd7b2917',
        indexName: 'alanwang'
      },
      zoom: {
        selector: '.markdown :not(em, a, .site-card-img-wrap) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50, 0.95)'
        }
      }
    }),
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html', 'htm'],
        redirects: [
          {
            from: '/blog/记一次Next-js搭建之旅',
            to: '/blog/next-tutorial'
          },
          {
            from: '/posts/博客搭建系列/Hexo博客定制',
            to: '/posts/blog-guides/hexo-guide'
          },
          {
            from: '/blog/Hackintosh-B460M-MORTAR-WIFI-黑苹果安装记录',
            to: '/blog/Hackintosh-B460M-MORTAR-WIFI-EFI-installation'
          },
          {
            from: '/posts/react-components/Guide组件',
            to: '/posts/react-components/guide'
          },
          {
            from: '/posts/react-components/react-组件库搭建',
            to: '/posts/react-components/set-up'
          },
          {
            from: '/blog/工作中遇到的问题记录',
            to: '/blog/trouble-in-work'
          },
          {
            from: '/posts/博客搭建系列/docusaurus-评论系统',
            to: '/posts/blog-guides/docusaurus-comment'
          },
          {
            from: '/posts/博客搭建系列/Docusaurus-搜索',
            to: '/posts/blog-guides/docusaurus-search'
          },
          {
            from: '/posts/博客搭建系列/Docusaurus-搜索引擎url提交',
            to: '/posts/blog-guides/docusaurus-search-engines-urls-push'
          },
          {
            from: '/posts/源码实现/Axios',
            to: '/posts/source-analysis/axios'
          },
          {
            from: '/posts/源码实现/eventEmitter',
            to: '/posts/source-analysis/mitt'
          },
          {
            from: '/blog/mac-app',
            to: '/blog/awesome-tools'
          }
        ]
      }
    ],
    'docusaurus-plugin-sass',
    [
      './src/plugins/plugin-content-blog-enhance.js',
      {
        id: 'blog',
        routeBasePath: 'blog',
        path: './blog',
        showReadingTime: true,
        blogSidebarTitle: '历史博文'
      }
    ],
    './src/plugins/plugin-analytics-inject.js',
    'docusaurus-plugin-image-zoom'
  ],
  clientModules: [require.resolve('./src/clientModules/routeModules.ts')]
};

module.exports = config;
