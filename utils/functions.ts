type rgbColor = {
  r: number;
  g: number;
  b: number;
};
/* eslint-disable no-unused-vars */
/**
 * Convert hex to rgb.
 * @param {string} hex The first number.
 * @return {rgbColor} The sum of the two numbers.
 */
export function hexToRgb(hex: string): rgbColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }
  return {
    r: 255,
    g: 255,
    b: 255,
  };
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

/**
 *
 * @param {string} hex
 * @return {string}
 */
export function toLighterHex(hex: string): string {
  const rgb = hexToRgb(hex);
  const r = Math.min(rgb.r + 25, 255);
  const g = Math.min(rgb.g + 25, 255);
  const b = Math.min(rgb.b + 25, 255);
  return rgbToHex(r, g, b);
}

/**
 *
 * @param {string} hex
 * @return {string}
 */
export function toDarkerHex(hex: string): string {
  const rgb = hexToRgb(hex);
  const r = Math.max(rgb.r - 25, 0);
  const g = Math.max(rgb.g - 25, 0);
  const b = Math.max(rgb.b - 25, 0);
  return rgbToHex(r, g, b);
}

/**
 *
 * @param {string} heading
 * @return {string}
 */
export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
}

/**
 * Extracts the YouTube video ID from a given URL.
 * @param {string} url - The YouTube video URL.
 * @return {string | null} - The YouTube video ID if found, otherwise null.
 */
export function getYTEmbeddedID(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * @param {string} name - Name of the file.
 * @return {boolean}
 */
export const validateImageFileName = (name: string): boolean => {
  const imageFileTypes = [".jpg", ".png", ".jpeg", ".webp", ".gif"];
  return imageFileTypes.some((fileType) => name.endsWith(fileType));
};
