// services/taskPrioritization.js

/**
 * Calculate task priority based on the due date and workload.
 * @param {Date} dueDate - The due date of the task.
 * @param {number} workload - The estimated effort required for the task.
 * @returns {string} Priority level ("high", "medium", "low").
 */
// services/taskPrioritization.js
const calculatePriority = (dueDate, workload) => {
    const priority = workload >= 70 ? 'high' : workload >= 40 ? 'medium' : 'low';
    return priority;
  };
  
  module.exports = { calculatePriority };
  
  