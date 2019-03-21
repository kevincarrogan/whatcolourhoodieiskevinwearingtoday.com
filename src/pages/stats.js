import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { DateTime } from 'luxon';

import counter from '../utils/counter';
import Stat from '../components/stat';

import '../components/main.css';

import styles from './stats.module.css';

const wornByCountFunc = (colours, func) => {
  let colourMap = {};
  colours.forEach(([name, hex]) => {
    colourMap[name] = hex;
  });
  const names = colours.map(colour => colour[0]);
  const coloursCount = counter(names);
  const funcOutput = func(...Object.values(coloursCount));
  const hasCount = ([k, v]) => v === funcOutput;
  const filteredColoursCount = Object.entries(coloursCount).filter(hasCount);
  const filteredColours = filteredColoursCount.map(d => [
    d[0],
    colourMap[d[0]],
  ]);

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
  let colourMap = {};
  colours.forEach(([name, hex, _]) => {
    colourMap[name] = hex;
  });
  const namesByDuration = colours.map(([name, hex, date]) => [name, date]);
  const coloursByDuration = wornDurations(namesByDuration);
  const maxDuration = Math.max(...Object.values(coloursByDuration));
  const hasMaxDuration = ([k, v]) => v === maxDuration;
  const filteredColoursByDuration = Object.entries(coloursByDuration).filter(
    hasMaxDuration
  );
  const filteredColours = filteredColoursByDuration.map(d => [
    d[0],
    colourMap[d[0]],
  ]);

  return filteredColours;
};

const StatsPage = ({ data }) => {
  const latest = data.current.edges[0].node;
  const hex = latest.hex;
  const colours = data.colours.edges.map(item => [
    item.node.colour,
    item.node.hex,
  ]);
  const coloursWithDate = data.colours.edges.map(item => [
    item.node.colour,
    item.node.hex,
    item.node.date,
  ]);

  return (
    <>
      <section>
        <h1 className={styles.header}>Stats</h1>
        <section className={styles.statsSection}>
          <Stat title="Most worn" colours={mostWorn(colours)} />
          <Stat title="Longest worn" colours={longestWorn(coloursWithDate)} />
          <Stat title="Least worn" colours={leastWorn(colours)} />
        </section>
        <div className={styles.links}>
          <Link to="/">Today</Link>
          <Link to="/history">History</Link>
        </div>
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
