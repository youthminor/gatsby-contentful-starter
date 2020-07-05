import React from "react";
import styled from "styled-components";
import { breakpoints } from "../utils/mediaQuery";
import { colors } from "../utils/colors";

export const Footer: React.FC<{}> = () => {
  return (
    <Wrapper>
      <Container>
        <Copyright>
          <small>©hoge. 2014 - {new Date().getFullYear()}</small>
        </Copyright>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: ${colors.WHITE};
  display: flex;
  padding: 15px 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: ${breakpoints.contentsMaxWidth};
`;

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  small {
    color: ${colors.GREY};
    font-size: 1.1rem;
    text-align: center;
  }
`;
