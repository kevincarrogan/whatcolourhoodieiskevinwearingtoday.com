import { DateTime } from 'luxon';

const format = 'd LLL yyyy';

const toDate = d => DateTime.fromFormat(d, format);

const toFormat = s => s.toFormat(format);

const itemDate = item => toDate(item[2]);

export const extrapolateDates = (coloursWithDate, extrapolateToDate) => {
  let output = [];
  let previousItem = null;
  coloursWithDate.forEach(item => {
    let diff = 1;
    if (previousItem) {
      diff = itemDate(previousItem)
        .diff(itemDate(item))
        .as('days');
    } else if (!previousItem && extrapolateToDate) {
      diff =
        toDate(extrapolateToDate)
          .diff(itemDate(item))
          .as('days') + 1;
    }
    for (let i = 1; i <= diff; i++) {
      const date = DateTime.fromFormat(item[2], format);
      const alteredDate = date.plus({ days: diff - i });
      output.push([item[0], item[1], toFormat(alteredDate)]);
    }
    previousItem = item;
  });
  return output;
};
