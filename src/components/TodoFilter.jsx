import React from 'react';
import { useTodo } from '../context/TodoContext';

const TodoFilter = () => {
  const { filter, setFilter } = useTodo();

  const buttonStyle = (currentFilter) => ({
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: filter === currentFilter ? '#1976d2' : '#f5f5f5',
    color: filter === currentFilter ? '#fff' : '#000',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px'
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
      <button style={buttonStyle('all')} onClick={() => setFilter('all')}>
        Barchasi
      </button>
      <button style={buttonStyle('completed')} onClick={() => setFilter('completed')}>
        Bajarilganlar
      </button>
      <button style={buttonStyle('active')} onClick={() => setFilter('active')}>
        Bajarilmaganlar
      </button>
    </div>
  );
};

export default TodoFilter;