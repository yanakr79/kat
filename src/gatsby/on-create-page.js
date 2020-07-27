/* eslint-disable no-console */
const i18n = require('../i18n/i18n');
// const getTrans = require('./getTrans');

// Remove trailing slashes unless it's only "/", then leave it as it is
const removeTrailinSlash = (p) => (p === '/' ? p : p.replace(/\/$/, ''));

module.exports = ({ page, actions }) => {
  let pagepath = removeTrailinSlash(page.path);
  console.log('=====onCreatePage=====');
  if (
    process.env.ONLY &&
    !process.env.ONLY.split(' ').some((p) => p === pagepath) &&
    pagepath !== '/dev-404-page'
  ) {
    console.warn(`process.env.ONLY is "${process.env.ONLY}"`);
    console.warn(`Page "${pagepath}" will be excluded from build\n`);
    return;
  }
  const { createPage, deletePage } = actions;

  // Only create one 404 page at /404.html
  // if (page.path.includes('404')) {
  //  return;
  // }

  // First delete the pages so we can re-create them
  deletePage(page);

  i18n.localeCodes.map((locale) => {
    if (i18n.isDefaultLang(locale)) {
      pagepath = page.path;
    } else {
      // Remove the trailing slash from the path, e.g. --> /blog
      pagepath = removeTrailinSlash(page.path);
      // Create the "slugs" for the pages like in "onCreateNode". Unless default language, add prefix àla "/en"
      pagepath = i18n.localizePath(pagepath, locale);
    }

    console.log('page: locale=', locale, ', pagepath=', pagepath);

    return createPage({
      ...page,
      path: pagepath,
      context: {
        ...page.context,
        locale,
        // translations: getTrans(locale),
      },
    });
  });
};
