// https://github.com/facebook/docusaurus/issues/9575
// https://github.com/facebook/docusaurus/issues/4542

function getI18nContent({ defaultContent, en }) {
  switch (process.env.DOCUSAURUS_CURRENT_LOCALE) {
    case 'en':
      return en;
    default:
      return defaultContent;
  }
}

module.exports = getI18nContent;
