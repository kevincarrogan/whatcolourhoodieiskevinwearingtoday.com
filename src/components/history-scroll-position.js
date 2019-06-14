import React from "react";
import classNames from "classnames";

import isLightColour from "utils/is-light-colour";

import styles from "./history-scroll-position.module.css";

const HistoryScrollPosition = ({ coloursWithDate, selected }) => {
  const [hex] = coloursWithDate[selected];

  const classes = classNames(styles.list, {
    [styles.isLightColour]: isLightColour(hex)
  });

  return (
    <div className={styles.wrapper}>
      <ol className={classes}>
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
