/* eslint-disable no-console */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const i18n = require('./src/i18n/i18n');

const config = require('./config/website');

const manifestIcon = `${__dirname}/src/assets/images/icon.png`;

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/data`,
        name: 'data',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Yaml', // a fixed string
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          /**
           * gatsby-remark-relative-images must
           * go before gatsby-remark-images
           *
           *  */
          {
            resolve: 'gatsby-remark-relative-images',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              quality: 70,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-external-links',
            /**
             * Default settings:
             * options: {
             *   target: '_blank',
             *   rel: 'nofollow noopener noreferrer',
             * },
             *  */
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        // exclude: [],
        /**
         *
         * Fix to exclude all 404 pages
         *
         * gatsby-plugin-sitemap ^2.4.7 excludes only default /404
         *
         * not working
         * exclude: ['/en/404', '/ru/404']
         * exclude: ['/ * /404']
         * exclude: ['*404*']
         *
         *  */
        // https://www.digitalocean.com/community/tutorials/building-a-custom-sitemap-for-your-gatsbyjs-site
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes
            .filter((node) => !node.path.includes('404'))
            .map((node) => ({
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: 'daily',
              priority: 0.7,
            })),
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        /*
        trackingId: config.googleAnalyticsID,
        anonymize: true,
        allowLinker: true,
        head: false,
        respectDNT: false,
        */
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: i18n.defaultLocale.siteTitle,
        short_name: i18n.defaultLocale.siteShortName,
        lang: i18n.defaultLang,
        description: i18n.defaultLocale.siteDescription,
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: manifestIcon,
        localize: i18n.localeCodes
          .filter((code) => code !== i18n.defaultLang)
          .map((code) => {
            const { htmlLang, siteTitle, siteShortName, siteDescription } = i18n.locales[code];
            return {
              start_url: `${i18n.localizePath('/', code)}/`,
              lang: htmlLang,
              name: siteTitle,
              short_name: siteShortName,
              description: siteDescription,
            };
          }),
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-plugin-portal',
      options: {
        key: 'portal',
        id: 'portal',
      },
    },
    // 'gatsby-plugin-webpack-bundle-analyser-v2',

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    // 'gatsby-plugin-remove-serviceworker',
  ],
  siteMetadata: {
    siteUrl: config.siteUrl,
  },
};
