/**
 * @component HeatmapHeader
 * @description Header component for HeatmapChart
 * Contains title and period selector dropdown
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ChartTheme } from '../../types';

export interface HeatmapHeaderProps {
  title: string;
  period: 'weekly' | 'monthly';
  showDropdown: boolean;
  theme: ChartTheme;
  onToggleDropdown: () => void;
  onPeriodChange: (period: 'weekly' | 'monthly') => void;
}

const HeatmapHeader: React.FC<HeatmapHeaderProps> = ({
  title,
  period,
  showDropdown,
  theme,
  onToggleDropdown,
  onPeriodChange,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
        <TouchableOpacity
          style={[styles.dropdownButton, { backgroundColor: `${theme.primaryColor}20` }]}
          onPress={onToggleDropdown}
        >
          <Text style={[styles.dropdownText, { color: theme.primaryColor }]}>
            {period === 'weekly' ? 'Weekly' : 'Monthly'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={14} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View
          style={[
            styles.dropdownMenu,
            {
              backgroundColor: theme.cardBackgroundColor,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.dropdownItem,
              period === 'weekly' && { backgroundColor: `${theme.primaryColor}20` },
            ]}
            onPress={() => onPeriodChange('weekly')}
          >
            <Text
              style={[
                styles.dropdownItemText,
                { color: theme.secondaryTextColor },
                period === 'weekly' && { color: theme.primaryColor },
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dropdownItem,
              period === 'monthly' && { backgroundColor: `${theme.primaryColor}20` },
            ]}
            onPress={() => onPeriodChange('monthly')}
          >
            <Text
              style={[
                styles.dropdownItemText,
                { color: theme.secondaryTextColor },
                period === 'monthly' && { color: theme.primaryColor },
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  dropdownText: {
    fontSize: 11,
    fontWeight: '500',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 44,
    right: 16,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
    borderWidth: 1,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default HeatmapHeader;
