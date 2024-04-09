// canvasDimensions.js
let dimensions = { width: 800, height: 600 }; // Default values

export function setDimensions(width, height) {
  dimensions.width = width;
  dimensions.height = height;
}

export function getDimensions() {
  return dimensions;
}
