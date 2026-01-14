/**
 * @module utils/common
 * @description Shared utility functions used across components
 */

/**
 * Converts a hex color to rgba string with specified alpha
 * @param hex - Hex color string (e.g., "#FF0000")
 * @param alpha - Alpha value between 0 and 1
 * @returns RGBA color string
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Generates intensity colors based on primary color and dark mode
 * @param primaryColor - Primary hex color
 * @param darkMode - Whether dark mode is active
 * @returns Array of 5 intensity colors from lightest to darkest
 */
export const generateIntensityColors = (
  primaryColor: string,
  darkMode: boolean
): [string, string, string, string, string] => {
  if (darkMode) {
    return [
      hexToRgba(primaryColor, 0.12),
      hexToRgba(primaryColor, 0.3),
      hexToRgba(primaryColor, 0.5),
      hexToRgba(primaryColor, 0.7),
      hexToRgba(primaryColor, 0.9),
    ] as [string, string, string, string, string];
  }
  return [
    hexToRgba(primaryColor, 0.2),
    hexToRgba(primaryColor, 0.4),
    hexToRgba(primaryColor, 0.6),
    hexToRgba(primaryColor, 0.8),
    primaryColor,
  ] as [string, string, string, string, string];
};

/**
 * Gets intensity color from an array based on intensity value (0-1)
 * @param intensity - Intensity value between 0 and 1
 * @param intensityColors - Array of 5 intensity colors
 * @returns The appropriate color for the given intensity
 */
export const getIntensityColor = (
  intensity: number,
  intensityColors: [string, string, string, string, string]
): string => {
  if (intensity === 0) return intensityColors[0];
  if (intensity <= 0.25) return intensityColors[1];
  if (intensity <= 0.5) return intensityColors[2];
  if (intensity <= 0.75) return intensityColors[3];
  return intensityColors[4];
};
