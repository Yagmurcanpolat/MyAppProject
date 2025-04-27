import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <PaperProvider>
            <StatusBar style="auto" />
            <AppNavigator />
          </PaperProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
