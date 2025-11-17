import React, { useState } from 'react';
import './TechnologyCard.css';
import Modal from './Modal';

function TechnologyCard({ technology, onStatusChange, onNotesChange, onDelete }) {
  const { id, title, description, status, notes } = technology;
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(id);
    setShowDeleteConfirm(false);
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
    <>
      <div 
        className={`technology-card technology-card--${status}`}
        onClick={handleClick}
      >
        {/* Заголовок с иконкой покемона и кнопкой удаления */}
        <div className="technology-card__header">
          <h3 className="technology-card__title">
            {technology.isFromApi && '🐰 '}
            {title}
            {technology.isFromApi && (
              <span style={{ 
                fontSize: '0.7rem', 
                color: '#ffcb05',
                marginLeft: '0.5rem',
                fontWeight: 'normal'
              }}>
                PokéAPI
              </span>
            )}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="technology-card__status">
              {getStatusIcon()} {getStatusText()}
            </span>
            <button
              onClick={handleDeleteClick}
              style={{
                background: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                borderRadius: '6px',
                color: '#f44336',
                cursor: 'pointer',
                padding: '4px 8px',
                fontSize: '0.7rem',
                fontWeight: '600'
              }}
              title="Удалить технологию"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Спрайт покемона если есть */}
        {technology.pokemonData?.sprite && (
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img 
              src={technology.pokemonData.sprite} 
              alt={title}
              style={{ 
                width: '80px', 
                height: '80px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '4px'
              }}
            />
          </div>
        )}

        <p className="technology-card__description">{description}</p>

        {/* Дополнительная информация для покемонов */}
        {technology.isFromApi && technology.pokemonData && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '0.75rem',
            marginBottom: '1rem',
            fontSize: '0.8rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ color: '#b0b0b0' }}>Тип:</span>
              <span style={{ color: '#ffffff' }}>{technology.pokemonData.types.join(', ')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ color: '#b0b0b0' }}>Рост:</span>
              <span style={{ color: '#ffffff' }}>{technology.pokemonData.height} м</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#b0b0b0' }}>Вес:</span>
              <span style={{ color: '#ffffff' }}>{technology.pokemonData.weight} кг</span>
            </div>
          </div>
        )}
        
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

      {/* Модальное окно подтверждения удаления */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        type="delete"
        technology={technology}
      />
    </>
  );
}

export default TechnologyCard;