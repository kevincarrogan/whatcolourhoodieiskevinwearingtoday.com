import React, { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Link } from "gatsby";

import isLightColour from "utils/is-light-colour";
import upperFirst from "utils/upper-first";

import styles from "./history.module.css";

const Item = ({ isToday, hex, name, date }) => {
  const fixedColourNameElRef = useRef(null);
  const itemElRef = useRef(null);
  const [inViewRef, inView] = useInView();

  const [pos, setPos] = useState({
    top: 0,
    bottom: 0
  });
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const fixedColourNameEl = fixedColourNameElRef.current;
      const itemEl = itemElRef.current;

      const { height, top } = itemEl.getBoundingClientRect();
      const diff = height + top;
      const posTop = (1 / height) * top;
      const posBottom = (1 / height) * diff;
      if ((posTop <= 1 && posTop >= 0) || (posBottom <= 1 && posBottom >= 0)) {
        setPos({
          top: posTop,
          bottom: posBottom
        });
      }
    };

    if (inView) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    return () => {
      if (inView) {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, [inView]);

  return (
    <React.Fragment>
      <div
        className={styles.fixedColourName}
        ref={fixedColourNameElRef}
        style={{
          clip: `rect(${pos.top * 100}vh, 100vw, ${pos.bottom * 100}vh, 0px)`,
          display: inView ? "flex" : "none",
          color: isLightColour(hex) ? "#666" : "#fff",
          zIndex: 1
        }}
      >
        {upperFirst(name)}
      </div>
      <div
        className={styles.item}
        style={{
          backgroundColor: `#${hex}`,
          color: isLightColour(hex) ? "#666" : "#fff",
          position: "relative"
        }}
        ref={inViewRef}
      >
        <div
          ref={itemElRef}
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        >
          <div className={styles.colourName}>{upperFirst(name)}</div>
          <div className={styles.details}>
            {isToday ? (
              <Link className={styles.link} to="/">
                Today
              </Link>
            ) : (
              date
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const History = ({ coloursWithDate }) => {
  return (
    <div className={styles.list}>
      {coloursWithDate.map((colour, i) => (
        <Item
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
