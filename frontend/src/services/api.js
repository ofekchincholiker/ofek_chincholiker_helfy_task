const API_BASE = 'http://localhost:4000/api';
// API functions to interact with the backend

// Fetch all tasks
export const getTasks = async ()=> {
    const res = await fetch(`${API_BASE}/tasks`);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
};

// Create a new task
export const createTask = async (taskData) => {
    const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(taskData)
    });
    
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
};

// Update an existing task
export const updateTask = async (id,taskData)=>{
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(taskData)
    });
    if(!res.ok) throw new Error('Failed to update task');
    return res.json();
};

// Delete a task
export const deleteTask = async (id) => {
    const res =await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE'
    });
    if(!res.ok) throw new Error('Failed to delete task');
};

// Toggle task completion status
export const toggleTask = async(id) =>{
    const res= await fetch(`${API_BASE}/tasks/${id}/toggle`, {
        method: 'PATCH'
    });
    if(!res.ok) throw new Error('Failed to toggle task');
    return res.json();
};

