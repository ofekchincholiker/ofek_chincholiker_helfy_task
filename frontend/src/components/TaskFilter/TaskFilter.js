import React from 'react';
import '../../styles/TaskFilter.css';

// TaskFilter component to filter tasks based on their status
function TaskFilter({filter, onFilterChange, tasks}) {
    const counts ={
        all: tasks.length,
        pending: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length
    };

    // Render filter buttons with counts
    return (
        <div className="task-filter">
            {['all', 'pending', 'completed'].map(f => (
                <button 
                    key={f}
                    className={`filter-btn ${filter === f ? 'active' : ''}`}
                    onClick={() => onFilterChange(f)}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
                </button>
            ))}
        </div>
    );
}

export default TaskFilter;