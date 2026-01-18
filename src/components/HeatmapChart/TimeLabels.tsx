/**
 * @component TimeLabels
 * @description Time labels component for HeatmapChart
 * Shows productive hours labels when showTimeLabels is enabled
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChartTheme } from '../../types';

export interface TimeLabelsProps {
  theme: ChartTheme;
  timeLabels: string[];
}

const TimeLabels: React.FC<TimeLabelsProps> = ({ theme, timeLabels }) => {
  return (
    <>
      <Text style={[styles.sectionLabel, { color: theme.secondaryTextColor }]}>
        Productive Hours
      </Text>

      <View style={styles.timeLabelsContainer}>
        <View style={styles.dayLabelSpacer} />
        {timeLabels.map((time, index) => (
          <Text key={index} style={[styles.timeLabel, { color: theme.labelColor }]}>
            {time}
          </Text>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default TimeLabels;
