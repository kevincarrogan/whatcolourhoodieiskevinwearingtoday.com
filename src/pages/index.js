import React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";

import Hoodie from "components/hoodie";

import "components/main.css";

import metaImage from "./meta-image.png";

const IndexPage = ({ data }) => {
  const latest = data.current.edges[0].node;
  const colour = latest.colour;
  const hex = latest.hex;
  const title = colour ? `It's ${colour}` : "No hoodie";

  return (
    <React.Fragment>
      <Hoodie colour={colour} hex={hex}>
        <Link to="/history">History</Link>
        <Link to="/stats">Stats</Link>
      </Hoodie>
      <Helmet>
        <style type="text/css">{`
          body {
              background-color: #${hex ? hex : "ccc"};
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
        <meta property="og:description" content={title} />
        <meta property="og:image" content={metaImage} />
      </Helmet>
    </React.Fragment>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    current: allDays(filter: { id: { ne: "dummy" } }, limit: 1) {
      edges {
        node {
          colour
          hex
        }
      }
    }
  }
`;
