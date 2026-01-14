/**
 * @hook useStreakColors
 * @description Custom hook for generating colors based on pages read
 * Used by ReadingStreakGraph component
 */

import { useMemo } from 'react';
import { hexToRgba } from '../../utils/common';

export interface UseStreakColorsProps {
  primaryColor: string;
  darkMode: boolean;
}

export const useStreakColors = ({ primaryColor, darkMode }: UseStreakColorsProps) => {
  return useMemo(() => {
    const getColor = (value: number): string => {
      if (darkMode) {
        if (value === 0) return 'rgba(60, 60, 60, 0.8)';
        if (value < 5) return hexToRgba(primaryColor, 0.3);
        if (value < 15) return hexToRgba(primaryColor, 0.5);
        if (value < 25) return hexToRgba(primaryColor, 0.7);
        return hexToRgba(primaryColor, 1);
      } else {
        if (value === 0) return '#EBEDF0';
        if (value < 5) return hexToRgba(primaryColor, 0.2);
        if (value < 15) return hexToRgba(primaryColor, 0.4);
        if (value < 25) return hexToRgba(primaryColor, 0.6);
        return primaryColor;
      }
    };

    return getColor;
  }, [primaryColor, darkMode]);
};
