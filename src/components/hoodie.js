import React from "react";
import PropTypes from "prop-types";

import isLightColour from "../utils/is-light-colour";

import styles from "./hoodie.module.css";

const Hoodie = ({ colour, hex, children }) => (
  <main
    className={styles.main}
    style={{
      backgroundColor: `#${hex}`,
      color: isLightColour(hex) ? `#666` : `#fff`
    }}
  >
    <h1>It's {colour}</h1>
    <h2>#{hex}</h2>
    {children}
  </main>
);

Hoodie.propTypes = {
  colour: PropTypes.string,
  hex: PropTypes.string
};

export default Hoodie;
