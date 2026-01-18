/**
 * @component HeatmapGrid
 * @description Grid component for HeatmapChart
 * Renders the heatmap cells with day labels
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChartTheme, HeatmapDay } from '../../types';
import { getIntensityColor } from '../../utils/common';

export interface HeatmapGridProps {
  theme: ChartTheme;
  gridLayout: { weeks: (HeatmapDay | null)[][]; totalWeeks: number };
  cellSize: number;
  cellGap: number;
  cellBorderRadius: number;
  showDayLabels: boolean;
  onDayPress?: (day: HeatmapDay) => void;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const HeatmapGrid: React.FC<HeatmapGridProps> = ({
  theme,
  gridLayout,
  cellSize,
  cellGap,
  cellBorderRadius,
  showDayLabels,
  onDayPress,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.heatmapContainer}>
        {showDayLabels && (
          <View style={styles.dayLabelsColumn}>
            {DAY_LABELS.map((day, index) => (
              <Text
                key={index}
                style={[styles.dayLabel, { color: theme.secondaryTextColor, height: cellSize }]}
              >
                {day}
              </Text>
            ))}
          </View>
        )}

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
                            ? getIntensityColor(day.intensity, theme.intensityColors)
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
  );
};

const styles = StyleSheet.create({
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
});

export default HeatmapGrid;
