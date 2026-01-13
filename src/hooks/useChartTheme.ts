/**
 * Custom hook for managing chart themes
 */

import { useMemo } from 'react';
import { ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';

/**
 * Hook to merge custom theme with default theme
 */
export const useChartTheme = (
  customTheme?: Partial<ChartTheme>,
  darkMode: boolean = false
): ChartTheme => {
  return useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    return { ...baseTheme, ...customTheme };
  }, [customTheme, darkMode]);
};

export default useChartTheme;
