import React from 'react';
import { graphql } from 'gatsby';

import Stat from '../components/stat';

import '../components/main.css';

const mostWorn = colours => {
  const coloursCount = {};
  const maxCount = 0;

  colours.forEach(colour => {
    const count = coloursCount['colour'];
    if (count) {
      coloursCount[colour]++;
      if (coloursCount[colour] > maxCount) {
        maxCount = coloursCount[colour];
      }
    } else {
      coloursCount[colour] = 1;
      if (1 > maxCount) {
        maxCount = 1;
      }
    }
  });
};

const StatsPage = ({ data }) => {
  return (
    <section>
      <Stat title="Most worn" colours={['Red', 'Blue']} />
      <Stat title="Longest worn" colours={['Red', 'Blue', 'Green']} />
      <Stat title="Least worn" colours={['Green']} />
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
