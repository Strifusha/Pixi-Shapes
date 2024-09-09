import { SHAPE_TYPES, WHITE_COLOR_HEX } from "./constants";

// Returns a random shape type from the available shape types
export function getRandomShapeType() {
  const types = Object.values(SHAPE_TYPES);
  return types[Math.floor(Math.random() * types.length)];
}

// Returns a random color as a hexadecimal value
export function getRandomColor() {
  return Math.floor(Math.random() * WHITE_COLOR_HEX);
}

// Returns a random integer between the specified min and max values (inclusive)
export function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
