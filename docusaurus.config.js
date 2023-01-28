// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Alan|前端博客',
  titleDelimiter: '-',
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
    locales: ['zh-Hans']
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
          content: 'Alan,博客,Blog,前端,React,Vue,Webpack,Node.js,Typescript'
        },
        {
          name: 'description',
          content: '一个专注于前端开发的小白, 分享前端开发知识'
        }
      ],
      announcementBar: {
        id: 'friend_link',
        content:
          '⭐️ 欢迎前来交换 🔗 <a rel="noopener noreferrer" href="/friends">友链</a>！'
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
            docId: '面试总结/工程化',
            position: 'left',
            label: '面试总结'
          },
          { to: '/blog', label: '博文', position: 'left' }
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
            title: 'More',
            items: [
              {
                label: '友情链接',
                to: '/friends'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/3Alan'
              },
              {
                label: 'Email',
                href: 'mailto:1540703192@qq.com'
              }
            ]
          }
        ],
        copyright: `Copyright © 2020-${new Date().getFullYear()} Alan's Blog.`
      },
      prism: {
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
      }
    }),
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html', 'htm'],
        redirects: [
          {
            from: '/posts/记一次Next-js搭建之旅/',
            to: '/blog/记一次Next-js搭建之旅'
          },
          {
            from: '/posts/Hexo博客定制/',
            to: '/posts/博客搭建系列/Hexo博客定制'
          },
          {
            from: '/posts/Hackintosh-B460M-MORTAR-WIFI-黑苹果安装记录/',
            to: '/blog/Hackintosh-B460M-MORTAR-WIFI-黑苹果安装记录'
          },
          {
            from: '/posts/组件库-Guide/',
            to: '/posts/react-components/Guide组件'
          },
          {
            from: '/posts/react-组件库搭建/',
            to: '/posts/react-components/react-组件库搭建'
          },
          {
            from: '/posts/工作中遇到的问题记录/',
            to: '/blog/工作中遇到的问题记录'
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
    ]
  ],
  scripts: [
    {
      src: 'https://hm.baidu.com/hm.js?ff1856f91533fcea9c8c2fe5a1b06fe7',
      async: true
    }
  ],
  clientModules: [
    require.resolve('./src/clientModules/routeModules.ts'),
  ],
};

module.exports = config;
