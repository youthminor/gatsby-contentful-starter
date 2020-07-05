import React, { FC } from "react";
import styled from "styled-components";
import { Layout } from "../templates/Layout";
import { Seo } from "../atoms/Seo";
import { breakpoints } from "../utils/mediaQuery";
import { colors } from "../utils/colors";

const NotFoundPage: FC<{}> = () => (
  <Layout>
    <Seo pageTitle="😭 Not found" />
    <Wrapper>
      <Container>
        <StatusCode>404</StatusCode>
        <Heading>お探しのページが見つかりません</Heading>
        <Text>
          お探しのページは一時的にアクセスができない状況にあるか、
          移動もしくは削除された可能性があります。
        </Text>
      </Container>
    </Wrapper>
  </Layout>
);

export default NotFoundPage;

const Wrapper = styled.div`
  max-width: ${breakpoints.contentsMaxWidth};
  padding: 0 15px;
  width: 100%;

  ${breakpoints.maxWIdth} {
    margin: 30px auto 50px;
  }

  ${breakpoints.minWidth} {
    margin: 80px auto 100px;
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: 450px;
`;

const StatusCode = styled.h1`
  color: ${colors.TEXT_GREY};
  font-weight: 700;

  ${breakpoints.maxWIdth} {
    font-size: 6rem;
  }

  ${breakpoints.minWidth} {
    font-size: 9.6rem;
  }
`;

const Heading = styled.h2`
  color: ${colors.GREY_DARKER};
  font-weight: 700;
  margin: 0 0 20px;
  text-align: center;

  ${breakpoints.maxWIdth} {
    font-size: 2rem;
  }

  ${breakpoints.minWidth} {
    font-size: 2.4rem;
  }
`;

const Text = styled.p`
  color: ${colors.GREY_DARK};
  text-align: center;

  ${breakpoints.maxWIdth} {
    font-size: 1.3rem;
  }

  ${breakpoints.minWidth} {
    font-size: 1.5rem;
  }
`;
