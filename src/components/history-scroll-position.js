import React from "react";
import classNames from "classnames";

import isLightColour from "utils/is-light-colour";

import styles from "./history-scroll-position.module.css";

const HistoryScrollPosition = ({ coloursWithDate, selected }) => {
  let [hex] = coloursWithDate[selected];
  hex = hex ? hex : "ccc";

  const classes = classNames(styles.list, {
    [styles.isLightColour]: isLightColour(hex)
  });

  return (
    <div className={styles.wrapper}>
      <ol className={classes}>
        {coloursWithDate.map(([hex, , date], i) => (
          <li
            className={classNames(styles.item, {
              [styles.selected]: i === selected
            })}
            key={i}
            style={{
              backgroundColor: hex ? `#${hex}` : "#ccc"
            }}
          />
        ))}
      </ol>
    </div>
  );
};

export default HistoryScrollPosition;
