import './Modal.css';

function Modal({ isOpen, onClose, title, children, type, onConfirm, technology, deleteAll }) {
  if (!isOpen) {
    return null;
  }

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  // Функция для рендеринга контента модального окна удаления
  const renderDeleteContent = () => {
    if (deleteAll) {
      return (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f44336', fontWeight: '600', marginBottom: '1rem' }}>
            ⚠️ Вы уверены, что хотите удалить ВСЕ технологии?
          </p>
          <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
            Это действие нельзя отменить. Будут удалены все технологии, прогресс и заметки.
          </p>
          <div style={{ 
            background: 'rgba(244, 67, 54, 0.1)', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid rgba(244, 67, 54, 0.3)',
            marginBottom: '1.5rem'
          }}>
            <p style={{ color: '#f44336', margin: 0, fontSize: '0.9rem' }}>
              ❌ Будет удалено: все технологии
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#f44336', fontWeight: '600', marginBottom: '1rem' }}>
          ⚠️ Вы уверены, что хотите удалить технологию?
        </p>
        {technology && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ color: '#ffffff', margin: '0 0 0.5rem 0' }}>
              {technology.title}
            </h4>
            <p style={{ color: '#b0b0b0', margin: 0, fontSize: '0.9rem' }}>
              {technology.description.substring(0, 100)}...
            </p>
          </div>
        )}
        <p style={{ color: '#b0b0b0' }}>
          Это действие нельзя отменить.
        </p>
      </div>
    );
  };

  // Функция для рендеринга действий модального окна
  const renderActions = () => {
    if (type === 'delete') {
      return (
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginTop: '1.5rem'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              border: '2px solid #9e9e9e',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#9e9e9e',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Отмена
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: '10px 20px',
              border: '2px solid #f44336',
              borderRadius: '8px',
              background: 'rgba(244, 67, 54, 0.1)',
              color: '#f44336',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            🗑️ Удалить
          </button>
        </div>
      );
    }

    return children;
  };

  const getModalTitle = () => {
    if (type === 'delete') {
      if (deleteAll) return '🗑️ Удалить все технологии';
      return '🗑️ Удалить технологию';
    }
    return title;
  };

  return (
    <div className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-window">
        <div className="modal-header">
          <h2>{getModalTitle()}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">
          {type === 'delete' ? renderDeleteContent() : children}
          {renderActions()}
        </div>
      </div>
    </div>
  );
}

export default Modal;