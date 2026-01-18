/**
 * @rubixscript/react-native-productivity-charts
 * Beautiful productivity charts with glassmorphic design for React Native
 */

// Components
export { default as HeatmapChart } from './components/HeatmapChart';
export { default as ActivityBarChart } from './components/ActivityBarChart';
export { default as ProgressCard } from './components/ProgressCard';
export { default as MonthlyChart } from './components/MonthlyChart';
export { default as ReadingStreakGraph } from './components/ReadingStreakGraph';
export { default as StatsCard } from './components/StatsCard';
export { default as HourlyActivityChart } from './components/HourlyActivityChart';
export { default as FocusTimeSummary } from './components/FocusTimeSummary';

// Shared Components
export { default as CardBase } from './components/shared/CardBase';
export { default as ChartSummary } from './components/shared/ChartSummary';

// Types
export * from './types';

// Themes
export * from './constants/themes';

// Utils
export * from './utils/chartHelpers';
export * from './utils/common';

// Hooks
export { useChartTheme } from './hooks/useChartTheme';
export { useProductivityData } from './hooks/useProductivityData';

// HeatmapChart Sub-components (for advanced usage)
export { useHeatmapTheme } from './components/HeatmapChart/useHeatmapTheme';
export { useHeatmapLayout } from './components/HeatmapChart/useHeatmapLayout';
export { default as HeatmapHeader } from './components/HeatmapChart/HeatmapHeader';
export { default as HeatmapGrid } from './components/HeatmapChart/HeatmapGrid';
export { default as HeatmapLegend } from './components/HeatmapChart/HeatmapLegend';
export { default as TimeLabels } from './components/HeatmapChart/TimeLabels';

// ProgressCard Sub-components (for advanced usage)
export { default as IconSection } from './components/ProgressCard/IconSection';
export { default as ProgressBar } from './components/ProgressCard/ProgressBar';
export { default as ContentSection } from './components/ProgressCard/ContentSection';

// ReadingStreakGraph Sub-components (for advanced usage)
export { default as StreakGrid } from './components/ReadingStreakGraph/StreakGrid';
export { default as StreakLegend } from './components/ReadingStreakGraph/StreakLegend';
export { useStreakColors } from './components/ReadingStreakGraph/useStreakColors';
