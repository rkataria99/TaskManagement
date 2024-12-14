import React from 'react';
import api from '../api';

function TaskList({ tasks, onTaskDeleted }) {
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      onTaskDeleted(id); // Notify App to remove task from the state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {});

  const sortTasksByPriority = (tasks) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  };

  const categoryOrder = ['Urgent', 'Work', 'Personal', 'General'];
  const sortedCategories = Object.keys(groupedTasks).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <div>
      <h3>Task List</h3>
      {sortedCategories.map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortTasksByPriority(groupedTasks[category]).map((task) => {
                const formattedDate = new Date(task.dueDate).toLocaleString();
                return (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{formattedDate}</td>
                    <td>{task.priority}</td>
                    <td>
                      <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
