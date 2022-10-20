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
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true
        },
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
      navbar: {
        title: 'Alan',
        logo: {
          alt: 'Alan|前端博客',
          src: 'img/logo.svg'
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
            docId: '面试总结/前端面试题-2020',
            position: 'left',
            label: '面试总结'
          },
          { to: '/blog', label: '博文', position: 'left' },
          {
            href: 'https://github.com/3Alan',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub profile'
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
                to: '/posts/博客搭建系列/Hexo博客定制'
              },
              {
                label: 'react 组件库',
                to: '/posts/react-components/react-组件库搭建'
              },
              {
                label: 'webpack',
                to: '/posts/webpack-tutorial/webpack4.0学习总结（一）'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: '博文',
                to: '/blog'
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
        copyright: `Copyright © 2022-${new Date().getFullYear()} Alan's Blog.`
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
            block: { start: 'highlight-update-start', end: 'highlight-update-end' }
          }
        ]
      },
      docs: {
        sidebar: {
          hideable: true,
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
        appId: '2XRFRLLWRR',
        apiKey: '9bc14c0a7f5cfdd461f0020fee33bfd9',
        indexName: 'blog'
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
    'docusaurus-plugin-sass'
  ],
  scripts: [
    {
      src: 'https://hm.baidu.com/hm.js?ff1856f91533fcea9c8c2fe5a1b06fe7',
      async: true
    }
  ]
};

module.exports = config;
