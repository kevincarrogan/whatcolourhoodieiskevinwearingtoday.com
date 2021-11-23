import React from "react";

import styles from "./stats.module.css";

const Stats = ({ title, children }) => (
  <section className={styles.statsSection}>
    <h1 className={styles.statsHeader}>{title}</h1>
    <div className={styles.statsList}>{children}</div>
  </section>
);

export default Stats;
