const mongoose = require('mongoose');

// Log Schema for tracking task events (like creation, updates, etc.)
const logSchema = new mongoose.Schema({
  action: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  taskId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task' 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

// Log Model
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
