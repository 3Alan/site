async function analyticsInjectPlugin() {
  const isProd = process.env.NODE_ENV === 'production';
  const enable = !!process.env.ENABLE_ANALYTICS;

  console.log(process.env);

  return {
    name: 'docusaurus-analytics-inject-plugin',

    injectHtmlTags() {
      if (!isProd || !enable) {
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
              defer: true,
              src: 'https://analytics.alanwang.site/script.js',
              'data-website-id': '3c9011ac-8d0f-4d31-a658-8b3806e3d5d4'
            }
          },
          // 微软 clarity，尝试使用
          `
          <script type="text/javascript">
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "hgij2vfn86");
          </script>
          `
        ]
      };
    }
  };
}

module.exports = analyticsInjectPlugin;
