import React, { useState } from 'react';

function BulkStatusEditor({ technologies, onStatusUpdate, onClose }) {
  const [selectedStatus, setSelectedStatus] = useState('completed');
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [confirmAction, setConfirmAction] = useState(false);

  // Обработчик выбора технологии
  const handleTechnologySelect = (techId) => {
    setSelectedTechnologies(prev => 
      prev.includes(techId) 
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    );
  };

  // Выбрать все технологии
  const handleSelectAll = () => {
    setSelectedTechnologies(technologies.map(tech => tech.id));
  };

  // Снять выделение со всех
  const handleSelectNone = () => {
    setSelectedTechnologies([]);
  };

  // Выбрать только не начатые
  const handleSelectNotStarted = () => {
    const notStartedIds = technologies
      .filter(tech => tech.status === 'not-started')
      .map(tech => tech.id);
    setSelectedTechnologies(notStartedIds);
  };

  // Применить изменения
  const handleApplyChanges = () => {
    if (selectedTechnologies.length === 0) {
      alert('Выберите хотя бы одну технологию');
      return;
    }

    if (!confirmAction) {
      setConfirmAction(true);
      return;
    }

    selectedTechnologies.forEach(techId => {
      onStatusUpdate(techId, selectedStatus);
    });

    alert(`Статус обновлен для ${selectedTechnologies.length} технологий`);
    onClose();
  };

  // Отменить подтверждение
  const handleCancelConfirm = () => {
    setConfirmAction(false);
  };

  // Получить иконку статуса
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'not-started': return '⏳';
      default: return '📝';
    }
  };

  // Получить текст статуса
  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Изучено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return 'Не определено';
    }
  };

  // Получить цвет статуса
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#ff9800';
      case 'not-started': return '#9e9e9e';
      default: return '#667eea';
    }
  };

  const selectedCount = selectedTechnologies.length;
  const totalCount = technologies.length;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '2rem',
      position: 'relative'
    }}>
      {/* Заголовок и кнопка закрытия */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ color: '#ffffff', margin: 0 }}>⚡ Массовое редактирование статусов</h3>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            color: '#e0e0e0',
            cursor: 'pointer',
            padding: '8px 12px',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = '#e0e0e0';
          }}
          aria-label="Закрыть редактор массового редактирования"
        >
          ×
        </button>
      </div>

      {/* Статистика */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
          border: selectedCount > 0 ? '2px solid #667eea' : '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
            {selectedCount}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#b0b0b0' }}>Выбрано</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>
            {totalCount}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#b0b0b0' }}>Всего</div>
        </div>
      </div>

      {/* Выбор статуса */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          color: '#ffffff', 
          marginBottom: '0.5rem',
          fontWeight: '600'
        }}>
          Установить статус:
        </label>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['not-started', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              style={{
                padding: '12px 16px',
                border: `2px solid ${selectedStatus === status ? getStatusColor(status) : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '8px',
                background: selectedStatus === status ? `${getStatusColor(status)}20` : 'rgba(255, 255, 255, 0.05)',
                color: selectedStatus === status ? getStatusColor(status) : '#b0b0b0',
                cursor: 'pointer',
                fontWeight: '600',
                flex: 1,
                minWidth: '140px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (selectedStatus !== status) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedStatus !== status) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.color = '#b0b0b0';
                }
              }}
            >
              {getStatusIcon(status)} {getStatusText(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Управление выделением */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={handleSelectAll}
          disabled={technologies.length === 0}
          style={{
            padding: '8px 16px',
            border: '1px solid #4caf50',
            borderRadius: '6px',
            background: 'rgba(76, 175, 80, 0.1)',
            color: technologies.length === 0 ? '#666' : '#4caf50',
            cursor: technologies.length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (technologies.length > 0) {
              e.target.style.background = 'rgba(76, 175, 80, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (technologies.length > 0) {
              e.target.style.background = 'rgba(76, 175, 80, 0.1)';
            }
          }}
        >
          ✅ Выбрать все
        </button>
        
        <button
          onClick={handleSelectNotStarted}
          disabled={technologies.filter(t => t.status === 'not-started').length === 0}
          style={{
            padding: '8px 16px',
            border: '1px solid #ff9800',
            borderRadius: '6px',
            background: 'rgba(255, 152, 0, 0.1)',
            color: technologies.filter(t => t.status === 'not-started').length === 0 ? '#666' : '#ff9800',
            cursor: technologies.filter(t => t.status === 'not-started').length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (technologies.filter(t => t.status === 'not-started').length > 0) {
              e.target.style.background = 'rgba(255, 152, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (technologies.filter(t => t.status === 'not-started').length > 0) {
              e.target.style.background = 'rgba(255, 152, 0, 0.1)';
            }
          }}
        >
          ⏳ Только не начатые
        </button>
        
        <button
          onClick={handleSelectNone}
          style={{
            padding: '8px 16px',
            border: '1px solid #9e9e9e',
            borderRadius: '6px',
            background: 'rgba(158, 158, 158, 0.1)',
            color: '#9e9e9e',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(158, 158, 158, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(158, 158, 158, 0.1)';
          }}
        >
          ❌ Снять выделение
        </button>
      </div>

      {/* Список технологий */}
      <div style={{ 
        maxHeight: '300px', 
        overflowY: 'auto',
        marginBottom: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        {technologies.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#666', 
            padding: '2rem',
            fontStyle: 'italic'
          }}>
            Нет технологий для редактирования
          </div>
        ) : (
          technologies.map(tech => (
            <label
              key={tech.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem',
                background: selectedTechnologies.includes(tech.id) 
                  ? 'rgba(102, 126, 234, 0.1)' 
                  : 'transparent',
                borderRadius: '6px',
                marginBottom: '0.5rem',
                cursor: 'pointer',
                border: selectedTechnologies.includes(tech.id) 
                  ? '1px solid #667eea' 
                  : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!selectedTechnologies.includes(tech.id)) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedTechnologies.includes(tech.id)) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <input
                type="checkbox"
                checked={selectedTechnologies.includes(tech.id)}
                onChange={() => handleTechnologySelect(tech.id)}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer'
                }}
                aria-label={`Выбрать технологию ${tech.title}`}
              />
              <span style={{ color: '#ffffff', flex: 1, fontWeight: '500' }}>
                {tech.title}
                {tech.isFromApi && (
                  <span style={{ 
                    fontSize: '0.7rem', 
                    color: '#ffcb05',
                    marginLeft: '0.5rem',
                    fontWeight: 'normal'
                  }}>
                    🐰 PokéAPI
                  </span>
                )}
              </span>
              <span style={{ 
                color: getStatusColor(tech.status),
                fontSize: '0.8rem',
                padding: '4px 8px',
                borderRadius: '12px',
                background: `${getStatusColor(tech.status)}20`,
                border: `1px solid ${getStatusColor(tech.status)}40`,
                minWidth: '100px',
                textAlign: 'center'
              }}>
                {getStatusIcon(tech.status)} {getStatusText(tech.status)}
              </span>
            </label>
          ))
        )}
      </div>

      {/* Подтверждение действия */}
      {confirmAction && (
        <div style={{
          background: 'rgba(255, 152, 0, 0.1)',
          border: '1px solid rgba(255, 152, 0, 0.3)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#ff9800', margin: '0 0 1rem 0', fontWeight: '600' }}>
            ⚠️ Вы уверены, что хотите изменить статус для {selectedCount} технологий на "{getStatusText(selectedStatus)}"?
          </p>
          <p style={{ color: '#b0b0b0', fontSize: '0.9rem', margin: 0 }}>
            Это действие нельзя отменить
          </p>
        </div>
      )}

      {/* Кнопка применения */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {confirmAction ? (
          <>
            <button
              onClick={handleApplyChanges}
              style={{
                flex: 1,
                padding: '12px 24px',
                border: '2px solid #4caf50',
                borderRadius: '8px',
                background: 'rgba(76, 175, 80, 0.1)',
                color: '#4caf50',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(76, 175, 80, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(76, 175, 80, 0.1)';
              }}
            >
              ✅ Подтвердить изменение
            </button>
            <button
              onClick={handleCancelConfirm}
              style={{
                flex: 1,
                padding: '12px 24px',
                border: '2px solid #9e9e9e',
                borderRadius: '8px',
                background: 'rgba(158, 158, 158, 0.1)',
                color: '#9e9e9e',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(158, 158, 158, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(158, 158, 158, 0.1)';
              }}
            >
              ❌ Отмена
            </button>
          </>
        ) : (
          <button
            onClick={handleApplyChanges}
            disabled={selectedTechnologies.length === 0}
            style={{
              width: '100%',
              padding: '12px 24px',
              border: '2px solid #667eea',
              borderRadius: '8px',
              background: selectedTechnologies.length === 0 
                ? 'rgba(102, 126, 234, 0.3)' 
                : 'rgba(102, 126, 234, 0.1)',
              color: selectedTechnologies.length === 0 ? '#666' : '#667eea',
              cursor: selectedTechnologies.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedTechnologies.length > 0) {
                e.target.style.background = 'rgba(102, 126, 234, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTechnologies.length > 0) {
                e.target.style.background = 'rgba(102, 126, 234, 0.1)';
              }
            }}
          >
            {selectedCount === 0 
              ? '🔄 Выберите технологии для редактирования' 
              : `🔄 Применить к ${selectedCount} технологиям`
            }
          </button>
        )}
      </div>

      {selectedTechnologies.length === 0 && technologies.length > 0 && (
        <div style={{ 
          color: '#ff9800', 
          textAlign: 'center', 
          marginTop: '1rem',
          fontSize: '0.9rem'
        }}>
          Выберите технологии для редактирования
        </div>
      )}
    </div>
  );
}

export default BulkStatusEditor;