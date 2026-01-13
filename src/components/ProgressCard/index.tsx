/**
 * @component ProgressCard
 * @description Beautiful progress card with glassmorphic design
 * Perfect for displaying stats, metrics, and KPIs
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressCardProps, ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../../types';

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
          iconSize: 20,
          iconContainerSize: 40,
          valueSize: 24,
          labelSize: 10,
        };
      case 'large':
        return {
          iconSize: 32,
          iconContainerSize: 56,
          valueSize: 36,
          labelSize: 13,
        };
      default:
        return {
          iconSize: 24,
          iconContainerSize: 48,
          valueSize: 28,
          labelSize: 11,
        };
    }
  }, [size]);

  const finalIconColor = iconColor || theme.primaryColor;
  const finalIconBgColor = iconBackgroundColor || `${theme.primaryColor}20`;
  const finalProgressColor = progressColor || theme.primaryColor;

  const CardWrapper = onPress ? TouchableOpacity : View;

  const cardContent = (
    <>
      {/* Icon */}
      <View
        style={[
          styles.iconContainer,
          {
            width: sizeConfig.iconContainerSize,
            height: sizeConfig.iconContainerSize,
            backgroundColor: finalIconBgColor,
            borderColor: `${theme.primaryColor}40`,
          },
        ]}
      >
        <MaterialCommunityIcons name={icon as any} size={sizeConfig.iconSize} color={finalIconColor} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            styles.value,
            {
              color: theme.textColor,
              fontSize: sizeConfig.valueSize,
            },
          ]}
        >
          {value}
        </Text>
        <Text
          style={[
            styles.label,
            {
              color: theme.labelColor,
              fontSize: sizeConfig.labelSize,
            },
          ]}
        >
          {label}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.secondaryTextColor,
                fontSize: sizeConfig.labelSize - 1,
              },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {/* Progress Bar (if provided) */}
      {progress !== undefined && (
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBarBackground,
              {
                backgroundColor: `${finalProgressColor}20`,
              },
            ]}
          >
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.min(progress * 100, 100)}%`,
                  backgroundColor: finalProgressColor,
                },
              ]}
            />
          </View>
        </View>
      )}
    </>
  );

  return (
    <CardWrapper
      style={[
        styles.card,
        orientation === 'horizontal' && styles.cardHorizontal,
        {
          backgroundColor: theme.cardBackgroundColor,
          borderColor: theme.borderColor,
          shadowColor: theme.shadowColor,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {cardContent}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
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
    minWidth: 120,
  },
  cardHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  content: {
    alignItems: 'center',
  },
  value: {
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  label: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 12,
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});

export default ProgressCard;
