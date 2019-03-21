import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './stat.module.css';

const Stat = ({ title, colours }) => {
  const [selected, setSelected] = useState(undefined);
  const [onlyClick, setOnlyClick] = useState(false);
  const onMouseOut = evt => {
    setSelected(undefined);
    setOnlyClick(false);
  };
  return (
    <article className={styles.stat} onMouseOut={onMouseOut}>
      <h1 className={styles.title}>{title}</h1>
      <ul className={styles.colourList}>
        {colours.map(([colour, hex]) => {
          const className = classNames(styles.colourItem, {
            [styles.colourItemSelected]: hex === selected,
            [styles.colourItemUnselected]:
              selected !== undefined && hex !== selected,
          });
          const onMouseOver = evt => {
            if (!onlyClick) {
              setSelected(hex);
            }
          };
          const onMouseOut = evt => {
            evt.stopPropagation();
          };
          const onClick = evt => {
            setOnlyClick(true);
            if (selected === hex) {
              setSelected(undefined);
            } else {
              setSelected(hex);
            }
          };
          return (
            <li
              className={className}
              key={hex}
              style={{ backgroundColor: `#${hex}` }}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
            >
              <span className={styles.colourItemContents}>{colour}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default Stat;
