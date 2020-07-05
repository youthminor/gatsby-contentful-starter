import React, { FC } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

interface Props {
  lang?: string;
  meta?: [];
  pageDescription?: string | null;
  pageTitle?: string | null;
  noindex?: boolean;
}

export const Seo: FC<Props> = ({ lang = "ja", meta = [], pageDescription, pageTitle, noindex }) => {
  const { site } = useStaticQuery(graphql`
    query seo {
      site {
        siteMetadata {
          description
          title
        }
      }
    }
  `);
  const { description, title } = site.siteMetadata;
  const sharedTitle = pageTitle || title;
  const sharedDescription = pageDescription || description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={sharedTitle}
      meta={[
        {
          name: `description`,
          content: sharedDescription,
        },
        {
          property: `og:title`,
          content: sharedTitle,
        },
        {
          property: `og:description`,
          content: sharedDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    >
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
};
