import React, { useState } from 'react';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import TechnologyCard from '../components/TechnologyCard';
import PokemonImporter from '../components/PokemonImporter';
import useTechnologies from '../hooks/useTechnologies';

function Home() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    markAllCompleted, 
    resetAllStatuses,
    deleteTechnology 
  } = useTechnologies();
  
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => {
    const matchesFilter = filter === 'all' || tech.status === filter;
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    const dataStr = JSON.stringify(technologies, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'technologies-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="home" style={{
      minHeight: '100vh',
      padding: '0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <ProgressHeader technologies={technologies} />
        
        <QuickActions 
          technologies={technologies}
          markAllCompleted={markAllCompleted}
          resetAllStatuses={resetAllStatuses}
          onExport={handleExport}
        />

        <PokemonImporter />

        {/* Поиск и фильтры */}
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="search-results">
            Найдено: {filteredTechnologies.length} из {technologies.length}
          </div>
        </div>

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button 
            className={`filter-btn ${filter === 'not-started' ? 'active' : ''}`}
            onClick={() => setFilter('not-started')}
          >
            Не начатые
          </button>
          <button 
            className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setFilter('in-progress')}
          >
            В процессе
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Выполненные
          </button>
        </div>

        <section className="technologies-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 className="section-title">
              📚 Мои технологии
              <span style={{ 
                fontSize: '1rem', 
                color: '#b0b0b0', 
                marginLeft: '1rem',
                fontWeight: 'normal'
              }}>
                ({technologies.length} всего)
              </span>
            </h2>
          </div>

          {filteredTechnologies.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: '#666',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px dashed rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ color: '#888', marginBottom: '1rem' }}>🚫 Технологии не найдены</h3>
              <p style={{ color: '#666' }}>
                {technologies.length === 0 
                  ? 'Добавьте первую технологию используя форму выше или импортируйте покемонов!'
                  : 'Попробуйте изменить фильтр или поисковый запрос'
                }
              </p>
            </div>
          ) : (
            <div className="technologies-grid">
              {filteredTechnologies.map(tech => (
                <TechnologyCard
                  key={tech.id}
                  technology={tech}
                  onStatusChange={updateStatus}
                  onNotesChange={updateNotes}
                  onDelete={deleteTechnology}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Медиа-запросы для адаптивности */}
      <style jsx>{`
        @media (max-width: 768px) {
          .home > div {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;