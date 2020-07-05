import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { Layout } from "../templates/Layout";
import { Seo } from "../atoms/Seo";
import { ContentfulBlogPostConnection, Site } from "../../graphql/generated/schema";
import { PostSummary } from "../molecules/PostSummary";
import { breakpoints } from "../utils/mediaQuery";

interface Props {
  data: {
    site: Site;
    allContentfulBlogPost: ContentfulBlogPostConnection;
  };
}

const indexPage: React.FC<Props> = ({ data }) => {
  const { site, allContentfulBlogPost } = data;

  return (
    <Layout>
      <Seo pageDescription={site!.siteMetadata!.description} pageTitle={site!.siteMetadata!.title} />
      <Container>
        {allContentfulBlogPost.edges.map((edge) => (
          <PostSummary key={edge.node.id} post={edge.node} />
        ))}
      </Container>
    </Layout>
  );
};

export default indexPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${breakpoints.contentsMaxWidth};
`;

export const IndexBlogPostsQuery = graphql`
  query indexBlogPosts {
    site {
      siteMetadata {
        description
        title
      }
    }
    allContentfulBlogPost(limit: 2, sort: { order: DESC, fields: publishDate }) {
      edges {
        node {
          body {
            childMarkdownRemark {
              excerpt(truncate: true, pruneLength: 150)
            }
          }
          contentful_id
          description {
            description
          }
          heroImage {
            id
            contentful_id
            fluid(maxWidth: 620) {
              src
              aspectRatio
            }
          }
          id
          publishDate(fromNow: false)
          slug
          title
        }
      }
      totalCount
    }
  }
`;
