import React from 'react';
import { useTodo } from '../context/TodoContext';

const TodoItem = ({ todo }) => {

  const {toggleTodo, deleteTodo} = useTodo();

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'between',
    padding: '10px',
    borderBottom: '1px solid #eee',
    textDecoration: todo.completed ? 'line-through' : 'none',
    color: todo.completed ? '#2e7d32' : '#000', 
    backgroundColor: todo.completed ? '#f1f8e9' : 'transparent',
    transition: 'all 0.3s ease'
  };

  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
        
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', ...itemStyle, borderBottom: 'none', flex: 1 }}>

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />

        <span>{todo.text}</span>

      </div>

      <button 
        onClick={() => deleteTodo(todo.id)} 
        style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}
      >
        O'chirish
      </button>

    </li>
  );
};

export default TodoItem;