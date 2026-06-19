import React, { useState, useEffect } from 'react';
import '../../styles/App.css';
import TaskList from '../TaskList/TaskList';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskForm from '../TaskForm/TaskForm';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from '../../services/api';

// Main app component that manages tasks and logic
function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search ,setSearch] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    // Load tasks from the backend API
    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    // Handle task creation
    const handleCreate = async (taskData) => {
        try {
            const newTask = await createTask(taskData);
            setTasks(prev => [...prev, newTask]);
            setShowForm(false);
        } catch (err) {
            setError('Failed to create task');
        }
    };

    // Handle task update
    const handleUpdate = async (id, taskData) => {
        try {
            const updatedTask = await updateTask(id, taskData);
            setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
            setShowForm(false);
            setEditingTask(null);
        } catch (err) {
            setError('Failed to update task');
        }
    };

    // Handle task deletion
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await deleteTask(id);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    // Handle toggling task completion status
    const handleToggle = async (id) => {
        try {
            const updated = await toggleTask(id);
            setTasks(prev => prev.map(t => t.id === id ? updated : t));
        } catch (err) {
            setError('Failed to toggle task');
        }
    };

    // Handle editing a task
    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    // Filter tasks based on the selected filter
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed && task.title.toLowerCase().includes(search.toLowerCase());
        if (filter === 'pending') return !task.completed && task.title.toLowerCase().includes(search.toLowerCase());
        return task.title.toLowerCase().includes(search.toLowerCase());
    });

    // Render the main app layout
    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Task Manager</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    + Add Task
                </button>
            </header>

            <main className="app-main">
                {error && (
                    <div className="error-banner">
                        <span>{error}</span>
                        <button onClick={() => setError(null)}>✕</button>
                    </div>
                )}

                <TaskFilter filter={filter} onFilterChange={setFilter} tasks={tasks} />

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {loading ? (
                    <div className="loading">Loading tasks...</div>
                ) : (
                    <TaskList
                        tasks={filteredTasks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                    />
                )}
            </main>

            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSubmit={editingTask ? (data) => handleUpdate(editingTask.id, data) : handleCreate}
                    onClose={() => { setShowForm(false); setEditingTask(null); }}
                />
            )}
        </div>
    );
}

export default App;
