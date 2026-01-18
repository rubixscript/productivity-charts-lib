/**
 * @component StatsCard
 * @description Simple stats card with icon, value and label
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatsCardProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';
import { useMemo } from 'react';

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  value,
  label,
  theme: customTheme,
  darkMode = false,
  style,
  containerStyle,
}) => {
  // Merge custom theme with default
  const theme: ChartTheme = useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    return { ...baseTheme, ...customTheme };
  }, [darkMode, customTheme]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.statCard,
          {
            backgroundColor: theme.cardBackgroundColor,
            borderColor: theme.borderColor,
            shadowColor: theme.shadowColor,
          },
          style,
        ]}
      >
        <View
          style={[
            styles.statIconContainer,
            {
              backgroundColor: `${theme.primaryColor}1F`,
              borderColor: `${theme.primaryColor}40`,
            },
          ]}
        >
          <MaterialCommunityIcons name={icon as any} size={24} color={theme.primaryColor} />
        </View>
        <Text style={[styles.statNumber, { color: theme.textColor }]}>{value}</Text>
        <Text style={[styles.statLabel, { color: theme.secondaryTextColor }]}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default StatsCard;
