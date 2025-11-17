import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { techId } = useParams();
  const { technologies, updateStatus, updateNotes } = useTechnologies();
  const [technology, setTechnology] = useState(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState('');

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(techId));
    if (tech) {
      setTechnology(tech);
      setLocalNotes(tech.notes || '');
    }
  }, [techId, technologies]);

  const handleStatusChange = (newStatus) => {
    updateStatus(parseInt(techId), newStatus);
    setTechnology(prev => ({ ...prev, status: newStatus }));
  };

  const handleNotesSave = () => {
    updateNotes(parseInt(techId), localNotes);
    setIsEditingNotes(false);
  };

  const handleNotesCancel = () => {
    setLocalNotes(technology.notes || '');
    setIsEditingNotes(false);
  };

  if (!technology) {
    return (
      <div className="App-main" style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ color: '#ffffff' }}>Технология не найдена</h1>
        <p style={{ color: '#b0b0b0' }}>Технология с ID {techId} не существует.</p>
        <Link 
          to="/technologies" 
          className="filter-btn"
          style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}
        >
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="App-main" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          to="/technologies" 
          className="filter-btn"
          style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}
        >
          ← Назад к списку
        </Link>
        <h1 style={{ color: '#ffffff', margin: '0 0 1rem 0' }}>{technology.title}</h1>
      </div>

      <div className="technology-card" style={{ cursor: 'default' }}>
        <div className="technology-card__header">
          <h3 className="technology-card__title">{technology.title}</h3>
          <span className={`technology-card__status technology-card--${technology.status}`}>
            {technology.status === 'completed' ? '✅ Изучено' : 
             technology.status === 'in-progress' ? '🔄 В процессе' : '⏳ Не начато'}
          </span>
        </div>
        
        <p className="technology-card__description">{technology.description}</p>

        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>Статус изучения</h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleStatusChange('not-started')}
              className={`filter-btn ${technology.status === 'not-started' ? 'active' : ''}`}
            >
              ⏳ Не начато
            </button>
            <button
              onClick={() => handleStatusChange('in-progress')}
              className={`filter-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
            >
              🔄 В процессе
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`filter-btn ${technology.status === 'completed' ? 'active' : ''}`}
            >
              ✅ Завершено
            </button>
          </div>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>📝 Мои заметки</h4>
          {isEditingNotes ? (
            <div>
              <textarea
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                placeholder="Записывайте сюда важные моменты..."
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  resize: 'vertical',
                  marginBottom: '1rem',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleNotesSave}
                  style={{
                    padding: '10px 20px',
                    background: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  💾 Сохранить
                </button>
                <button
                  onClick={handleNotesCancel}
                  style={{
                    padding: '10px 20px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  ❌ Отмена
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => setIsEditingNotes(true)}
              style={{
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px dashed rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                minHeight: '60px'
              }}
            >
              {technology.notes ? (
                <p style={{ color: '#b0b0b0', margin: 0 }}>{technology.notes}</p>
              ) : (
                <p style={{ color: '#666', margin: 0 }}>Нажмите, чтобы добавить заметку...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;