import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert,
  Switch
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../constants/theme';
import { eventService } from '../services/api';

const CreateEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('https://source.unsplash.com/random/400x200/?event');
  const [isOnline, setIsOnline] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [capacity, setCapacity] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleCreateEvent = async () => {
    if (!title || !description || !location || !category || !time) {
      Alert.alert('Error', 'Please fill all the required fields');
      return;
    }

    if (isOnline && !meetingLink) {
      Alert.alert('Error', 'Please provide a meeting link for online events');
      return;
    }

    try {
      setIsLoading(true);
      
      const eventData = {
        title,
        description,
        location,
        category,
        categories: selectedCategories.length > 0 ? selectedCategories : [category],
        date: date.toISOString().split('T')[0],
        time,
        price: price || 'Free',
        image,
        isOnline,
        meetingLink: isOnline ? meetingLink : null,
        capacity: capacity ? parseInt(capacity) : null,
      };
      
      await eventService.createEvent(eventData);
      
      setIsLoading(false);
      Alert.alert(
        'Success', 
        'Event created successfully', 
        [{ text: 'OK', onPress: () => navigation.navigate('MyEvents') }]
      );
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to create event. Please try again.');
      console.error('Error creating event:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.COLORS.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Event</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formGroup}>
          <Text style={styles.label}>Event Title*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event title"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description*</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your event"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.formRow}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Online Event</Text>
            <Switch
              trackColor={{ false: theme.COLORS.border, true: theme.COLORS.primary + '50' }}
              thumbColor={isOnline ? theme.COLORS.primary : '#f4f3f4'}
              onValueChange={setIsOnline}
              value={isOnline}
            />
          </View>
        </View>
        
        {isOnline ? (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Meeting Link*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter virtual meeting link"
              value={meetingLink}
              onChangeText={setMeetingLink}
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>
        ) : (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter event location"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        )}
        
        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Date*</Text>
            <TouchableOpacity 
              style={styles.input} 
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>
          
          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Time*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 18:00"
              value={time}
              onChangeText={setTime}
            />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category*</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Music, Sport, Art"
            value={category}
            onChangeText={setCategory}
          />
        </View>
        
        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Leave empty for free events"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>
          
          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Capacity</Text>
            <TextInput
              style={styles.input}
              placeholder="Max participants"
              value={capacity}
              onChangeText={setCapacity}
              keyboardType="numeric"
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateEvent}
        >
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: theme.SPACING.m,
    paddingBottom: theme.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.SPACING.m,
  },
  formGroup: {
    marginBottom: theme.SPACING.m,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: theme.SPACING.m,
  },
  label: {
    fontSize: theme.SIZES.font,
    fontWeight: '500',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.xs,
  },
  input: {
    backgroundColor: theme.COLORS.card,
    paddingVertical: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.m,
    borderRadius: theme.BORDER_RADIUS.m,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateText: {
    color: theme.COLORS.text,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.COLORS.card,
    paddingVertical: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.m,
    borderRadius: theme.BORDER_RADIUS.m,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
    flex: 1,
  },
  switchLabel: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.text,
  },
  createButton: {
    backgroundColor: theme.COLORS.primary,
    paddingVertical: theme.SPACING.m,
    borderRadius: theme.BORDER_RADIUS.m,
    alignItems: 'center',
    marginTop: theme.SPACING.m,
  },
  createButtonText: {
    color: 'white',
    fontSize: theme.SIZES.font,
    fontWeight: 'bold',
  },
});

export default CreateEventScreen; 