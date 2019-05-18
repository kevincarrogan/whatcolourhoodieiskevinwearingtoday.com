import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import isLightColour from "utils/is-light-colour";

import styles from "./hoodie.module.css";

const Hoodie = ({ colour, hex, children }) => {
  const colourClass = isLightColour(hex) ? "light-colour" : "dark-colour";
  const classes = classNames(styles.main, colourClass);
  return (
    <main
      className={classes}
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
};

Hoodie.propTypes = {
  colour: PropTypes.string,
  hex: PropTypes.string
};

export default Hoodie;
