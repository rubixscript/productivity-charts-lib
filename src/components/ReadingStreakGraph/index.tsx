/**
 * @component ReadingStreakGraph
 * @description Visualizes reading streak data in a grid format with colored squares representing daily reading progress
 * Similar to GitHub contributions chart but optimized for reading tracking
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReadingStreakGraphProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';
import StreakGrid from './StreakGrid';
import StreakLegend from './StreakLegend';
import { useStreakColors } from './useStreakColors';

const ReadingStreakGraph: React.FC<ReadingStreakGraphProps> = ({
  history,
  numRows = 4,
  numCols = 20,
  squareSize,
  gap = 3,
  theme: customTheme,
  darkMode = false,
  title = 'Reading Streak',
  onSquarePress,
  style,
  containerStyle,
}) => {
  // Merge custom theme with default
  const theme: ChartTheme = useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    return { ...baseTheme, ...customTheme };
  }, [darkMode, customTheme]);

  // Calculate total days and square size
  const totalDays = numRows * numCols;
  const calculatedSquareSize = squareSize || 12;

  // Get color function based on pages read
  const getColor = useStreakColors({ primaryColor: theme.primaryColor, darkMode });

  // Prepare display history
  const displayHistory = history.slice(-totalDays);
  const squares = Array.from({ length: totalDays }, (_, i) => displayHistory[i] || 0);

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
        {title && (
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
          </View>
        )}

        {/* Streak Grid */}
        <StreakGrid
          squares={squares}
          numRows={numRows}
          numCols={numCols}
          squareSize={calculatedSquareSize}
          gap={gap}
          getColor={getColor}
          onSquarePress={onSquarePress}
        />

        {/* Legend */}
        <StreakLegend getColor={getColor} labelColor={theme.labelColor} />
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
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ReadingStreakGraph;
