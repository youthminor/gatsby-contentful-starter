import React from "react";
import styled from "styled-components";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { GlobalStyle } from "../utils/globalStyles";

console.log(`loaded as APP_ENV=${process.env.GATSBY_APP_ENV}`);

interface Props {
  children?: React.ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </>
  );
};
