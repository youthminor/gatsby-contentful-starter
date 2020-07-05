import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { colors } from "../utils/colors";
import { breakpoints } from "../utils/mediaQuery";

export const Header: React.FC<{}> = ({}) => {
  return (
    <Wrapper>
      <Container>
        <LogoLink to={`/`}>Blog</LogoLink>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  padding: 0 15px;
  margin: 20px 0 50px;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  margin: 0 auto;
  max-width: ${breakpoints.contentsMaxWidth};
`;

const LogoLink = styled(Link)`
  color: ${colors.GREY_DARKER};
  font-size: 3.2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;
