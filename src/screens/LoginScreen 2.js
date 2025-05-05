import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen email ve şifre giriniz");
      return;
    }

    setIsLoading(true);
    
    try {
      // Context üzerinden login fonksiyonunu çağır
      const result = await login(email, password);
      
      if (!result.success) {
        throw new Error(result.error || 'Giriş başarısız');
      }
      
      // Giriş yapan kullanıcıyı direkt ana sayfaya yönlendir
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      Alert.alert("Hata", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Eventify</Text>
        </View>

        <Text style={styles.welcomeText}>Eventify'a Hoş Geldiniz</Text>
        <Text style={styles.subtitle}>Hesabınıza giriş yapın ve etkinlikleri keşfedin</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email-outline" size={20} color={theme.COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="E-posta Adresi"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={theme.COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="Şifre"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={theme.COLORS.textLight}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.forgotPasswordButton} 
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, (!email || !password) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <Text style={styles.buttonText}>Giriş Yapılıyor...</Text>
            ) : (
              <Text style={styles.buttonText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerButtonText}>Yeni Hesap Oluştur</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.SPACING.l,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: theme.SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.SPACING.xl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: theme.SPACING.s,
  },
  appName: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.primary,
  },
  welcomeText: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    textAlign: 'center',
    marginBottom: theme.SPACING.s,
  },
  subtitle: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    textAlign: 'center',
    marginBottom: theme.SPACING.xl,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.COLORS.border,
    borderRadius: theme.BORDER_RADIUS.m,
    paddingHorizontal: theme.SPACING.m,
    paddingVertical: Platform.OS === 'ios' ? theme.SPACING.m : 0,
    marginBottom: theme.SPACING.m,
    backgroundColor: theme.COLORS.card,
  },
  input: {
    flex: 1,
    marginLeft: theme.SPACING.s,
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.text,
    paddingVertical: Platform.OS === 'ios' ? 0 : theme.SPACING.m,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: theme.SPACING.l,
  },
  forgotPasswordText: {
    color: theme.COLORS.primary,
    fontSize: theme.SIZES.font,
  },
  loginButton: {
    backgroundColor: theme.COLORS.primary,
    borderRadius: theme.BORDER_RADIUS.m,
    paddingVertical: theme.SPACING.m,
    alignItems: 'center',
    marginBottom: theme.SPACING.l,
  },
  loginButtonDisabled: {
    backgroundColor: theme.COLORS.primaryLight,
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: theme.SIZES.medium,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.SPACING.l,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.COLORS.border,
  },
  dividerText: {
    marginHorizontal: theme.SPACING.m,
    color: theme.COLORS.textLight,
    fontSize: theme.SIZES.small,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: theme.COLORS.primary,
    borderRadius: theme.BORDER_RADIUS.m,
    paddingVertical: theme.SPACING.m,
    alignItems: 'center',
  },
  registerButtonText: {
    color: theme.COLORS.primary,
    fontSize: theme.SIZES.medium,
    fontWeight: '600',
  },
});

export default LoginScreen; 