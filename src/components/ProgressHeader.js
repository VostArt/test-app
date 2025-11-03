import React from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const totalTechnologies = technologies.length;
  const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
  const inProgressTechnologies = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started').length;
  
  const progressPercentage = totalTechnologies > 0 
    ? Math.round((completedTechnologies / totalTechnologies) * 100) 
    : 0;

  const getProgressLevel = () => {
    if (progressPercentage >= 80) return 'excellent';
    if (progressPercentage >= 60) return 'good';
    if (progressPercentage >= 40) return 'average';
    return 'poor';
  };

  return (
    <div className="progress-header">
      <div className="progress-header__stats">
        <div className="progress-stat">
          <span className="progress-stat__number">{totalTechnologies}</span>
          <span className="progress-stat__label">Всего</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat__number" style={{color: '#4caf50'}}>
            {completedTechnologies}
          </span>
          <span className="progress-stat__label">Изучено</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat__number" style={{color: '#ff9800'}}>
            {inProgressTechnologies}
          </span>
          <span className="progress-stat__label">В процессе</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat__number" style={{color: '#9e9e9e'}}>
            {notStartedTechnologies}
          </span>
          <span className="progress-stat__label">Не начато</span>
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className={`progress-bar__fill progress-bar__fill--${getProgressLevel()}`}
          style={{ width: `${progressPercentage}%` }}
        >
          <span className="progress-bar__text">{progressPercentage}%</span>
        </div>
      </div>
      
      <div className="progress-message">
        {progressPercentage === 100 ? (
          <span className="progress-message__complete">🎉 Поздравляем! Вы изучили все технологии!</span>
        ) : progressPercentage >= 70 ? (
          <span className="progress-message__good">Отличный прогресс! Продолжайте в том же духе! 💪</span>
        ) : progressPercentage >= 40 ? (
          <span className="progress-message__average">Хорошие результаты! Еще немного усилий! ✨</span>
        ) : (
          <span className="progress-message__poor">Начните изучение - каждый шаг важен! 🚀</span>
        )}
      </div>
    </div>
  );
}

export default ProgressHeader;