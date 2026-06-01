import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

const TodoFrom = () => {
    const [text, settext] = useState('');
    const {addTodo} =useContext(TodoContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (text.trim()) {
            alert("Пожалуйста, введите текст задания!")
            return;
        }

        addTodo(text.trim());
        settext('');
    }
  return (
    <div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Новое задание..."
                style={{ flex: 1, padding: '8px', fontSize: '16px' }}
            />
            <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Добавить</button>
        </form>
    </div>
  )
}

export default TodoFrom
