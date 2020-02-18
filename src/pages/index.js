import React from "react";
import { graphql, Link } from "gatsby";

import Head from "components/head";
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
      <Head
        hex={hex ? hex : "ccc"}
        title={title}
        description={title}
        metaImage={metaImage}
      />
    </React.Fragment>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    ...CurrentFragment
  }
`;
