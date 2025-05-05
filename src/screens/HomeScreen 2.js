import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import DateFilter from '../components/DateFilter';
import theme from '../constants/theme';
import sampleEvents from '../data/events';
import categories from '../constants/categories';

// Türkiye'deki popüler şehirler
const cities = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 
  'Şanlıurfa', 'Kocaeli', 'Mersin', 'Diyarbakır', 'Hatay', 'Manisa', 'Kayseri', 'Samsun',
  'Balıkesir', 'Kahramanmaraş', 'Van', 'Aydın', 'Denizli', 'Sakarya', 'Tekirdağ', 'Muğla'
];

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState(sampleEvents);
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCity, setSelectedCity] = useState('İstanbul');
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);

  // Filter events based on search, category, and date
  useEffect(() => {
    let result = [...events];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        event => 
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(
        event => event.category === categories.find(c => c.id === selectedCategory)?.name
      );
    }
    
    // Filter by date
    if (selectedDate) {
      result = result.filter(event => event.date === selectedDate);
    }
    
    setFilteredEvents(result);
  }, [searchQuery, selectedCategory, selectedDate, events]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setIsCityModalVisible(false);
    // Gerçek uygulamada şehir seçimine göre etkinlikleri filtreleme işlemi yapılacaktır
  };

  const handleEventPress = (event) => {
    navigation.navigate('EventDetail', { event });
  };

  const renderItem = ({ item }) => (
    <EventCard event={item} onPress={handleEventPress} />
  );

  const renderCityItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.cityItem, 
        selectedCity === item && styles.selectedCityItem
      ]} 
      onPress={() => handleSelectCity(item)}
    >
      <Text 
        style={[
          styles.cityText,
          selectedCity === item && styles.selectedCityText
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Eventify</Text>
        <Text style={styles.headerSubtitle}>Find events near you</Text>
      </View>
      
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={clearSearch}
      />
      
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      
      <DateFilter
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
      
      <View style={styles.locationContainer}>
        <TouchableOpacity 
          style={styles.findNearbyButton}
          onPress={() => setIsCityModalVisible(true)}
        >
          <Text style={styles.findNearbyText}>Yakındaki Etkinlikleri Bul</Text>
          <View style={styles.locationButton}>
            <MaterialCommunityIcons name="map-marker" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.currentLocation}>Şu anki konum: {selectedCity}</Text>
      </View>
      
      {filteredEvents.length > 0 ? (
        <FlatList
          data={filteredEvents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No events found</Text>
          <Text style={styles.emptySubtext}>Try changing your filters</Text>
        </View>
      )}
      
      {/* Şehir Seçimi Modal */}
      <Modal
        visible={isCityModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCityModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Şehir Seçin</Text>
              <TouchableOpacity onPress={() => setIsCityModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color={theme.COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={cities}
              renderItem={renderCityItem}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.cityList}
              showsVerticalScrollIndicator={false}
              numColumns={2}
            />
          </View>
        </View>
      </Modal>
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
    paddingTop: theme.SPACING.m,
    paddingBottom: theme.SPACING.s,
  },
  headerTitle: {
    fontSize: theme.SIZES.xxlarge,
    fontWeight: 'bold',
    color: theme.COLORS.primary,
  },
  headerSubtitle: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    marginTop: theme.SPACING.xs,
  },
  locationContainer: {
    paddingHorizontal: theme.SPACING.m,
    marginBottom: theme.SPACING.m,
  },
  findNearbyButton: {
    flexDirection: 'row',
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.m,
    padding: theme.SPACING.s,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.COLORS.border,
    justifyContent: 'space-between',
  },
  findNearbyText: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.text,
    fontWeight: '500',
    marginLeft: theme.SPACING.s,
  },
  locationButton: {
    backgroundColor: theme.COLORS.primary,
    padding: theme.SPACING.xs,
    borderRadius: theme.BORDER_RADIUS.m,
  },
  currentLocation: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
    marginTop: theme.SPACING.xs,
    marginLeft: theme.SPACING.s,
  },
  listContent: {
    paddingHorizontal: theme.SPACING.m,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.COLORS.background,
    borderTopLeftRadius: theme.BORDER_RADIUS.l,
    borderTopRightRadius: theme.BORDER_RADIUS.l,
    paddingVertical: theme.SPACING.l,
    paddingHorizontal: theme.SPACING.m,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.SPACING.m,
    paddingBottom: theme.SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  modalTitle: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  cityList: {
    paddingBottom: theme.SPACING.m,
  },
  cityItem: {
    flex: 1,
    margin: theme.SPACING.xs,
    padding: theme.SPACING.m,
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  selectedCityItem: {
    backgroundColor: theme.COLORS.primary,
    borderColor: theme.COLORS.primary,
  },
  cityText: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.text,
  },
  selectedCityText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default HomeScreen; 