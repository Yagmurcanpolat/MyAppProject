import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';

const InterestItem = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.interestItem,
        isSelected && styles.selectedInterestItem
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.interestText,
          isSelected && styles.selectedInterestText
        ]}
      >
        {title}
      </Text>
      {isSelected && (
        <MaterialCommunityIcons
          name="check"
          size={16}
          color="white"
          style={styles.checkIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  interestItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.BORDER_RADIUS.m,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
    backgroundColor: theme.COLORS.background,
    marginHorizontal: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedInterestItem: {
    backgroundColor: theme.COLORS.primary,
    borderColor: theme.COLORS.primary,
  },
  interestText: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.textDark,
  },
  selectedInterestText: {
    color: 'white',
  },
  checkIcon: {
    marginLeft: 5,
  },
});

export default InterestItem; 