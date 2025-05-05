import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// API URL'yi platforma göre ayarla
const API_URL = Platform.select({
  ios: 'http://localhost:5001/api',
  android: 'http://10.0.2.2:5001/api', // Android Emulator için
  default: 'http://192.168.1.106:5001/api' // Gerçek cihaz için - IP adresinize göre güncelleyin
});

// Token'ı AsyncStorage'dan al
export const getToken = async () => {
  return await AsyncStorage.getItem('@user_token');
};

// Genel API çağrısı fonksiyonu
export const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
    };
    
    if (body) {
      config.body = JSON.stringify(body);
    }

    console.log('Making API call to:', `${API_URL}${endpoint}`);
    console.log('With config:', JSON.stringify(config, null, 2));

    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // İlk olarak yanıtın text içeriğini alalım
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    let data;
    try {
      // Text içeriğini JSON'a çevirmeyi deneyelim
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('JSON parse error:', e);
      console.error('Response was:', responseText);
      throw new Error('Sunucudan geçersiz yanıt alındı');
    }

    // Response başarısız ise
    if (!response.ok) {
      throw new Error(data.message || 'Bir hata oluştu');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 