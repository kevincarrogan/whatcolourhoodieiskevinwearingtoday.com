import React from 'react';
import { graphql, Link } from 'gatsby';

import '../components/main.css';

const StatsPage = ({ data }) => {
  const latest = data.current.edges[0].node;
  const hex = latest.hex;
  const colours = data.colours.edges;

  return (
    <section>
      <article checked>
        <h1>Most worn</h1>
        <ul>
          <li>Red</li>
          <li>Blue</li>
        </ul>
      </article>
      <article>
        <h1>Longest worn</h1>
        <ul>
          <li>Red</li>
          <li>Blue</li>
          <li>Green</li>
        </ul>
      </article>
      <article>
        <h1>Least worn</h1>
        <ul>
          <li>Green</li>
        </ul>
      </article>
    </section>
  );
};

export default StatsPage;

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
