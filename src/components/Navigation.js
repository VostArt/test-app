// components/Navigation.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Home as HomeIcon,
  Computer as TechIcon,
  Analytics as StatsIcon,
  Add as AddIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import ApiStatus from './ApiStatus';

function Navigation() {
  const location = useLocation();
  const { themeMode, toggleTheme } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { path: '/', label: 'Главная', icon: <HomeIcon /> },
    { path: '/technologies', label: 'Все технологии', icon: <TechIcon /> },
    { path: '/statistics', label: 'Статистика', icon: <StatsIcon /> },
    { path: '/add-technology', label: 'Добавить', icon: <AddIcon /> },
    { path: '/settings', label: 'Настройки', icon: <SettingsIcon /> },
  ];

  // Получаем иконку для текущей темы
  const getThemeIcon = () => {
    switch (themeMode) {
      case 'dark': return <Brightness7 />;
      case 'light': return <Brightness4 />;
      case 'gray': return <span style={{ fontSize: '20px' }}>🎭</span>;
      default: return <Brightness4 />;
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: theme.palette.primary.main }}>
        🚀 Трекер технологий
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              textDecoration: 'none',
              color: location.pathname === item.path ? 
                theme.palette.primary.main : theme.palette.text.primary,
              backgroundColor: location.pathname === item.path ? 
                `${theme.palette.primary.main}20` : 'transparent',
              borderLeft: location.pathname === item.path ? 
                `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Бренд и мобильное меню */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              🚀 Трекер технологий
            </Typography>
          </Box>

          {/* Десктопное меню */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: location.pathname === item.path ? 
                      theme.palette.primary.light : 'inherit',
                    backgroundColor: location.pathname === item.path ? 
                      `${theme.palette.primary.main}20` : 'transparent',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}15`,
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Правая часть: статус API и переключение темы */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ApiStatus />
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              aria-label={`Текущая тема: ${themeMode}`}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              {getThemeIcon()}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Мобильное меню */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              background: theme.palette.background.paper,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
}

export default Navigation;