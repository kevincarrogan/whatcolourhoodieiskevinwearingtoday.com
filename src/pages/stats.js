import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { DateTime } from 'luxon';

import Stats from '../components/stats';

import '../components/main.css';

import styles from './stats.module.css';

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

  let coloursByMonth = {};
  data.colours.edges.forEach(item => {
    const { colour, hex, date } = item.node;
    const format = 'd LLL yyyy';
    const luxonDate = DateTime.fromFormat(date, format);

    let yearMap = coloursByMonth[luxonDate.year];
    if (!yearMap) {
      yearMap = {};
      coloursByMonth[luxonDate.year] = yearMap;
    }

    let monthMap = yearMap[luxonDate.monthLong];
    if (!monthMap) {
      monthMap = {
        colours: [],
        coloursWithDate: [],
      };
      yearMap[luxonDate.monthLong] = monthMap;
    }

    monthMap.colours.push([colour, hex]);
    monthMap.coloursWithDate.push([colour, hex, date]);
  });

  return (
    <>
      <section>
        <h1 className={styles.header}>Stats</h1>
        {Object.entries(coloursByMonth).map(([year, monthData]) => (
          <React.Fragment key={year}>
            {Object.entries(monthData).map(([month, data]) => (
              <Stats
                key={`${month} ${year}`}
                title={`${month} ${year}`}
                colours={data.colours}
                coloursWithDate={data.coloursWithDate}
              />
            ))}
          </React.Fragment>
        ))}
        <Stats
          title="All Time"
          colours={colours}
          coloursWithDate={coloursWithDate}
        />
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
