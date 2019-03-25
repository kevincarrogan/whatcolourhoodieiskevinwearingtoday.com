import React from 'react';
import { DateTime } from 'luxon';
import hexRgb from 'hex-rgb';
import space from 'color-space';

import counter from '../utils/counter';

import Stat from './stat.js';
import styles from './stats.module.css';

const wornByCountFunc = (colours, func) => {
  let colourMap = {};
  colours.forEach(([name, hex]) => {
    colourMap[name] = hex;
  });
  const names = colours.map(colour => colour[0]);
  const coloursCount = counter(names);
  const funcOutput = func(...Object.values(coloursCount));
  const hasCount = ([k, v]) => v === funcOutput;
  const filteredColoursCount = Object.entries(coloursCount).filter(hasCount);
  const filteredColours = filteredColoursCount.map(d => [
    d[0],
    colourMap[d[0]],
  ]);

  return filteredColours;
};

const mostWorn = colours => wornByCountFunc(colours, Math.max);

const leastWorn = colours => wornByCountFunc(colours, Math.min);

const wornDurations = coloursWithDate => {
  const reversed = coloursWithDate.slice().reverse();
  let coloursWithDuration = {};

  reversed.forEach(([currentColour, currentTime], i) => {
    if (i === 0) {
      return;
    }

    const [lastColour, lastTime] = reversed[i - 1];
    const format = 'd LLL yyyy';
    const currentDateTime = DateTime.fromFormat(currentTime, format);
    const lastDateTime = DateTime.fromFormat(lastTime, format);
    let maxDuration = coloursWithDuration[lastColour] || 0;
    let newDuration = currentDateTime - lastDateTime;
    if (newDuration > maxDuration) {
      coloursWithDuration[lastColour] = newDuration;
    }

    if (i === reversed.length - 1) {
      let maxDuration = coloursWithDuration[currentColour] || 0;
      let newDuration = DateTime.fromJSDate(new Date()) - lastDateTime;
      if (newDuration > maxDuration) {
        coloursWithDuration[currentColour] = maxDuration;
      }
    }
  });

  return coloursWithDuration;
};

const longestWorn = colours => {
  let colourMap = {};
  colours.forEach(([name, hex, _]) => {
    colourMap[name] = hex;
  });
  const namesByDuration = colours.map(([name, hex, date]) => [name, date]);
  const coloursByDuration = wornDurations(namesByDuration);
  const maxDuration = Math.max(...Object.values(coloursByDuration));
  const hasMaxDuration = ([k, v]) => v === maxDuration;
  const filteredColoursByDuration = Object.entries(coloursByDuration).filter(
    hasMaxDuration
  );
  const filteredColours = filteredColoursByDuration.map(d => [
    d[0],
    colourMap[d[0]],
  ]);

  return filteredColours;
};

const hexToBrightness = hex =>
  space.rgb.hsp(hexRgb(hex, { format: 'array' }))[2];

const brightest = colours => {
  const coloursWithBrightness = colours.map(([name, hex]) => [
    name,
    hex,
    hexToBrightness(hex),
  ]);
  const brightnessValues = coloursWithBrightness.map(
    ([name, hex, brightness]) => brightness
  );
  const maxBrightness = Math.max(...brightnessValues);
  const filteredColours = coloursWithBrightness
    .filter(([name, hex, brightness]) => brightness === maxBrightness)
    .map(([name, hex, brightness]) => [name, hex]);

  return filteredColours;
};

const darkest = colours => {
  const coloursWithBrightness = colours.map(([name, hex]) => [
    name,
    hex,
    hexToBrightness(hex),
  ]);
  const brightnessValues = coloursWithBrightness.map(
    ([name, hex, brightness]) => brightness
  );
  const minBrightness = Math.min(...brightnessValues);
  const filteredColours = coloursWithBrightness
    .filter(([name, hex, brightness]) => brightness === minBrightness)
    .map(([name, hex, brightness]) => [name, hex]);

  return filteredColours;
};

const Stats = ({ title, colours, coloursWithDate }) => (
  <section className={styles.statsSection}>
    <h1 className={styles.statsHeader}>{title}</h1>
    <div className={styles.statsList}>
      <Stat title="Most worn" colours={mostWorn(colours)} />
      <Stat title="Longest worn" colours={longestWorn(coloursWithDate)} />
      <Stat title="Least worn" colours={leastWorn(colours)} />
      <Stat title="Brightest" colours={brightest(colours)} />
      <Stat title="Darkest" colours={darkest(colours)} />
    </div>
  </section>
);

export default Stats;
