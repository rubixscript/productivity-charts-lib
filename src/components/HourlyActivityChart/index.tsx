/**
 * @component HourlyActivityChart
 * @description Compact hourly activity chart showing session distribution throughout the day
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart } from 'react-native-gifted-charts';
import { HourlyActivityChartProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';

const HourlyActivityChart: React.FC<HourlyActivityChartProps> = ({
  sessions,
  title = 'Activity',
  startHour = 6,
  endHour = 23,
  sampleInterval = 3,
  theme: customTheme,
  darkMode = false,
  onHourPress,
  style,
  containerStyle,
}) => {
  // Merge custom theme with default
  const theme: ChartTheme = useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    return { ...baseTheme, ...customTheme };
  }, [darkMode, customTheme]);

  // Format hour function
  const formatHour = (hour: number) => {
    if (hour === 12) return '12PM';
    if (hour < 12) return `${hour}AM`;
    return `${hour - 12}PM`;
  };

  // Generate hourly activity data from session completion times
  const generateHourlyActivity = useMemo((): Array<{ hour: number; sessions: number; displayTime: string }> => {
    const hours: Array<{ hour: number; sessions: number; displayTime: string }> = [];

    // Initialize hourly buckets
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.push({
        hour,
        sessions: 0,
        displayTime: formatHour(hour),
      });
    }

    // Get today's date for filtering
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Count sessions by completion hour for today only
    sessions.forEach((session) => {
      const sessionDate = session.endTime.toISOString().split('T')[0];

      // Only count sessions completed today and only work sessions
      if (sessionDate === todayStr && session.phase === 'work') {
        const completionHour = session.endTime.getHours();

        // Only count sessions within our display range
        if (completionHour >= startHour && completionHour <= endHour) {
          const hourIndex = hours.findIndex((h) => h.hour === completionHour);
          if (hourIndex !== -1) {
            hours[hourIndex].sessions++;
          }
        }
      }
    });

    return hours;
  }, [sessions, startHour, endHour, formatHour]);

  const hourlyData = generateHourlyActivity;
  const maxSessions = Math.max(...hourlyData.map((h) => h.sessions), 1);
  const screenWidth = Dimensions.get('window').width;

  const chartData = useMemo(() => {
    // Sample data at specified interval for better visualization
    const sampledData = hourlyData.filter((_, index) => index % sampleInterval === 0);

    return sampledData.map((hourData) => {
      // Calculate gradient opacity based on sessions
      const opacity = hourData.sessions > 0 ? Math.min(0.4 + (hourData.sessions / maxSessions) * 0.6, 1) : 0.2;

      return {
        value: hourData.sessions,
        label: hourData.displayTime,
        frontColor: `rgba(139, 92, 246, ${opacity})`,
        gradientColor: `rgba(167, 139, 250, ${opacity * 0.7})`,
        spacing: 2,
        labelTextStyle: {
          color: theme.labelColor,
          fontSize: 8,
          fontWeight: '500' as const,
        },
        onPress: () => onHourPress?.(hourData.hour, hourData.sessions),
      };
    });
  }, [hourlyData, maxSessions, theme, sampleInterval, onHourPress]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.chartCard,
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
            styles.chartIconContainer,
            {
              backgroundColor: `${theme.primaryColor}1F`,
              borderColor: `${theme.primaryColor}40`,
            },
          ]}
        >
          <MaterialCommunityIcons name="clock-outline" size={16} color={theme.primaryColor} />
        </View>

        <View style={styles.miniChart}>
          <BarChart
            data={chartData}
            width={screenWidth / 2 - 50}
            height={40}
            barWidth={8}
            barBorderRadius={4}
            isAnimated
            animationDuration={600}
            showGradient
            gradientColor={theme.secondaryColor}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            hideYAxisText
            noOfSections={3}
            spacing={8}
            backgroundColor="transparent"
            disableScroll
          />
        </View>

        <View style={styles.chartLabels}>
          <Text style={[styles.chartTime, { color: theme.labelColor }]}>6AM</Text>
          <Text style={[styles.chartTime, { color: theme.labelColor }]}>12PM</Text>
          <Text style={[styles.chartTime, { color: theme.labelColor }]}>6PM</Text>
          <Text style={[styles.chartTime, { color: theme.labelColor }]}>11PM</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
  },
  chartIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    alignSelf: 'flex-end',
    borderWidth: 1,
  },
  miniChart: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  },
  chartTime: {
    fontSize: 8,
    fontWeight: '500',
  },
});

export default HourlyActivityChart;
