import React, { useState, useEffect } from 'react';

function ApiStatus() {
  const [apiStatus, setApiStatus] = useState('checking');
  const [responseTime, setResponseTime] = useState(0);

  const checkApiStatus = async () => {
    try {
      const startTime = Date.now();
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
      const endTime = Date.now();
      
      setResponseTime(endTime - startTime);
      
      if (response.ok) {
        setApiStatus('online');
      } else {
        setApiStatus('error');
      }
    } catch (error) {
      setApiStatus('offline');
    }
  };

  useEffect(() => {
    checkApiStatus();
    const interval = setInterval(checkApiStatus, 60000); // Проверка каждую минуту
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'online': return '#4caf50';
      case 'checking': return '#ff9800';
      case 'error': return '#f44336';
      case 'offline': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'online': return 'PokéAPI онлайн';
      case 'checking': return 'Проверка статуса...';
      case 'error': return 'Ошибка API';
      case 'offline': return 'API недоступен';
      default: return 'Неизвестный статус';
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      border: `1px solid ${getStatusColor()}33`,
      fontSize: '0.8rem',
      color: '#b0b0b0'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: getStatusColor(),
        animation: apiStatus === 'checking' ? 'pulse 1.5s infinite' : 'none'
      }} />
      <span>{getStatusText()}</span>
      {apiStatus === 'online' && responseTime > 0 && (
        <span style={{ color: '#666', fontSize: '0.7rem' }}>
          ({responseTime}ms)
        </span>
      )}
      
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default ApiStatus;