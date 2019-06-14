import React, { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Link } from "gatsby";

import isLightColour from "utils/is-light-colour";
import upperFirst from "utils/upper-first";

import styles from "./history-item.module.css";

const between = (min, value, max) => Math.min(Math.max(value, min), max);

const HistoryItem = ({ isToday, hex, name, date, position, setSelected }) => {
  const itemElRef = useRef(null);
  const [inViewRef, inView] = useInView();

  const [pos, setPos] = useState({
    top: 0,
    bottom: 0
  });

  useEffect(() => {
    const onScroll = () => {
      const itemEl = itemElRef.current;

      const { height, top } = itemEl.getBoundingClientRect();
      const diff = height + top;
      let posTop = (1 / height) * top;
      let posBottom = (1 / height) * diff;
      if ((posTop <= 1 && posTop >= 0) || (posBottom <= 1 && posBottom >= 0)) {
        posTop = between(0, posTop, 1);
        posBottom = between(0, posBottom, 1);
        if (
          (posTop === 0 && posBottom >= 0.5) ||
          (posBottom === 1 && posTop < 0.5)
        ) {
          setSelected(position);
        }
        setPos({
          top: between(0, posTop, 1),
          bottom: between(0, posBottom, 1)
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

export default HistoryItem;
