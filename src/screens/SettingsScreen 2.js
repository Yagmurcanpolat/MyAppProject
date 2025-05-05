import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Switch, 
  TextInput, 
  ScrollView, 
  Alert, 
  Modal,
  ActivityIndicator
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../constants/theme';
import { AuthContext } from '../context/AuthContext';

const SettingsScreen = ({ navigation }) => {
  const { user, updateUser, logout } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Email settings
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [newEmail, setNewEmail] = useState('');
  
  // Password settings
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Tema ayarlarını yükleme
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme_mode');
        if (savedTheme === 'dark') {
          setIsDarkMode(true);
        }
      } catch (error) {
        console.error('Tema ayarları yüklenirken hata oluştu:', error);
      }
    };
    
    loadThemeSettings();
  }, []);

  const toggleDarkMode = async () => {
    try {
      const newThemeValue = !isDarkMode;
      setIsDarkMode(newThemeValue);
      
      // Tema ayarını kaydet
      await AsyncStorage.setItem('@theme_mode', newThemeValue ? 'dark' : 'light');
      
      // Burada tema değişikliği için global context'e bildirim yapılabilir
      // themeContext.setTheme(newThemeValue ? 'dark' : 'light');
      
      // Not: Gerçek tema değişimi için bir tema context'i oluşturulması gerekiyor
    } catch (error) {
      console.error('Tema kaydedilirken hata oluştu:', error);
      Alert.alert('Hata', 'Tema ayarları kaydedilemedi.');
    }
  };
  
  const handleUpdateEmail = async () => {
    if (!newEmail || !newEmail.includes('@')) {
      Alert.alert('Geçersiz E-posta', 'Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Kullanıcı bilgilerini güncelle
      const result = await updateUser({ email: newEmail });
      
      if (!result.success) {
        throw new Error(result.error || 'E-posta güncellenemedi');
      }
      
      setEmail(newEmail);
      setNewEmail('');
      setShowEmailModal(false);
      Alert.alert('Başarılı', 'E-posta adresiniz güncellendi.');
    } catch (error) {
      Alert.alert('Hata', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert('Geçersiz Şifre', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      Alert.alert('Şifre Uyuşmuyor', 'Yeni şifreler eşleşmiyor.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Gerçek uygulamada şifre değiştirme işlemi API üzerinden yapılır
      // Burada şifre değişikliği için mock bir başarı dönüyoruz
      
      setTimeout(() => {
        setIsLoading(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowPasswordModal(false);
        Alert.alert('Başarılı', 'Şifreniz başarıyla güncellendi.');
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Hata', 'Şifre güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };
  
  const handleLogout = async () => {
    Alert.alert(
      'Çıkış',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          onPress: async () => {
            try {
              const result = await logout();
              if (result.success) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                });
              } else {
                Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
              }
            } catch (error) {
              Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
            }
          },
        },
      ]
    );
  };

  // Email change modal
  const EmailChangeModal = () => (
    <Modal
      visible={showEmailModal}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>E-posta Değiştir</Text>
          
          <Text style={styles.inputLabel}>Mevcut E-posta</Text>
          <Text style={styles.currentValueText}>{email}</Text>
          
          <Text style={styles.inputLabel}>Yeni E-posta</Text>
          <TextInput
            style={styles.input}
            placeholder="Yeni e-posta adresinizi girin"
            keyboardType="email-address"
            autoCapitalize="none"
            value={newEmail}
            onChangeText={setNewEmail}
          />
          
          <View style={styles.modalButtonRow}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setNewEmail('');
                setShowEmailModal(false);
              }}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleUpdateEmail}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.saveButtonText}>Güncelle</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  
  // Password change modal
  const PasswordChangeModal = () => (
    <Modal
      visible={showPasswordModal}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Şifre Değiştir</Text>
          
          <Text style={styles.inputLabel}>Mevcut Şifre</Text>
          <TextInput
            style={styles.input}
            placeholder="Mevcut şifrenizi girin"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          
          <Text style={styles.inputLabel}>Yeni Şifre</Text>
          <TextInput
            style={styles.input}
            placeholder="Yeni şifrenizi girin"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          
          <Text style={styles.inputLabel}>Yeni Şifre (Tekrar)</Text>
          <TextInput
            style={styles.input}
            placeholder="Yeni şifrenizi tekrar girin"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          
          <View style={styles.modalButtonRow}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setShowPasswordModal(false);
              }}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleUpdatePassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.saveButtonText}>Güncelle</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <View style={{ width: 24 }} /> {/* Balance the header */}
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setShowEmailModal(true)}
          >
            <View style={styles.menuItemContent}>
              <MaterialCommunityIcons name="email" size={24} color={theme.COLORS.primary} />
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>E-posta</Text>
                <Text style={styles.menuItemValue}>{email}</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.COLORS.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setShowPasswordModal(true)}
          >
            <View style={styles.menuItemContent}>
              <MaterialCommunityIcons name="lock" size={24} color={theme.COLORS.primary} />
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>Şifre</Text>
                <Text style={styles.menuItemValue}>••••••••</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.COLORS.icon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tercihler</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <MaterialCommunityIcons 
                name={isDarkMode ? "weather-night" : "weather-sunny"} 
                size={24} 
                color={theme.COLORS.primary} 
              />
              <Text style={styles.menuItemTitle}>Karanlık Mod</Text>
            </View>
            <Switch
              trackColor={{ false: theme.COLORS.border, true: theme.COLORS.primary + '50' }}
              thumbColor={isDarkMode ? theme.COLORS.primary : '#f4f3f4'}
              onValueChange={toggleDarkMode}
              value={isDarkMode}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('UserInterests')}
          >
            <View style={styles.menuItemContent}>
              <MaterialCommunityIcons name="tag-multiple" size={24} color={theme.COLORS.primary} />
              <Text style={styles.menuItemTitle}>İlgi Alanları</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.COLORS.icon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diğer</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <MaterialCommunityIcons name="help-circle" size={24} color={theme.COLORS.primary} />
              <Text style={styles.menuItemTitle}>Yardım ve Destek</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.COLORS.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <MaterialCommunityIcons name="file-document" size={24} color={theme.COLORS.primary} />
              <Text style={styles.menuItemTitle}>Kullanım Koşulları</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.COLORS.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <MaterialCommunityIcons name="information" size={24} color={theme.COLORS.primary} />
              <Text style={styles.menuItemTitle}>Hakkında</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.COLORS.icon} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Eventify v1.0.0</Text>
      </ScrollView>
      
      <EmailChangeModal />
      <PasswordChangeModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: theme.SPACING.m,
    paddingBottom: theme.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  content: {
    padding: theme.SPACING.m,
  },
  section: {
    marginBottom: theme.SPACING.l,
  },
  sectionTitle: {
    fontSize: theme.SIZES.medium,
    fontWeight: '600',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.s,
    paddingHorizontal: theme.SPACING.s,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.m,
    backgroundColor: theme.COLORS.card,
    marginBottom: 1,
    borderRadius: theme.BORDER_RADIUS.s,
    marginBottom: theme.SPACING.s,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: theme.SPACING.m,
  },
  menuItemTitle: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.text,
    marginLeft: theme.SPACING.m,
  },
  menuItemValue: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
  },
  logoutButton: {
    alignItems: 'center',
    padding: theme.SPACING.m,
    backgroundColor: theme.COLORS.error + '20',
    borderRadius: theme.BORDER_RADIUS.m,
    marginVertical: theme.SPACING.l,
  },
  logoutButtonText: {
    fontSize: theme.SIZES.font,
    fontWeight: '600',
    color: theme.COLORS.error,
  },
  versionText: {
    textAlign: 'center',
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
    marginBottom: theme.SPACING.l,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.m,
    padding: theme.SPACING.l,
  },
  modalTitle: {
    fontSize: theme.SIZES.medium,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.m,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
    marginBottom: 4,
  },
  currentValueText: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.m,
  },
  input: {
    backgroundColor: theme.COLORS.background,
    padding: theme.SPACING.m,
    borderRadius: theme.BORDER_RADIUS.s,
    marginBottom: theme.SPACING.m,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: theme.SPACING.m,
    borderRadius: theme.BORDER_RADIUS.s,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.COLORS.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  saveButton: {
    backgroundColor: theme.COLORS.primary,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: theme.COLORS.text,
    fontWeight: '600',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default SettingsScreen; 