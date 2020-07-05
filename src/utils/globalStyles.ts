import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";
import { fonts } from "./fonts";

export const GlobalStyle = createGlobalStyle`
  ${require("ress/ress.css")}


  html {
    color: ${colors.GREY_DARKER};
    background: ${colors.WHITE};
    font-family: ${fonts.FONT_FAMILY};
    font-size: 62.5%;
    height: auto;
    min-height: 100%;
  }

  body {
    box-sizing: border-box;
    font-size: ${fonts.SIZE_DEFAULT};
    height: auto;
    margin: 0;
    min-height: 100vh;
    width: 100vw;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${colors.LINK};

    &:hover {
      color: ${colors.LINK_HOVER};
    }

    &,
    &:visited,
    &:hover,
    &:active {
      text-decoration: none;
    }
  }

  ul {
    list-style: none;
  }
`;
