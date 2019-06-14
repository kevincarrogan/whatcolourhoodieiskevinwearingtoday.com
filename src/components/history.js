import React, { useState } from "react";

import HistoryItem from "./history-item";
import HistoryScrollPosition from "./history-scroll-position";

import styles from "./history.module.css";

const History = ({ coloursWithDate }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.list}>
      <HistoryScrollPosition
        coloursWithDate={coloursWithDate}
        selected={selected}
      />
      {coloursWithDate.map((colour, i) => (
        <HistoryItem
          key={i}
          isToday={i === 0}
          hex={colour[0]}
          name={colour[1]}
          date={colour[2]}
          position={i}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};

export default History;
