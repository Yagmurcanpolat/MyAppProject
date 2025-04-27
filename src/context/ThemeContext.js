import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../constants/theme';

// Varsayılan tema değerleri
const defaultThemeContext = {
  theme: lightTheme, // Varsayılan tema açık renk
  isDarkMode: false,
  toggleTheme: () => {},
};

// Context oluşturma
export const ThemeContext = createContext(defaultThemeContext);

// ThemeProvider bileşeni
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  // Uygulama başladığında kayıtlı tema ayarını yükleme
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme_mode');
        if (savedTheme === 'dark') {
          setIsDarkMode(true);
          setTheme(darkTheme);
        }
      } catch (error) {
        console.error('Tema ayarları yüklenirken hata oluştu:', error);
      }
    };
    
    loadThemeSettings();
  }, []);

  // Tema değiştirme fonksiyonu
  const toggleTheme = async () => {
    try {
      const newIsDarkMode = !isDarkMode;
      setIsDarkMode(newIsDarkMode);
      
      // Tema değiştir
      setTheme(newIsDarkMode ? darkTheme : lightTheme);
      
      // Tema ayarını kaydet
      await AsyncStorage.setItem('@theme_mode', newIsDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Tema değiştirilirken hata oluştu:', error);
    }
  };

  // Context değerleri
  const contextValue = {
    theme,
    isDarkMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}; 