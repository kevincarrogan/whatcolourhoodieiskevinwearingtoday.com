import React, { useState } from "react";

import Head from "components/head";

import isLightColour from "utils/is-light-colour";

import styles from "./picker.module.css";

import "components/main.css";

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
      <Head bodyClassName={bodyClassName} title="Picker" hex={validHex} />
    </div>
  );
};

export default PickerPage;
