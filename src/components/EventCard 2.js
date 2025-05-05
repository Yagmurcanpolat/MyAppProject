import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';

const EventCard = ({ event, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(event)}>
      <Card style={styles.card}>
        <Image
          source={{ uri: event.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.dateTag}>
          <Text style={styles.dateText}>
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </Text>
        </View>
        <Card.Content style={styles.cardContent}>
          <Title style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {event.title}
          </Title>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-outline" size={16} color={theme.COLORS.textLight} />
            <Paragraph style={styles.infoText}>{event.time}</Paragraph>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={16} color={theme.COLORS.textLight} />
            <Paragraph style={styles.infoText} numberOfLines={1}>{event.location}</Paragraph>
          </View>
          <View style={styles.footer}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>
            <View style={styles.attendeesContainer}>
              <MaterialCommunityIcons name="account-group" size={16} color={theme.COLORS.textLight} />
              <Text style={styles.attendeesText}>{event.attendees}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.SPACING.m,
    borderRadius: theme.BORDER_RADIUS.m,
    elevation: 4,
    backgroundColor: theme.COLORS.background,
    overflow: 'hidden',
  },
  image: {
    height: 160,
    width: '100%',
  },
  dateTag: {
    position: 'absolute',
    top: theme.SPACING.s,
    left: theme.SPACING.s,
    backgroundColor: theme.COLORS.primary,
    paddingHorizontal: theme.SPACING.s,
    paddingVertical: theme.SPACING.xs,
    borderRadius: theme.BORDER_RADIUS.s,
  },
  dateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.SIZES.small,
  },
  cardContent: {
    padding: theme.SPACING.m,
  },
  title: {
    fontWeight: 'bold',
    fontSize: theme.SIZES.large,
    marginBottom: theme.SPACING.s,
    color: theme.COLORS.text,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.SPACING.xs,
  },
  infoText: {
    marginLeft: theme.SPACING.xs,
    fontSize: theme.SIZES.font,
    color: theme.COLORS.textLight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.SPACING.s,
  },
  categoryTag: {
    backgroundColor: theme.COLORS.primaryLight,
    paddingHorizontal: theme.SPACING.s,
    paddingVertical: theme.SPACING.xs,
    borderRadius: theme.BORDER_RADIUS.s,
  },
  categoryText: {
    color: 'white',
    fontSize: theme.SIZES.small,
    fontWeight: '500',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    marginLeft: 4,
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
  },
});

export default EventCard; 