const express = require('express');
const Task = require('../../models/taskModel'); // Import Task model
const { calculatePriority } = require('../../Services/taskPrioritization'); // Import prioritization service

const router = express.Router();

// Route for getting all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.json(tasks); // Respond with tasks
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for creating a new task
router.post('/', async (req, res) => {
  const { title, dueDate, category, priority } = req.body;

  // If priority is not provided, we can calculate it based on workload or set a default
  const finalPriority = priority || 'low';  // Use the priority from the frontend, default to 'low' if not provided

  const task = new Task({
    title,
    dueDate,
    priority: finalPriority, // Use the priority sent by the frontend
    category,
  });

  try {
    const newTask = await task.save(); // Save task to the database
    res.status(201).json(newTask); // Respond with the created task
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route for deleting a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id); // Find and delete task by ID
    if (!task) {
      return res.status(404).json({ message: 'Task not found' }); // Handle task not found
    }
    res.json({ message: 'Task deleted successfully' }); // Respond with success
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
