import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Hata", "Şifreler eşleşmiyor");
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = {
        name,
        email,
        password,
      };

      console.log('Attempting registration...');
      const result = await register(userData);
      console.log('Registration result:', result);
      
      if (result.success) {
        console.log('Registration successful, navigating to Main screen...');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        throw new Error(result.error || 'Kayıt işlemi başarısız oldu');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        "Kayıt Hatası",
        error.message || "Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
      );
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

        <Text style={styles.welcomeText}>Yeni Hesap Oluştur</Text>
        <Text style={styles.subtitle}>Bilgilerinizi girerek etkinlikleri keşfetmeye başlayın</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account-outline" size={20} color={theme.COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="Adınız ve Soyadınız"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

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

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={theme.COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="Şifre Tekrar"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.registerButton, (!name || !email || !password || !confirmPassword) && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={isLoading || !name || !email || !password || !confirmPassword}
          >
            {isLoading ? (
              <Text style={styles.buttonText}>Kaydediliyor...</Text>
            ) : (
              <Text style={styles.buttonText}>Kaydol</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Zaten bir hesabınız var mı?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
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
  registerButton: {
    backgroundColor: theme.COLORS.primary,
    borderRadius: theme.BORDER_RADIUS.m,
    paddingVertical: theme.SPACING.m,
    alignItems: 'center',
    marginTop: theme.SPACING.m,
    marginBottom: theme.SPACING.l,
  },
  registerButtonDisabled: {
    backgroundColor: theme.COLORS.primaryLight,
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: theme.SIZES.medium,
    fontWeight: 'bold',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: theme.SPACING.m,
  },
  loginPromptText: {
    color: theme.COLORS.textLight,
    fontSize: theme.SIZES.font,
  },
  loginLink: {
    color: theme.COLORS.primary,
    fontSize: theme.SIZES.font,
    fontWeight: '600',
    marginLeft: theme.SPACING.xs,
  },
});

export default RegisterScreen;
