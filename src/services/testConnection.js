import { apiCall } from './apiBase';

export const testConnection = async () => {
  try {
    console.log('Testing connection to backend server...');
    
    // Sadece sunucunun erişilebilir olup olmadığını kontrol et
    try {
      const response = await fetch('http://192.168.1.101:5001/api/users');
      console.log('Server response status:', response.status);
      
      // Sunucu yanıt veriyorsa bağlantı başarılı
      return { 
        success: true, 
        message: 'Backend server is accessible'
      };
    } catch (error) {
      console.error('Connection test failed:', error);
      return { 
        success: false, 
        message: 'Backend server is not accessible',
        error: 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.'
      };
    }
  } catch (error) {
    console.error('Connection test error:', error);
    return { 
      success: false, 
      message: 'Backend server is not accessible',
      error: error.message || 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    };
  }
};