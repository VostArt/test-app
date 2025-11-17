import React, { useState, useEffect, useCallback } from 'react';
import usePokeApi from '../hooks/usePokeApi';

function PokemonSearch({ onPokemonSelect }) {
  const { searchPokemon, loading, error, clearSearch } = usePokeApi();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce функция
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Выполняем поиск при изменении debouncedQuery
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      searchPokemon(debouncedQuery);
    } else {
      clearSearch();
    }
  }, [debouncedQuery, searchPokemon, clearSearch]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
    clearSearch();
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>🔍 Поиск покемонов</h3>
      
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Введите имя покемона (минимум 2 символа)..."
          value={searchQuery}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            paddingRight: '100px',
            border: '2px solid rgba(255, 203, 5, 0.3)',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            fontSize: '1rem'
          }}
        />
        
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {loading && (
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255, 203, 5, 0.3)',
              borderTop: '2px solid #ffcb05',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          )}
          
          {searchQuery && (
            <button
              onClick={handleClear}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#b0b0b0',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem'
              }}
            >
              Очистить
            </button>
          )}
        </div>
      </div>

      {error && (
        <div style={{
          color: '#f44336',
          background: 'rgba(244, 67, 54, 0.1)',
          padding: '0.75rem',
          borderRadius: '8px',
          marginTop: '1rem',
          border: '1px solid rgba(244, 67, 54, 0.3)'
        }}>
          {error}
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: translateY(-50%) rotate(0deg); }
            100% { transform: translateY(-50%) rotate(360deg); }
          }
        `}
      </style>

      <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.5rem' }}>
        💡 Начните вводить имя покемона для поиска (например: pikachu, charizard, mewtwo)
      </p>
    </div>
  );
}

export default PokemonSearch;