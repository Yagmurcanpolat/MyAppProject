import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import userService from '../services/userService';

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const token = await AsyncStorage.getItem('@user_token');
      const userData = await AsyncStorage.getItem('@user_data');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('AuthContext: Attempting login with email:', email);
      
      const response = await userService.login(email, password);
      console.log('AuthContext: Login response:', response);
      
      if (!response || !response.token) {
        console.error('AuthContext: Invalid login response:', response);
        throw new Error('Giriş başarısız oldu: Geçersiz yanıt');
      }
      
      // Token ve kullanıcı bilgilerini kaydet
      await AsyncStorage.setItem('@user_token', response.token);
      await AsyncStorage.setItem('@user_data', JSON.stringify(response.user));
      
      setUser(response.user);
      return { success: true };
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Giriş yapılırken bir hata oluştu'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      console.log('Starting registration process...');
      
      const response = await userService.register(userData);
      console.log('Registration successful:', response);
      
      // Store user data and token
      await AsyncStorage.setItem('@user_token', response.token);
      await AsyncStorage.setItem('@user_data', JSON.stringify(response.user));
      
      // Update the user state
      setUser(response.user);
      
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { 
        success: false, 
        error: error.message || 'Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user_token');
      await AsyncStorage.removeItem('@user_data');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
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
    user,
    loading,
    login,
    logout,
    register,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
