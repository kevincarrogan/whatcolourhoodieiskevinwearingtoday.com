import React, { useState } from "react";
import { Helmet } from "react-helmet";

import isLightColour from "../utils/is-light-colour";

import styles from "./picker.module.css";

import "../components/main.css";

const PickerPage = () => {
  const [hex, setHex] = useState("fff");
  let bodyClassName;
  let validHex;
  try {
    bodyClassName = isLightColour(hex) ? "light-colour" : "dark-colour";
    validHex = hex;
  } catch (e) {
    bodyClassName = "light-colour";
    validHex = "fff";
  }
  return (
    <div>
      #
      <input
        className={styles.hexInput}
        type="text"
        value={hex}
        onChange={evt => setHex(evt.target.value)}
      />
      <Helmet>
        <style type="text/css">{`
          body {
              background-color: #${validHex};
          }
        `}</style>
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:700"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <title>Picker</title>
        <body className={bodyClassName} />
      </Helmet>
    </div>
  );
};

export default PickerPage;
