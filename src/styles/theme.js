import { createTheme } from '@mui/material/styles';

// ОСНОВНАЯ СВЕТЛАЯ ТЕМА (цветная)
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#667eea',
            light: '#a3b5ff',
            dark: '#5a6fd8',
        },
        secondary: {
            main: '#764ba2',
            light: '#a67fd4',
            dark: '#5a3a7a',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
        grey: {
            100: '#f8f9fa',
            200: '#e9ecef',
            300: '#dee2e6',
            400: '#ced4da',
            500: '#adb5bd',
            600: '#6c757d',
            700: '#495057',
            800: '#343a40',
            900: '#212529',
        }
    },
    typography: {
        fontFamily: '"Segoe UI", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
            color: '#333333',
        },
        h5: {
            fontWeight: 600,
            color: '#333333',
        },
        h6: {
            fontWeight: 600,
            color: '#333333',
        },
        body1: {
            color: '#333333',
        },
        body2: {
            color: '#666666',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 50%, #e9ecef 100%)',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    margin: 0,
                    padding: 0,
                    color: '#333333',
                },
                '.App-main': {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '2rem',
                    minHeight: 'calc(100vh - 80px)',
                    '@media (max-width: 768px)': {
                        padding: '1rem',
                    },
                },
                '.technologies-grid': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1rem',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr',
                        gap: '1rem',
                    },
                },
                '.search-box': {
                    marginBottom: '2rem',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #495057 0%, #6c757d 100%)',
                    borderRadius: '16px',
                    border: '1px solid #495057',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                },
                '.search-input': {
                    flex: 1,
                    padding: '12px 16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    '&:focus': {
                        outline: 'none',
                        borderColor: 'rgba(255, 255, 255, 0.6)',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.15)',
                    },
                    '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.6)',
                    },
                },
                '.search-results': {
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    '@media (max-width: 768px)': {
                        position: 'static',
                        marginTop: '0.5rem',
                        textAlign: 'center',
                    },
                },
                '.filter-buttons': {
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    '@media (max-width: 768px)': {
                        gap: '0.5rem',
                    },
                },
                '.filter-btn': {
                    padding: '12px 24px',
                    border: '2px solid #6c757d',
                    borderRadius: '25px',
                    background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: 500,
                    '&:hover': {
                        background: 'linear-gradient(135deg, #5a6268 0%, #3d4348 100%)',
                        color: '#ffffff',
                        borderColor: '#495057',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                    },
                    '&.active': {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#ffffff',
                        borderColor: '#5a6fd8',
                        boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)',
                    },
                    '@media (max-width: 768px)': {
                        padding: '10px 16px',
                        fontSize: '0.9rem',
                    },
                },
                '.section-title': {
                    color: '#333333',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontWeight: 600,
                },
                '.technologies-section': {
                    marginBottom: '3rem',
                },
                '.progress-header': {
                    background: 'linear-gradient(135deg, #495057 0%, #6c757d 100%)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    border: '1px solid #495057',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    color: '#ffffff',
                },
                '.progress-stats': {
                    background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                    borderRadius: '12px',
                    padding: '1rem',
                    margin: '0.5rem 0',
                    border: '1px solid #5a6268',
                },
                '.quick-actions': {
                    background: 'linear-gradient(135deg, #495057 0%, #6c757d 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    border: '1px solid #495057',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    color: '#ffffff',
                },
                '.actions-grid': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                },
                '.action-btn': {
                    padding: '1.2rem',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4), 0 0 30px currentColor',
                    },
                },
                '.action-btn--complete': {
                    background: 'linear-gradient(135deg, #4caf50, #45a049)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                },
                '.action-btn--reset': {
                    background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)',
                },
                '.action-btn--random': {
                    background: 'linear-gradient(135deg, #9c27b0, #7b1fa2)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)',
                },
                '.action-btn--bulk': {
                    background: 'linear-gradient(135deg, #2196f3, #1976d2)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                },
                '.action-btn--export': {
                    background: 'linear-gradient(135deg, #607d8b, #455a64)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(96, 125, 139, 0.3)',
                },
                '.importer-exporter-section': {
                    background: 'linear-gradient(135deg, #495057 0%, #6c757d 100%)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    border: '1px solid #495057',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    color: '#ffffff',
                },
                '.stats-section, .settings-section': {
                    background: 'linear-gradient(135deg, #495057 0%, #6c757d 100%)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    border: '1px solid #495057',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    color: '#ffffff',
                },
                '.stat-card': {
                    background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    margin: '1rem 0',
                    border: '1px solid #5a6268',
                },
                '.danger-zone': {
                    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    margin: '1rem 0',
                    border: '1px solid #bd2130',
                    color: '#ffffff',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #dee2e6',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '400px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    },
                    '&.completed, &.in-progress, &.not-started': {
                        '&:hover': {
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                        }
                    }
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                },
                contained: {
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                    },
                },
                outlined: {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #495057 0%, #6c757d 100%)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    borderBottom: '1px solid #5a6268',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.7)',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                    '& .MuiInputBase-input': {
                        color: '#ffffff',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    '&.MuiChip-filled': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #495057 0%, #6c757d 100%)',
                    color: '#ffffff',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
                filledSuccess: {
                    background: 'linear-gradient(135deg, #4caf50, #45a049)',
                },
                filledError: {
                    background: 'linear-gradient(135deg, #dc3545, #c82333)',
                },
                filledWarning: {
                    background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                },
                filledInfo: {
                    background: 'linear-gradient(135deg, #2196f3, #1976d2)',
                },
            },
        },
    },
});

// СЕРАЯ ТЕМА
export const grayTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#666666',
            light: '#888888',
            dark: '#444444',
        },
        secondary: {
            main: '#888888',
            light: '#aaaaaa',
            dark: '#666666',
        },
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: '"Segoe UI", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
            color: '#333333',
        },
        h5: {
            fontWeight: 600,
            color: '#333333',
        },
        h6: {
            fontWeight: 600,
            color: '#333333',
        },
        body1: {
            color: '#333333',
        },
        body2: {
            color: '#666666',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    margin: 0,
                    padding: 0,
                    color: '#333333',
                },
                '.App-main': {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '2rem',
                    minHeight: 'calc(100vh - 80px)',
                    '@media (max-width: 768px)': {
                        padding: '1rem',
                    },
                },
                '.technologies-grid': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1rem',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr',
                        gap: '1rem',
                    },
                },

                // СЕРЫЕ БЛОКИ - ТОЛЬКО В СЕРОЙ ТЕМЕ
                '.search-box': {
                    background: 'linear-gradient(135deg, #666666 0%, #888888 100%)',
                    border: '1px solid #555555',
                    color: '#ffffff',
                },

                '.progress-header': {
                    background: 'linear-gradient(135deg, #666666 0%, #888888 100%)',
                    border: '1px solid #555555',
                    color: '#ffffff',
                },

                '.quick-actions': {
                    background: 'linear-gradient(135deg, #666666 0%, #888888 100%)',
                    border: '1px solid #555555',
                    color: '#ffffff',
                },

                '.pokemon-importer-section, .data-importer-section, .data-exporter-section': {
                    background: 'linear-gradient(135deg, #666666 0%, #888888 100%)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    border: '1px solid #555555',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    color: '#ffffff',
                },

                '.stats-section, .settings-section, .add-technology-section': {
                    background: 'linear-gradient(135deg, #666666 0%, #888888 100%)',
                    border: '1px solid #555555',
                    color: '#ffffff',
                },

                '.progress-stats, .stat-card': {
                    background: 'linear-gradient(135deg, #555555 0%, #777777 100%)',
                    border: '1px solid #444444',
                    color: '#ffffff',
                },

                '.action-btn--complete': {
                    background: 'linear-gradient(135deg, #666666, #888888)',
                },
                '.action-btn--reset': {
                    background: 'linear-gradient(135deg, #888888, #aaaaaa)',
                },
                '.action-btn--random': {
                    background: 'linear-gradient(135deg, #444444, #666666)',
                },
                '.action-btn--bulk': {
                    background: 'linear-gradient(135deg, #555555, #777777)',
                },
                '.action-btn--export': {
                    background: 'linear-gradient(135deg, #333333, #555555)',
                },

                // Остальные стили наследуются из lightTheme
                '.search-input, .search-results, .filter-buttons, .filter-btn, .section-title, .technologies-section, .actions-grid, .action-btn': {
                    // Наследуем стили из lightTheme
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #666666 0%, #888888 100%)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(135deg, #666666, #888888)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #555555, #777777)',
                    },
                },
            },
        },
        // Остальные компоненты наследуются из lightTheme
    },
});

// ТЁМНАЯ ТЕМА
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#667eea',
            light: '#a3b5ff',
            dark: '#5a6fd8',
        },
        secondary: {
            main: '#764ba2',
            light: '#a67fd4',
            dark: '#5a3a7a',
        },
        background: {
            default: '#0f0f1b',
            paper: '#1a1a2e',
        },
        text: {
            primary: '#e0e0e0',
            secondary: '#b0b0b0',

        },
    },
    typography: {
        fontFamily: '"Segoe UI", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 0 10px rgba(224, 224, 224, 0.8)',
        },
        h5: {
            fontWeight: 600,
            color: '#ffffff',
        },
        h6: {
            fontWeight: 600,
            color: '#ffffff',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(135deg, #0f0f1b 0%, #1a1a2e 50%, #16213e 100%)',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    margin: 0,
                    padding: 0,
                    color: '#e0e0e0',
                },
                '.App-main': {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '2rem',
                    minHeight: 'calc(100vh - 80px)',
                    '@media (max-width: 768px)': {
                        padding: '1rem',
                    },
                },
                '.technologies-grid': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1rem',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr',
                        gap: '1rem',
                    },
                },
                '.search-box': {
                    marginBottom: '2rem',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                '.search-input': {
                    flex: 1,
                    padding: '12px 16px',
                    border: '2px solid rgba(102, 126, 234, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    '&:focus': {
                        outline: 'none',
                        borderColor: '#667eea',
                        boxShadow: '0 0 15px rgba(102, 126, 234, 0.5)',
                    },
                    '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                    },
                },
                '.search-results': {
                    color: '#b0b0b0',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    '@media (max-width: 768px)': {
                        position: 'static',
                        marginTop: '0.5rem',
                        textAlign: 'center',
                    },
                },
                '.filter-buttons': {
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    '@media (max-width: 768px)': {
                        gap: '0.5rem',
                    },
                },
                '.filter-btn': {
                    padding: '12px 24px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#b0b0b0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: 500,
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3), 0 0 20px currentColor',
                    },
                    '&.active': {
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: '#ffffff',
                        borderColor: 'rgba(102, 126, 234, 0.5)',
                        boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)',
                    },
                    '@media (max-width: 768px)': {
                        padding: '10px 16px',
                        fontSize: '0.9rem',
                    },
                },
                '.section-title': {
                    color: '#ffffff',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontWeight: 600,
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                },
                '.technologies-section': {
                    marginBottom: '3rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '400px',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                        transition: 'left 0.6s ease',
                    },
                    '&:hover::before': {
                        left: '100%',
                    },
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)',
                    },
                    '&.completed': {
                        borderColor: '#4caf50',
                        color: '#4caf50',
                        boxShadow: '0 4px 20px rgba(76, 175, 80, 0.2)',
                        '&:hover': {
                            boxShadow: '0 15px 40px rgba(76, 175, 80, 0.3), 0 0 40px rgba(76, 175, 80, 0.4)',
                        }
                    },
                    '&.in-progress': {
                        borderColor: '#ff9800',
                        color: '#ff9800',
                        boxShadow: '0 4px 20px rgba(255, 152, 0, 0.2)',
                        '&:hover': {
                            boxShadow: '0 15px 40px rgba(255, 152, 0, 0.3), 0 0 40px rgba(255, 152, 0, 0.4)',
                        }
                    },
                    '&.not-started': {
                        borderColor: '#9e9e9e',
                        color: '#9e9e9e',
                        boxShadow: '0 4px 20px rgba(158, 158, 158, 0.2)',
                        '&:hover': {
                            boxShadow: '0 15px 40px rgba(158, 158, 158, 0.3), 0 0 40px rgba(158, 158, 158, 0.4)',
                        }
                    }
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '25px',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #0f0f1b 0%, #1a1a2e 50%, #16213e 100%)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    borderBottom: '1px solid #33334d',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '&:hover fieldset': {
                            borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                        },
                    },
                },
            },
        },
    },
});