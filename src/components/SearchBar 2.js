import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';

const SearchBar = ({ placeholder, value, onChangeText, onSubmit, onClear }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={theme.COLORS.textLight}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder || 'Search events...'}
          placeholderTextColor={theme.COLORS.textLight}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
        />
        {value ? (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <MaterialCommunityIcons
              name="close-circle"
              size={18}
              color={theme.COLORS.textLight}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SPACING.m,
    paddingVertical: theme.SPACING.s,
    backgroundColor: theme.COLORS.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.l,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  searchIcon: {
    paddingHorizontal: theme.SPACING.m,
  },
  input: {
    flex: 1,
    height: 46,
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.text,
  },
  clearButton: {
    padding: theme.SPACING.m,
  },
});

export default SearchBar; 