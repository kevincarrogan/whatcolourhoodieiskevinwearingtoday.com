import { DateTime } from "luxon";

import counter from "utils/counter";
import extrapolateDates from "utils/extrapolate-dates";
import hexToBrightness from "utils/hex-to-brightness";

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
    colourMap[d[0]]
  ]);

  return filteredColours;
};

export const mostWorn = colours => wornByCountFunc(colours, Math.max);

export const leastWorn = colours => wornByCountFunc(colours, Math.min);

const wornDurations = coloursWithDate => {
  const reversed = coloursWithDate.slice().reverse();
  let coloursWithDuration = {};

  reversed.forEach(([currentColour, currentTime], i) => {
    if (i === 0) {
      return;
    }

    const [lastColour, lastTime] = reversed[i - 1];
    const format = "d LLL yyyy";
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

export const longestWorn = colours => {
  if (colours.length === 1) {
    const [name, hex] = colours[0];

    return [[name, hex]];
  }

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
    colourMap[d[0]]
  ]);

  return filteredColours;
};

const uniqueColours = colours => {
  let coloursMap = {};

  colours.forEach(([name, hex]) => {
    coloursMap[name] = hex;
  });

  return Object.entries(coloursMap);
};

export const brightest = colours => {
  const coloursWithBrightness = colours.map(([name, hex]) => [
    name,
    hex,
    hexToBrightness(hex)
  ]);
  const brightnessValues = coloursWithBrightness.map(
    ([name, hex, brightness]) => brightness
  );
  const maxBrightness = Math.max(...brightnessValues);
  const filteredColours = coloursWithBrightness
    .filter(([name, hex, brightness]) => brightness === maxBrightness)
    .map(([name, hex, brightness]) => [name, hex]);

  return uniqueColours(filteredColours);
};

export const darkest = colours => {
  const coloursWithBrightness = colours.map(([name, hex]) => [
    name,
    hex,
    hexToBrightness(hex)
  ]);
  const brightnessValues = coloursWithBrightness.map(
    ([name, hex, brightness]) => brightness
  );
  const minBrightness = Math.min(...brightnessValues);
  const filteredColours = coloursWithBrightness
    .filter(([name, hex, brightness]) => brightness === minBrightness)
    .map(([name, hex, brightness]) => [name, hex]);

  return uniqueColours(filteredColours);
};

export const allColours = uniqueColours;

export const first = colours => [colours[colours.length - 1]];

export const last = colours => [colours[0]];

export const filterByDate = ({ year, month, day }, coloursWithDate) =>
  extrapolateDates(coloursWithDate)
    .slice()
    .reverse()
    .filter(([, , date]) => {
      let matches = true;
      const dateObj = DateTime.fromFormat(date, "d LLL yyyy");

      if (year) {
        matches = matches && year === dateObj.year;
      }
      if (month) {
        matches = matches && month === dateObj.month;
      }
      if (day) {
        matches = matches && day === dateObj.day;
      }

      return matches;
    })
    .map(([name, hex]) => [name, hex]);

export const birthday = coloursWithDate =>
  filterByDate({ month: 11, day: 7 }, coloursWithDate);

export const christmas = coloursWithDate =>
  filterByDate({ month: 12, day: 25 }, coloursWithDate);

export const newYear = coloursWithDate =>
  filterByDate({ month: 1, day: 1 }, coloursWithDate);
