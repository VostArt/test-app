import React, { useState } from 'react';

function TechnologyCard({ technology, onStatusChange, onNotesChange, onDelete }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState(technology.notes || '');

  const handleStatusChange = () => {
    const nextStatus = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    }[technology.status];
    
    onStatusChange(technology.id, nextStatus);
  };

  const handleNotesSave = () => {
    onNotesChange(technology.id, localNotes);
    setIsEditingNotes(false);
  };

  const handleNotesCancel = () => {
    setLocalNotes(technology.notes || '');
    setIsEditingNotes(false);
  };

  const getStatusIcon = () => {
    switch (technology.status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'not-started': return '⏳';
      default: return '📝';
    }
  };

  const getStatusText = () => {
    switch (technology.status) {
      case 'completed': return 'Изучено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return 'Не определено';
    }
  };

  return (
    <div className="technology-card" onClick={handleStatusChange}>
      <div className="tech-header">
        <div className="tech-title-section">
          <h3 className="tech-title">
            {technology.isFromApi && '🐰 '}
            {technology.title}
            {technology.isFromApi && (
              <span className="api-badge">PokéAPI</span>
            )}
          </h3>
          <div className="tech-status">
            <span className={`status-badge status-${technology.status}`}>
              {getStatusIcon()} {getStatusText()}
            </span>
          </div>
        </div>
        <button 
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(`Удалить технологию "${technology.title}"?`)) {
              onDelete(technology.id);
            }
          }}
          aria-label="Удалить технологию"
        >
          🗑️
        </button>
      </div>

      {technology.pokemonData?.sprite && (
        <div className="pokemon-sprite">
          <img 
            src={technology.pokemonData.sprite} 
            alt={technology.title}
          />
        </div>
      )}

      <p className="tech-description">{technology.description}</p>

      {technology.isFromApi && technology.pokemonData && (
        <div className="pokemon-info">
          <div className="pokemon-stats">
            <span><strong>Тип:</strong> {technology.pokemonData.types.join(', ')}</span>
            <span><strong>Рост:</strong> {technology.pokemonData.height}м</span>
            <span><strong>Вес:</strong> {technology.pokemonData.weight}кг</span>
          </div>
        </div>
      )}
      
      <div className="notes-section" onClick={(e) => e.stopPropagation()}>
        <div className="notes-header">
          <span>📝 Мои заметки:</span>
        </div>
        
        {isEditingNotes ? (
          <div className="notes-editor">
            <textarea
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              placeholder="Записывайте сюда важные моменты..."
              className="notes-textarea"
              rows="3"
            />
            <div className="notes-actions">
              <button onClick={handleNotesSave} className="save-btn">
                💾 Сохранить
              </button>
              <button onClick={handleNotesCancel} className="cancel-btn">
                ❌ Отмена
              </button>
            </div>
          </div>
        ) : (
          <div 
            className={`notes-display ${!technology.notes ? 'empty-notes' : ''}`}
            onClick={() => setIsEditingNotes(true)}
          >
            {technology.notes ? (
              <p className="notes-content">{technology.notes}</p>
            ) : (
              <p className="notes-placeholder">Нажмите, чтобы добавить заметку...</p>
            )}
            <div className="notes-meta">
              {technology.notes 
                ? `Заметка сохранена (${technology.notes.length} символов)` 
                : 'Добавьте заметку'
              }
            </div>
          </div>
        )}
      </div>

      <div className="tech-footer">
        <span className="click-hint">Кликни для смены статуса</span>
      </div>
    </div>
  );
}

export default TechnologyCard;