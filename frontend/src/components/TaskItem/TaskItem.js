import React from 'react';
import '../../styles/TaskItem.css';

// Formats a date to a readable string (for example "Jun 19, 2026")
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// TaskItem component to display individual task details
function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className={`task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
      
      <div className="task-card-header">
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
        <span className={`status-badge ${task.completed ? 'done' : 'pending'}`}>
          {task.completed ? 'Done' : 'Pending'}
        </span>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <p className="task-date">Created {formatDate(task.createdAt)}</p>

      <div className="task-actions">
        <button className="action-btn toggle-btn" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button className="action-btn edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>

    </div>
  );
}

export default TaskItem;
