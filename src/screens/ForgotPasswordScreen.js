import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetLink = () => {
    if (!email) {
      alert('Lütfen e-posta adresinizi girin');
      return;
    }

    setIsLoading(true);
    // Gerçek uygulamada API isteği ile şifre sıfırlama bağlantısı gönderilecektir
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Şifremi Unuttum</Text>
        <Text style={styles.subtitle}>
          E-posta adresinizi girin ve size şifre sıfırlama bağlantısı gönderelim
        </Text>

        {!isSent ? (
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

            <TouchableOpacity
              style={[styles.sendButton, !email && styles.sendButtonDisabled]}
              onPress={handleSendResetLink}
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <Text style={styles.buttonText}>Gönderiliyor...</Text>
              ) : (
                <Text style={styles.buttonText}>Sıfırlama Bağlantısı Gönder</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <MaterialCommunityIcons name="check-circle" size={64} color={theme.COLORS.success} />
            </View>
            <Text style={styles.successTitle}>Bağlantı Gönderildi!</Text>
            <Text style={styles.successMessage}>
              {email} adresine şifre sıfırlama bağlantısı gönderdik. Lütfen e-postanızı kontrol edin ve bağlantıya tıklayarak şifrenizi sıfırlayın.
            </Text>
            <TouchableOpacity
              style={styles.backToLoginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.backToLoginText}>Giriş Sayfasına Dön</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>E-posta almadınız mı?</Text>
          <TouchableOpacity 
            onPress={() => {
              if (isSent) {
                handleSendResetLink();
              }
            }}
            disabled={!isSent || isLoading}
          >
            <Text style={[styles.resendText, !isSent && styles.disabledText]}>
              Tekrar Gönder
            </Text>
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
  backButton: {
    marginBottom: theme.SPACING.m,
  },
  title: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.s,
  },
  subtitle: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    marginBottom: theme.SPACING.xl,
    lineHeight: 22,
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
  sendButton: {
    backgroundColor: theme.COLORS.primary,
    borderRadius: theme.BORDER_RADIUS.m,
    paddingVertical: theme.SPACING.m,
    alignItems: 'center',
    marginTop: theme.SPACING.m,
  },
  sendButtonDisabled: {
    backgroundColor: theme.COLORS.primaryLight,
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: theme.SIZES.medium,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: theme.SPACING.xl,
  },
  successIconContainer: {
    marginBottom: theme.SPACING.l,
  },
  successTitle: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.m,
  },
  successMessage: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.SPACING.l,
  },
  backToLoginButton: {
    backgroundColor: theme.COLORS.primary,
    borderRadius: theme.BORDER_RADIUS.m,
    paddingVertical: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.xl,
    alignItems: 'center',
    marginTop: theme.SPACING.m,
  },
  backToLoginText: {
    color: 'white',
    fontSize: theme.SIZES.medium,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.SPACING.xl,
  },
  footerText: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.textLight,
    marginRight: theme.SPACING.xs,
  },
  resendText: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.primary,
    fontWeight: '600',
  },
  disabledText: {
    color: theme.COLORS.textLight,
  },
});

export default ForgotPasswordScreen; 