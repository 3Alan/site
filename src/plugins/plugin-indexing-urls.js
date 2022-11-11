const fs = require('fs-extra');
const path = require('path');
const logger = require('@docusaurus/logger');

module.exports = function pluginIndexingUrls() {
  return {
    name: 'docusaurus-plugin-indexing-urls',

    async postBuild({ siteConfig, plugins, outDir }) {
      if (siteConfig.noIndex) {
        return;
      }

      const contentBlogPluginContext = plugins.find(
        item => item.name === 'docusaurus-plugin-content-blog'
      );
      const { blogPosts } = contentBlogPluginContext.content;

      // TODO: 有updated根据updated排序
      const sortedBlogPosts = blogPosts.sort(
        (a, b) => Date.parse(a.metadata.date) - Date.parse(b.metadata.date)
      );

      const recentBlogPostsPath = sortedBlogPosts
        .map(item => item.metadata.permalink)
        .slice(0, 10);

      if (recentBlogPostsPath.length === 0) {
        return;
      }

      // Write json file.
      const indexingUrlsPath = path.join(outDir, 'indexing-urls.json');
      try {
        await fs.outputFile(
          indexingUrlsPath,
          JSON.stringify(recentBlogPostsPath)
        );
      } catch (err) {
        logger.error('Writing indexing urls file failed.');
        throw err;
      }
    }
  };
};
