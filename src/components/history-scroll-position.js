import React, { useState } from "react";
import classNames from "classnames";

import styles from "./history-scroll-position.module.css";

const HistoryScrollPosition = ({ coloursWithDate, selected }) => {
  return (
    <div className={styles.wrapper}>
      <ol className={styles.list}>
        {coloursWithDate.map(([hex, name, date], i) => (
          <li
            className={classNames(styles.item, {
              [styles.selected]: i === selected
            })}
            key={i}
            style={{
              backgroundColor: `#${hex}`
            }}
          />
        ))}
      </ol>
    </div>
  );
};

export default HistoryScrollPosition;
