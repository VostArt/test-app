import React, { useState } from 'react'; // Добавить useState
import Modal from './Modal'; // Убедиться что этот импорт есть
import './QuickActions.css';

function QuickActions({ technologies, markAllCompleted, resetAllStatuses }) {
  const [showExportModal, setShowExportModal] = useState(false); // Добавить состояние

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    console.log('Данные для экспорта:', dataStr);
    setShowExportModal(true); // Открыть модалку вместо alert
  };

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
        <button onClick={handleExport} className="action-btn action-btn--export">
          📤 Экспорт данных
        </button>
      </div>

      {/* Добавить Modal в return */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <p>Данные успешно подготовлены для экспорта!</p>
        <p>Проверьте консоль разработчика для просмотра данных.</p>
        <button onClick={() => setShowExportModal(false)}>
          Закрыть
        </button>
      </Modal>
    </div>
  );
}

export default QuickActions;