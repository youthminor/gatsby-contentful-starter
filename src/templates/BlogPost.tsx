import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { Layout } from "./Layout";
import { ContentfulBlogPost } from "../../graphql/generated/schema";
import { Seo } from "../atoms/Seo";
import { breakpoints } from "../utils/mediaQuery";
import { colors } from "../utils/colors";
import { animations } from "../utils/animations";

interface Props {
  location: Location;
  pageContext: {
    contentfulId: string;
    nextPostPath: number;
    previousPostPath: number;
  };
  data: {
    post: ContentfulBlogPost;
  };
}

const BlogPost: React.FC<Props> = ({ data, pageContext }) => {
  const { nextPostPath, previousPostPath } = pageContext;
  const { post } = data;

  return (
    <Layout>
      <Seo pageDescription={post.description?.description} pageTitle={post.title} />
      <Container>
        <Article>
          <ArticleHeader>
            <ArticleHeaderTitle>{post.title}</ArticleHeaderTitle>
            <EyecatchContainer>
              <Eyecatch src={post!.heroImage!.fluid!.src} alt={post.title} />
            </EyecatchContainer>
          </ArticleHeader>
          <ArticleBody
            dangerouslySetInnerHTML={{
              __html: post.body?.childMarkdownRemark?.html,
            }}
          />
        </Article>
        <Paging>
          {previousPostPath && <PageLink to={`/${previousPostPath}`}>前の記事</PageLink>}
          {nextPostPath && <PageLink to={`/${nextPostPath}`}>次の記事</PageLink>}
        </Paging>
      </Container>
    </Layout>
  );
};

export default BlogPost;

const Paging = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const PageLink = styled(Link)`
  align-items: center;
  background-color: ${colors.GREY_DARKER};
  border-radius: 4px;
  color: ${colors.WHITE};
  display: flex;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  padding: 12px 24px;
  transition: all 0.2s ${animations.TRANSITION};

  &:hover {
    background-color: ${colors.GREY_DARK};
    color: ${colors.WHITE};
  }

  & + & {
    margin-left: 20px;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: ${breakpoints.contentsMaxWidth};
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
`;

const ArticleHeader = styled.div`
  position: relative;
`;

const ArticleHeaderTitle = styled.h1`
  color: ${colors.GREY_DARKER};
  font-weight: 700;
  font-size: 2.4rem;
  margin: 0 0 20px;
`;

const EyecatchContainer = styled.div`
  display: block;
`;

const Eyecatch = styled.img`
  display: block;
  height: auto;
  width: 100%;
  margin: 0 0 20px;
`;

const ArticleBody = styled.div`
  position: relative;

  h2 {
    font-size: 2.8rem;
    margin: 30px 0;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.75;

    & + p {
      margin-top: 20px;
    }
  }

  ul,
  ol {
    font-size: 1.5rem;
    margin: 20px 0;
  }

  ul {
    list-style: disc;
    padding: 0 0 0 25px;
  }
`;

export const BlogPostQuery = graphql`
  query blogPost($contentfulId: String!) {
    post: contentfulBlogPost(contentful_id: { eq: $contentfulId }) {
      body {
        childMarkdownRemark {
          html
        }
      }
      contentful_id
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
      title
    }
  }
`;
