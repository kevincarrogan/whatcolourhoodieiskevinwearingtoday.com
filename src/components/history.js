import React from "react";

import { Link } from "gatsby";

import isLightColour from "utils/is-light-colour";
import upperFirst from "utils/upper-first";

import styles from "./history.module.css";

const History = ({ coloursWithDate }) => (
  <ul className={styles.list}>
    {coloursWithDate.map((colour, i) => (
      <li
        className={styles.item}
        style={{
          backgroundColor: `#${colour[0]}`,
          color: isLightColour(colour[0]) ? "#666" : "#fff"
        }}
        key={i}
      >
        <div className={styles.colourName}>{upperFirst(colour[1])}</div>
        <div className={styles.details}>
          {i === 0 && (
            <Link className={styles.link} to="/">
              Today
            </Link>
          )}
          {i > 0 && colour[2]}
        </div>
      </li>
    ))}
  </ul>
);

export default History;
