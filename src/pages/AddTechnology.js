import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function AddTechnology() {
  const navigate = useNavigate();
  const { technologies, setTechnologies } = useTechnologies();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTechnology = {
      id: Math.max(0, ...technologies.map(t => t.id)) + 1,
      title: formData.title,
      description: formData.description,
      status: 'not-started',
      notes: '',
      category: formData.category
    };

    const updatedTechnologies = [...technologies, newTechnology];
    setTechnologies(updatedTechnologies);
    
    navigate('/technologies');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="App-main" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#ffffff', margin: '0 0 1rem 0' }}>Добавить новую технологию</h1>
        <p style={{ color: '#b0b0b0' }}>Заполните информацию о технологии, которую хотите изучить</p>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '2rem',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            color: '#ffffff', 
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            Название технологии *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="search-input"
            placeholder="Например: React Hooks"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            color: '#ffffff', 
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            Описание *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            placeholder="Опишите, что включает в себя изучение этой технологии..."
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            color: '#ffffff', 
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            Категория
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="tools">Инструменты</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate('/technologies')}
            className="filter-btn"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="filter-btn active"
          >
            Добавить технологию
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;