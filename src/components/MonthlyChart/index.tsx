/**
 * @component MonthlyChart
 * @description Beautiful monthly aggregated chart using Gifted Charts
 * Shows productivity trends across months with glassmorphic design
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { MonthlyChartProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';

const MonthlyChart: React.FC<MonthlyChartProps> = ({
  months,
  days,
  title = 'Monthly Activity',
  valueLabel = 'Sessions',
  showValues = true,
  chartHeight = 180,
  theme: customTheme,
  darkMode = false,
  onMonthPress,
  style,
  containerStyle,
}) => {
  // Merge custom theme with default
  const theme: ChartTheme = useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    return { ...baseTheme, ...customTheme };
  }, [darkMode, customTheme]);

  // Aggregate data by month
  const monthlyData = useMemo(() => {
    const monthsMap = new Map<string, number>();

    // Initialize all months with 0
    months.forEach((month) => {
      const key = `${month.year}-${month.index}`;
      monthsMap.set(key, 0);
    });

    // Sum up values for each month
    days.forEach((day) => {
      const date = new Date(day.dateStr);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const current = monthsMap.get(key) || 0;
      monthsMap.set(key, current + day.value);
    });

    // Convert to chart data
    return months.map((month) => {
      const key = `${month.year}-${month.index}`;
      const value = monthsMap.get(key) || 0;
      return {
        value,
        label: month.name,
        month,
        frontColor: theme.primaryColor,
        gradientColor: theme.secondaryColor,
        onPress: () => onMonthPress?.(month, value),
      };
    });
  }, [months, days, theme, onMonthPress]);

  // Calculate max value for scaling
  const maxValue = useMemo(() => {
    const max = Math.max(...monthlyData.map((d) => d.value));
    return Math.ceil(max * 1.2); // Add 20% padding
  }, [monthlyData]);

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
          {valueLabel && (
            <Text style={[styles.valueLabel, { color: theme.labelColor }]}>{valueLabel}</Text>
          )}
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <BarChart
            data={monthlyData.map((item) => ({
              value: item.value,
              label: item.label,
              frontColor: item.frontColor,
              gradientColor: item.gradientColor,
              labelTextStyle: {
                color: theme.labelColor,
                fontSize: 9,
                fontWeight: '600' as const,
              },
              onPress: item.onPress,
            }))}
            width={monthlyData.length * 40}
            height={chartHeight}
            barWidth={28}
            spacing={12}
            roundedTop
            roundedBottom
            hideRules={false}
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{
              color: theme.labelColor,
              fontSize: 10,
              fontWeight: '600',
            }}
            noOfSections={4}
            maxValue={maxValue}
            isAnimated={true}
            animationDuration={800}
            showGradient
            gradientColor={theme.secondaryColor}
            frontColor={theme.primaryColor}
            barBorderRadius={10}
            hideYAxisText={false}
            dashWidth={4}
            dashGap={4}
            rulesColor={theme.borderColor}
            rulesType="solid"
            initialSpacing={10}
            endSpacing={10}
          />
        </View>

        {/* Total Summary */}
        <View style={styles.summaryContainer}>
          <Text style={[styles.summaryLabel, { color: theme.secondaryTextColor }]}>
            Total {valueLabel}:
          </Text>
          <Text style={[styles.summaryValue, { color: theme.textColor }]}>
            {monthlyData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          </Text>
        </View>
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  valueLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chartContainer: {
    alignItems: 'flex-start',
    overflow: 'visible',
  },
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

export default MonthlyChart;
