import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ bodyClassName, hex, title, description, metaImage }) => (
  <Helmet>
    <style type="text/css">{`
      body {
          background-color: #${hex};
      }
    `}</style>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta property="og:type" content="website" />
    <meta
      property="og:url"
      content="https://whatcolourhoodieiskevinwearingtoday.com/"
    />
    <meta
      property="og:title"
      content="What colour hoodie is Kevin wearing today?"
    />
    {description && <meta property="og:description" content={title} />}
    {metaImage && <meta property="og:image" content={metaImage} />}
    {bodyClassName && <body className={bodyClassName} />}
  </Helmet>
);

export default Head;
