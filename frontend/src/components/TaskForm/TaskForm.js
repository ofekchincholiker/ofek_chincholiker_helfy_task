import React, { useState, useEffect } from 'react';
import '../../styles/TaskForm.css';

// Form component for creating and editing tasks
function TaskForm({ task, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low' // default priority
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If editing an existing task, fill the form with its data
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority
      });
    }
  }, [task]);

    // Handle form input changes
    const handleChange= (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    setSubmitting(true);
    await onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority
    });
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">

        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'New Task'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className={error ? 'input-error' : ''}
            />
            {error && <span className="error-msg">{error}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (optional)"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default TaskForm;
