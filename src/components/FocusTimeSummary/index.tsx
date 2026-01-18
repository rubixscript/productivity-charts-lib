/**
 * @component FocusTimeSummary
 * @description Comprehensive focus time summary with stats and bar chart
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart } from 'react-native-gifted-charts';
import { FocusTimeSummaryProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';

const FocusTimeSummary: React.FC<FocusTimeSummaryProps> = ({
  totalFocusTime,
  avgFocusTime,
  totalSessions,
  weeklyData,
  monthlyData,
  title = 'Focus Time',
  chartHeight = 120,
  showPeriodToggle = true,
  theme: customTheme,
  darkMode = false,
  onPeriodChange,
  style,
  containerStyle,
}) => {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [showDropdown, setShowDropdown] = useState(false);

  // Merge custom theme with default
  const theme: ChartTheme = useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    return { ...baseTheme, ...customTheme };
  }, [darkMode, customTheme]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}.${Math.floor(mins / 6)} hr`;
    }
    return `${mins} min`;
  };

  const handlePeriodChange = (newPeriod: 'weekly' | 'monthly') => {
    setPeriod(newPeriod);
    setShowDropdown(false);
    onPeriodChange?.(newPeriod);
  };

  // Use monthly data if available and selected, otherwise use weekly
  const rawData = period === 'monthly' && monthlyData ? monthlyData : weeklyData;
  const screenWidth = Dimensions.get('window').width;

  const chartData = useMemo(() => {
    const maxSessions = Math.max(...rawData.map((d) => d.sessions), 1);

    return rawData.map((data) => {
      // Calculate gradient opacity based on sessions
      const opacity = data.sessions > 0 ? Math.min(0.4 + (data.sessions / maxSessions) * 0.6, 1) : 0.2;

      return {
        value: data.sessions,
        label: data.day.toString(),
        frontColor: `rgba(139, 92, 246, ${opacity})`,
        gradientColor: `rgba(167, 139, 250, ${opacity * 0.7})`,
        spacing: 2,
        labelTextStyle: {
          color: theme.labelColor,
          fontSize: 10,
          fontWeight: '500' as const,
        },
      };
    });
  }, [rawData, theme]);

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
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
          {showPeriodToggle && (
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowDropdown(!showDropdown)}>
              <Text style={[styles.dropdownText, { color: theme.primaryColor }]}>
                {period === 'weekly' ? 'Weekly' : 'Monthly'}
              </Text>
              <MaterialCommunityIcons name="chevron-down" size={14} color={theme.primaryColor} />
            </TouchableOpacity>
          )}
        </View>

        {/* Dropdown Menu */}
        {showDropdown && showPeriodToggle && (
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
              style={[styles.dropdownItem, period === 'weekly' && { backgroundColor: `${theme.primaryColor}1A` }]}
              onPress={() => handlePeriodChange('weekly')}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  { color: period === 'weekly' ? theme.primaryColor : theme.secondaryTextColor },
                ]}
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dropdownItem, period === 'monthly' && { backgroundColor: `${theme.primaryColor}1A` }]}
              onPress={() => handlePeriodChange('monthly')}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  { color: period === 'monthly' ? theme.primaryColor : theme.secondaryTextColor },
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Summary Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.textColor }]}>{formatTime(totalFocusTime)}</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryTextColor }]}>Total Focus Time</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.textColor }]}>{formatTime(avgFocusTime)}</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryTextColor }]}>Avg Focus Time</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.textColor }]}>{totalSessions}</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryTextColor }]}>Total Sessions</Text>
          </View>
        </View>

        {/* Bar Chart */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll} contentContainerStyle={styles.chartScrollContent}>
          <BarChart
            data={chartData}
            width={Math.max(screenWidth - 80, chartData.length * 35)}
            height={chartHeight}
            barWidth={26}
            barBorderRadius={6}
            isAnimated
            animationDuration={800}
            showGradient
            gradientColor={theme.secondaryColor}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            yAxisTextStyle={{
              color: theme.labelColor,
              fontSize: 9,
            }}
            noOfSections={4}
            spacing={8}
            backgroundColor="transparent"
            disableScroll
            initialSpacing={15}
            endSpacing={15}
          />
        </ScrollView>
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
    overflow: 'hidden',
  },
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
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
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
    shadowColor: '#000',
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '500',
    textAlign: 'center',
  },
  chartScroll: {
    maxHeight: 150,
  },
  chartScrollContent: {
    paddingVertical: 10,
  },
});

export default FocusTimeSummary;
