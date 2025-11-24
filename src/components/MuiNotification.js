import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function MuiNotification({ open, message, severity, onClose, autoHideDuration = 6000 }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ 
          width: '100%',
          alignItems: 'center',
          '& .MuiAlert-message': {
            fontSize: '0.9rem',
            fontWeight: 500,
          }
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default MuiNotification;