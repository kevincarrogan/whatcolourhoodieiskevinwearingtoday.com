import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import Hoodie from '../components/hoodie';

import '../components/main.css';

import metaImage from './meta-image.png';

const IndexPage = ({ data }) => {
  const latest = data.current.edges[0].node;
  const colour = latest.colour;
  const hex = latest.hex;

  return (
    <>
      <Hoodie colour={colour} hex={hex}>
        <Link to="/history">History</Link>
      </Hoodie>
      <Helmet>
        <style type="text/css">{`
          body {
              background-color: #${hex};
          }
        `}</style>
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:700"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <title>It's {colour}</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://whatcolourhoodieiskevinwearingtoday.com/"
        />
        <meta
          property="og:title"
          content="What colour hoodie is Kevin wearing today?"
        />
        <meta property="og:description" content={`It's ${colour}`} />
        <meta property="og:image" content={metaImage} />
      </Helmet>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    current: allColoursJson(limit: 1) {
      edges {
        node {
          colour
          hex
        }
      }
    }
  }
`;
