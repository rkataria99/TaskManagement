const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'],
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  category: { 
    type: String, default: 'General' 
  }
});

// Task Model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
