import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';
import categories from '../constants/categories';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import InterestItem from '../components/InterestItem';

const UserInterestsScreen = ({ navigation, route }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Kullanıcı bilgileri
  const [fullName, setFullName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  
  const isFirstTimeSetup = route.params?.isFirstTimeSetup || false;

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prevSelected => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter(id => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategories.includes(item.id) && styles.selectedCategoryItem
      ]}
      onPress={() => toggleCategory(item.id)}
    >
      <MaterialCommunityIcons 
        name={item.icon} 
        size={24} 
        color={selectedCategories.includes(item.id) ? 'white' : theme.COLORS.primary} 
      />
      <Text 
        style={[
          styles.categoryName,
          selectedCategories.includes(item.id) && styles.selectedCategoryName
        ]}
      >
        {item.name}
      </Text>
      {selectedCategories.includes(item.id) && (
        <MaterialCommunityIcons name="check" size={18} color="white" style={styles.checkIcon} />
      )}
    </TouchableOpacity>
  );

  const handleComplete = async () => {
    if (!bio.trim()) {
      alert('Lütfen kendinizi tanıtan bir metin girin');
      return;
    }

    if (selectedCategories.length === 0) {
      alert('Lütfen en az bir ilgi alanı seçin');
      return;
    }

    try {
      setIsLoading(true);

      const token = await AsyncStorage.getItem('@user_token');
      const userInfo = await AsyncStorage.getItem('@user_info');
      const userData = JSON.parse(userInfo);

      // İlgi alanlarını doğru formatta hazırla
      const selectedInterests = selectedCategories.map(categoryId => {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category) {
          throw new Error('Geçersiz kategori seçimi');
        }
        return {
          id: category.id,
          name: category.name
        };
      });

      const response = await fetch('http://192.168.1.106:5001/api/users/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userData._id,
          bio: bio.trim(),
          interests: selectedInterests
        })
      });

      const responseText = await response.text();
      console.log('API yanıtı:', response);
      console.log('Yanıt metni:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        throw new Error('Sunucudan geçersiz yanıt formatı alındı');
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Profil güncellenirken bir hata oluştu');
      }

      // Kullanıcı bilgilerini güncelle
      const updatedUserInfo = {
        ...userData,
        bio: bio.trim(),
        interests: selectedInterests,
        isProfileCompleted: true // Profil tamamlandı olarak işaretle
      };

      await AsyncStorage.setItem('@user_info', JSON.stringify(updatedUserInfo));
      await AsyncStorage.setItem('userSetupCompleted', 'true');

      // Ana sayfaya yönlendir
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });

    } catch (error) {
      console.error('Error saving profile:', error);
      alert(error.message || 'Bilgileriniz kaydedilirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>İlgi Alanlarınız</Text>
          <Text style={styles.subtitle}>Size uygun etkinlikleri bulmamız için ilgi alanlarınızı seçin</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Kendinizi tanıtın..."
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.interestsContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={styles.categoriesGrid}
          />
        </View>

        <View style={styles.footer}>
          <Button
            title={isLoading ? "Kaydediliyor..." : "Devam Et"}
            onPress={handleComplete}
            disabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  interestsContainer: {
    flex: 1,
    padding: 10,
  },
  categoriesGrid: {
    paddingHorizontal: 5,
  },
  categoryItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '30%',
  },
  selectedCategoryItem: {
    backgroundColor: theme.COLORS.primary,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: theme.COLORS.primary,
  },
  selectedCategoryName: {
    color: 'white',
  },
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  }
});

export default UserInterestsScreen;