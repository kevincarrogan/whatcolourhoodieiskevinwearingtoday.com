import React from 'react';
import { render } from 'ink';
import SelectInput from 'ink-select-input';

import colours from '../data/colours.json';

const Update = () => {
  let seenColours = [];
  let items = [];

  colours.forEach(colour => {
    const name = colour.colour;
    const hex = colour.hex;
    if (!seenColours.includes(hex)) {
      seenColours.push(hex);

      items.push({
        label: name,
        value: hex,
      });
    }
  });

  return <SelectInput items={items} />;
};

render(<Update />);
