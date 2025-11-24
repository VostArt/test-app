// context/AppContext.js
import React, { createContext, useState, useContext } from 'react';
import { lightTheme, darkTheme, grayTheme } from '../styles/theme';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('dark'); // 'dark', 'light', 'gray'
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Функция для получения текущей темы
  const getTheme = () => {
    switch (themeMode) {
      case 'dark':
        return darkTheme;
      case 'light':
        return lightTheme;
      case 'gray':
        return grayTheme;
      default:
        return darkTheme;
    }
  };

  // Функция переключения темы (циклически)
  const toggleTheme = () => {
    const nextTheme = {
      'dark': 'light',
      'light': 'gray', 
      'gray': 'dark'
    }[themeMode];
    setThemeMode(nextTheme);
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const isDarkMode = themeMode === 'dark';

  return (
    <AppContext.Provider value={{
      theme: getTheme(),
      themeMode,
      toggleTheme,
      isDarkMode,
      notification,
      showNotification,
      hideNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};