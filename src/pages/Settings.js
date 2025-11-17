import React, { useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';

function Settings() {
  const { technologies, resetAllStatuses, markAllCompleted } = useTechnologies();
  const [exportData, setExportData] = useState('');

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      totalTechnologies: technologies.length,
      technologies: technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    setExportData(dataStr);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.technologies) {
            alert(`Готово к импорту ${data.technologies.length} технологий`);
          }
        } catch (error) {
          alert('Ошибка при чтении файла');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Вы уверены? Это удалит все ваши технологии и прогресс.')) {
      localStorage.removeItem('technologies');
      window.location.reload();
    }
  };

  const buttonStyle = {
    padding: '12px 24px',
    border: '2px solid',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#e0e0e0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontSize: '0.9rem',
    backdropFilter: 'blur(10px)'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderColor: '#667eea',
    color: 'white'
  };

  return (
    <div className="App-main" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#ffffff', margin: '0 0 1rem 0' }}>⚙️ Настройки приложения</h1>
        <p style={{ color: '#b0b0b0' }}>Управление данными и настройками трекера</p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h3 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>📊 Управление прогрессом</h3>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button
            onClick={markAllCompleted}
            style={{
              ...primaryButtonStyle,
              background: 'linear-gradient(135deg, #4caf50, #45a049)',
              borderColor: '#4caf50'
            }}
          >
            ✅ Отметить все как изученные
          </button>
          <button
            onClick={resetAllStatuses}
            style={{
              ...primaryButtonStyle,
              background: 'linear-gradient(135deg, #ff9800, #f57c00)',
              borderColor: '#ff9800'
            }}
          >
            🔄 Сбросить статусы
          </button>
        </div>

        <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
          Всего технологий: {technologies.length} | 
          Изучено: {technologies.filter(t => t.status === 'completed').length} | 
          В процессе: {technologies.filter(t => t.status === 'in-progress').length}
        </p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h3 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>📁 Экспорт и импорт данных</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={handleExport}
            style={primaryButtonStyle}
          >
            📤 Экспорт данных
          </button>
          {exportData && (
            <textarea
              value={exportData}
              readOnly
              rows="8"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                marginTop: '1rem'
              }}
            />
          )}
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            color: '#ffffff', 
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            📥 Импорт данных
          </label>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff'
            }}
          />
        </div>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h3 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>⚠️ Опасная зона</h3>
        
        <button
          onClick={handleClearData}
          style={{
            ...buttonStyle,
            background: 'linear-gradient(135deg, #f44336, #d32f2f)',
            borderColor: '#f44336',
            color: 'white'
          }}
        >
          🗑️ Очистить все данные
        </button>
        
        <p style={{ color: '#b0b0b0', fontSize: '0.8rem', marginTop: '1rem' }}>
          Внимание: это действие невозможно отменить. Все ваши технологии и прогресс будут удалены.
        </p>
      </div>
    </div>
  );
}

export default Settings;