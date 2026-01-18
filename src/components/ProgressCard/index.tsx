/**
 * @component ProgressCard
 * @description Beautiful progress card with glassmorphic design
 * Perfect for displaying stats, metrics, and KPIs
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressCardProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';
import IconSection from './IconSection';
import ProgressBar from './ProgressBar';
import ContentSection from './ContentSection';

const ProgressCard: React.FC<ProgressCardProps> = ({
  icon,
  value,
  label,
  subtitle,
  progress,
  progressColor,
  theme: customTheme,
  darkMode = false,
  iconColor,
  iconBackgroundColor,
  size = 'medium',
  orientation = 'vertical',
  onPress,
  style,
}) => {
  // Merge custom theme with default
  const theme: ChartTheme = useMemo(() => {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    return { ...baseTheme, ...customTheme };
  }, [darkMode, customTheme]);

  // Size configurations
  const sizeConfig = useMemo(() => {
    switch (size) {
      case 'small':
        return {
          iconSize: 18,
          iconContainerSize: 36,
          valueSize: 20,
          labelSize: 9,
          padding: 12,
          iconMarginBottom: 6,
          barMarginTop: 8,
          barHeight: 4,
        };
      case 'large':
        return {
          iconSize: 32,
          iconContainerSize: 56,
          valueSize: 36,
          labelSize: 13,
          padding: 24,
          iconMarginBottom: 12,
          barMarginTop: 12,
          barHeight: 6,
        };
      default:
        return {
          iconSize: 24,
          iconContainerSize: 48,
          valueSize: 28,
          labelSize: 11,
          padding: 20,
          iconMarginBottom: 12,
          barMarginTop: 12,
          barHeight: 6,
        };
    }
  }, [size]);

  const finalIconColor = iconColor || theme.primaryColor;
  const finalIconBgColor = iconBackgroundColor || `${theme.primaryColor}20`;
  const finalProgressColor = progressColor || theme.primaryColor;

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={[
        styles.card,
        orientation === 'horizontal' && styles.cardHorizontal,
        {
          backgroundColor: theme.cardBackgroundColor,
          borderColor: theme.borderColor,
          shadowColor: theme.shadowColor,
          padding: sizeConfig.padding,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <IconSection
        name={icon}
        size={sizeConfig.iconSize}
        iconColor={finalIconColor}
        backgroundColor={finalIconBgColor}
        borderColor={`${theme.primaryColor}40`}
        marginBottom={sizeConfig.iconMarginBottom}
      />

      <ContentSection
        value={value}
        label={label}
        subtitle={subtitle}
        valueColor={theme.textColor}
        labelColor={theme.labelColor}
        subtitleColor={theme.secondaryTextColor}
        valueSize={sizeConfig.valueSize}
        labelSize={sizeConfig.labelSize}
        subtitleSize={sizeConfig.labelSize - 1}
      />

      {progress !== undefined && (
        <ProgressBar
          progress={progress}
          color={finalProgressColor}
          height={sizeConfig.barHeight}
          marginTop={sizeConfig.barMarginTop}
        />
      )}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    minWidth: 120,
  },
  cardHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default ProgressCard;
