const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');

const fontFile = (name) => {
  return path.join(__dirname, 'fonts/Nunito', name)
};

const createImage = (width, height, text, colour, filename) => {
  const fontName = 'Nunito-Bold';
  try {
    Canvas.registerFont(fontFile(`${fontName}.ttf`), { family: 'nunito' });
  } catch {
    console.error(`Error loading font ${fontName}`);
    console.error('Please download from https://fonts.google.com/specimen/Nunito and place in ./fonts/');
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

createImage(800, 600, 'blue turquoise', '6aadad', 'image');
