const resolverPassthrough = (typeName, fieldName) => async (source, args, context, info) => {
  const type = info.schema.getType(typeName);
  const mdNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdNode, args, context, {
    fieldName,
  });
  return result;
};

/**
 * Markdown
 * */
const generalMdFields = {
  title: {
    type: 'String!',
  },
  description: {
    type: 'String',
  },

  metaTitle: {
    type: "String",
  },
  metaDescription: {
    type: "String",
  },

  cover: {
    type: 'CoverField',
  },
  slug: {
    type: 'String!',
  },
  template: {
    type: 'String',
  },
  noindex: {
    type: 'Boolean',
  },

  locale: {
    type: 'String!',
  },
};

/**
 * YAML
 *
 */
const yamlFields = {
  locale: {
    type: 'String',
  },
  type: {
    type: 'String',
  },
};

const translationItem = {
  key: {
    type: 'String',
  },
  value: {
    type: 'String',
  },
};

const navItem = {
  title: {
    type: 'String',
  },
  to: {
    type: 'String',
  },
};

const socialLinkItem = {
  code: {
    type: 'String',
  },
  url: {
    type: 'String',
  },
  text: {
    type: 'String',
  },
};

const address = {
  legalName: {
    type: 'String',
  },
  postalAddress: {
    type: 'PostalAddress',
  },
};

const postalAddress = {
  streetAddress: {
    type: '[String]',
  },
  addressLocality: {
    type: 'String',
  },
  postalCode: {
    type: 'Int',
  },
  addressCountry: {
    type: 'String',
  },
};

const geo = {
  latitude: {
    type: 'String!',
  },
  longitude: {
    type: 'String!',
  },
};

const voice = {
  phone: {
    type: '[String]',
  },
  skype: {
    type: 'String',
  },
  whatsapp: {
    type: 'String',
  },
  telegram: {
    type: 'String',
  },
  viber: {
    type: 'String',
  },
};

const contacts = {
  voice: {
    type: 'Voice',
  },
  geo: {
    type: 'Geo',
  },
  fax: {
    type: 'String',
  },
  email: {
    type: '[String]',
  },
  openingHours: {
    type: '[[String]]',
  },
};

module.exports = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    /**
     * https://www.gatsbyjs.org/docs/scaling-issues/
     *
     * Switch off type inference for SitePage.context
     */
    schema.buildObjectType({
      name: 'SitePage',
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
      fields: {
        path: {
          type: 'String!',
        },
      },
    }),

    schema.buildObjectType({
      name: 'Yaml',
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
      fields: {
        ...translationItem,
        ...socialLinkItem,
        ...navItem,
        ...address,
        ...contacts,
        fields: {
          type: 'YamlFields',
        },
      },
    }),
    schema.buildObjectType({
      name: 'YamlFields',
      fields: {
        ...yamlFields,
      },
    }),
    schema.buildObjectType({
      name: 'PostalAddress',
      fields: {
        ...postalAddress,
      },
    }),
    schema.buildObjectType({
      name: 'Geo',
      fields: {
        ...geo,
      },
    }),
    schema.buildObjectType({
      name: 'Voice',
      fields: {
        ...voice,
      },
    }),

    schema.buildObjectType({
      name: 'MdPage',
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
      fields: {
        ...generalMdFields,
        sections: {
          type: '[Section]',
        },
        html: {
          type: 'String!',
          resolve: (source, args, context, info) => resolverPassthrough('MarkdownRemark', 'html')(source, args, context, info),
        }
      },
    }),

    schema.buildObjectType({
      name: 'Section',
      fields: {
        title: {
          type: 'String',
        },
        subtitle: {
          type: 'String',
        },
        text: {
          type: 'String',
        },
        items: {
          type: '[SectionItem]',
        },
      },
    }),
    schema.buildObjectType({
      name: 'SectionItem',
      fields: {
        title: {
          type: 'String',
        },
        text: {
          type: 'String',
        },
        image: {
          type: 'ImageField',
        },
      },
    }),
    schema.buildObjectType({
      name: 'ImageField',
      fields: {
        src: {
          type: 'File',
          extensions: {
            fileByRelativePath: {},
          },
        },
        alt: {
          type: 'String',
        },
        author: {
          type: 'String',
        },
      },
    }),
    schema.buildObjectType({
      name: 'CoverField',
      fields: {
        default: {
          type: 'File',
          extensions: {
            fileByRelativePath: {},
          },
        },
        mobile: {
          type: 'File',
          extensions: {
            fileByRelativePath: {},
          },
        },
        alt: {
          type: 'String',
        },
        author: {
          type: 'String',
        },
      },
    }),
  ];

  createTypes(typeDefs);
};
