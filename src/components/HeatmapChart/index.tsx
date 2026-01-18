/**
 * @component HeatmapChart
 * @description Beautiful heatmap visualization for productivity tracking
 * Similar to GitHub contributions chart with glassmorphic design
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeatmapChartProps } from '../../types';
import { useHeatmapTheme } from './useHeatmapTheme';
import { useHeatmapLayout } from './useHeatmapLayout';
import HeatmapHeader from './HeatmapHeader';
import HeatmapGrid from './HeatmapGrid';
import HeatmapLegend from './HeatmapLegend';
import TimeLabels from './TimeLabels';

const HeatmapChart: React.FC<HeatmapChartProps> = ({
  days,
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

  const theme = useHeatmapTheme({ customTheme, darkMode });

  const handlePeriodChange = (newPeriod: 'weekly' | 'monthly') => {
    setPeriod(newPeriod);
    setShowDropdown(false);
    onPeriodChange?.(newPeriod);
  };

  // Filter days based on period
  const filteredDays = useMemo(() => {
    return period === 'weekly' ? days.slice(-7) : days;
  }, [period, days]);

  const gridLayout = useHeatmapLayout({ filteredDays, period, weeksToShow });

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
        <HeatmapHeader
          title={title}
          period={period}
          showDropdown={showDropdown}
          theme={theme}
          onToggleDropdown={() => setShowDropdown(!showDropdown)}
          onPeriodChange={handlePeriodChange}
        />

        {showTimeLabels && <TimeLabels theme={theme} timeLabels={timeLabels} />}

        <Text style={[styles.sectionLabel, { color: theme.secondaryTextColor }]}>
          Heatmap Chart
        </Text>

        <HeatmapGrid
          theme={theme}
          gridLayout={gridLayout}
          cellSize={cellSize}
          cellGap={cellGap}
          cellBorderRadius={cellBorderRadius}
          showDayLabels={showDayLabels}
          onDayPress={onDayPress}
        />

        <HeatmapLegend theme={theme} />
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
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
});

export default HeatmapChart;
