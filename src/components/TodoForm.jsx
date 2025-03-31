import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTodo, updateTodo, getTodo } from '../services/api';

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (id) {
      fetchTodo();
    }
  }, [id]);

  const fetchTodo = async () => {
    try {
      const response = await getTodo(id);
      setTodo({
        ...response.data,
        dueDate: new Date(response.data.dueDate).toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTodo(id, todo);
      } else {
        await createTodo(todo);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={todo.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={todo.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={todo.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Priority:</label>
        <select name="priority" value={todo.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={todo.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{id ? 'Update' : 'Create'} Todo</button>
    </form>
  );
};

export default TodoForm; 