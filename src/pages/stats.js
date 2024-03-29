import React from "react";
import { graphql, Link } from "gatsby";
import { DateTime } from "luxon";

import Head from "components/head";
import Stat from "components/stat";
import Stats from "components/stats";
import {
  allColours,
  longestWorn,
  mostWorn,
  leastWorn,
  brightest,
  darkest,
  first,
  last,
  birthday,
  christmas,
  newYear
} from "components/stat-functions";
import isLightColour from "utils/is-light-colour";

import "components/main.css";

import styles from "./stats.module.css";

const StatsPage = ({ data }) => {
  const latest = data.current.edges[0].node;
  const hex = latest.hex ? latest.hex : "ccc";

  const filteredColours = data.colours.edges.filter(item => !!item.node.hex);

  const colours = filteredColours.map(item => [
    item.node.colour,
    item.node.hex
  ]);
  const coloursWithDate = filteredColours.map(item => [
    item.node.colour,
    item.node.hex,
    item.node.date
  ]);

  let coloursByMonth = {};
  filteredColours.forEach(item => {
    const { colour, hex, date } = item.node;
    const format = "d LLL yyyy";
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
        coloursWithDate: []
      };
      yearMap[luxonDate.monthLong] = monthMap;
    }

    monthMap.colours.push([colour, hex]);
    monthMap.coloursWithDate.push([colour, hex, date]);
  });

  return (
    <React.Fragment>
      <section>
        <h1 className={styles.header}>Stats</h1>
        {Object.entries(coloursByMonth)
          .sort(([aYear], [bYear]) => bYear - aYear)
          .map(([year, monthData]) => (
            <React.Fragment key={year}>
              {Object.entries(monthData).map(
                ([month, { colours, coloursWithDate }]) => {
                  const newYearColours = newYear(coloursWithDate);
                  const birthdayColours = birthday(coloursWithDate);
                  const christmasColours = christmas(coloursWithDate);

                  return (
                    <Stats key={`${month} ${year}`} title={`${month} ${year}`}>
                      <Stat title="All" colours={allColours(colours)} />
                      <Stat
                        title="Longest worn"
                        colours={longestWorn(coloursWithDate)}
                      />
                      <Stat title="Most worn" colours={mostWorn(colours)} />
                      <Stat title="Least worn" colours={leastWorn(colours)} />
                      <Stat title="Brightest" colours={brightest(colours)} />
                      <Stat title="Darkest" colours={darkest(colours)} />
                      <Stat title="First" colours={first(colours)} />
                      <Stat title="Last" colours={last(colours)} />
                      {newYearColours.length > 0 && (
                        <Stat title="New Year" colours={newYearColours} />
                      )}
                      {birthdayColours.length > 0 && (
                        <Stat title="Birthday" colours={birthdayColours} />
                      )}
                      {christmasColours.length > 0 && (
                        <Stat title="Christmas" colours={christmasColours} />
                      )}
                    </Stats>
                  );
                }
              )}
            </React.Fragment>
          ))}
        <Stats title="All Time">
          <Stat title="All" colours={allColours(colours)} />
          <Stat title="Longest worn" colours={longestWorn(coloursWithDate)} />
          <Stat title="Most worn" colours={mostWorn(colours)} />
          <Stat title="Least worn" colours={leastWorn(colours)} />
          <Stat title="Brightest" colours={brightest(colours)} />
          <Stat title="Darkest" colours={darkest(colours)} />
          <Stat title="First" colours={first(colours)} />
          <Stat title="Last" colours={last(colours)} />
          <Stat title="New Year" colours={newYear(coloursWithDate)} />
          <Stat title="Birthday" colours={birthday(coloursWithDate)} />
          <Stat title="Christmas" colours={christmas(coloursWithDate)} />
        </Stats>
        <div className={styles.links}>
          <Link to="/">Today</Link>
          <Link to="/history">History</Link>
        </div>
      </section>
      <Head
        hex={hex}
        title="Stats"
        bodyClassName={isLightColour(hex) ? "light-colour" : "dark-colour"}
      />
    </React.Fragment>
  );
};

export default StatsPage;

export const query = graphql`
  query {
    ...CurrentFragment
    ...ColoursFragment
  }
`;
