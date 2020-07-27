const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    // Allow to use something like: import { X } from 'components/directory' instead of '../../components/directory'
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createSchemaCustomization = require('./src/gatsby/create-schema-customization');

exports.onCreateNode = require('./src/gatsby/on-create-node');

exports.onCreatePage = require('./src/gatsby/on-create-page');

exports.createPages = require('./src/gatsby/create-pages');
