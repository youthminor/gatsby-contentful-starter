import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { colors } from "../utils/colors";
import { ContentfulBlogPost } from "../../graphql/generated/schema";
import dayjs from "dayjs";

interface Props {
  post: ContentfulBlogPost;
}

export const PostSummary: React.FC<Props> = ({ post }) => {
  return (
    <Container>
      <Summary to={`/${post.slug}`}>
        <Image src={post.heroImage!.fluid!.src} />
        <Body>
          <Title>{post.title}</Title>
          {post.description && <Description>{post.description.description}</Description>}
          {post.publishDate && <PublishDate>{dayjs(post.publishDate).format("YYYY/MM/DD")}</PublishDate>}
        </Body>
      </Summary>
    </Container>
  );
};

const Container = styled.div`
  & + & {
    margin-top: 50px;
  }
`;

const Summary = styled(Link)`
  display: block;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  display: block;
  height: 225px;
  object-fit: cover;
  width: 100%;
`;

const Body = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  color: ${colors.GREY_DARKER};
  font-weight: 700;
  font-size: 1.7rem;
`;

const Description = styled.p`
  color: ${colors.GREY_DARK};
  font-size: 1.5rem;
  margin: 10px 0 0;
`;

const PublishDate = styled.div`
  color: ${colors.GREY_DARK};
  font-size: 1.3rem;
  margin: 10px 0 0;
`;
