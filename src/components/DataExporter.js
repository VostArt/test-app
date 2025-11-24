import React, { useState } from 'react';

function DataExporter({ technologies }) {
  const [exportFormat, setExportFormat] = useState('json');
  const [includeUserData, setIncludeUserData] = useState(true);
  const [exporting, setExporting] = useState(false);

  const exportData = () => {
    if (!canExport) return;
    
    setExporting(true);
    
    try {
      const exportData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        totalTechnologies: technologies.length,
        technologies: includeUserData 
          ? technologies.map(tech => ({
              id: tech.id,
              title: tech.title,
              description: tech.description,
              category: tech.category,
              status: tech.status,
              notes: tech.notes || '',
              deadline: tech.deadline || '',
              difficulty: tech.difficulty,
              resources: tech.resources || [],
              isFromApi: tech.isFromApi || false,
              pokemonData: tech.pokemonData || null
            }))
          : technologies.map(({ notes, status, deadline, ...tech }) => tech)
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technology-tracker-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTimeout(() => setExporting(false), 1500);
      
    } catch (error) {
      console.error('Export error:', error);
      setExporting(false);
    }
  };

  const canExport = technologies && technologies.length > 0;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h3 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>📤 Экспорт данных</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="export-format" style={{ color: '#ffffff', fontWeight: '600' }}>
            Формат экспорта
          </label>
          <select
            id="export-format"
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '2px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '1rem',
              maxWidth: '200px'
            }}
            aria-describedby="format-help"
          >
            <option value="json">JSON</option>
          </select>
          <div id="format-help" style={{ color: '#b0b0b0', fontSize: '0.8rem' }}>
            В настоящее время доступен только формат JSON
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={includeUserData}
              onChange={(e) => setIncludeUserData(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
              aria-describedby="userdata-help"
            />
            Включить мои заметки и прогресс
          </label>
          <span id="userdata-help" style={{ color: '#b0b0b0', fontSize: '0.8rem' }}>
            При включении будут экспортированы ваши личные заметки, статусы и сроки изучения
          </span>
        </div>
      </div>

      {!canExport && (
        <div 
          style={{
            color: '#ff9800',
            background: 'rgba(255, 152, 0, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem',
            border: '1px solid rgba(255, 152, 0, 0.3)'
          }}
          role="alert"
          id="export-warning"
        >
          ⚠️ Нет данных для экспорта. Добавьте технологии в трекер.
        </div>
      )}

      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button
          onClick={exportData}
          disabled={!canExport || exporting}
          style={{
            padding: '12px 24px',
            border: '2px solid #4caf50',
            borderRadius: '8px',
            background: exporting ? 'rgba(76, 175, 80, 0.3)' : (canExport ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)'),
            color: exporting ? '#a0a0a0' : (canExport ? '#4caf50' : '#666'),
            cursor: canExport && !exporting ? 'pointer' : 'not-allowed',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          aria-describedby={canExport ? 'export-help' : 'export-warning'}
        >
          {exporting ? '⏳ Экспорт...' : '📥 Экспортировать данные'}
        </button>

        <div id="export-help" style={{ color: '#b0b0b0', fontSize: '0.8rem' }}>
          Файл будет сохранен в формате JSON на вашем устройстве
        </div>

        {exporting && (
          <div 
            style={{
              color: '#4caf50',
              background: 'rgba(76, 175, 80, 0.1)',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              textAlign: 'center'
            }}
            role="status"
          >
            ✅ Данные успешно экспортированы!
          </div>
        )}
      </div>
    </div>
  );
}

export default DataExporter;