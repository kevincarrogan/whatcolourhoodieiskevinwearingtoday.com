import React from 'react';
import PropTypes from 'prop-types';

import styles from './hoodie.module.css';

const Hoodie = ({ colour, hex, children }) => (
  <main
    className={styles.main}
    style={{
      backgroundColor: `#${hex}`,
      color: `#fff`,
    }}
  >
    <h1>It's {colour}</h1>
    <h2>#{hex}</h2>
    {children}
  </main>
);

Hoodie.propTypes = {
  colour: PropTypes.string,
  hex: PropTypes.string,
};

export default Hoodie;
