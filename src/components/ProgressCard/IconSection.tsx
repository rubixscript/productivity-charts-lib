/**
 * @component IconSection
 * @description Icon section component for ProgressCard
 * Displays icon with background container
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface IconSectionProps {
  name: string;
  size: number;
  iconColor: string;
  backgroundColor: string;
  borderColor: string;
  marginBottom: number;
}

const IconSection: React.FC<IconSectionProps> = ({
  name,
  size,
  iconColor,
  backgroundColor,
  borderColor,
  marginBottom,
}) => {
  return (
    <View
      style={[
        styles.iconContainer,
        {
          width: size * 2,
          height: size * 2,
          backgroundColor,
          borderColor,
          marginBottom,
        },
      ]}
    >
      <MaterialCommunityIcons name={name as any} size={size} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});

export default IconSection;
