/**
 * @component ReadingStreakGraph
 * @description Visualizes reading streak data in a grid format with colored squares representing daily reading progress
 * Similar to GitHub contributions chart but optimized for reading tracking
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ReadingStreakGraphProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';

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

  // Get color based on reading pages
  const getColor = (value: number): string => {
    if (darkMode) {
      if (value === 0) return 'rgba(60, 60, 60, 0.8)';
      if (value < 5) return 'rgba(139, 92, 246, 0.3)';
      if (value < 15) return 'rgba(139, 92, 246, 0.5)';
      if (value < 25) return 'rgba(139, 92, 246, 0.7)';
      return 'rgba(139, 92, 246, 1)';
    } else {
      if (value === 0) return '#EBEDF0';
      if (value < 5) return '#E9D5FF';
      if (value < 15) return '#C4B5FD';
      if (value < 25) return '#A78BFA';
      return '#8B5CF6';
    }
  };

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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={[styles.streakContainer, { gap }]}>
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <View key={rowIndex} style={[styles.streakRow, { gap }]}>
                {Array.from({ length: numCols }).map((_, colIndex) => {
                  const index = rowIndex * numCols + colIndex;
                  const pagesRead = squares[index];
                  return (
                    <TouchableOpacity
                      key={colIndex}
                      disabled={!onSquarePress}
                      onPress={() => onSquarePress?.(pagesRead, index)}
                      style={[
                        styles.streakSquare,
                        {
                          width: calculatedSquareSize,
                          height: calculatedSquareSize,
                          backgroundColor: getColor(pagesRead),
                        },
                      ]}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={[styles.legendText, { color: theme.labelColor }]}>Less</Text>
          {[0, 3, 10, 20, 30].map((val, index) => (
            <View
              key={index}
              style={[
                styles.legendSquare,
                {
                  backgroundColor: getColor(val),
                  width: 12,
                  height: 12,
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
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
  },
  streakContainer: {
    alignItems: 'center',
  },
  streakRow: {
    flexDirection: 'row',
  },
  streakSquare: {
    borderRadius: 3,
  },
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
    borderRadius: 3,
  },
});

export default ReadingStreakGraph;
