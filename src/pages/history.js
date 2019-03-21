import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import '../components/main.css';
import '../components/history.css';

import upperFirst from '../utils/upper-first';

const HistoryPage = ({ data }) => {
  const latest = data.current.edges[0].node;
  const hex = latest.hex;
  const colours = data.colours.edges;

  return (
    <>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, width: '100vw' }}>
        {colours.map((colour, i) => (
          <li
            style={{
              backgroundColor: `#${colour.node.hex}`,
              color: '#fff',
              padding: '1rem 0',
            }}
            key={i}
          >
            <div style={{ fontSize: '4rem', lineHeight: '4rem' }}>
              {upperFirst(colour.node.colour)}
            </div>
            <div style={{ fontSize: '1.5rem' }}>
              {i === 0 && <Link to="/">Today</Link>}
              {i > 0 && colour.node.date}
            </div>
          </li>
        ))}
      </ul>
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
        <title>History</title>
      </Helmet>
    </>
  );
};

export default HistoryPage;

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
    colours: allColoursJson {
      edges {
        node {
          colour
          hex
          date(formatString: "D MMM Y")
        }
      }
    }
  }
`;
