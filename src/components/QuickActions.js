import React from 'react';
import './QuickActions.css';

function QuickActions({ technologies, setTechnologies }) {
  const markAllCompleted = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const randomNextTechnology = () => {
    const notStarted = technologies.filter(tech => tech.status === 'not-started');
    if (notStarted.length === 0) {
      alert('Все технологии уже начаты или завершены! 🎉');
      return;
    }
    
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === randomTech.id ? { ...tech, status: 'in-progress' } : tech
      )
    );
    
    alert(`Следующая технология: ${randomTech.title} 🎯`);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="actions-grid">
        <button onClick={markAllCompleted} className="action-btn action-btn--complete">
          ✅ Отметить все как выполненные
        </button>
        <button onClick={resetAllStatuses} className="action-btn action-btn--reset">
          🔄 Сбросить все статусы
        </button>
        <button onClick={randomNextTechnology} className="action-btn action-btn--random">
          🎲 Случайный выбор следующей технологии
        </button>
      </div>
    </div>
  );
}

export default QuickActions;