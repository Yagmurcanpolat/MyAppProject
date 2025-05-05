import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';

// Helper function to generate date entries for the next 7 days
const generateDateEntries = () => {
  const today = new Date();
  const dates = [];
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    let label = '';
    if (i === 0) label = 'Today';
    else if (i === 1) label = 'Tomorrow';
    else label = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    dates.push({
      id: i.toString(),
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      label,
    });
  }
  
  return dates;
};

const DateItem = ({ item, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.dateItem, isSelected && styles.selectedDateItem]}
      onPress={() => onSelect(item.date)}
    >
      <Text style={[styles.dateLabel, isSelected && styles.selectedDateText]}>
        {item.label}
      </Text>
      <Text style={[styles.dateDay, isSelected && styles.selectedDateText]}>
        {item.day}
      </Text>
    </TouchableOpacity>
  );
};

const DateFilter = ({ selectedDate, onSelectDate }) => {
  const dates = generateDateEntries();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name="calendar" 
          size={20} 
          color={theme.COLORS.primary}
        />
        <Text style={styles.headerText}>Date</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {dates.map(item => (
          <DateItem
            key={item.id}
            item={item}
            isSelected={selectedDate === item.date}
            onSelect={onSelectDate}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.SPACING.s,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.SPACING.m,
    marginBottom: theme.SPACING.s,
  },
  headerText: {
    marginLeft: theme.SPACING.xs,
    fontSize: theme.SIZES.medium,
    fontWeight: '600',
    color: theme.COLORS.text,
  },
  scrollContainer: {
    paddingHorizontal: theme.SPACING.m,
    paddingBottom: theme.SPACING.s,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginRight: theme.SPACING.s,
    borderRadius: theme.BORDER_RADIUS.m,
    backgroundColor: theme.COLORS.card,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  selectedDateItem: {
    backgroundColor: theme.COLORS.primary,
    borderColor: theme.COLORS.primary,
  },
  dateLabel: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
    marginBottom: 4,
  },
  dateDay: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  selectedDateText: {
    color: 'white',
  },
});

export default DateFilter; 