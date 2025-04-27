import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'event_reminder',
      message: 'Your event "Tech Conference 2023" starts tomorrow!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'new_event',
      message: 'A new event in your area: "Local Music Festival"',
      time: '1 day ago',
      read: true,
    },
    {
      id: '3',
      type: 'friend_joined',
      message: 'Alex Kim joined Eventify!',
      time: '2 days ago',
      read: true,
    },
  ]);

  const getIconForType = (type) => {
    switch (type) {
      case 'event_reminder':
        return 'calendar-clock';
      case 'new_event':
        return 'calendar-plus';
      case 'friend_joined':
        return 'account-plus';
      default:
        return 'bell';
    }
  };

  const getIconColorForType = (type) => {
    switch (type) {
      case 'event_reminder':
        return theme.COLORS.warning;
      case 'new_event':
        return theme.COLORS.primary;
      case 'friend_joined':
        return theme.COLORS.accent;
      default:
        return theme.COLORS.textLight;
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, item.read ? null : styles.unreadItem]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconColorForType(item.type) + '20' }]}>
        <MaterialCommunityIcons 
          name={getIconForType(item.type)} 
          size={24} 
          color={getIconColorForType(item.type)} 
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {notifications.some(item => !item.read) && (
          <TouchableOpacity 
            onPress={() => setNotifications(
              notifications.map(notification => ({ ...notification, read: true }))
            )}
            style={styles.markAllButton}
          >
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons 
            name="bell-off-outline" 
            size={64} 
            color={theme.COLORS.textLight} 
          />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  markAllButton: {
    padding: theme.SPACING.xs,
  },
  markAllText: {
    color: theme.COLORS.primary,
    fontSize: theme.SIZES.small,
    fontWeight: '500',
  },
  listContainer: {
    padding: theme.SPACING.m,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.SPACING.m,
    backgroundColor: theme.COLORS.card,
    marginBottom: theme.SPACING.m,
    borderRadius: theme.BORDER_RADIUS.m,
    position: 'relative',
  },
  unreadItem: {
    backgroundColor: theme.COLORS.primary + '10',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.SPACING.m,
  },
  contentContainer: {
    flex: 1,
  },
  messageText: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.text,
    marginBottom: 4,
  },
  timeText: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.COLORS.primary,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.SPACING.l,
  },
  emptyText: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    marginTop: theme.SPACING.m,
  },
});

export default NotificationsScreen; 