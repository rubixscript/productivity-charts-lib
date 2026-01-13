/**
 * Custom hook for managing productivity data and calculations
 */

import { useMemo } from 'react';
import { HeatmapDay, ProductivityStats } from '../types';
import { calculateProductivityStats, getDailyChartData, getWeeklyChartData } from '../utils/chartHelpers';

interface UseProductivityDataProps {
  days: HeatmapDay[];
  period?: 'daily' | 'weekly' | 'monthly';
}

interface UseProductivityDataReturn {
  stats: ProductivityStats;
  dailyData: ReturnType<typeof getDailyChartData>;
  weeklyData: ReturnType<typeof getWeeklyChartData>;
}

/**
 * Hook to calculate and memoize productivity statistics
 */
export const useProductivityData = ({
  days,
  period = 'weekly',
}: UseProductivityDataProps): UseProductivityDataReturn => {
  const stats = useMemo(() => {
    return calculateProductivityStats(days);
  }, [days]);

  const dailyData = useMemo(() => {
    return getDailyChartData(days);
  }, [days]);

  const weeklyData = useMemo(() => {
    return getWeeklyChartData(days);
  }, [days]);

  return {
    stats,
    dailyData,
    weeklyData,
  };
};

export default useProductivityData;
