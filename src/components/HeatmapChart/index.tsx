/**
 * @component HeatmapChart
 * @description Beautiful heatmap visualization for productivity tracking
 * Similar to GitHub contributions chart with glassmorphic design
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { HeatmapChartProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';

const HeatmapChart: React.FC<HeatmapChartProps> = ({
  days,
  months,
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  title = 'Activity Heatmap',
  showTimeLabels = true,
  timeLabels = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
  showDayLabels = true,
  cellSize = 18,
  cellGap = 3,
  cellBorderRadius = 6,
  weeksToShow = 12,
  theme: customTheme,
  darkMode = false,
  onDayPress,
  onPeriodChange,
  style,
  containerStyle,
}) => {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [showDropdown, setShowDropdown] = useState(false);

  // Merge custom theme with default
  const theme: ChartTheme = useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    const mergedTheme = { ...baseTheme, ...customTheme };

    // If custom primaryColor is provided, generate intensityColors dynamically
    if (customTheme?.primaryColor && customTheme.primaryColor !== baseTheme.primaryColor) {
      const primaryColor = customTheme.primaryColor;
      const hexToRgba = (hex: string, alpha: number): string => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };

      mergedTheme.intensityColors = darkMode
        ? [
            hexToRgba(primaryColor, 0.12),
            hexToRgba(primaryColor, 0.3),
            hexToRgba(primaryColor, 0.5),
            hexToRgba(primaryColor, 0.7),
            hexToRgba(primaryColor, 0.9),
          ] as [string, string, string, string, string]
        : [
            hexToRgba(primaryColor, 0.2),
            hexToRgba(primaryColor, 0.4),
            hexToRgba(primaryColor, 0.6),
            hexToRgba(primaryColor, 0.8),
            primaryColor,
          ] as [string, string, string, string, string];
    }

    return mergedTheme;
  }, [darkMode, customTheme]);

  const getIntensityColor = (intensity: number): string => {
    if (intensity === 0) return theme.intensityColors[0];
    if (intensity <= 0.25) return theme.intensityColors[1];
    if (intensity <= 0.5) return theme.intensityColors[2];
    if (intensity <= 0.75) return theme.intensityColors[3];
    return theme.intensityColors[4];
  };

  const handlePeriodChange = (newPeriod: 'weekly' | 'monthly') => {
    setPeriod(newPeriod);
    setShowDropdown(false);
    onPeriodChange?.(newPeriod);
  };

  // Filter days based on period
  const filteredDays = useMemo(() => {
    return period === 'weekly' ? days.slice(-7) : days;
  }, [period, days]);

  // Short day names for display
  const shortDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Calculate grid layout
  const gridLayout = useMemo(() => {
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

    const flatGrid: (typeof sortedDays[0] | null)[] = new Array(totalCells).fill(null);

    sortedDays.forEach((day, index) => {
      const position = startPadding + index;
      if (position >= 0 && position < totalCells) {
        flatGrid[position] = day;
      }
    });

    const weeks: (typeof sortedDays[0] | null)[][] = [];
    for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex++) {
      const week: (typeof sortedDays[0] | null)[] = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const position = weekIndex * 7 + dayIndex;
        week.push(flatGrid[position]);
      }
      weeks.push(week);
    }

    return { weeks, totalWeeks };
  }, [filteredDays, period, weeksToShow]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.cardBackgroundColor,
            borderColor: theme.borderColor,
            shadowColor: theme.shadowColor,
          },
          style,
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
          <TouchableOpacity
            style={[styles.dropdownButton, { backgroundColor: `${theme.primaryColor}20` }]}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={[styles.dropdownText, { color: theme.primaryColor }]}>
              {period === 'weekly' ? 'Weekly' : 'Monthly'}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={14} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {showDropdown && (
          <View
            style={[
              styles.dropdownMenu,
              {
                backgroundColor: theme.cardBackgroundColor,
                borderColor: theme.borderColor,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                period === 'weekly' && { backgroundColor: `${theme.primaryColor}20` },
              ]}
              onPress={() => handlePeriodChange('weekly')}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  { color: theme.secondaryTextColor },
                  period === 'weekly' && { color: theme.primaryColor },
                ]}
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                period === 'monthly' && { backgroundColor: `${theme.primaryColor}20` },
              ]}
              onPress={() => handlePeriodChange('monthly')}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  { color: theme.secondaryTextColor },
                  period === 'monthly' && { color: theme.primaryColor },
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Productive Hours Label */}
        {showTimeLabels && (
          <>
            <Text style={[styles.sectionLabel, { color: theme.secondaryTextColor }]}>
              Productive Hours
            </Text>

            {/* Time Labels */}
            <View style={styles.timeLabelsContainer}>
              <View style={styles.dayLabelSpacer} />
              {timeLabels.map((time, index) => (
                <Text key={index} style={[styles.timeLabel, { color: theme.labelColor }]}>
                  {time}
                </Text>
              ))}
            </View>
          </>
        )}

        {/* Heatmap Chart Label */}
        <Text style={[styles.sectionLabel, { color: theme.secondaryTextColor }]}>
          Heatmap Chart
        </Text>

        {/* Heatmap Grid */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.heatmapContainer}>
            {/* Day Labels Column */}
            {showDayLabels && (
              <View style={styles.dayLabelsColumn}>
                {shortDayNames.map((day, index) => (
                  <Text
                    key={index}
                    style={[styles.dayLabel, { color: theme.secondaryTextColor, height: cellSize }]}
                  >
                    {day}
                  </Text>
                ))}
              </View>
            )}

            {/* Grid */}
            <View style={styles.heatmapGrid}>
              {Array.from({ length: 7 }, (_, rowIndex) => {
                const actualDayIndex = (rowIndex + 1) % 7;

                return (
                  <View key={rowIndex} style={[styles.heatmapRow, { marginBottom: cellGap }]}>
                    {gridLayout.weeks.map((week, weekIndex) => {
                      const day = week[actualDayIndex];
                      return (
                        <TouchableOpacity
                          key={weekIndex}
                          disabled={!day || !onDayPress}
                          onPress={() => day && onDayPress?.(day)}
                          style={[
                            styles.daySquare,
                            {
                              width: cellSize,
                              height: cellSize,
                              borderRadius: cellBorderRadius,
                              marginRight: cellGap,
                              backgroundColor: day
                                ? getIntensityColor(day.intensity)
                                : theme.intensityColors[0],
                              borderWidth: day?.isToday ? 2 : 0,
                              borderColor: day?.isToday ? theme.primaryColor : 'transparent',
                            },
                          ]}
                        />
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={[styles.legendText, { color: theme.labelColor }]}>Less</Text>
          {theme.intensityColors.map((color, index) => (
            <View
              key={index}
              style={[
                styles.legendSquare,
                {
                  backgroundColor: color,
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                },
              ]}
            />
          ))}
          <Text style={[styles.legendText, { color: theme.labelColor }]}>More</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  dropdownText: {
    fontSize: 11,
    fontWeight: '500',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 44,
    right: 16,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
    borderWidth: 1,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  timeLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingRight: 4,
  },
  dayLabelSpacer: {
    width: 32,
  },
  timeLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  heatmapContainer: {
    flexDirection: 'row',
  },
  dayLabelsColumn: {
    marginRight: 10,
    justifyContent: 'space-between',
    paddingVertical: 1,
  },
  dayLabel: {
    fontSize: 9,
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  heatmapGrid: {
    flex: 1,
  },
  heatmapRow: {
    flexDirection: 'row',
  },
  daySquare: {},
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 4,
  },
  legendText: {
    fontSize: 9,
    fontWeight: '600',
  },
  legendSquare: {
    marginHorizontal: 2,
  },
});

export default HeatmapChart;
