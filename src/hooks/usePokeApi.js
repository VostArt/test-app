import { useState, useCallback } from 'react';

const transformPokemonToTechnology = (pokemon) => {
  const mainType = pokemon.types[0]?.type?.name || 'unknown';
  
  const typeToCategory = {
    electric: 'frontend',
    fire: 'backend', 
    water: 'devops',
    grass: 'database',
    psychic: 'ai-ml',
    fighting: 'mobile',
    poison: 'security',
    ground: 'infrastructure',
    flying: 'cloud',
    bug: 'testing',
    normal: 'tools',
    rock: 'architecture',
    ghost: 'blockchain',
    dragon: 'game-dev',
    dark: 'cybersecurity',
    steel: 'hardware',
    fairy: 'design',
    ice: 'data-science'
  };

  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  let difficulty = 'beginner';
  if (totalStats > 400) difficulty = 'intermediate';
  if (totalStats > 500) difficulty = 'advanced';

  return {
    id: `poke-${pokemon.id}`,
    title: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    description: `Покемон типа ${mainType}. Имеет ${pokemon.abilities.length} способностей и ${pokemon.moves.length} атак.`,
    category: typeToCategory[mainType] || 'other',
    difficulty: difficulty,
    resources: [
      { name: 'Pokédex информация', url: `https://www.pokemon.com/us/pokedex/${pokemon.name}` },
      { name: 'PokéAPI данные', url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}` }
    ],
    status: 'not-started',
    notes: '',
    pokemonData: {
      types: pokemon.types.map(t => t.type.name),
      abilities: pokemon.abilities.map(a => a.ability.name),
      stats: pokemon.stats,
      sprite: pokemon.sprites.front_default,
      height: pokemon.height / 10,
      weight: pokemon.weight / 10,
      baseExperience: pokemon.base_experience
    },
    isFromApi: true,
    apiSource: 'PokéAPI'
  };
};

function usePokeApi() {
  const [pokemonTechnologies, setPokemonTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null); // Новое состояние для случайного покемона

  const fetchPokemonTechnologies = useCallback(async (limit = 12) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          try {
            const detailResponse = await fetch(pokemon.url);
            if (!detailResponse.ok) throw new Error(`HTTP error! status: ${detailResponse.status}`);
            const detailData = await detailResponse.json();
            return transformPokemonToTechnology(detailData);
          } catch (err) {
            console.error(`Ошибка загрузки ${pokemon.name}:`, err);
            return null;
          }
        })
      );
      
      const validPokemons = pokemonDetails.filter(pokemon => pokemon !== null);
      setPokemonTechnologies(validPokemons);
      return validPokemons;
      
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch') 
        ? 'Не удалось подключиться к PokéAPI. Проверьте интернет-соединение.' 
        : `Ошибка загрузки: ${err.message}`;
      setError(errorMessage);
      console.error('Ошибка загрузки покемонов:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPokemon = async (name) => {
    try {
      setLoading(true);
      setError(null);
      setRandomPokemon(null); // Сбрасываем случайного покемона при поиске
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Покемон "${name}" не найден`);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      
      const data = await response.json();
      const transformed = transformPokemonToTechnology(data);
      setSearchResults([transformed]);
      return [transformed];
      
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch') 
        ? 'Не удалось подключиться к PokéAPI. Проверьте интернет-соединение.' 
        : err.message;
      setError(errorMessage);
      setSearchResults([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      setSearchResults([]); // Сбрасываем результаты поиска
      
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      const transformedPokemon = transformPokemonToTechnology(data);
      setRandomPokemon(transformedPokemon); // Сохраняем случайного покемона
      return transformedPokemon;
      
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch') 
        ? 'Не удалось подключиться к PokéAPI. Проверьте интернет-соединение.' 
        : `Ошибка загрузки: ${err.message}`;
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setRandomPokemon(null);
    setError(null);
  };

  return {
    pokemonTechnologies,
    searchResults,
    randomPokemon, // Экспортируем случайного покемона
    loading,
    error,
    fetchPokemonTechnologies,
    searchPokemon,
    fetchRandomPokemon,
    clearSearch
  };
}

export default usePokeApi;