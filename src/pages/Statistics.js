import React from 'react';
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function Statistics() {
  const { technologies } = useTechnologies();

  const totalTechnologies = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  
  const progressPercentage = totalTechnologies > 0 
    ? Math.round((completed / totalTechnologies) * 100) 
    : 0;

  // Данные для графика
  const statusData = [
    { name: 'Изучено', value: completed, color: '#4caf50' },
    { name: 'В процессе', value: inProgress, color: '#ff9800' },
    { name: 'Не начато', value: notStarted, color: '#9e9e9e' }
  ];

  const categoryData = technologies.reduce((acc, tech) => {
    acc[tech.category] = (acc[tech.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="App-main" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#ffffff', margin: '0 0 1rem 0' }}>📊 Статистика прогресса</h1>
        <p style={{ color: '#b0b0b0' }}>Анализ вашего прогресса в изучении технологий</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4caf50' }}>
            {progressPercentage}%
          </div>
          <div style={{ color: '#b0b0b0' }}>Общий прогресс</div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffffff' }}>
            {totalTechnologies}
          </div>
          <div style={{ color: '#b0b0b0' }}>Всего технологий</div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ff9800' }}>
            {completed}
          </div>
          <div style={{ color: '#b0b0b0' }}>Изучено</div>
        </div>
      </div>

      {/* График прогресса */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h3 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>📈 Распределение по статусам</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {statusData.map((item, index) => (
            <div key={index}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '0.5rem',
                color: '#ffffff'
              }}>
                <span>{item.name}</span>
                <span>{item.value} ({totalTechnologies > 0 ? Math.round((item.value / totalTechnologies) * 100) : 0}%)</span>
              </div>
              <div style={{
                width: '100%',
                height: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${totalTechnologies > 0 ? (item.value / totalTechnologies) * 100 : 0}%`,
                  height: '100%',
                  background: item.color,
                  borderRadius: '10px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Распределение по категориям */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h3 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>🗂️ Распределение по категориям</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {Object.entries(categoryData).map(([category, count]) => (
            <div key={category} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                {count}
              </div>
              <div style={{ color: '#b0b0b0', textTransform: 'capitalize' }}>
                {category}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link 
          to="/technologies" 
          className="filter-btn active"
          style={{ textDecoration: 'none' }}
        >
          📚 Перейти к технологиям
        </Link>
      </div>
    </div>
  );
}

export default Statistics;