import React from "react";

import HistoryItem from "./history-item";

import styles from "./history.module.css";

const History = ({ coloursWithDate }) => {
  return (
    <div className={styles.list}>
      {coloursWithDate.map((colour, i) => (
        <HistoryItem
          key={i}
          isToday={i === 0}
          hex={colour[0]}
          name={colour[1]}
          date={colour[2]}
        />
      ))}
    </div>
  );
};

export default History;
