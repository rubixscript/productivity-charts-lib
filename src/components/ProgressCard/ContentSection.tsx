/**
 * @component ContentSection
 * @description Content section component for ProgressCard
 * Displays value, label, and optional subtitle
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ContentSectionProps {
  value: string | number;
  label: string;
  subtitle?: string;
  valueColor: string;
  labelColor: string;
  subtitleColor: string;
  valueSize: number;
  labelSize: number;
  subtitleSize: number;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  value,
  label,
  subtitle,
  valueColor,
  labelColor,
  subtitleColor,
  valueSize,
  labelSize,
  subtitleSize,
}) => {
  return (
    <View style={styles.content}>
      <Text
        style={[
          styles.value,
          {
            color: valueColor,
            fontSize: valueSize,
          },
        ]}
      >
        {value}
      </Text>
      <Text
        style={[
          styles.label,
          {
            color: labelColor,
            fontSize: labelSize,
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
              color: subtitleColor,
              fontSize: subtitleSize,
            },
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ContentSection;
