import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import theme from '../constants/theme';

const Button = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false,
  loading = false,
  outline = false,
  small = false
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outline && styles.outlineButton,
        small && styles.smallButton,
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={outline ? theme.COLORS.primary : 'white'} />
      ) : (
        <Text 
          style={[
            styles.buttonText,
            outline && styles.outlineButtonText,
            small && styles.smallButtonText,
            textStyle
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.COLORS.primary,
    borderRadius: theme.BORDER_RADIUS.m,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: theme.SIZES.medium,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: theme.COLORS.primaryLight,
    opacity: 0.7,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.COLORS.primary,
  },
  outlineButtonText: {
    color: theme.COLORS.primary,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  smallButtonText: {
    fontSize: theme.SIZES.font,
  },
});

export default Button; 