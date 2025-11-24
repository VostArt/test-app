import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MuiTechnologyCard from '../components/MuiTechnologyCard';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyList() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    deleteTechnology
  } = useTechnologies();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tech.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="App-main" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="section-title" style={{ margin: 0 }}>💻 Все технологии</h1>
        <Link 
          to="/add-technology" 
          className="filter-btn active"
          style={{ textDecoration: 'none' }}
        >
          ➕ Добавить технологию
        </Link>
      </div>

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
          className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          Все
        </button>
        <button
          className={`filter-btn ${statusFilter === 'not-started' ? 'active' : ''}`}
          onClick={() => setStatusFilter('not-started')}
        >
          Не начатые
        </button>
        <button
          className={`filter-btn ${statusFilter === 'in-progress' ? 'active' : ''}`}
          onClick={() => setStatusFilter('in-progress')}
        >
          В процессе
        </button>
        <button
          className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setStatusFilter('completed')}
        >
          Завершённые
        </button>
      </div>

      <section className="technologies-section">
        <div className="technologies-grid">
          {filteredTechnologies.map(technology => (
            <MuiTechnologyCard
              key={technology.id}
              technology={technology}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
              onDelete={deleteTechnology}
            />
          ))}
        </div>

        {filteredTechnologies.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#b0b0b0',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '2px dashed rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{ marginBottom: '1rem' }}>Технологии не найдены.</p>
            <Link 
              to="/add-technology" 
              className="filter-btn active"
              style={{ textDecoration: 'none' }}
            >
              Добавить первую технологию
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default TechnologyList;