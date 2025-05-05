import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { userService } from '../services/api';

// Varsayılan context değerleri
const defaultContext = {
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  updateUser: () => {},
  loading: true,
};

// Context oluşturma
export const AuthContext = createContext(defaultContext);

// Provider bileşeni
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Uygulama başladığında oturum durumunu kontrol etme
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // AsyncStorage'dan kullanıcı bilgilerini al
        const userToken = await AsyncStorage.getItem('@user_token');
        const userData = await AsyncStorage.getItem('@user_data');
        
        if (userToken !== null && userData !== null) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('Error checking login status:', e);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Giriş işlevi
  const login = async (email, password) => {
    try {
      setLoading(true);

      // Normalde burada API çağrısı yapılacak
      // const response = await authService.login(email, password);
      
      // Girilen email bilgisini kullanarak kullanıcı verisi oluştur
      const mockUserData = {
        id: 'user123',
        name: email.split('@')[0], // Email adresinden kullanıcı adı oluştur
        email: email,
        avatar: 'https://source.unsplash.com/random/400x400/?portrait',
        participationScore: 85,
        interests: ['Technology', 'Music', 'Arts'],
        location: 'Istanbul, Turkey',
        attendedEvents: 3,
        upcomingEvents: 2,
        savedEvents: 5
      };
      
      const mockToken = 'mock_token_' + Date.now();
      
      // Kullanıcı bilgilerini kaydet
      await AsyncStorage.setItem('@user_token', mockToken);
      await AsyncStorage.setItem('@user_data', JSON.stringify(mockUserData));
      
      setUser(mockUserData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Çıkış işlevi
  const logout = async () => {
    try {
      setLoading(true);
      
      // AsyncStorage'dan kullanıcı verilerini temizle
      await AsyncStorage.removeItem('@user_token');
      await AsyncStorage.removeItem('@user_data');
      
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Logout failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Kayıt işlevi
  const register = async (name, email, password) => {
    try {
      setLoading(true);

      // Normalde burada API çağrısı yapılacak
      // const response = await authService.register(name, email, password);
      
      // Kullanıcının girdiği ad ve email bilgilerini kullan
      const mockUserData = {
        id: 'user_' + Date.now(),
        name: name,
        email: email,
        avatar: 'https://source.unsplash.com/random/400x400/?portrait',
        participationScore: 0,
        interests: [],
        location: 'Istanbul, Turkey',
        attendedEvents: 0,
        upcomingEvents: 0,
        savedEvents: 0
      };
      
      const mockToken = 'mock_token_' + Date.now();
      
      // Kullanıcı bilgilerini kaydet
      await AsyncStorage.setItem('@user_token', mockToken);
      await AsyncStorage.setItem('@user_data', JSON.stringify(mockUserData));
      
      setUser(mockUserData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı bilgilerini güncelleme
  const updateUser = async (userData) => {
    try {
      setLoading(true);

      // Mevcut kullanıcı bilgilerini al
      const currentUserData = await AsyncStorage.getItem('@user_data');
      if (currentUserData === null) {
        throw new Error('User data not found');
      }
      
      // Mevcut bilgilerle yenileri birleştir
      const updatedUserData = {
        ...JSON.parse(currentUserData),
        ...userData,
      };
      
      // Güncellenmiş bilgileri kaydet
      await AsyncStorage.setItem('@user_data', JSON.stringify(updatedUserData));
      
      setUser(updatedUserData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Failed to update user data. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Context provider değerleri
  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    updateUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
