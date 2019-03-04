const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');

const fontFile = (name) => {
  return path.join(__dirname, 'fonts/Nunito', name)
}

Canvas.registerFont(fontFile('Nunito-Bold.ttf'), { family: 'nunito' });

const width = 800;
const height = 600;

const canvas = Canvas.createCanvas(width, height);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#6aadad';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.font = '72px nunito';
ctx.fillStyle = '#fff';

ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText("It's blue turquoise", width / 2, height / 2);

canvas
  .createPNGStream()
  .pipe(
    fs.createWriteStream(
      path.join(__dirname, 'image.png')
    )
  );
