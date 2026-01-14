/**
 * @component ChartSummary
 * @description Shared summary component for chart totals
 * Displays a summary row with label and total value
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ChartSummaryProps {
  label: string;
  value: string | number;
  labelColor: string;
  valueColor: string;
  borderColor?: string;
}

const ChartSummary: React.FC<ChartSummaryProps> = ({
  label,
  value,
  labelColor,
  valueColor,
  borderColor,
}) => {
  return (
    <View
      style={[
        styles.summaryContainer,
        borderColor && { borderTopColor: borderColor },
      ]}
    >
      <Text style={[styles.summaryLabel, { color: labelColor }]}>{label}:</Text>
      <Text style={[styles.summaryValue, { color: valueColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.15)',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});

export default ChartSummary;
