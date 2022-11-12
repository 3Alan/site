const fs = require('fs-extra');
const path = require('path');
const logger = require('@docusaurus/logger');

function getFrontMatterDate(blogPost) {
  return (
    blogPost.metadata.frontMatter.updated || blogPost.metadata.frontMatter.date
  );
}

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

      const sortedBlogPosts = blogPosts.sort(
        (a, b) => getFrontMatterDate(b) - getFrontMatterDate(a)
      );

      const recentBlogPostsPath = sortedBlogPosts.map(
        item => item.metadata.permalink
      );

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
