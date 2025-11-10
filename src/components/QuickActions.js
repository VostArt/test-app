import React from 'react';
import './QuickActions.css';

function QuickActions({ technologies, markAllCompleted, resetAllStatuses, onExport }) {
  const randomNextTechnology = () => {
    const notStarted = technologies.filter(tech => tech.status === 'not-started');
    if (notStarted.length === 0) {
      alert('Все технологии уже начаты или завершены! 🎉');
      return;
    }
    
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
    alert(`Следующая технология: ${randomTech.title} 🎯\n\n${randomTech.description}`);
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
        <button onClick={onExport} className="action-btn action-btn--export">
          📤 Экспорт данных
        </button>
      </div>
    </div>
  );
}

export default QuickActions;