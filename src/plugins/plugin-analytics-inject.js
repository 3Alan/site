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
          // umami 收集
          {
            tagName: 'script',
            attributes: {
              async: true,
              defer: true,
              src: 'https://analytics.alanwang.site/script.js',
              'data-website-id': '3c9011ac-8d0f-4d31-a658-8b3806e3d5d4'
            }
          }
        ]
      };
    }
  };
}

module.exports = analyticsInjectPlugin;
