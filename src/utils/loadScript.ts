export const loadScript = (src: string, defer?: boolean, async?: boolean) => {
  const head = document.head || document.getElementsByTagName("head")[0];
  const script = document.createElement("script");

  script.src = src;
  script.defer = defer || false;
  script.async = async || false;

  head.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
};
