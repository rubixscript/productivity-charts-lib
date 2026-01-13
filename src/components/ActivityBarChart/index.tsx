/**
 * @component ActivityBarChart
 * @description Beautiful bar chart for activity visualization using Gifted Charts
 * Perfect for showing daily, weekly, or monthly progress with glassmorphic design
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { ActivityBarChartProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';

const ActivityBarChart: React.FC<ActivityBarChartProps> = ({
  data,
  title,
  subtitle,
  valueLabel = 'Sessions',
  showValues = true,
  showGrid = true,
  animated = true,
  barWidth = 24,
  barBorderRadius = 8,
  maxValue,
  theme: customTheme,
  darkMode = false,
  onBarPress,
  style,
  containerStyle,
  chartHeight = 200,
}) => {
  // Merge custom theme with default
  const theme: ChartTheme = useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    return { ...baseTheme, ...customTheme };
  }, [darkMode, customTheme]);

  // Transform data for Gifted Charts
  const chartData = useMemo(() => {
    return data.map((point, index) => ({
      value: point.value,
      label: point.label,
      frontColor: point.color || theme.primaryColor,
      gradientColor: point.color ? `${point.color}80` : theme.secondaryColor,
      spacing: index === 0 ? 0 : 8,
      labelTextStyle: {
        color: theme.labelColor,
        fontSize: 9,
        fontWeight: '600' as const,
      },
      onPress: () => onBarPress?.(point, index),
    }));
  }, [data, theme, onBarPress]);

  // Calculate max value if not provided
  const calculatedMaxValue = useMemo(() => {
    if (maxValue) return maxValue;
    const max = Math.max(...data.map((d) => d.value));
    return Math.ceil(max * 1.2); // Add 20% padding
  }, [data, maxValue]);

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
        {(title || subtitle) && (
          <View style={styles.header}>
            {title && <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>}
            {subtitle && (
              <Text style={[styles.subtitle, { color: theme.secondaryTextColor }]}>{subtitle}</Text>
            )}
          </View>
        )}

        {/* Chart Container */}
        <View style={styles.chartContainer}>
          <BarChart
            data={chartData}
            width={data.length * (barWidth + 8)}
            height={chartHeight}
            barWidth={barWidth}
            spacing={8}
            roundedTop
            roundedBottom
            hideRules={!showGrid}
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{
              color: theme.labelColor,
              fontSize: 10,
              fontWeight: '600',
            }}
            noOfSections={4}
            maxValue={calculatedMaxValue}
            isAnimated={animated}
            animationDuration={800}
            showGradient
            gradientColor={theme.secondaryColor}
            frontColor={theme.primaryColor}
            barBorderRadius={barBorderRadius}
            yAxisLabelSuffix=""
            hideYAxisText={false}
            dashWidth={4}
            dashGap={4}
            rulesColor={theme.borderColor}
            rulesType="solid"
            initialSpacing={10}
            endSpacing={10}
          />
        </View>

        {/* Value Label */}
        {valueLabel && (
          <View style={styles.footer}>
            <Text style={[styles.valueLabel, { color: theme.labelColor }]}>{valueLabel}</Text>
          </View>
        )}
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
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
  },
  chartContainer: {
    alignItems: 'flex-start',
    overflow: 'visible',
  },
  footer: {
    marginTop: 12,
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default ActivityBarChart;
