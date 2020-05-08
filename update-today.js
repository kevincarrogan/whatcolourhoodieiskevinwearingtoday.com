import React, { useState, useEffect } from "react";
import { render, AppContext, Color, Box } from "ink";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
import TextInput from "ink-text-input";
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
    headers: {
      "Content-Type": "application/json",
      "Api-Key": process.env.API_KEY
    }
  });
};

const getCurrentColour = (colour, hex, date) => {
  return {
    colour,
    hex,
    date
  };
};

const setCurrentColour = (label, value, date) => {
  const currentColour = getCurrentColour(label, value, date);
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

const SelectedColour = ({ label, value }) => (
  <Box>
    <ColourItem label={label} value={value} />
  </Box>
);

const Loading = () => <Waiting>Loading…</Waiting>;

const Saving = () => <Waiting>Saving…</Waiting>;

const COLOUR_STEP = "COLOUR_STEP";
const DATE_STEP = "DATE_STEP";
const STEPS = [COLOUR_STEP, DATE_STEP];

const getColourItems = colours => {
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
      value: hex
    });
  });

  return items;
};

const getTodayValue = () =>
  DateTime.fromObject(new Date()).toFormat("yyyy-MM-dd");

const Update = ({ exit }) => {
  const [colours, setColours] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(0);
  const [dateValue, setDateValue] = useState(getTodayValue());

  useEffect(() => {
    fetch(API_URL)
      .then(checkResponseStatus)
      .then(resp => resp.json())
      .then(resp => resp.days)
      .then(days => setColours(days))
      .then(() => setLoading(false))
      .catch(error => {
        console.error(error);
        exit();
      });
  }, []);

  if (saving) {
    return <Saving />;
  }

  if (loading) {
    return <Loading />;
  }

  if (STEPS[step] === COLOUR_STEP) {
    return (
      <SelectInput
        items={getColourItems(colours)}
        onSelect={({ label, value }) => {
          setSelected([label, value]);
          setStep(1);
        }}
        itemComponent={ColourItem}
      />
    );
  }

  if (STEPS[step] === DATE_STEP) {
    const [label, value] = selected;

    return (
      <Box flexDirection="column">
        <Box>
          <SelectedColour label={label} value={value} />
        </Box>
        <Box>
          <Box>Enter date: </Box>
          <TextInput
            placeholder="yyyy-mm-dd"
            value={dateValue}
            onChange={value => setDateValue(value)}
            onSubmit={date => {
              setSaving(true);
              setCurrentColour(label, value, date)
                .then(() => exit())
                .catch(error => {
                  console.error(error);
                  exit();
                });
            }}
          />
        </Box>
      </Box>
    );
  }
};

render(
  <AppContext.Consumer>
    {({ exit }) => <Update exit={exit} />}
  </AppContext.Consumer>
);
