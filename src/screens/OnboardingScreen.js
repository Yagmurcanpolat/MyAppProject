import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../constants/theme';
import { API_URL } from '../config/api';

const OnboardingScreen = ({ navigation, route }) => {
  const { userId } = route.params; // Kayıt olan kullanıcının ID'si
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);

  const interestOptions = [
    { id: '1', name: 'Teknoloji', icon: 'laptop' },
    { id: '2', name: 'Sağlık & Spor', icon: 'heart' },
    { id: '3', name: 'İş Dünyası', icon: 'briefcase' },
    { id: '4', name: 'Sanat', icon: 'palette' },
    { id: '5', name: 'Spor', icon: 'basketball' },
    { id: '6', name: 'Eğlence', icon: 'music' },
    { id: '7', name: 'Eğitim', icon: 'school' },
    { id: '8', name: 'Yemek & İçecek', icon: 'food' },
    { id: '9', name: 'Topluluk', icon: 'account-group' },
  ];

  const toggleInterest = (interestId) => {
    if (interests.includes(interestId)) {
      setInterests(interests.filter(id => id !== interestId));
    } else {
      setInterests([...interests, interestId]);
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Image 
        source={require('../../assets/icon.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.welcomeTitle}>Eventify'a Hoş Geldiniz!</Text>
      <Text style={styles.welcomeDescription}>
        Etkinlikleri keşfedin, planlamanızı yapın ve yeni insanlarla tanışın.
        Hadi başlayalım!
      </Text>
      <Image 
        source={{ uri: 'https://source.unsplash.com/random/400x300/?event'}}
        style={styles.welcomeImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderStep2 = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView contentContainerStyle={styles.stepContainer}>
        <Text style={styles.stepTitle}>Profil Bilgileriniz</Text>
        <Text style={styles.stepDescription}>
          Diğer katılımcıların sizi tanıyabilmesi için hakkınızda biraz bilgi paylaşın.
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Adınız</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account" size={20} color={theme.COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="Adınız ve Soyadınız"
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={styles.inputLabel}>Hakkınızda</Text>
          <View style={[styles.inputContainer, styles.bioInputContainer]}>
            <TextInput
              style={styles.bioInput}
              placeholder="Kendinizi kısaca tanıtın..."
              value={bio}
              onChangeText={setBio}
              multiline
              textAlignVertical="top"
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderStep3 = () => (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <Text style={styles.stepTitle}>Kendinizi Tanıtın</Text>
      <Text style={styles.stepDescription}>
        Diğer kullanıcıların sizi daha iyi tanıması için kendinizi tanıtın ve ilgi alanlarınızı seçin.
      </Text>

      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Hakkınızda</Text>
        <View style={[styles.inputContainer, styles.bioInputContainer]}>
          <TextInput
            style={styles.bioInput}
            placeholder="Kendinizi kısaca tanıtın..."
            value={bio}
            onChangeText={setBio}
            multiline
            textAlignVertical="top"
            numberOfLines={4}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>İlgi Alanlarınız</Text>
      <Text style={styles.sectionDescription}>
        İlgi alanlarınızı seçerek size uygun etkinlikleri daha kolay bulun.
      </Text>

      <View style={styles.interestsContainer}>
        {interestOptions.map((interest) => (
          <TouchableOpacity
            key={interest.id}
            style={[
              styles.interestItem,
              interests.includes(interest.id) && styles.selectedInterestItem
            ]}
            onPress={() => toggleInterest(interest.id)}
          >
            <MaterialCommunityIcons
              name={interest.icon}
              size={24}
              color={interests.includes(interest.id) ? 'white' : theme.COLORS.primary}
            />
            <Text
              style={[
                styles.interestName,
                interests.includes(interest.id) && styles.selectedInterestName
              ]}
            >
              {interest.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch(step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Son adımda kullanıcı bilgilerini MongoDB'ye kaydet
      try {
        const userData = {
          userId,
          name,
          bio,
          interests: interests.map(id => {
            const interest = interestOptions.find(opt => opt.id === id);
            return {
              id: interest.id,
              name: interest.name
            };
          })
        };

        const response = await axios.post(`${API_URL}/api/users/complete-profile`, userData);
        
        if (response.data.success) {
          // Kullanıcı bilgilerini local storage'a kaydet
          await AsyncStorage.setItem('userProfile', JSON.stringify(userData));
          
          // Ana sayfaya yönlendir
          navigation.replace('MainTabs');
        } else {
          Alert.alert('Hata', 'Profil bilgileri kaydedilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Profile completion error:', error);
        Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    // Kullanıcı geri tuşuna basarsa uyarı göster
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(
        'Profil Tamamlanmadı',
        'Profil bilgilerinizi tamamlamadan çıkmak istediğinize emin misiniz? Bu işlem hesabınızı etkileyebilir.',
        [
          { text: 'Hayır, Devam Et', style: 'cancel', onPress: () => {} },
          {
            text: 'Evet, Çık',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action)
          }
        ]
      );
    });

    return unsubscribe;
  }, [navigation]);

  const isNextButtonDisabled = () => {
    if (step === 2) {
      return !name || !bio;
    }
    if (step === 3) {
      return interests.length === 0;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {renderContent()}
      
      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          {[1, 2, 3].map((dot) => (
            <View
              key={dot}
              style={[
                styles.progressDot,
                step === dot && styles.progressDotActive
              ]}
            />
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>Geri</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[
              styles.nextButton,
              isNextButtonDisabled() && styles.nextButtonDisabled
            ]}
            onPress={handleNext}
            disabled={isNextButtonDisabled()}
          >
            <Text style={styles.nextButtonText}>
              {step === 3 ? 'Tamamla' : 'Devam Et'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  stepContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.SPACING.l,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: theme.SPACING.m,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: theme.SPACING.m,
  },
  welcomeTitle: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    textAlign: 'center',
    marginBottom: theme.SPACING.m,
  },
  welcomeDescription: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    textAlign: 'center',
    marginBottom: theme.SPACING.xl,
    lineHeight: 22,
  },
  welcomeImage: {
    width: '100%',
    height: 200,
    borderRadius: theme.BORDER_RADIUS.m,
    marginBottom: theme.SPACING.m,
  },
  stepTitle: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.s,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    textAlign: 'center',
    marginBottom: theme.SPACING.xl,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginTop: theme.SPACING.xl,
    marginBottom: theme.SPACING.s,
  },
  sectionDescription: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    marginBottom: theme.SPACING.xl,
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
    marginBottom: theme.SPACING.l,
  },
  inputLabel: {
    fontSize: theme.SIZES.medium,
    fontWeight: '500',
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.COLORS.border,
    borderRadius: theme.BORDER_RADIUS.m,
    paddingHorizontal: theme.SPACING.m,
    paddingVertical: Platform.OS === 'ios' ? theme.SPACING.m : 0,
    marginBottom: theme.SPACING.l,
    backgroundColor: theme.COLORS.card,
  },
  bioInputContainer: {
    paddingVertical: theme.SPACING.s,
    height: 120,
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    marginLeft: theme.SPACING.s,
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.text,
    paddingVertical: Platform.OS === 'ios' ? 0 : theme.SPACING.m,
  },
  bioInput: {
    flex: 1,
    width: '100%',
    height: '100%',
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.text,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.SPACING.l,
  },
  interestItem: {
    width: '30%',
    paddingVertical: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.s,
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.m,
    marginBottom: theme.SPACING.m,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  selectedInterestItem: {
    backgroundColor: theme.COLORS.primary,
    borderColor: theme.COLORS.primary,
  },
  interestName: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.text,
    marginTop: theme.SPACING.xs,
    textAlign: 'center',
  },
  selectedInterestName: {
    color: 'white',
  },
  footer: {
    paddingHorizontal: theme.SPACING.l,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: theme.COLORS.border,
    paddingTop: theme.SPACING.m,
    backgroundColor: theme.COLORS.background,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.SPACING.m,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.COLORS.border,
    marginHorizontal: theme.SPACING.xs,
  },
  progressDotActive: {
    backgroundColor: theme.COLORS.primary,
    width: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: theme.SPACING.m,
    paddingHorizontal: theme.SPACING.xl,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
    borderRadius: theme.BORDER_RADIUS.m,
  },
  backButtonText: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.text,
    fontWeight: '500',
  },
  nextButton: {
    flex: 1,
    backgroundColor: theme.COLORS.primary,
    paddingVertical: theme.SPACING.m,
    alignItems: 'center',
    borderRadius: theme.BORDER_RADIUS.m,
    marginLeft: theme.SPACING.m,
  },
  nextButtonDisabled: {
    backgroundColor: theme.COLORS.primaryLight,
    opacity: 0.7,
  },
  nextButtonText: {
    color: 'white',
    fontSize: theme.SIZES.medium,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen; 