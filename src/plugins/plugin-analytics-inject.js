async function analyticsInjectPlugin() {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus-analytics-inject-plugin',

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://analytics.alanwang.site'
            }
          },
          // umami 收集，先使用一段时间，后面考虑替换百度统计
          {
            tagName: 'script',
            attributes: {
              async: true,
              defer: true,
              src: 'https://analytics.alanwang.site/umami.js',
              'data-website-id': '3c9011ac-8d0f-4d31-a658-8b3806e3d5d4',
              'data-domains': 'alanwang.site,www.alanwang.site'
            }
          },
          // 百度统计
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: 'https://hm.baidu.com/hm.js?ff1856f91533fcea9c8c2fe5a1b06fe7'
            }
          }
        ]
      };
    }
  };
}

module.exports = analyticsInjectPlugin;
