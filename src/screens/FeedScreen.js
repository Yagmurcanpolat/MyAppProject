import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import theme from '../constants/theme';

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.comingSoonText}>Coming soon!</Text>
        <Text style={styles.descriptionText}>
          This feature will be available in the next update.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  header: {
    paddingHorizontal: theme.SPACING.m,
    paddingTop: 50,
    paddingBottom: theme.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  headerTitle: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.SPACING.l,
  },
  comingSoonText: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.primary,
    marginBottom: theme.SPACING.m,
  },
  descriptionText: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    textAlign: 'center',
  },
});

export default FeedScreen; 