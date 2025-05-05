import { apiCall } from './apiBase';

const userService = {
  login: async (email, password) => {
    try {
      const response = await apiCall('/users/login', 'POST', {
        email,
        password
      });
      
      return {
        success: true,
        token: response.token,
        user: response
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Giriş işlemi sırasında bir hata oluştu'
      };
    }
  },
  
  register: async (userData) => {
    try {
      console.log('Registering user with data:', userData);
      
      const response = await apiCall('/users', 'POST', userData);
      console.log('Register response:', response);
      
      if (!response || !response.token) {
        console.error('Invalid register response:', response);
        throw new Error('Kayıt başarısız oldu: Geçersiz sunucu yanıtı');
      }
      
      return {
        success: true,
        token: response.token,
        user: response
      };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  
  getProfile: async (token) => {
    try {
      const response = await apiCall('/users/profile', 'GET', null, token);
      
      if (!response) {
        throw new Error('Profil bilgileri alınamadı');
      }
      
      return response;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },
  
  updateProfile: async (userData, token) => {
    try {
      const response = await apiCall('/users/profile', 'PUT', userData, token);
      
      if (!response) {
        throw new Error('Profil güncellenemedi');
      }
      
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};

export default userService; 