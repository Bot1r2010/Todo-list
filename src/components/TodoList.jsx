import React from 'react'
import { useTodo } from '../context/TodoContext';
import TodoItem from './Todo.Item';

const TodoList = () => {
    const { todos } = useTodo();
    if (todos.length === 0) {
        return <p style={{ textAlign: 'center', color: '#666' }}>Нет заданий</p>;
    }
  return (
    <div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
      
    </div>
  )
}

export default TodoList;
