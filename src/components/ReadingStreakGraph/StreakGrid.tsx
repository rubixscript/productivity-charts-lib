/**
 * @component StreakGrid
 * @description Grid component for ReadingStreakGraph
 * Renders the streak squares in a scrollable grid
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export interface StreakGridProps {
  squares: number[];
  numRows: number;
  numCols: number;
  squareSize: number;
  gap: number;
  getColor: (value: number) => string;
  onSquarePress?: (value: number, index: number) => void;
}

const StreakGrid: React.FC<StreakGridProps> = ({
  squares,
  numRows,
  numCols,
  squareSize,
  gap,
  getColor,
  onSquarePress,
}) => {
  return (
    <View style={styles.scrollWrapper}>
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
                        width: squareSize,
                        height: squareSize,
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
    </View>
  );
};

const styles = StyleSheet.create({
  scrollWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakRow: {
    flexDirection: 'row',
  },
  streakSquare: {
    borderRadius: 3,
  },
});

export default StreakGrid;
