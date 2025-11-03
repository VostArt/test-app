import React, { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';

function App() {
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение функциональных и классовых компонентов, их жизненного цикла и лучших практик использования.', 
      status: 'not-started' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, работа с выражениями JavaScript в разметке и понимание различий с HTML.', 
      status: 'not-started' 
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов, использование useState и useEffect хуков для управления данными.', 
      status: 'not-started' 
    },
    { 
      id: 4, 
      title: 'Props and Data Flow', 
      description: 'Передача данных между компонентами через props, понимание однонаправленного потока данных.', 
      status: 'not-started' 
    },
    { 
      id: 5, 
      title: 'Event Handling', 
      description: 'Обработка событий в React, работа с формами и пользовательским вводом.', 
      status: 'not-started' 
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  // Функция изменения статуса технологии
  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter === 'all') return true;
    return tech.status === activeFilter;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">🚀 Трекер изучения технологий</h1>
        <p className="App-subtitle">Отслеживайте ваш прогресс в освоении React и современных веб-технологий</p>
      </header>

      <main className="App-main">
        <ProgressHeader technologies={technologies} />
        
        <QuickActions 
          technologies={technologies}
          setTechnologies={setTechnologies}
        />

        {/* Фильтрация */}
        <div className="filter-buttons" style={{marginBottom: '2rem', textAlign: 'center'}}>
          <button 
            onClick={() => setActiveFilter('all')}
            style={{
              margin: '0 5px',
              padding: '10px 15px',
              border: '2px solid #667eea',
              borderRadius: '20px',
              background: activeFilter === 'all' ? '#667eea' : 'white',
              color: activeFilter === 'all' ? 'white' : '#667eea',
              cursor: 'pointer'
            }}
          >
            Все
          </button>
          <button 
            onClick={() => setActiveFilter('not-started')}
            style={{
              margin: '0 5px',
              padding: '10px 15px',
              border: '2px solid #9e9e9e',
              borderRadius: '20px',
              background: activeFilter === 'not-started' ? '#9e9e9e' : 'white',
              color: activeFilter === 'not-started' ? 'white' : '#9e9e9e',
              cursor: 'pointer'
            }}
          >
            Не начато
          </button>
          <button 
            onClick={() => setActiveFilter('in-progress')}
            style={{
              margin: '0 5px',
              padding: '10px 15px',
              border: '2px solid #ff9800',
              borderRadius: '20px',
              background: activeFilter === 'in-progress' ? '#ff9800' : 'white',
              color: activeFilter === 'in-progress' ? 'white' : '#ff9800',
              cursor: 'pointer'
            }}
          >
            В процессе
          </button>
          <button 
            onClick={() => setActiveFilter('completed')}
            style={{
              margin: '0 5px',
              padding: '10px 15px',
              border: '2px solid #4caf50',
              borderRadius: '20px',
              background: activeFilter === 'completed' ? '#4caf50' : 'white',
              color: activeFilter === 'completed' ? 'white' : '#4caf50',
              cursor: 'pointer'
            }}
          >
            Выполнено
          </button>
        </div>
        
        <section className="technologies-section">
          <h2 className="section-title">
            Дорожная карта изучения 
            <span style={{fontSize: '1rem', color: '#666', marginLeft: '0.5rem'}}>
              ({filteredTechnologies.length} технологий)
            </span>
          </h2>
          <div className="technologies-grid">
            {filteredTechnologies.map(technology => (
              <TechnologyCard
                key={technology.id}
                technology={technology}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>© 2025 Трекер изучения технологий. Создано с React ⚛️ и useState 🎯</p>
      </footer>
    </div>
  );
}

export default App;