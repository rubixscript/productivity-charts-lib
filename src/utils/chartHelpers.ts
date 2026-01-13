/**
 * Utility functions for chart data manipulation and calculations
 */

import { HeatmapDay, HeatmapMonth, ChartDataPoint, ProductivityStats } from '../types';

/**
 * Generate heatmap data from raw session data
 */
export interface RawSessionData {
  date: Date | string;
  value: number; // sessions, minutes, etc.
  metadata?: Record<string, any>;
}

export const generateHeatmapData = (
  sessions: RawSessionData[],
  daysToShow: number = 150,
  intensityThreshold: number = 8
): HeatmapDay[] => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysToShow);

  const days: HeatmapDay[] = [];
  const sessionsByDate = new Map<string, number>();

  // Group sessions by date
  sessions.forEach((session) => {
    const date = new Date(session.date);
    const dateStr = date.toISOString().split('T')[0];
    sessionsByDate.set(dateStr, (sessionsByDate.get(dateStr) || 0) + session.value);
  });

  // Generate continuous days array
  let currentDate = new Date(startDate);
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const value = sessionsByDate.get(dateStr) || 0;
    const intensity = Math.min(value / intensityThreshold, 1);

    days.push({
      date: new Date(currentDate),
      dateStr,
      intensity,
      value,
      dayOfWeek: currentDate.getDay(),
      isToday: dateStr === today.toISOString().split('T')[0],
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

/**
 * Generate month labels for a date range
 */
export const generateMonthLabels = (startDate: Date, endDate: Date): HeatmapMonth[] => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const months: HeatmapMonth[] = [];
  const monthsSet = new Set<string>();

  let currentDate = new Date(startDate);
  currentDate.setDate(1); // Start from first day of start month

  while (currentDate <= endDate) {
    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    if (!monthsSet.has(monthKey)) {
      monthsSet.add(monthKey);
      months.push({
        name: monthNames[currentDate.getMonth()],
        year: currentDate.getFullYear(),
        index: currentDate.getMonth(),
      });
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
};

/**
 * Calculate productivity statistics from heatmap data
 */
export const calculateProductivityStats = (days: HeatmapDay[]): ProductivityStats => {
  let totalSessions = 0;
  let totalTime = 0;
  let activeDays = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Reverse to calculate streak from most recent
  const reversedDays = [...days].reverse();

  reversedDays.forEach((day, index) => {
    totalSessions += day.value;
    totalTime += day.value * 25; // Assume 25 min per session (adjust as needed)

    if (day.value > 0) {
      activeDays++;
      tempStreak++;
      if (index === 0) {
        currentStreak = tempStreak;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      if (index === 0) {
        currentStreak = 0;
      }
      tempStreak = 0;
    }
  });

  const avgSessionsPerDay = days.length > 0 ? totalSessions / days.length : 0;
  const avgTimePerDay = days.length > 0 ? totalTime / days.length : 0;

  return {
    totalSessions,
    totalTime,
    avgSessionsPerDay,
    avgTimePerDay,
    activeDays,
    currentStreak,
    longestStreak,
    period: 'all-time',
  };
};

/**
 * Convert daily data to weekly chart data
 */
export const getDailyChartData = (
  days: HeatmapDay[],
  lastNDays: number = 7
): ChartDataPoint[] => {
  const recentDays = days.slice(-lastNDays);

  return recentDays.map((day) => ({
    label: day.date.getDate().toString(),
    value: day.value,
    date: day.date,
    metadata: day.metadata,
  }));
};

/**
 * Convert daily data to weekly aggregated data
 */
export const getWeeklyChartData = (days: HeatmapDay[]): ChartDataPoint[] => {
  const weeks: Map<number, { value: number; startDate: Date }> = new Map();

  days.forEach((day) => {
    const weekNumber = getWeekNumber(day.date);
    const existing = weeks.get(weekNumber) || { value: 0, startDate: day.date };
    weeks.set(weekNumber, {
      value: existing.value + day.value,
      startDate: existing.startDate < day.date ? existing.startDate : day.date,
    });
  });

  return Array.from(weeks.entries())
    .map(([weekNum, data]) => ({
      label: `W${weekNum}`,
      value: data.value,
      date: data.startDate,
    }))
    .slice(-12); // Last 12 weeks
};

/**
 * Get week number of year
 */
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

/**
 * Format duration in minutes to readable string
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${Math.round(minutes)}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

/**
 * Calculate intensity level from value
 */
export const calculateIntensity = (value: number, threshold: number = 8): number => {
  return Math.min(value / threshold, 1);
};

/**
 * Group data by custom period
 */
export const groupByPeriod = (
  days: HeatmapDay[],
  period: 'daily' | 'weekly' | 'monthly'
): ChartDataPoint[] => {
  switch (period) {
    case 'daily':
      return getDailyChartData(days);
    case 'weekly':
      return getWeeklyChartData(days);
    case 'monthly':
      return getMonthlyChartData(days);
    default:
      return getDailyChartData(days);
  }
};

/**
 * Convert daily data to monthly aggregated data
 */
const getMonthlyChartData = (days: HeatmapDay[]): ChartDataPoint[] => {
  const months: Map<string, { value: number; date: Date }> = new Map();

  days.forEach((day) => {
    const monthKey = `${day.date.getFullYear()}-${day.date.getMonth()}`;
    const existing = months.get(monthKey) || { value: 0, date: day.date };
    months.set(monthKey, {
      value: existing.value + day.value,
      date: existing.date,
    });
  });

  return Array.from(months.entries()).map(([key, data]) => {
    const date = data.date;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      label: monthNames[date.getMonth()],
      value: data.value,
      date: data.date,
    };
  });
};
