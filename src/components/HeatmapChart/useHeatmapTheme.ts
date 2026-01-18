/**
 * @hook useHeatmapTheme
 * @description Custom hook for managing HeatmapChart theme
 * Handles theme merging and intensity color generation
 */

import { useMemo } from 'react';
import { ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';
import { generateIntensityColors } from '../../utils/common';

export interface UseHeatmapThemeProps {
  customTheme?: Partial<ChartTheme>;
  darkMode?: boolean;
}

export const useHeatmapTheme = ({ customTheme, darkMode = false }: UseHeatmapThemeProps): ChartTheme => {
  return useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    const mergedTheme = { ...baseTheme, ...customTheme };

    // If custom primaryColor is provided, generate intensityColors dynamically
    if (customTheme?.primaryColor && customTheme.primaryColor !== baseTheme.primaryColor) {
      mergedTheme.intensityColors = generateIntensityColors(customTheme.primaryColor, darkMode);
    }

    return mergedTheme;
  }, [darkMode, customTheme]);
};
