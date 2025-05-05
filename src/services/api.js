import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from './apiBase'; // apiCall: fetch/axios ile istek atan yardımcı fonksiyon

// Backend API'nin temel URL'i (kendi sunucu adresinizi buraya yazın)
const API_URL = 'http://192.168.1.101:5001/api';

// Token almak için yardımcı fonksiyon
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@user_token');
    if (!token) {
      console.warn('No token found in AsyncStorage');
      return null;
    }
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Token'ı kontrol et ve gerekirse yenile
const ensureValidToken = async () => {
  const token = await getToken();
  if (!token) {
    throw new Error('Kimlik doğrulama token\'ı bulunamadı. Lütfen tekrar giriş yapın.');
  }
  return token;
};

// Kullanıcı işlemleri
export const userService = {
  login: async (email, password) => {
    try {
      const data = await apiCall('/users/login', 'POST', { email, password });
      if (data && data.token) {
        await AsyncStorage.setItem('@user_token', data.token);
        await AsyncStorage.setItem('@user_info', JSON.stringify(data));
        return data;
      }
      throw new Error('Sunucudan geçersiz yanıt alındı');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Giriş başarısız oldu');
    }
  },
  
  register: async (name, email, password) => {
    try {
      const data = await apiCall('/users', 'POST', { name, email, password });
      if (data && data.token) {
        await AsyncStorage.setItem('@user_token', data.token);
        await AsyncStorage.setItem('@user_info', JSON.stringify(data));
        return data;
      }
      throw new Error('Sunucudan geçersiz yanıt alındı');
    } catch (error) {
      console.error('Register error:', error);
      throw new Error(error.message || 'Kayıt başarısız oldu');
    }
  },
  
  getProfile: async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Kimlik doğrulama token\'ı bulunamadı');
      return await apiCall('/users/profile', 'GET', null, token);
    } catch (error) {
      console.error('Get profile error:', error);
      throw new Error(error.message || 'Profil bilgileri alınamadı');
    }
  },
  
  updateProfile: async (userData) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Kimlik doğrulama token\'ı bulunamadı');
      return await apiCall('/users/profile', 'PUT', userData, token);
    } catch (error) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Profil güncellenemedi');
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('@user_token');
      await AsyncStorage.removeItem('@user_info');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};

// Etkinlik işlemleri
export const eventService = {
  getEvents: async (filters = {}) => {
    try {
      let queryString = '';
      if (Object.keys(filters).length > 0) {
        queryString = '?' + new URLSearchParams(filters).toString();
      }
      return await apiCall(`/events${queryString}`);
    } catch (error) {
      console.error('Get events error:', error);
      throw new Error(error.message || 'Etkinlikler alınamadı');
    }
  },
  
  getEventById: async (id) => {
    try {
      return await apiCall(`/events/${id}`);
    } catch (error) {
      console.error('Get event by id error:', error);
      throw new Error(error.message || 'Etkinlik detayları alınamadı');
    }
  },
  
  createEvent: async (eventData) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Oturum açmanız gerekiyor');
      }
      
      // Kullanıcı bilgilerini al
      const userInfoStr = await AsyncStorage.getItem('@user_info');
      const userInfo = JSON.parse(userInfoStr);
      
      // eventData'ya organizer ekle
      const eventWithOrganizer = {
        ...eventData,
        organizer: userInfo._id // Kullanıcı ID'sini ekle
      };
      
      console.log('Sending event data:', eventWithOrganizer);
      const response = await apiCall('/events', 'POST', eventWithOrganizer, token);
      console.log('Event creation response:', response);
      return response;
    } catch (error) {
      console.error('Create event error:', error);
      throw error;
    }
  },
  
  updateEvent: async (id, eventData) => {
    try {
      const token = await ensureValidToken();
      return await apiCall(`/events/${id}`, 'PUT', eventData, token);
    } catch (error) {
      console.error('Update event error:', error);
      throw new Error(error.message || 'Etkinlik güncellenemedi');
    }
  },
  
  deleteEvent: async (id) => {
    try {
      const token = await ensureValidToken();
      return await apiCall(`/events/${id}`, 'DELETE', null, token);
    } catch (error) {
      console.error('Delete event error:', error);
      throw new Error(error.message || 'Etkinlik silinemedi');
    }
  },
  
  getUserEvents: async () => {
    try {
      const token = await ensureValidToken();
      const response = await apiCall('/events/user', 'GET', null, token);
      console.log('User events response:', response); // Debug için log ekleyelim
      return response;
    } catch (error) {
      console.error('Get user events error:', error);
      throw new Error(error.message || 'Kullanıcı etkinlikleri alınamadı');
    }
  }
};

// Kategori işlemleri
export const categoryService = {
  getCategories: async () => {
    try {
      return await apiCall('/categories');
    } catch (error) {
      console.error('Get categories error:', error);
      throw new Error(error.message || 'Kategoriler alınamadı');
    }
  },
  
  createCategory: async (categoryData) => {
    try {
      const token = await ensureValidToken();
      return await apiCall('/categories', 'POST', categoryData, token);
    } catch (error) {
      console.error('Create category error:', error);
      throw new Error(error.message || 'Kategori oluşturulamadı');
    }
  }
};
