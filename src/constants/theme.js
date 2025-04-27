// Light tema renk paleti
const LIGHT_COLORS = {
  primary: '#1976D2',
  primaryDark: '#0D47A1',
  primaryLight: '#42A5F5',
  accent: '#03A9F4',
  background: '#FFFFFF',
  card: '#F5F5F5',
  text: '#212121',
  textLight: '#757575',
  textDark: '#000000',
  border: '#DDDDDD',
  icon: '#616161',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107'
};

// Dark tema renk paleti
const DARK_COLORS = {
  primary: '#2196F3',
  primaryDark: '#0D47A1',
  primaryLight: '#64B5F6',
  accent: '#29B6F6',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textLight: '#AAAAAA',
  textDark: '#E0E0E0',
  border: '#333333',
  icon: '#9E9E9E',
  success: '#66BB6A',
  error: '#EF5350',
  warning: '#FFCA28'
};

const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
};

const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

const BORDER_RADIUS = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
};

// Ortak değerler
const COMMON = {
  SIZES,
  FONTS,
  SPACING,
  BORDER_RADIUS
};

// Light tema
export const lightTheme = {
  COLORS: LIGHT_COLORS,
  ...COMMON
};

// Dark tema
export const darkTheme = {
  COLORS: DARK_COLORS,
  ...COMMON
};

// Varsayılan tema (light) - geriye dönük uyumluluk için
const COLORS = LIGHT_COLORS;

export default {
  COLORS,
  SIZES,
  FONTS,
  SPACING,
  BORDER_RADIUS,
  lightTheme,
  darkTheme
}; 