import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import theme from '../constants/theme';

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveEvent = () => {
    setIsSaved(!isSaved);
    // In a real app, we would save this to persistent storage or API
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header Image with Back and Save buttons */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveEvent}
          >
            <MaterialCommunityIcons 
              name={isSaved ? "bookmark" : "bookmark-outline"} 
              size={28} 
              color={isSaved ? theme.COLORS.primary : "white"} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.organizerRow}>
            <Text style={styles.byText}>By </Text>
            <Text style={styles.organizerText}>{event.organizer}</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons 
                name="calendar" 
                size={24} 
                color={theme.COLORS.primary} 
                style={styles.infoIcon}
              />
              <View>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoItem}>
              <MaterialCommunityIcons 
                name="clock-outline" 
                size={24} 
                color={theme.COLORS.primary} 
                style={styles.infoIcon}
              />
              <View>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>{event.time}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoItem}>
              <MaterialCommunityIcons 
                name="map-marker" 
                size={24} 
                color={theme.COLORS.primary} 
                style={styles.infoIcon}
              />
              <View>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{event.location}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>About This Event</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>
          
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Attendees</Text>
            <View style={styles.attendeesRow}>
              <View style={styles.attendeeIcons}>
                {/* In a real app, we would show actual attendee avatars */}
                <View style={[styles.attendeeIcon, { backgroundColor: theme.COLORS.primary }]} />
                <View style={[styles.attendeeIcon, { backgroundColor: theme.COLORS.primaryLight, marginLeft: -10 }]} />
                <View style={[styles.attendeeIcon, { backgroundColor: theme.COLORS.accent, marginLeft: -10 }]} />
              </View>
              <Text style={styles.attendeesText}>
                <Text style={styles.attendeesCount}>{event.attendees}</Text> people are attending
              </Text>
            </View>
          </View>
          
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>{event.price}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => {
                // In a real app, navigate to registration/payment
                alert('Registration feature would go here');
              }}
            >
              <Text style={styles.registerButtonText}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerButtons: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.SPACING.m,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: theme.BORDER_RADIUS.l,
    borderTopRightRadius: theme.BORDER_RADIUS.l,
    backgroundColor: theme.COLORS.background,
  },
  detailsContainer: {
    padding: theme.SPACING.m,
  },
  title: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.xs,
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.SPACING.m,
  },
  byText: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.textLight,
  },
  organizerText: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.primary,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.m,
    padding: theme.SPACING.m,
    marginBottom: theme.SPACING.m,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.SPACING.s,
  },
  infoIcon: {
    marginRight: theme.SPACING.m,
  },
  infoLabel: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: theme.COLORS.border,
    marginVertical: theme.SPACING.s,
  },
  detailSection: {
    marginBottom: theme.SPACING.l,
  },
  sectionTitle: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.s,
  },
  description: {
    fontSize: theme.SIZES.medium,
    lineHeight: 24,
    color: theme.COLORS.text,
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeIcons: {
    flexDirection: 'row',
    marginRight: theme.SPACING.m,
  },
  attendeeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: theme.COLORS.background,
  },
  attendeesText: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
  },
  attendeesCount: {
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.m,
    padding: theme.SPACING.m,
    marginTop: theme.SPACING.m,
    marginBottom: theme.SPACING.xl,
  },
  priceLabel: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
  },
  priceValue: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  registerButton: {
    backgroundColor: theme.COLORS.primary,
    paddingVertical: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.l,
    borderRadius: theme.BORDER_RADIUS.m,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.SIZES.medium,
  },
});

export default EventDetailScreen; 