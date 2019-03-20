import React from 'react';
import { graphql } from 'gatsby';

import counter from '../utils/counter';
import Stat from '../components/stat';

import '../components/main.css';

const wornByCountFunc = (colours, func) => {
  const coloursCount = counter(colours);
  const funcOutput = func(...Object.values(coloursCount));
  const hasCount = ([k, v]) => v === funcOutput;
  const filteredColoursCount = Object.entries(coloursCount).filter(hasCount);
  const filteredColours = filteredColoursCount.map(d => d[0]);

  return filteredColours;
};

const mostWorn = colours => wornByCountFunc(colours, Math.max);

const leastWorn = colours => wornByCountFunc(colours, Math.min);

const StatsPage = ({ data }) => {
  const colours = data.colours.edges.map(item => item.node.colour);

  return (
    <section>
      <Stat title="Most worn" colours={mostWorn(colours)} />
      <Stat title="Longest worn" colours={['Red', 'Blue', 'Green']} />
      <Stat title="Least worn" colours={leastWorn(colours)} />
    </section>
  );
};

export default StatsPage;

export const query = graphql`
  query {
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
