// context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { lightTheme, darkTheme, grayTheme } from '../styles/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('dark'); // по умолчанию тёмная тема

  const getTheme = () => {
    switch (themeMode) {
      case 'dark':
        return darkTheme;
      case 'gray':
        return grayTheme;
      case 'light':
        return lightTheme;
      default:
        return darkTheme;
    }
  };

  const toggleTheme = (theme) => {
    setThemeMode(theme);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: getTheme(), 
      themeMode, 
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};