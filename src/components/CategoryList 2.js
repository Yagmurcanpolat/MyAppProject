import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';

const CategoryItem = ({ category, isSelected, onSelect }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.categoryItem, 
        isSelected && styles.selectedCategoryItem
      ]} 
      onPress={() => onSelect(category.id)}
    >
      <MaterialCommunityIcons 
        name={category.icon} 
        size={20} 
        color={isSelected ? 'white' : theme.COLORS.primary} 
      />
      <Text 
        style={[
          styles.categoryText,
          isSelected && styles.selectedCategoryText
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <CategoryItem 
          category={{ id: 'all', name: 'All Events', icon: 'view-grid' }}
          isSelected={selectedCategory === 'all'}
          onSelect={onSelectCategory}
        />
        {categories.map((category) => (
          <CategoryItem 
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onSelect={onSelectCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.SPACING.m,
  },
  scrollContainer: {
    paddingHorizontal: theme.SPACING.m,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.SPACING.m,
    paddingVertical: theme.SPACING.s,
    marginRight: theme.SPACING.s,
    borderRadius: theme.BORDER_RADIUS.m,
    backgroundColor: theme.COLORS.card,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  selectedCategoryItem: {
    backgroundColor: theme.COLORS.primary,
    borderColor: theme.COLORS.primary,
  },
  categoryText: {
    marginLeft: theme.SPACING.xs,
    fontSize: theme.SIZES.font,
    fontWeight: '500',
    color: theme.COLORS.text,
  },
  selectedCategoryText: {
    color: 'white',
  },
});

export default CategoryList; 