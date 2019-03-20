import React from 'react';

import styles from './stat.module.css';

const Stat = ({ title, colours }) => (
  <article className={styles.stat}>
    <h1 className={styles.title}>{title}</h1>
    <ul className={styles.colourList}>
      {colours.map(hex => (
        <li
          className={styles.colourItem}
          key={hex}
          style={{ backgroundColor: `#${hex}` }}
        />
      ))}
    </ul>
  </article>
);

export default Stat;
