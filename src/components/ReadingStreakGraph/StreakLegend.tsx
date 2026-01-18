/**
 * @component StreakLegend
 * @description Legend component for ReadingStreakGraph
 * Shows the color scale with sample values
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface StreakLegendProps {
  getColor: (value: number) => string;
  labelColor: string;
}

const LEGEND_VALUES = [0, 3, 10, 20, 30];

const StreakLegend: React.FC<StreakLegendProps> = ({ getColor, labelColor }) => {
  return (
    <View style={styles.legend}>
      <Text style={[styles.legendText, { color: labelColor }]}>Less</Text>
      {LEGEND_VALUES.map((val, index) => (
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
      <Text style={[styles.legendText, { color: labelColor }]}>More</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default StreakLegend;
