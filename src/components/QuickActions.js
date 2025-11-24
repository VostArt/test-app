import React from 'react';
import './QuickActions.css';

function QuickActions({ technologies, markAllCompleted, resetAllStatuses, onExport, onBulkEdit }) {
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
        <button 
          onClick={markAllCompleted} 
          className="action-btn action-btn--complete"
          aria-label="Отметить все технологии как выполненные"
        >
          ✅ Отметить все как выполненные
        </button>
        
        <button 
          onClick={resetAllStatuses} 
          className="action-btn action-btn--reset"
          aria-label="Сбросить статусы всех технологий на 'не начато'"
        >
          🔄 Сбросить все статусы
        </button>
        
        <button 
          onClick={randomNextTechnology} 
          className="action-btn action-btn--random"
          aria-label="Выбрать случайную следующую технологию для изучения"
        >
          🎲 Случайный выбор следующей технологии
        </button>
        
        <button 
          onClick={onBulkEdit} 
          className="action-btn action-btn--bulk"
          aria-label="Открыть редактор массового редактирования статусов"
        >
          ⚡ Массовое редактирование
        </button>
        
        <button 
          onClick={onExport} 
          className="action-btn action-btn--export"
          aria-label="Экспортировать все данные в JSON файл"
        >
          📤 Экспорт данных
        </button>
      </div>
    </div>
  );
}

export default QuickActions;