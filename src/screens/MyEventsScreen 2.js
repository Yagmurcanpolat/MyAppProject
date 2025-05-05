import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import theme from '../constants/theme';
import { eventService } from '../services/api';

const MyEventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await eventService.getUserEvents();
      if (eventsData && Array.isArray(eventsData)) {
        setEvents(eventsData);
      } else {
        throw new Error('Invalid data format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(true);
      setLoading(false);
    }
  };

  const handleEventPress = (event) => {
    navigation.navigate('EventDetail', { event });
  };

  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const renderItem = ({ item }) => (
    <EventCard event={item} onPress={handleEventPress} />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={theme.COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchUserEvents}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {!error && events.length > 0 ? (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={fetchUserEvents}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="calendar-blank" size={60} color={theme.COLORS.textLight} />
          <Text style={styles.emptyText}>No events yet</Text>
          <Text style={styles.emptySubtext}>Create your first event to get started</Text>
          <TouchableOpacity style={styles.emptyCreateButton} onPress={handleCreateEvent}>
            <Text style={styles.emptyCreateButtonText}>Create Event</Text>
          </TouchableOpacity>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SPACING.m,
    paddingTop: theme.SPACING.xl,
    paddingBottom: theme.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  headerTitle: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.COLORS.primary,
    borderRadius: theme.BORDER_RADIUS.m,
    paddingVertical: theme.SPACING.s,
    paddingHorizontal: theme.SPACING.m,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  listContent: {
    padding: theme.SPACING.m,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.SPACING.xl,
  },
  emptyText: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginTop: theme.SPACING.m,
  },
  emptySubtext: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    textAlign: 'center',
    marginTop: theme.SPACING.s,
    marginBottom: theme.SPACING.l,
  },
  emptyCreateButton: {
    backgroundColor: theme.COLORS.primary,
    paddingVertical: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.xl,
    borderRadius: theme.BORDER_RADIUS.m,
    marginTop: theme.SPACING.m,
  },
  emptyCreateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.SIZES.medium,
  },
  errorContainer: {
    padding: theme.SPACING.m,
    backgroundColor: theme.COLORS.errorLight,
    borderRadius: theme.BORDER_RADIUS.m,
    margin: theme.SPACING.m,
    alignItems: 'center',
  },
  errorText: {
    color: theme.COLORS.error,
    fontSize: theme.SIZES.medium,
    marginBottom: theme.SPACING.s,
  },
  retryText: {
    color: theme.COLORS.primary,
    fontWeight: 'bold',
  },
});

export default MyEventsScreen; 