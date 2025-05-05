import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  
  // Eğer user boşsa default değerler kullanılacak
  const userProfile = user || {
    name: 'Misafir Kullanıcı',
    email: 'misafir@example.com',
    avatar: 'https://source.unsplash.com/random/400x400/?portrait',
    attendedEvents: 0,
    upcomingEvents: 0,
    savedEvents: 0,
    location: 'Belirtilmemiş',
    participationScore: 0,
  };

  const menuItems = [
    {
      id: '1',
      title: 'My Events',
      icon: 'calendar-check',
      color: theme.COLORS.primary,
      onPress: () => navigation.navigate('MyEvents')
    },
    {
      id: '2',
      title: 'Saved Events',
      icon: 'bookmark',
      color: theme.COLORS.success,
      onPress: () => navigation.navigate('SavedScreen')
    },
    {
      id: '4',
      title: 'Settings',
      icon: 'cog-outline',
      color: theme.COLORS.textLight,
      onPress: () => navigation.navigate('Settings')
    },
  ];

  const MenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.menuItemText}>{item.title}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color={theme.COLORS.icon} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      
      <View style={styles.safeArea} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.profileCard}>
        <Image
          source={{ uri: userProfile.avatar }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.email}>{userProfile.email}</Text>
          
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={16} color={theme.COLORS.primary} />
            <Text style={styles.location}>{userProfile.location}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.scoreCard}>
        <View style={styles.scoreMeter}>
          <View 
            style={[
              styles.scoreProgress, 
              { width: `${userProfile.participationScore}%` }
            ]} 
          />
        </View>
        <View style={styles.scoreInfo}>
          <Text style={styles.scoreValue}>{userProfile.participationScore}</Text>
          <Text style={styles.scoreLabel}>Participation Score</Text>
        </View>
      </View>
      
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userProfile.attendedEvents}</Text>
          <Text style={styles.statLabel}>Events Attended</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userProfile.upcomingEvents}</Text>
          <Text style={styles.statLabel}>Upcoming Events</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userProfile.savedEvents}</Text>
          <Text style={styles.statLabel}>Events Saved</Text>
        </View>
      </View>
      
      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        {menuItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Eventify v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  safeArea: {
    height: 50, // Saat ile çakışmasını önlemek için eklenen boşluk
  },
  header: {
    paddingHorizontal: theme.SPACING.m,
    paddingTop: theme.SPACING.m,
    paddingBottom: theme.SPACING.m,
  },
  headerTitle: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.SPACING.m,
    marginBottom: theme.SPACING.m,
    padding: theme.SPACING.m,
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.m,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: theme.SPACING.m,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginBottom: 2,
  },
  email: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.textLight,
    marginBottom: theme.SPACING.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
    marginLeft: 4,
  },
  scoreCard: {
    marginHorizontal: theme.SPACING.m,
    marginBottom: theme.SPACING.m,
    padding: theme.SPACING.m,
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.m,
  },
  scoreMeter: {
    height: 12,
    backgroundColor: theme.COLORS.border,
    borderRadius: 6,
    marginBottom: theme.SPACING.s,
    overflow: 'hidden',
  },
  scoreProgress: {
    height: '100%',
    backgroundColor: theme.COLORS.primary,
    borderRadius: 6,
  },
  scoreInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.primary,
    marginRight: theme.SPACING.xs,
  },
  scoreLabel: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
  },
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: theme.SPACING.m,
    marginBottom: theme.SPACING.l,
    padding: theme.SPACING.m,
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.m,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: theme.COLORS.border,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: theme.SIZES.medium,
    fontWeight: '600',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.m,
  },
  menuContainer: {
    marginBottom: theme.SPACING.l,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.SPACING.m,
  },
  menuItemText: {
    flex: 1,
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.text,
  },
  footer: {
    padding: theme.SPACING.l,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
  },
});

export default ProfileScreen; 