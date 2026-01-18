/**
 * @hook useHeatmapLayout
 * @description Custom hook for calculating HeatmapChart grid layout
 * Handles the positioning of day cells in a week-based grid
 */

import { useMemo } from 'react';
import { HeatmapDay } from '../../types';

export interface WeekLayout {
  weeks: (HeatmapDay | null)[][];
  totalWeeks: number;
}

export interface UseHeatmapLayoutProps {
  filteredDays: HeatmapDay[];
  period: 'weekly' | 'monthly';
  weeksToShow: number;
}

export const useHeatmapLayout = ({
  filteredDays,
  period,
  weeksToShow,
}: UseHeatmapLayoutProps): WeekLayout => {
  return useMemo(() => {
    const sortedDays = [...filteredDays].sort(
      (a, b) => new Date(a.dateStr).getTime() - new Date(b.dateStr).getTime()
    );

    if (sortedDays.length === 0) return { weeks: [], totalWeeks: 0 };

    const lastDay = sortedDays[sortedDays.length - 1];
    const todayDayOfWeek = lastDay.dayOfWeek;
    const totalWeeks = period === 'weekly' ? 1 : weeksToShow;
    const totalCells = totalWeeks * 7;

    const lastDayPosition = sortedDays.length - 1;
    const desiredLastPosition = (totalWeeks - 1) * 7 + todayDayOfWeek;
    const startPadding = desiredLastPosition - lastDayPosition;

    const flatGrid: (HeatmapDay | null)[] = new Array(totalCells).fill(null);

    sortedDays.forEach((day, index) => {
      const position = startPadding + index;
      if (position >= 0 && position < totalCells) {
        flatGrid[position] = day;
      }
    });

    const weeks: (HeatmapDay | null)[][] = [];
    for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex++) {
      const week: (HeatmapDay | null)[] = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const position = weekIndex * 7 + dayIndex;
        week.push(flatGrid[position]);
      }
      weeks.push(week);
    }

    return { weeks, totalWeeks };
  }, [filteredDays, period, weeksToShow]);
};
