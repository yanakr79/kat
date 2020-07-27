/* eslint-disable no-console */
const path = require('path');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const i18n = require('../i18n/i18n');

const isValidLocale = (locale, fileNode) => {
  if (!locale) {
    const parsedFilePath = path.parse(fileNode.relativePath);
    const { ext } = parsedFilePath;
    console.warn(`The file "${fileNode.relativePath}" does not contain locale in it's name'.'`);
    console.warn(`Valid file name sample: "index.${i18n.defaultLang}.${ext}".`);
    console.warn('This file will be excluded from current build.\n');
    return false;
  }
  if (!i18n.isValidLang(locale)) {
    console.warn(
      `The file "${fileNode.relativePath}" has unsupported locale "${locale}" in it's name`,
    );
    console.warn('List of valid locales from your config:', i18n.localeCodes);
    console.warn('This file will be excluded from current build.\n');
    return false;
  }
  return true;
};

const onDataNode = (node, actions, getNode) => {
  const { createNodeField } = actions;
  const fileNode = getNode(node.parent);

  const parsedFilePath = path.parse(fileNode.relativePath);

  const { dir, name } = parsedFilePath;

  // eslint-disable-next-line prefer-const
  let [type, locale] = name.split('.');

  if (dir.split('/')[0] === 'locales' && !isValidLocale(locale, fileNode)) {
    locale = null;
  }

  createNodeField({
    name: 'locale',
    node,
    value: locale,
  });
  createNodeField({
    name: 'type',
    node,
    value: type,
  });
};

const onMdNode = (node, actions, getNode, createNodeId, createContentDigest) => {
  const fileNode = getNode(node.parent);
  if (fileNode.sourceInstanceName !== 'pages') {
    return;
  }

  const { createNode, createParentChildLink } = actions;

  const parsedFilePath = path.parse(fileNode.relativePath);
  const { name, dir } = parsedFilePath;

  const [slugFileName, locale] = name.split('.');

  if (!isValidLocale(locale, fileNode)) {
    return;
  }

  const { frontmatter } = node;
  if (!frontmatter) {
    throw new Error('Frontmatter is absent!');
  }

  fmImagesToRelative(node);

  const mdPageId = createNodeId(`${node.id} >>> MdPage`);

  let { slug } = frontmatter;
  if (!slug) {
    slug = `/${slugFileName !== 'index' ? slugFileName : dir}`;
  }
  slug = i18n.localizePath(slug, locale);

  const getMetaTitle = (title, metaTitle, slg) => {
    const purePath = i18n.purePath(slg);

    if (purePath === '/') {
      // is Root
      return metaTitle || i18n.locales[locale].siteTitle;
    }
    return `${metaTitle || title} - ${i18n.locales[locale].siteShortName}`;
  };

  const {
    title,
    description,
    metaTitle,
    metaDescription,
    cover,
    noindex,
    template,
    sections,
  } = frontmatter;

  const fieldData = {
    title,
    description,
    metaTitle: getMetaTitle(title, metaTitle, slug),
    metaDescription: metaDescription || description || i18n.locales[locale].siteDescription,
    cover,
    noindex,
    template,
    slug,
    locale,
    sections,
  };

  createNode({
    ...fieldData,
    // Required fields
    id: mdPageId,
    parent: node.id,
    children: [],
    internal: {
      type: 'MdPage',
      contentDigest: createContentDigest(fieldData),
      content: JSON.stringify(fieldData),
      description: 'Md implementation of the Page interface',
    },
  });

  createParentChildLink({ parent: node, child: getNode(mdPageId) });
};

module.exports = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  if (node.internal.type === 'Yaml') {
    onDataNode(node, actions, getNode);
    return;
  }

  if (node.internal.type === 'MarkdownRemark') {
    onMdNode(node, actions, getNode, createNodeId, createContentDigest);
  }
};
