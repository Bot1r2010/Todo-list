import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, settodos] = useState(() => {
    const sevedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
});
}

const [filter, setFilter] = useState('all');

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

const addTodo = (text) => {
    const newTodo = {
        id: Date.now(),
        text,
        comleted: false,
    };
    setTodos((prevTodos,) => [...prevTodos, newTodo]);
};

const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
};

const toggleTodo = (id) => {
    setTodos((prevTodos) =>
        prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
};

const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
});

return (
    <TodoContext.Provider
        value={{
            todos,
            filteredTodos,
            addTodo,
            deleteTodo,
            toggleTodo,
            filter,
            setFilter
        }}
    >
        {children}
    </TodoContext.Provider>
);

export const TodoContext = () => {
    return useContext(TodoContext);
};