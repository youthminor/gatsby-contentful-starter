const isDevelopmentEnv = process.env.NODE_ENV === `development`;

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const SITE_URL = isDevelopmentEnv ? `http://localhost:8000/` : `http://YOUR_SITE_URL`;

module.exports = {
  siteMetadata: {
    description: ``,
    title: ``,
    siteUrl: SITE_URL,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-component`],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: SITE_URL,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_KEY,
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",
      },
    },

    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `graphql/generated/schema.ts`,
        codegen: !isDevelopmentEnv,
        codegenDelay: 200,
        documentPaths: [`./src/**/*.{ts,tsx}`, `./node_modules/gatsby-*/**/*.js`],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map((edge) => {
            const { path } = edge.node;
            const priority = path === `/` ? 1.0 : 0.7;

            return {
              url: `${site.siteMetadata.siteUrl}${edge.node.path}`,
              changefreq: `monthly`,
              priority: priority,
            };
          }),
        exclude: [`/404/`, `/ 404/*`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: SITE_URL,
        sitemap: `${SITE_URL}/sitemap.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_KEY,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
};
