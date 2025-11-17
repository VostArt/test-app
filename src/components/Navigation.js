import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ApiStatus from './ApiStatus';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">
          <h2>🚀 Трекер технологий</h2>
        </Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <ul className="nav-menu">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'nav-link--active' : ''}`}
            >
              🏠 Главная
            </Link>
          </li>
          <li>
            <Link 
              to="/technologies" 
              className={`nav-link ${location.pathname === '/technologies' ? 'nav-link--active' : ''}`}
            >
              💻 Все технологии
            </Link>
          </li>
          <li>
            <Link 
              to="/statistics" 
              className={`nav-link ${location.pathname === '/statistics' ? 'nav-link--active' : ''}`}
            >
              📊 Статистика
            </Link>
          </li>
          <li>
            <Link 
              to="/add-technology" 
              className={`nav-link ${location.pathname === '/add-technology' ? 'nav-link--active' : ''}`}
            >
              ➕ Добавить
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`nav-link ${location.pathname === '/settings' ? 'nav-link--active' : ''}`}
            >
              ⚙️ Настройки
            </Link>
          </li>
        </ul>
        
        <ApiStatus />
      </div>
    </nav>
  );
}

export default Navigation;