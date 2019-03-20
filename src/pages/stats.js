import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { DateTime } from 'luxon';

import counter from '../utils/counter';
import Stat from '../components/stat';

import '../components/main.css';

import styles from './stats.module.css';

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

const wornDurations = coloursWithDate => {
  const reversed = coloursWithDate.slice().reverse();
  let coloursWithDuration = {};

  reversed.forEach(([currentColour, currentTime], i) => {
    if (i === 0) {
      return;
    }

    const [lastColour, lastTime] = reversed[i - 1];
    const format = 'd LLL yyyy';
    const currentDateTime = DateTime.fromFormat(currentTime, format);
    const lastDateTime = DateTime.fromFormat(lastTime, format);
    let maxDuration = coloursWithDuration[lastColour] || 0;
    let newDuration = currentDateTime - lastDateTime;
    if (newDuration > maxDuration) {
      coloursWithDuration[lastColour] = newDuration;
    }

    if (i === reversed.length - 1) {
      let maxDuration = coloursWithDuration[currentColour] || 0;
      let newDuration = DateTime.fromJSDate(new Date()) - lastDateTime;
      if (newDuration > maxDuration) {
        coloursWithDuration[currentColour] = maxDuration;
      }
    }
  });

  return coloursWithDuration;
};

const longestWorn = colours => {
  const coloursByDuration = wornDurations(colours);
  const maxDuration = Math.max(...Object.values(coloursByDuration));
  const hasMaxDuration = ([k, v]) => v === maxDuration;
  const filteredColoursByDuration = Object.entries(coloursByDuration).filter(
    hasMaxDuration
  );
  const filteredColours = filteredColoursByDuration.map(d => d[0]);

  return filteredColours;
};

const StatsPage = ({ data }) => {
  const latest = data.current.edges[0].node;
  const hex = latest.hex;
  const colours = data.colours.edges.map(item => item.node.hex);
  const coloursWithDate = data.colours.edges.map(item => [
    item.node.hex,
    item.node.date,
  ]);

  return (
    <>
      <section className={styles.statsSection}>
        <Stat title="Most worn" colours={mostWorn(colours)} />
        <Stat title="Longest worn" colours={longestWorn(coloursWithDate)} />
        <Stat title="Least worn" colours={leastWorn(colours)} />
      </section>
      <Helmet>
        <style type="text/css">{`
          body {
              background-color: #${hex};
              color: #fff;
          }
        `}</style>
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:700"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <title>Stats</title>
      </Helmet>
    </>
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
