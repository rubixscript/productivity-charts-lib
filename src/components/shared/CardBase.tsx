/**
 * @component CardBase
 * @description Shared card container component with glassmorphic styling
 * Used across all chart components for consistent appearance
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ChartTheme } from '../../types';

export interface CardBaseProps {
  children: React.ReactNode;
  theme: ChartTheme;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}

const CardBase: React.FC<CardBaseProps> = ({ children, theme, style, containerStyle }) => {
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
        {children}
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
});

export default CardBase;
