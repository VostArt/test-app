import React, { useState } from 'react';

function DataImporter({ onImport }) {
  const [importError, setImportError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [importing, setImporting] = useState(false);

  const validateImportData = (data) => {
    if (!data.technologies || !Array.isArray(data.technologies)) {
      throw new Error('Неверный формат файла: отсутствует массив technologies');
    }

    if (data.technologies.length === 0) {
      throw new Error('Файл не содержит технологий для импорта');
    }

    data.technologies.forEach((tech, index) => {
      if (!tech.title || typeof tech.title !== 'string') {
        throw new Error(`Технология #${index + 1}: отсутствует название`);
      }

      if (!tech.description || typeof tech.description !== 'string') {
        throw new Error(`Технология #${index + 1}: отсутствует описание`);
      }

      if (tech.title.length > 50) {
        throw new Error(`Технология "${tech.title}": название слишком длинное (макс. 50 символов)`);
      }

      if (tech.description.length > 500) {
        throw new Error(`Технология "${tech.title}": описание слишком длинное (макс. 500 символов)`);
      }
    });

    return true;
  };

  const handleFileUpload = (file) => {
    setImportError('');
    setImporting(true);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const importedData = JSON.parse(fileContent);
        
        validateImportData(importedData);
        onImport(importedData.technologies);
        setImporting(false);
        
      } catch (error) {
        setImportError(`Ошибка импорта: ${error.message}`);
        setImporting(false);
      }
    };

    reader.onerror = () => {
      setImportError('Ошибка чтения файла');
      setImporting(false);
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        handleFileUpload(file);
      } else {
        setImportError('Поддерживаются только JSON файлы');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h3 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>📥 Импорт данных</h3>

      <div
        style={{
          border: `2px dashed ${isDragging ? '#667eea' : importError ? '#f44336' : 'rgba(255, 255, 255, 0.2)'}`,
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          background: isDragging ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s ease',
          cursor: importing ? 'default' : 'pointer',
          marginBottom: '1rem',
          position: 'relative'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={importing ? undefined : () => document.getElementById('file-input').click()}
        role="button"
        tabIndex={0}
        aria-label="Область для загрузки файла"
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !importing) {
            document.getElementById('file-input').click();
          }
        }}
      >
        {importing ? (
          <div>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(102, 126, 234, 0.3)',
              borderTop: '3px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <p style={{ color: '#b0b0b0', margin: 0 }}>⏳ Импорт данных...</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '3rem', margin: '0 0 1rem', color: '#b0b0b0' }}>📁</p>
            <p style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#ffffff' }}>
              Перетащите JSON файл сюда
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, color: '#b0b0b0' }}>
              или нажмите для выбора файла
            </p>
          </>
        )}
        
        <input
          type="file"
          accept=".json,application/json"
          onChange={handleFileSelect}
          id="file-input"
          style={{ display: 'none' }}
          aria-describedby="file-input-help"
        />
      </div>

      {importError && (
        <div 
          style={{
            color: '#f44336',
            background: 'rgba(244, 67, 54, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid rgba(244, 67, 54, 0.3)'
          }}
          role="alert"
          aria-live="polite"
        >
          ❌ {importError}
        </div>
      )}

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Требования к файлу:</h4>
        <ul style={{ color: '#b0b0b0', fontSize: '0.9rem', margin: 0, paddingLeft: '1.5rem' }}>
          <li>Формат: JSON</li>
          <li>Обязательные поля: title, description</li>
          <li>Максимальная длина названия: 50 символов</li>
          <li>Максимальная длина описания: 500 символов</li>
          <li>Поддерживаются пользовательские заметки и статусы</li>
        </ul>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default DataImporter;