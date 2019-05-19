import React from "react";

import {
  allColours,
  longestWorn,
  mostWorn,
  leastWorn,
  brightest,
  darkest,
  first,
  last
} from "./stat-functions";
import Stat from "./stat.js";
import styles from "./stats.module.css";

const Stats = ({ title, colours, coloursWithDate }) => (
  <section className={styles.statsSection}>
    <h1 className={styles.statsHeader}>{title}</h1>
    <div className={styles.statsList}>
      <Stat title="All" colours={allColours(colours)} />
      <Stat title="Longest worn" colours={longestWorn(coloursWithDate)} />
      <Stat title="Most worn" colours={mostWorn(colours)} />
      <Stat title="Least worn" colours={leastWorn(colours)} />
      <Stat title="Brightest" colours={brightest(colours)} />
      <Stat title="Darkest" colours={darkest(colours)} />
      <Stat title="First" colours={first(colours)} />
      <Stat title="Last" colours={last(colours)} />
    </div>
  </section>
);

export default Stats;
