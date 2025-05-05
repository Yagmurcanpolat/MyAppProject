import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend API'nin temel URL'i (kendi sunucu adresinizi buraya yazın)
const API_URL = 'http://localhost:5000/api';

// Token almak için yardımcı fonksiyon
const getToken = async () => {
  return await AsyncStorage.getItem('@user_token');
};

// API çağrısı yapmak için genel fonksiyon
const apiCall = async (endpoint, method = 'GET', body = null, withAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (withAuth) {
    const token = await getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Bir hata oluştu');
  }

  return data;
};

// Kullanıcı işlemleri
export const userService = {
  login: async (email, password) => {
    const data = await apiCall('/users/login', 'POST', { email, password });
    await AsyncStorage.setItem('@user_token', data.token);
    await AsyncStorage.setItem('@user_info', JSON.stringify(data));
    return data;
  },
  
  register: async (name, email, password) => {
    const data = await apiCall('/users', 'POST', { name, email, password });
    await AsyncStorage.setItem('@user_token', data.token);
    await AsyncStorage.setItem('@user_info', JSON.stringify(data));
    return data;
  },
  
  getProfile: async () => {
    return await apiCall('/users/profile', 'GET', null, true);
  },
  
  updateProfile: async (userData) => {
    return await apiCall('/users/profile', 'PUT', userData, true);
  },

  logout: async () => {
    await AsyncStorage.removeItem('@user_token');
    await AsyncStorage.removeItem('@user_info');
  }
};

// Etkinlik işlemleri
export const eventService = {
  getEvents: async (filters = {}) => {
    let queryString = '';
    if (Object.keys(filters).length > 0) {
      queryString = '?' + new URLSearchParams(filters).toString();
    }
    return await apiCall(`/events${queryString}`);
  },
  
  getEventById: async (id) => {
    return await apiCall(`/events/${id}`);
  },
  
  createEvent: async (eventData) => {
    return await apiCall('/events', 'POST', eventData, true);
  },
  
  updateEvent: async (id, eventData) => {
    return await apiCall(`/events/${id}`, 'PUT', eventData, true);
  },
  
  deleteEvent: async (id) => {
    return await apiCall(`/events/${id}`, 'DELETE', null, true);
  },
  
  getUserEvents: async () => {
    return await apiCall('/events/user/events', 'GET', null, true);
  }
};

// Kategori işlemleri
export const categoryService = {
  getCategories: async () => {
    return await apiCall('/categories');
  },
  
  createCategory: async (categoryData) => {
    return await apiCall('/categories', 'POST', categoryData, true);
  }
};
