import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EventCard from '../components/EventCard';
import theme from '../constants/theme';

// In a real app, this would come from persistent storage or API
const savedEvents = [
  {
    id: '2',
    title: 'Yoga in the Park',
    date: '2023-06-18',
    time: '09:00',
    location: 'Central Park',
    image: 'https://source.unsplash.com/random/400x200/?yoga',
    description: 'Join us for a relaxing morning yoga session in the park. All levels welcome. Bring your own mat.',
    category: 'Health & Wellness',
    organizer: 'Mindful Movement',
    attendees: 32,
    price: '$5'
  },
  {
    id: '5',
    title: 'Charity Run 5K',
    date: '2023-06-26',
    time: '08:00',
    location: 'Riverside Park',
    image: 'https://source.unsplash.com/random/400x200/?running',
    description: 'Run for a cause! All proceeds go to local children\'s hospital.',
    category: 'Sports',
    organizer: 'Community Cares',
    attendees: 89,
    price: '$20'
  }
];

const SavedScreen = ({ navigation }) => {
  const handleEventPress = (event) => {
    navigation.navigate('EventDetail', { event });
  };

  const renderItem = ({ item }) => (
    <EventCard event={item} onPress={handleEventPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Events</Text>
      </View>
      
      {savedEvents.length > 0 ? (
        <FlatList
          data={savedEvents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved events</Text>
          <Text style={styles.emptySubtext}>Events you save will appear here</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  header: {
    paddingHorizontal: theme.SPACING.m,
    paddingTop: theme.SPACING.l,
    paddingBottom: theme.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  headerTitle: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  listContent: {
    paddingHorizontal: theme.SPACING.m,
    paddingTop: theme.SPACING.m,
    paddingBottom: theme.SPACING.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.SPACING.m,
  },
  emptyText: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.s,
  },
  emptySubtext: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
  },
});

export default SavedScreen; 