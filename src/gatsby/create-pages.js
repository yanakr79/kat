/* eslint-disable no-console */
const path = require('path');

const i18n = require('../i18n/i18n');
const t = require('../i18n/translate');

const wrapper = (promise) =>
  promise.then((result) => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });
module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  console.log('=====createPages=====');
  const result = await wrapper(
    graphql(`
      {
        pages: allMdPage(limit: 1000) {
          edges {
            node {
              id
              template
              slug
              locale
            }
          }
        }
        addresses: allYaml(filter: { fields: { type: { eq: "address" } } }, limit: 10) {
          edges {
            node {
              fields {
                locale
              }
              legalName
              postalAddress {
                streetAddress
                addressLocality
                postalCode
                addressCountry
              }
            }
          }
        }
        translations: allYaml(filter: { fields: { type: { eq: "translations" } } }, limit: 1000) {
          edges {
            node {
              fields {
                locale
              }
              key
              value
            }
          }
        }
        mainNavItems: allYaml(filter: { fields: { type: { eq: "main-nav-items" } } }, limit: 100) {
          edges {
            node {
              title
              to
            }
          }
        }
        footerNavItems: allYaml(
          filter: { fields: { type: { eq: "footer-nav-items" } } }
          limit: 100
        ) {
          edges {
            node {
              title
              to
            }
          }
        }
        socialLinks: allYaml(filter: { fields: { type: { eq: "social-links" } } }, limit: 100) {
          edges {
            node {
              code
              url
              text
            }
          }
        }
        organization: yaml(fields: { type: { eq: "contacts" } }) {
          email
          fax
          geo {
            latitude
            longitude
          }
          voice {
            phone
            skype
            telegram
            viber
            whatsapp
          }
          openingHours
        }
      }
    `),
  );

  if (result.errors) {
    reporter.panic(result.errors);
    return;
  }

  const TEMPLATES_DIR = './src/templates/';
  const pageDefaultTemplate = path.resolve(`${TEMPLATES_DIR}page.jsx`);

  const translations = {};
  const mainNavItems = {};
  const footerNavItems = {};
  const socialLinks = {};
  const addresses = {};

  i18n.localeCodes.forEach((locale) => {
    // transform array to object
    translations[locale] = result.data.translations.edges
      .filter((e) => e.node.fields.locale === locale)
      .reduce((acc, { node: { key, value } }) => {
        acc[key] = value;
        return acc;
      }, {});

    // translate
    mainNavItems[locale] = result.data.mainNavItems.edges.map(({ node: { title, to } }) => ({
      to: i18n.localizePath(to, locale),
      title: t(title, translations[locale]),
    }));

    // translate
    footerNavItems[locale] = result.data.footerNavItems.edges.map(({ node: { title, to } }) => ({
      to: i18n.localizePath(to, locale),
      title: t(title, translations[locale]),
    }));

    addresses[locale] = result.data.addresses.edges.filter(
      (e) => e.node.fields.locale === locale,
    )[0].node;

    socialLinks[locale] = result.data.socialLinks.edges.reduce(
      (acc, { node: { code, url, text } }) => {
        acc[code] = { url, text };
        return acc;
      },
      {},
    );
  });

  result.data.pages.edges.forEach(({ node: { id, template, slug, locale } }) => {
    if (process.env.ONLY && !process.env.ONLY.split(' ').some((p) => p === slug)) {
      return;
    }
    console.log('Md page: locale=', locale, ', pagepath=', slug);
    createPage({
      path: slug,
      component: template ? path.resolve(`${TEMPLATES_DIR}${template}.jsx`) : pageDefaultTemplate,
      context: {
        id,
        locale,
        translations: translations[locale],
        address: addresses[locale],
        links: {
          mainNavItems: mainNavItems[locale],
          footerNavItems: footerNavItems[locale],
          socialLinks: socialLinks[locale],
        },
        organization: result.data.organization,
      },
    });
  });
};
