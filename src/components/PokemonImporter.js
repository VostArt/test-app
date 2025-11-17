import React, { useState } from 'react';
import usePokeApi from '../hooks/usePokeApi';
import useTechnologies from '../hooks/useTechnologies';

function PokemonImporter() {
  const { 
    pokemonTechnologies, 
    searchResults,
    randomPokemon,
    loading, 
    error, 
    fetchPokemonTechnologies,
    searchPokemon,
    fetchRandomPokemon,
    clearSearch 
  } = usePokeApi();

  const { technologies, importTechnologies } = useTechnologies();
  const [searchQuery, setSearchQuery] = useState('');
  const [importing, setImporting] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const [showPopular, setShowPopular] = useState(false);

  const handleImportPokemons = async (pokemonsToImport) => {
    try {
      setImporting(true);
      
      const existingIds = technologies.map(tech => tech.id);
      const newPokemons = pokemonsToImport.filter(poke => 
        !existingIds.includes(poke.id)
      );

      if (newPokemons.length === 0) {
        alert('Все выбранные покемоны уже добавлены в трекер!');
        return;
      }

      importTechnologies(newPokemons);
      setImportedCount(prev => prev + newPokemons.length);
      alert(`Успешно импортировано ${newPokemons.length} покемонов!`);
      
    } catch (err) {
      alert(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert('Пожалуйста, введите имя покемона');
      return;
    }
    
    try {
      setShowPopular(false);
      await searchPokemon(searchQuery);
    } catch (err) {
      alert(`Ошибка поиска: ${err.message}`);
    }
  };

  const handleLoadRandom = async () => {
    try {
      setShowPopular(false);
      await fetchRandomPokemon();
    } catch (err) {
      alert(`Ошибка: ${err.message}`);
    }
  };

  const handleLoadPopular = async () => {
    try {
      const pokemons = await fetchPokemonTechnologies(12);
      if (pokemons.length > 0) {
        setShowPopular(true);
      }
    } catch (err) {
      alert(`Ошибка: ${err.message}`);
    }
  };

  const handleClearAll = () => {
    setShowPopular(false);
    clearSearch();
    setSearchQuery('');
  };

  // Определяем что показывать
  const getDisplayedPokemons = () => {
    if (randomPokemon) return [randomPokemon];
    if (searchResults.length > 0) return searchResults;
    if (showPopular) return pokemonTechnologies;
    return [];
  };

  const getDisplayTitle = () => {
    if (randomPokemon) return '🎲 Случайный покемон';
    if (searchResults.length > 0) return '🔍 Найденные покемоны';
    if (showPopular) return '📚 Популярные покемоны';
    return '';
  };

  const displayedPokemons = getDisplayedPokemons();
  const displayTitle = getDisplayTitle();

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>🎮 Импорт из PokéAPI</h3>
      <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
        Добавьте покемонов как технологии для изучения. Каждый покемон представляет собой уникальную "технологию" с характеристиками.
      </p>

      {/* Поиск покемона */}
      <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Введите имя покемона (например: pikachu)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '12px 16px',
              border: '2px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              border: '2px solid #ffcb05',
              borderRadius: '8px',
              background: 'rgba(255, 203, 5, 0.1)',
              color: '#ffcb05',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            {loading ? '🔍 Поиск...' : '🔍 Найти покемона'}
          </button>
        </div>
      </form>

      {/* Быстрые действия */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button
          onClick={handleLoadRandom}
          disabled={loading}
          style={{
            padding: '12px 20px',
            border: '2px solid #4caf50',
            borderRadius: '8px',
            background: 'rgba(76, 175, 80, 0.1)',
            color: '#4caf50',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {loading ? '🎲 Загрузка...' : '🎲 Случайный покемон'}
        </button>
        
        <button
          onClick={handleLoadPopular}
          disabled={loading}
          style={{
            padding: '12px 20px',
            border: '2px solid #667eea',
            borderRadius: '8px',
            background: 'rgba(102, 126, 234, 0.1)',
            color: '#667eea',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {loading ? '📚 Загрузка...' : '📚 Загрузить популярные'}
        </button>

        {displayedPokemons.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              padding: '12px 20px',
              border: '2px solid #9e9e9e',
              borderRadius: '8px',
              background: 'rgba(158, 158, 158, 0.1)',
              color: '#9e9e9e',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            🧹 Очистить
          </button>
        )}
      </div>

      {error && (
        <div style={{
          color: '#f44336',
          background: 'rgba(244, 67, 54, 0.1)',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          border: '1px solid rgba(244, 67, 54, 0.3)'
        }}>
          ❌ Ошибка: {error}
        </div>
      )}

      {/* Список покемонов */}
      {displayedPokemons.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ color: '#ffffff', margin: 0 }}>
              {displayTitle}: {displayedPokemons.length}
            </h4>
            <button
              onClick={() => handleImportPokemons(displayedPokemons)}
              disabled={importing}
              style={{
                padding: '8px 16px',
                border: '2px solid #4caf50',
                borderRadius: '6px',
                background: 'rgba(76, 175, 80, 0.1)',
                color: '#4caf50',
                cursor: importing ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '0.8rem'
              }}
            >
              {importing ? '⏳ Импорт...' : `📥 Импортировать все`}
            </button>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: randomPokemon ? 'repeat(auto-fit, minmax(250px, 1fr))' : 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            {displayedPokemons.map(pokemon => (
              <div
                key={pokemon.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: randomPokemon ? '1.5rem' : '1rem',
                  textAlign: 'center',
                  border: randomPokemon ? '2px solid #4caf50' : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {pokemon.pokemonData?.sprite && (
                  <img 
                    src={pokemon.pokemonData.sprite} 
                    alt={pokemon.title}
                    style={{ 
                      width: randomPokemon ? '96px' : '64px', 
                      height: randomPokemon ? '96px' : '64px', 
                      marginBottom: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '4px'
                    }}
                  />
                )}
                <div style={{ 
                  color: '#ffffff', 
                  fontWeight: '600', 
                  marginBottom: '0.25rem',
                  fontSize: randomPokemon ? '1.2rem' : '1rem'
                }}>
                  {pokemon.title}
                  {randomPokemon && (
                    <div style={{ 
                      fontSize: '0.7rem', 
                      color: '#4caf50',
                      fontWeight: 'normal',
                      marginTop: '0.25rem'
                    }}>
                      🎲 Случайный выбор
                    </div>
                  )}
                </div>
                <div style={{ color: '#b0b0b0', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  {pokemon.pokemonData?.types?.join(', ') || 'Неизвестный тип'}
                </div>
                {randomPokemon && (
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#b0b0b0' }}>Рост:</span>
                      <span style={{ color: '#ffffff' }}>{pokemon.pokemonData?.height} м</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#b0b0b0' }}>Вес:</span>
                      <span style={{ color: '#ffffff' }}>{pokemon.pokemonData?.weight} кг</span>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => handleImportPokemons([pokemon])}
                  disabled={importing}
                  style={{
                    padding: randomPokemon ? '8px 16px' : '6px 12px',
                    border: '1px solid #4caf50',
                    borderRadius: '4px',
                    background: 'rgba(76, 175, 80, 0.1)',
                    color: '#4caf50',
                    cursor: importing ? 'not-allowed' : 'pointer',
                    fontSize: randomPokemon ? '0.9rem' : '0.8rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!importing) {
                      e.target.style.background = 'rgba(76, 175, 80, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!importing) {
                      e.target.style.background = 'rgba(76, 175, 80, 0.1)';
                    }
                  }}
                >
                  {importing ? '...' : '➕ Добавить в трекер'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Сообщение когда ничего не загружено */}
      {displayedPokemons.length === 0 && !loading && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#666',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          border: '1px dashed rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ marginBottom: '1rem' }}>👆 Используйте кнопки выше для загрузки покемонов</p>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>
            💡 Попробуйте "Случайный покемон" или найдите конкретного покемона по имени
          </div>
        </div>
      )}

      {/* Статистика импорта */}
      {importedCount > 0 && (
        <div style={{
          color: '#4caf50',
          background: 'rgba(76, 175, 80, 0.1)',
          padding: '0.75rem',
          borderRadius: '8px',
          border: '1px solid rgba(76, 175, 80, 0.3)',
          textAlign: 'center',
          marginTop: '1rem'
        }}>
          ✅ Успешно импортировано покемонов: {importedCount}
        </div>
      )}

      <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '1rem' }}>
        💡 Каждый покемон представляет собой уникальную "технологию" с характеристиками, которые можно изучать и отслеживать
      </p>
    </div>
  );
}

export default PokemonImporter;