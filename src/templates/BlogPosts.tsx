import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { ContentfulBlogPostConnection } from "../../graphql/generated/schema";
import { Layout } from "./Layout";
import { Seo } from "../atoms/Seo";
import { Pagination } from "../molecules/Pagination";
import { PostSummary } from "../molecules/PostSummary";
import { breakpoints } from "../utils/mediaQuery";

interface Props {
  data: {
    allContentfulBlogPost: ContentfulBlogPostConnection;
  };
  pageContext: {
    limit: number;
    skip: number;
    totalPages: number;
    currentPage: number;
  };
}

const BlogPosts: React.FC<Props> = ({ data, pageContext }) => {
  const { allContentfulBlogPost } = data;
  const { currentPage, totalPages } = pageContext;

  return (
    <Layout>
      <Seo pageDescription={``} pageTitle={``} />
      <Container>
        {allContentfulBlogPost.edges.map((edge) => (
          <PostSummary key={edge.node.id} post={edge.node} />
        ))}
      </Container>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </Layout>
  );
};

export default BlogPosts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${breakpoints.contentsMaxWidth};
`;

export const BlogPostsQuery = graphql`
  query blogPosts($limit: Int!, $skip: Int!) {
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          body {
            childMarkdownRemark {
              html
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
