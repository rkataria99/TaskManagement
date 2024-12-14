import React, { useState } from 'react';
import api from '../api';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [category, setCategory] = useState('General');
  const [message, setMessage] = useState('');

  const createTask = async (e) => {
    e.preventDefault();

    const newTask = { title, dueDate, priority, category };
    const currentDate = new Date();
    const selectedDate = new Date(dueDate);

    if (selectedDate < currentDate) {
      alert('Due date cannot be in the past!');
      return;
    }

    try {
      const response = await api.post('/tasks', newTask);
      onTaskCreated(response.data);
      setTitle('');
      setDueDate('');
      setPriority('low');
      setCategory('General');
      setMessage('Task created successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('Failed to create task.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <form onSubmit={createTask}>
      <h3>Create a Task</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>
      <button type="submit">Create Task</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default TaskForm;
