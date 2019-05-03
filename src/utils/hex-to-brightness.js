import hexRgb from 'hex-rgb';
import space from 'color-space';

const hexToBrightness = hex =>
  space.rgb.hsp(hexRgb(hex, { format: 'array' }))[2];

export default hexToBrightness;
