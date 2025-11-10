import React, { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import useTechnologies from './hooks/useTechnologies';

function App() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    markAllCompleted, 
    resetAllStatuses,
    progress 
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechnologies = technologies.filter(tech => {
    const matchesFilter = activeFilter === 'all' || tech.status === activeFilter;
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">🚀 Трекер изучения технологий</h1>
        <p className="App-subtitle">Отслеживайте ваш прогресс в освоении React и современных веб-технологий</p>
        <div className="progress-header">
          <div className="progress-bar">
            <div 
              className="progress-bar__fill"
              style={{ width: `${progress}%` }}
            >
              <span className="progress-bar__text">Общий прогресс: {progress}%</span>
            </div>
          </div>
        </div>
      </header>

      <main className="App-main">
        <ProgressHeader technologies={technologies} />

        <QuickActions
          technologies={technologies}
          markAllCompleted={markAllCompleted}
          resetAllStatuses={resetAllStatuses}
        />

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-results">Найдено: {filteredTechnologies.length}</span>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Все технологии
          </button>
          <button
            className={`filter-btn ${activeFilter === 'not-started' ? 'active' : ''}`}
            onClick={() => setActiveFilter('not-started')}
          >
            Не начатые
          </button>
          <button
            className={`filter-btn ${activeFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveFilter('in-progress')}
          >
            В процессе
          </button>
          <button
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Выполненные
          </button>
        </div>

        <section className="technologies-section">
          <h2 className="section-title">
            Дорожная карта изучения
            <span style={{ fontSize: '1rem', color: '#666', marginLeft: '0.5rem' }}>
              ({filteredTechnologies.length} технологий)
            </span>
          </h2>
          <div className="technologies-grid">
            {filteredTechnologies.map(technology => (
              <TechnologyCard
                key={technology.id}
                technology={technology}
                onStatusChange={updateStatus}
                onNotesChange={updateNotes}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>© 2025 Трекер изучения технологий. Создано с React ⚛️ и переиспользуемыми компонентами 🎯</p>
      </footer>
    </div>
  );
}

export default App;