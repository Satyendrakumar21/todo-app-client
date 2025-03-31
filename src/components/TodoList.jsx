import React, { useState, useEffect } from 'react';
import { getTodos, deleteTodo } from '../services/api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [status, sort, search]);

  const fetchTodos = async () => {
    try {
      const response = await getTodos({ status, sort, search });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo._id} className="todo-item">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <div className="todo-meta">
              <span>Status: {todo.status}</span>
              <span>Priority: {todo.priority}</span>
              <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="todo-actions">
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
              <button onClick={() => navigate(`/edit/${todo._id}`)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList; 