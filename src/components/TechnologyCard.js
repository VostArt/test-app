import React from 'react';
import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange }) {
  const { id, title, description, status } = technology;

  const handleClick = () => {
    // Циклическое переключение статусов
    const nextStatus = {
      'not-started': 'in-progress',
      'in-progress': 'completed', 
      'completed': 'not-started'
    }[status];
    
    onStatusChange(id, nextStatus);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'not-started': return '⏳';
      default: return '📝';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'Изучено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return 'Не определено';
    }
  };

  return (
    <div 
      className={`technology-card technology-card--${status}`}
      onClick={handleClick}
    >
      <div className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>
        <span className="technology-card__status">
          {getStatusIcon()} {getStatusText()}
        </span>
      </div>
      <p className="technology-card__description">{description}</p>
      <div className="technology-card__footer">
        <span className="technology-card__badge">Кликни для смены статуса</span>
      </div>
    </div>
  );
}

export default TechnologyCard;