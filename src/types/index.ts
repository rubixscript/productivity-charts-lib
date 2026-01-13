/**
 * Core type definitions for productivity charts
 */

/**
 * Theme configuration for charts
 */
export interface ChartTheme {
  // Primary colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;

  // Background colors
  backgroundColor: string;
  cardBackgroundColor: string;

  // Text colors
  textColor: string;
  secondaryTextColor: string;
  labelColor: string;

  // Border and shadow
  borderColor: string;
  shadowColor: string;

  // Intensity colors for heatmap (0-4 levels)
  intensityColors: [string, string, string, string, string];

  // Dark mode flag
  darkMode: boolean;

  // Glassmorphic effect
  glassBlurIntensity?: number;
  glassOpacity?: number;
}

/**
 * Day data for heatmap visualization
 */
export interface HeatmapDay {
  date: Date;
  dateStr: string;
  intensity: number; // 0-1 scale
  value: number; // Actual value (sessions, minutes, etc.)
  metadata?: Record<string, any>;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  isToday: boolean;
  isSelected?: boolean;
}

/**
 * Month information for heatmap labels
 */
export interface HeatmapMonth {
  name: string;
  year: number;
  index: number; // 0-11
}

/**
 * Props for HeatmapChart component
 */
export interface HeatmapChartProps {
  // Required data
  days: HeatmapDay[];

  // Optional configuration
  months?: HeatmapMonth[];
  dayNames?: string[];
  title?: string;
  showTimeLabels?: boolean;
  timeLabels?: string[];
  showDayLabels?: boolean;
  cellSize?: number;
  cellGap?: number;
  cellBorderRadius?: number;
  weeksToShow?: number;

  // Theming
  theme?: Partial<ChartTheme>;
  darkMode?: boolean;

  // Callbacks
  onDayPress?: (day: HeatmapDay) => void;
  onPeriodChange?: (period: 'weekly' | 'monthly') => void;

  // Style
  style?: any;
  containerStyle?: any;
}

/**
 * Data point for bar/line charts
 */
export interface ChartDataPoint {
  label: string; // X-axis label (day, date, month, etc.)
  value: number; // Y-axis value
  color?: string; // Optional custom color for this point
  metadata?: Record<string, any>;
  date?: Date;
}

/**
 * Props for ActivityBarChart component
 */
export interface ActivityBarChartProps {
  // Required data
  data: ChartDataPoint[];

  // Chart configuration
  title?: string;
  subtitle?: string;
  valueLabel?: string; // e.g., "Sessions", "Minutes", "Hours"
  showValues?: boolean;
  showGrid?: boolean;
  animated?: boolean;
  barWidth?: number;
  barBorderRadius?: number;
  maxValue?: number;

  // Theming
  theme?: Partial<ChartTheme>;
  darkMode?: boolean;

  // Callbacks
  onBarPress?: (data: ChartDataPoint, index: number) => void;

  // Style
  style?: any;
  containerStyle?: any;
  chartHeight?: number;
}

/**
 * Props for ProgressCard component
 */
export interface ProgressCardProps {
  // Content
  icon: string; // MaterialCommunityIcons name
  value: number | string;
  label: string;
  subtitle?: string;

  // Progress (optional)
  progress?: number; // 0-1 scale
  progressColor?: string;

  // Theming
  theme?: Partial<ChartTheme>;
  darkMode?: boolean;
  iconColor?: string;
  iconBackgroundColor?: string;

  // Layout
  size?: 'small' | 'medium' | 'large';
  orientation?: 'vertical' | 'horizontal';

  // Callbacks
  onPress?: () => void;

  // Style
  style?: any;
}

/**
 * Props for MonthlyChart component (aggregated monthly data)
 */
export interface MonthlyChartProps {
  // Required data
  months: HeatmapMonth[];
  days: HeatmapDay[];

  // Chart configuration
  title?: string;
  valueLabel?: string;
  showValues?: boolean;
  chartHeight?: number;

  // Theming
  theme?: Partial<ChartTheme>;
  darkMode?: boolean;

  // Callbacks
  onMonthPress?: (month: HeatmapMonth, totalValue: number) => void;

  // Style
  style?: any;
  containerStyle?: any;
}

/**
 * Period type for data filtering
 */
export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all-time';

/**
 * Statistics summary
 */
export interface ProductivityStats {
  totalSessions: number;
  totalTime: number; // in minutes
  avgSessionsPerDay: number;
  avgTimePerDay: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  completionRate?: number; // 0-1 scale
  period: PeriodType;
}

/**
 * Props for StatsGrid component (multiple ProgressCards in a grid)
 */
export interface StatsGridProps {
  stats: ProductivityStats;
  theme?: Partial<ChartTheme>;
  darkMode?: boolean;
  columns?: number;
  style?: any;
}

/**
 * Animation configuration
 */
export interface ChartAnimationConfig {
  enabled: boolean;
  duration: number; // milliseconds
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

/**
 * Default theme colors
 */
export const DEFAULT_LIGHT_THEME: ChartTheme = {
  primaryColor: '#8B5CF6',
  secondaryColor: '#A78BFA',
  accentColor: '#7C3AED',
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#FFFFFF',
  textColor: '#1A1A1A',
  secondaryTextColor: '#666666',
  labelColor: '#888888',
  borderColor: 'rgba(139, 92, 246, 0.15)',
  shadowColor: '#8B5CF6',
  intensityColors: [
    '#E9D5FF', // Level 0 - Very light purple
    '#C4B5FD', // Level 1 - Light purple
    '#A78BFA', // Level 2 - Medium light purple
    '#8B5CF6', // Level 3 - Main purple
    '#7C3AED', // Level 4 - Deep purple
  ],
  darkMode: false,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

export const DEFAULT_DARK_THEME: ChartTheme = {
  primaryColor: '#8B5CF6',
  secondaryColor: '#A78BFA',
  accentColor: '#7C3AED',
  backgroundColor: '#0A0A0A',
  cardBackgroundColor: '#1A1A1A',
  textColor: '#FFFFFF',
  secondaryTextColor: '#AAAAAA',
  labelColor: '#888888',
  borderColor: 'rgba(139, 92, 246, 0.3)',
  shadowColor: '#8B5CF6',
  intensityColors: [
    'rgba(139, 92, 246, 0.12)', // Level 0
    '#C4B5FD', // Level 1
    '#A78BFA', // Level 2
    '#8B5CF6', // Level 3
    '#7C3AED', // Level 4
  ],
  darkMode: true,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};
