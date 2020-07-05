import { shade, tint } from "polished";

const WHITE = `#fff`;
const BLACK = `#000`;
const GREY_DARKER = `#222`;
const GREY_DARK = tint(0.2, GREY_DARKER);
const GREY = tint(0.4, GREY_DARKER);
const GREY_LIGHT = tint(0.6, GREY_DARKER);
const GREY_LIGHTER = tint(0.8, GREY_DARKER);
const TEXT = GREY_DARKER;
const TEXT_SUB = GREY_DARK;
const TEXT_GREY = GREY;
const LINK = `#2196f3`;
const LINK_HOVER = shade(0.1, LINK);
const ERROR = `#e53935`;

export const colors = {
  WHITE,
  BLACK,
  GREY_DARKER,
  GREY_DARK,
  GREY,
  GREY_LIGHT,
  GREY_LIGHTER,
  TEXT,
  TEXT_SUB,
  TEXT_GREY,
  LINK,
  LINK_HOVER,
  ERROR,
};
