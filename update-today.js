import React from 'react';
import { render, AppContext, Color, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { DateTime } from 'luxon';
import fs from 'fs';
import path from 'path';
import beautify from 'json-beautify';

import colours from '../data/colours.json';

const saveCurrentToDataFile = currentColour => {
  const filePath = path.join(__dirname, '..', 'data', 'colours.json');
  const colourList = JSON.parse(fs.readFileSync(filePath));
  colourList.unshift(currentColour);
  fs.writeFileSync(filePath, beautify(colourList, null, 2, 100));
};

const getCurrentColour = (colour, hex) => {
  const today = DateTime.fromObject(new Date()).toFormat('yyyy-MM-dd');
  return {
    colour,
    hex,
    date: today,
  };
};

const setCurrentColour = ({ label, value, exit }) => {
  const currentColour = getCurrentColour(label, value);
  saveCurrentToDataFile(currentColour);
  exit();
};

const ColourItem = ({ label, value }) => {
  return (
    <Color hex="#fff" bgHex={`#${value}`}>
      {label}
    </Color>
  );
};

const Update = ({ exit }) => {
  let seenColours = [];
  let items = [];

  colours.forEach(colour => {
    const name = colour.colour;
    const hex = colour.hex;
    if (seenColours.includes(hex)) {
      return;
    }

    seenColours.push(hex);
    items.push({
      label: name,
      value: hex,
      exit,
    });
  });

  return (
    <SelectInput
      items={items}
      onSelect={setCurrentColour}
      itemComponent={ColourItem}
    />
  );
};

render(
  <AppContext.Consumer>
    {({ exit }) => <Update exit={exit} />}
  </AppContext.Consumer>
);
