const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');

const coloursHistory = require('./data/colours.json');

const fontFile = (name) => {
  return path.join(__dirname, 'fonts/Nunito', name)
};

const createImage = (width, height, text, colour, filename) => {
  const fontName = 'Nunito-Bold';
  const fullPath = fontFile(`${fontName}.ttf`);
  try {
    Canvas.registerFont(fullPath, { family: 'nunito' });
  } catch {
    console.error(`Error loading font ${fullPath}.`);
    console.error('Please download from https://fonts.google.com/specimen/Nunito.');
    return;
  }

  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = `#${colour}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '72px nunito';
  ctx.fillStyle = '#fff';

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`It's ${text}`, width / 2, height / 2);

  canvas
    .createPNGStream()
    .pipe(
      fs.createWriteStream(
        path.join(__dirname, `${filename}.png`)
      )
    );
};

const latestColour = coloursHistory[0];
const colour = latestColour.colour;
const hex = latestColour.hex;

createImage(800, 600, colour, hex, 'image');
