import hexToBrightness from "./hex-to-brightness";

const isLightColour = hex => hexToBrightness(hex) > 230;

export default isLightColour;
