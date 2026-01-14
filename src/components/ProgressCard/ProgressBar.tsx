/**
 * @component ProgressBar
 * @description Progress bar component for ProgressCard
 * Displays progress bar with fill percentage
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

export interface ProgressBarProps {
  progress: number;
  color: string;
  height: number;
  marginTop: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color, height, marginTop }) => {
  const fillPercentage = Math.min(progress * 100, 100);

  return (
    <View style={[styles.progressBarContainer, { marginTop }]}>
      <View
        style={[
          styles.progressBarBackground,
          {
            backgroundColor: `${color}20`,
            height,
          },
        ]}
      >
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${fillPercentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '100%',
  },
  progressBarBackground: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});

export default ProgressBar;
