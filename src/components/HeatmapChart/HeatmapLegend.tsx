/**
 * @component HeatmapLegend
 * @description Legend component for HeatmapChart
 * Shows intensity color scale from "Less" to "More"
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChartTheme } from '../../types';

export interface HeatmapLegendProps {
  theme: ChartTheme;
}

const HeatmapLegend: React.FC<HeatmapLegendProps> = ({ theme }) => {
  return (
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
  },
});

export default HeatmapLegend;
