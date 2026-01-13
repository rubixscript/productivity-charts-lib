/**
 * Pre-built theme configurations for productivity charts
 * Users can use these or create custom themes
 */

import { ChartTheme } from '../types';

/**
 * Default Purple Theme (Light Mode)
 */
export const PURPLE_THEME_LIGHT: ChartTheme = {
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
  intensityColors: ['#E9D5FF', '#C4B5FD', '#A78BFA', '#8B5CF6', '#7C3AED'],
  darkMode: false,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Default Purple Theme (Dark Mode)
 */
export const PURPLE_THEME_DARK: ChartTheme = {
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
    'rgba(139, 92, 246, 0.12)',
    '#C4B5FD',
    '#A78BFA',
    '#8B5CF6',
    '#7C3AED',
  ],
  darkMode: true,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Blue Theme (Light Mode)
 */
export const BLUE_THEME_LIGHT: ChartTheme = {
  primaryColor: '#3B82F6',
  secondaryColor: '#60A5FA',
  accentColor: '#2563EB',
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#FFFFFF',
  textColor: '#1A1A1A',
  secondaryTextColor: '#666666',
  labelColor: '#888888',
  borderColor: 'rgba(59, 130, 246, 0.15)',
  shadowColor: '#3B82F6',
  intensityColors: ['#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6'],
  darkMode: false,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Blue Theme (Dark Mode)
 */
export const BLUE_THEME_DARK: ChartTheme = {
  primaryColor: '#3B82F6',
  secondaryColor: '#60A5FA',
  accentColor: '#2563EB',
  backgroundColor: '#0A0A0A',
  cardBackgroundColor: '#1A1A1A',
  textColor: '#FFFFFF',
  secondaryTextColor: '#AAAAAA',
  labelColor: '#888888',
  borderColor: 'rgba(59, 130, 246, 0.3)',
  shadowColor: '#3B82F6',
  intensityColors: [
    'rgba(59, 130, 246, 0.12)',
    '#BFDBFE',
    '#93C5FD',
    '#60A5FA',
    '#3B82F6',
  ],
  darkMode: true,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Green Theme (Light Mode)
 */
export const GREEN_THEME_LIGHT: ChartTheme = {
  primaryColor: '#10B981',
  secondaryColor: '#34D399',
  accentColor: '#059669',
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#FFFFFF',
  textColor: '#1A1A1A',
  secondaryTextColor: '#666666',
  labelColor: '#888888',
  borderColor: 'rgba(16, 185, 129, 0.15)',
  shadowColor: '#10B981',
  intensityColors: ['#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#10B981'],
  darkMode: false,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Green Theme (Dark Mode)
 */
export const GREEN_THEME_DARK: ChartTheme = {
  primaryColor: '#10B981',
  secondaryColor: '#34D399',
  accentColor: '#059669',
  backgroundColor: '#0A0A0A',
  cardBackgroundColor: '#1A1A1A',
  textColor: '#FFFFFF',
  secondaryTextColor: '#AAAAAA',
  labelColor: '#888888',
  borderColor: 'rgba(16, 185, 129, 0.3)',
  shadowColor: '#10B981',
  intensityColors: [
    'rgba(16, 185, 129, 0.12)',
    '#A7F3D0',
    '#6EE7B7',
    '#34D399',
    '#10B981',
  ],
  darkMode: true,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Red/Coral Theme (Light Mode)
 */
export const CORAL_THEME_LIGHT: ChartTheme = {
  primaryColor: '#EF4444',
  secondaryColor: '#F87171',
  accentColor: '#DC2626',
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#FFFFFF',
  textColor: '#1A1A1A',
  secondaryTextColor: '#666666',
  labelColor: '#888888',
  borderColor: 'rgba(239, 68, 68, 0.15)',
  shadowColor: '#EF4444',
  intensityColors: ['#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444'],
  darkMode: false,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Red/Coral Theme (Dark Mode)
 */
export const CORAL_THEME_DARK: ChartTheme = {
  primaryColor: '#EF4444',
  secondaryColor: '#F87171',
  accentColor: '#DC2626',
  backgroundColor: '#0A0A0A',
  cardBackgroundColor: '#1A1A1A',
  textColor: '#FFFFFF',
  secondaryTextColor: '#AAAAAA',
  labelColor: '#888888',
  borderColor: 'rgba(239, 68, 68, 0.3)',
  shadowColor: '#EF4444',
  intensityColors: [
    'rgba(239, 68, 68, 0.12)',
    '#FECACA',
    '#FCA5A5',
    '#F87171',
    '#EF4444',
  ],
  darkMode: true,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Orange Theme (Light Mode)
 */
export const ORANGE_THEME_LIGHT: ChartTheme = {
  primaryColor: '#F59E0B',
  secondaryColor: '#FBBF24',
  accentColor: '#D97706',
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#FFFFFF',
  textColor: '#1A1A1A',
  secondaryTextColor: '#666666',
  labelColor: '#888888',
  borderColor: 'rgba(245, 158, 11, 0.15)',
  shadowColor: '#F59E0B',
  intensityColors: ['#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B'],
  darkMode: false,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Orange Theme (Dark Mode)
 */
export const ORANGE_THEME_DARK: ChartTheme = {
  primaryColor: '#F59E0B',
  secondaryColor: '#FBBF24',
  accentColor: '#D97706',
  backgroundColor: '#0A0A0A',
  cardBackgroundColor: '#1A1A1A',
  textColor: '#FFFFFF',
  secondaryTextColor: '#AAAAAA',
  labelColor: '#888888',
  borderColor: 'rgba(245, 158, 11, 0.3)',
  shadowColor: '#F59E0B',
  intensityColors: [
    'rgba(245, 158, 11, 0.12)',
    '#FDE68A',
    '#FCD34D',
    '#FBBF24',
    '#F59E0B',
  ],
  darkMode: true,
  glassBlurIntensity: 10,
  glassOpacity: 0.9,
};

/**
 * Helper function to create a custom theme
 */
export const createCustomTheme = (
  baseColor: string,
  darkMode: boolean = false
): ChartTheme => {
  // This is a simplified version - you can enhance it to generate shades automatically
  return {
    primaryColor: baseColor,
    secondaryColor: baseColor,
    accentColor: baseColor,
    backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF',
    cardBackgroundColor: darkMode ? '#1A1A1A' : '#FFFFFF',
    textColor: darkMode ? '#FFFFFF' : '#1A1A1A',
    secondaryTextColor: darkMode ? '#AAAAAA' : '#666666',
    labelColor: '#888888',
    borderColor: darkMode
      ? `rgba(139, 92, 246, 0.3)`
      : `rgba(139, 92, 246, 0.15)`,
    shadowColor: baseColor,
    intensityColors: [
      `${baseColor}20`,
      `${baseColor}40`,
      `${baseColor}60`,
      `${baseColor}80`,
      baseColor,
    ],
    darkMode,
    glassBlurIntensity: 10,
    glassOpacity: 0.9,
  };
};

/**
 * Export all themes as a map for easy access
 */
export const THEMES = {
  purple_light: PURPLE_THEME_LIGHT,
  purple_dark: PURPLE_THEME_DARK,
  blue_light: BLUE_THEME_LIGHT,
  blue_dark: BLUE_THEME_DARK,
  green_light: GREEN_THEME_LIGHT,
  green_dark: GREEN_THEME_DARK,
  coral_light: CORAL_THEME_LIGHT,
  coral_dark: CORAL_THEME_DARK,
  orange_light: ORANGE_THEME_LIGHT,
  orange_dark: ORANGE_THEME_DARK,
};

export type ThemeName = keyof typeof THEMES;
