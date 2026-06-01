import React, { createContext, useState, useEffect, useContext } from 'react';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <TodoContext.Provider value={{ todos: filteredTodos, filter, setFilter, addTodo, deleteTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => useContext(TodoContext);

const TodoForm = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Пожалуйста, введите текст задачи!");
      return;
    }
    addTodo(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Новая задача..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: '8px', fontSize: '16px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '16px' }}>
        Добавить
      </button>
    </form>
  );
};

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    textDecoration: todo.completed ? 'line-through' : 'none',
    color: todo.completed ? 'green' : 'black',
    flex: 1,
    cursor: 'pointer'
  };

  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
      <div style={itemStyle} onClick={() => toggleTodo(todo.id)}>
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={() => toggleTodo(todo.id)}
          style={{ marginRight: '10px', cursor: 'pointer' }}
        />
        <span>{todo.text}</span>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(todo.id);
        }} 
        style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none' }}
      >
        Удалить
      </button>
    </li>
  );
};

const TodoList = () => {
  const { todos } = useTodo();

  if (todos.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>Список задач пуст.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

const TodoFilter = () => {
  const { filter, setFilter } = useTodo();

  const buttonStyle = (currentFilter) => ({
    padding: '6px 12px',
    cursor: 'pointer',
    backgroundColor: filter === currentFilter ? '#2196F3' : '#e7e7e7',
    color: filter === currentFilter ? 'white' : 'black',
    border: '1px solid #ccc'
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
      <button style={buttonStyle('all')} onClick={() => setFilter('all')}>Все</button>
      <button style={buttonStyle('completed')} onClick={() => setFilter('completed')}>Выполненные</button>
      <button style={buttonStyle('active')} onClick={() => setFilter('active')}>Активные</button>
    </div>
  );
};

export default function App() {
  return (
    <TodoProvider>
      <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ textAlign: 'center', marginTop: 0 }}>Список задач</h2>
        <TodoForm />
        <TodoList />
        <TodoFilter />
      </div>
    </TodoProvider>
  );
}