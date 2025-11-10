import React, { useState } from 'react';
import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const { id, title, description, status, notes } = technology;
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);

  const handleClick = () => {
    const nextStatus = {
      'not-started': 'in-progress',
      'in-progress': 'completed', 
      'completed': 'not-started'
    }[status];
    
    onStatusChange(id, nextStatus);
  };

  const handleNotesSave = () => {
    onNotesChange(id, localNotes);
    setIsEditingNotes(false);
  };

  const handleNotesCancel = () => {
    setLocalNotes(notes);
    setIsEditingNotes(false);
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
      
      <div className="technology-card__notes" onClick={(e) => e.stopPropagation()}>
        <h4>📝 Мои заметки:</h4>
        {isEditingNotes ? (
          <div className="notes-editor">
            <textarea
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              placeholder="Записывайте сюда важные моменты..."
              rows="3"
              className="notes-textarea"
            />
            <div className="notes-actions">
              <button onClick={handleNotesSave} className="notes-btn notes-btn--save">
                💾 Сохранить
              </button>
              <button onClick={handleNotesCancel} className="notes-btn notes-btn--cancel">
                ❌ Отмена
              </button>
            </div>
          </div>
        ) : (
          <div 
            className="notes-display" 
            onClick={() => setIsEditingNotes(true)}
          >
            {notes ? (
              <p className="notes-content">{notes}</p>
            ) : (
              <p className="notes-placeholder">Нажмите, чтобы добавить заметку...</p>
            )}
            <div className="notes-hint">
              {notes ? `Заметка сохранена (${notes.length} символов)` : 'Добавьте заметку'}
            </div>
          </div>
        )}
      </div>

      <div className="technology-card__footer">
        <span className="technology-card__badge">Кликни для смены статуса</span>
      </div>
    </div>
  );
}

export default TechnologyCard;