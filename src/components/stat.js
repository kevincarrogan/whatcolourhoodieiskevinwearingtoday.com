import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './stat.module.css';

const Stat = ({ title, colours }) => {
  const [selected, setSelected] = useState(undefined);
  const onMouseOut = evt => {
    setSelected(undefined);
  };
  return (
    <article className={styles.stat} onMouseOut={onMouseOut}>
      <h1 className={styles.title}>{title}</h1>
      <ul className={styles.colourList}>
        {colours.map(hex => {
          const className = classNames(styles.colourItem, {
            [styles.colourItemSelected]: hex === selected,
            [styles.colourItemUnselected]:
              selected !== undefined && hex !== selected,
          });
          const onMouseOver = evt => {
            setSelected(hex);
          };
          return (
            <li
              className={className}
              key={hex}
              style={{ backgroundColor: `#${hex}` }}
              onMouseOver={onMouseOver}
            >
              <span class={styles.colourItemContents}>{hex}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default Stat;
