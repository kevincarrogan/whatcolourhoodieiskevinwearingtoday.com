import React, { useState, useEffect } from "react";
import { render, AppContext, Color, Box } from "ink";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
import { DateTime } from "luxon";
import fs from "fs";
import path from "path";
import beautify from "json-beautify";
import fetch from "node-fetch";

import isLightColour from "./is-light-colour";

const API_URL = "https://api.kevinshoodie.com/days/";

const checkResponseStatus = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

const saveCurrentToDataFile = currentColour => {
  const filePath = path.join(__dirname, "..", "data", "colours.json");
  const colourList = JSON.parse(fs.readFileSync(filePath));
  colourList.unshift(currentColour);
  fs.writeFileSync(filePath, beautify(colourList, null, 2, 100));
};

const postCurrentToAPI = currentColour => {
  return fetch(API_URL, {
    method: "post",
    body: JSON.stringify(currentColour),
    headers: { "Content-Type": "application/json" }
  });
};

const getCurrentColour = (colour, hex) => {
  const today = DateTime.fromObject(new Date()).toFormat("yyyy-MM-dd");
  return {
    colour,
    hex,
    date: today
  };
};

const setCurrentColour = (label, value) => {
  const currentColour = getCurrentColour(label, value);
  return postCurrentToAPI(currentColour)
    .then(checkResponseStatus)
    .then(() => saveCurrentToDataFile(currentColour));
};

const ColourItem = ({ label, value }) => {
  const colour = isLightColour(value) ? "000" : "fff";
  return (
    <Color hex={`#${colour}`} bgHex={`#${value}`}>
      {label}
    </Color>
  );
};

const Waiting = ({ children }) => (
  <Box>
    <Color green>
      <Spinner type="dots" />
    </Color>{" "}
    {children}
  </Box>
);

const Loading = () => <Waiting>Loading…</Waiting>;

const Saving = () => <Waiting>Saving…</Waiting>;

const Update = ({ exit }) => {
  const [colours, setColours] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(checkResponseStatus)
      .then(resp => resp.json())
      .then(resp => resp.days)
      .then(days => setColours(days))
      .catch(error => {
        console.error(error);
        exit();
      });
  }, []);

  if (saving) {
    return <Saving />;
  }

  if (!colours) {
    return <Loading />;
  }

  let seenColours = [];
  let items = [];

  colours.forEach(colour => {
    const name = colour.colour;
    const hex = colour.hex;

    if (!hex) {
      return;
    }

    if (seenColours.includes(hex)) {
      return;
    }

    seenColours.push(hex);
    items.push({
      label: name,
      value: hex,
      exit
    });
  });

  return (
    <SelectInput
      items={items}
      onSelect={({ label, value }) => {
        setSaving(true);
        setCurrentColour(label, value)
          .then(() => exit())
          .catch(error => {
            console.error(error);
            exit();
          });
      }}
      itemComponent={ColourItem}
    />
  );
};

render(
  <AppContext.Consumer>
    {({ exit }) => <Update exit={exit} />}
  </AppContext.Consumer>
);
