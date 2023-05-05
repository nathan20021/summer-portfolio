type rgbColor = {
  r: number;
  g: number;
  b: number;
};
/* eslint-disable no-unused-vars */
/**
 * Convert hex to rgb.
 * @param {string} hex The first number.
 * @return {rgbColor | null} The sum of the two numbers.
 */
export function hexToRgb(hex: string): rgbColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }
  return null;
}
/**
 *
 * @param {number} c
 * @return {string}
 */
function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

/**
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {string}
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
