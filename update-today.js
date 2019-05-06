import React from 'react';
import { render, AppContext, Color, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { DateTime } from 'luxon';
import fs from 'fs';
import path from 'path';
import beautify from 'json-beautify';

import colours from '../data/colours.json';

const setCurrentColour = ({ label, value, exit }) => {
  const filePath = path.join(__dirname, '..', 'data', 'colours.json');
  const today = DateTime.fromObject(new Date()).toFormat('yyyy-MM-dd');
  const colourList = JSON.parse(fs.readFileSync(filePath));
  colourList.unshift({
    colour: label,
    hex: value,
    date: today,
  });
  fs.writeFileSync(filePath, beautify(colourList, null, 2, 100));
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
