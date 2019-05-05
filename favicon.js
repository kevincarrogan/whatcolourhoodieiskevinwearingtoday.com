const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');

const coloursHistory = require('./data/colours.json');

const createImage = (width, height, text, colour, filePath) => {
  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = `#${colour}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.createPNGStream().pipe(fs.createWriteStream(filePath));
};

const latestColour = coloursHistory[0];
const colour = latestColour.colour;
const hex = latestColour.hex;

createImage(
  1500,
  1500,
  colour,
  hex,
  path.join(__dirname, `src`, `favicon.png`)
);
