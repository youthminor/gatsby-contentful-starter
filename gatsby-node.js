const { resolve } = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

const PER_PAGE = 2;
const BLOG_POST_TEMPLATE = resolve(`./src/templates/BlogPost.tsx`);
const BLOG_POSTS_TEMPLATE = resolve(`./src/templates/BlogPosts.tsx`);
const BLOG_POSTS_QUERY = `
  query BlogPosts {
    allContentfulBlogPost(sort: { order: DESC, fields: publishDate }) {
      edges {
        node {
          id
          contentful_id
          slug
        }
        next {
          contentful_id
          slug
        }
        previous {
          contentful_id
          slug
        }
      }
      totalCount
    }
  }
`;

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const blogPostsResult = await graphql(BLOG_POSTS_QUERY);

  if (blogPostsResult.errors || !blogPostsResult.data) throw blogPostsResult.errors;

  const { edges: blogPostEdges, totalCount } = blogPostsResult.data.allContentfulBlogPost;
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  Array.from({ length: totalPages }).forEach(async (_, i) => {
    if (i === 0) return;

    await createPage({
      path: `/page/${i + 1}`,
      component: BLOG_POSTS_TEMPLATE,
      context: {
        limit: PER_PAGE,
        skip: i * PER_PAGE,
        totalPages,
        currentPage: i + 1,
      },
    });
  });

  blogPostEdges.forEach(async (edge) => {
    const { contentful_id, slug } = edge.node;

    await createPage({
      path: `/${slug || contentful_id}`,
      component: BLOG_POST_TEMPLATE,
      context: {
        contentfulId: edge.node.contentful_id,
        previousPostPath:
          (edge.previous && edge.previous.slug) || (edge.previous && edge.previous.contentful_id) || undefined,
        nextPostPath: (edge.next && edge.next.slug) || (edge.next && edge.next.contentful_id) || undefined,
      },
    });
  });
};
