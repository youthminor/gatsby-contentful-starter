import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

export const CONTENTS_MAX_WIDTH = `${620 + 15 * 2}px`;
const MEDIA_QUERY_TRIGGER_SIZE = 620;
const CONTAINER_MAX_WIDTH = `${MEDIA_QUERY_TRIGGER_SIZE - 1}px`;
const CONTAINER_MIN_WIDTH = `${MEDIA_QUERY_TRIGGER_SIZE}px`;

export const breakpoints = {
  contentsMaxWidth: CONTENTS_MAX_WIDTH,
  containerMaxWidth: CONTAINER_MAX_WIDTH,
  containerMinWidth: CONTAINER_MIN_WIDTH,
  maxWIdth: `@media only screen and (max-width: ${CONTAINER_MAX_WIDTH})`,
  minWidth: `@media only screen and (min-width: ${CONTAINER_MIN_WIDTH})`,
};

const mediaQueries = {
  smallSize: `screen and (max-width: ${CONTAINER_MAX_WIDTH})`,
  largeSize: `screen and (min-width: ${CONTAINER_MIN_WIDTH})`,
};

const getMediaQueryLists = () => {
  return Object.fromEntries(
    Object.entries(mediaQueries).map(([key, value]: [string, string]) => [key, window.matchMedia(value)])
  );
};

export const useMedia = () => {
  if (typeof window === `undefined`) return null;

  const [mediaQueryLists, setMediaQueryLists] = useState(getMediaQueryLists());

  useEffect(() => {
    const resizeEventListener = debounce(() => setMediaQueryLists(getMediaQueryLists()), 2000, {
      maxWait: 500,
    });
    window.addEventListener("resize", resizeEventListener);

    return () => window.removeEventListener("resize", resizeEventListener);
  }, []);

  return mediaQueryLists;
};
