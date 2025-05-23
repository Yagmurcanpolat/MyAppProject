import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity, Modal, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import DateFilter from '../components/DateFilter';
import theme from '../constants/theme';
import { eventService, categoryService } from '../services/api';

// Türkiye'deki popüler şehirler
const cities = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 
  'Şanlıurfa', 'Kocaeli', 'Mersin', 'Diyarbakır', 'Hatay', 'Manisa', 'Kayseri', 'Samsun',
  'Balıkesir', 'Kahramanmaraş', 'Van', 'Aydın', 'Denizli', 'Sakarya', 'Tekirdağ', 'Muğla'
];

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'Tümü' }]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCity, setSelectedCity] = useState('İstanbul');
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);

  // Kategorileri yükle
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await categoryService.getCategories();
        if (Array.isArray(response)) {
          setCategories([{ id: 'all', name: 'Tümü' }, ...response]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Hata durumunda varsayılan kategorileri kullan
        setCategories([
          { id: 'all', name: 'Tümü' },
          { id: 'music', name: 'Müzik' },
          { id: 'sports', name: 'Spor' },
          { id: 'education', name: 'Eğitim' },
          { id: 'other', name: 'Diğer' }
        ]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Etkinlikleri yükle
  useEffect(() => {
    fetchEvents();
  }, [searchQuery, selectedCategory, selectedDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const filters = {
        search: searchQuery,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        date: selectedDate
      };
      
      const response = await eventService.getEvents(filters);
      if (Array.isArray(response)) {
        setEvents(response);
        setError(null);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Etkinlikler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

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
      
      {categoriesLoading ? (
        <View style={styles.categoryLoadingContainer}>
          <ActivityIndicator size="small" color={theme.COLORS.primary} />
        </View>
      ) : (
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      )}
      
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
      
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.COLORS.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchEvents}>
            <Text style={styles.retryText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={fetchEvents}
        />
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.SPACING.m,
  },
  errorText: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.error,
    marginBottom: theme.SPACING.s,
  },
  retryText: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.primary,
    fontWeight: 'bold',
  },
  categoryLoadingContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen; 