import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import isLightColour from "utils/is-light-colour";

import styles from "./hoodie.module.css";

const Hoodie = ({ colour, hex, children }) => {
  if (!hex) {
    return (
      <main
        className={classNames(styles.main, "dark-colour")}
        style={{
          backgroundColor: "#ccc",
          color: "#fff"
        }}
      >
        <h1>No hoodie</h1>
        {children}
      </main>
    );
  }

  const colourClass = isLightColour(hex) ? "light-colour" : "dark-colour";
  return (
    <main
      className={classNames(styles.main, colourClass)}
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
