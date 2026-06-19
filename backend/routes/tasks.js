const express = require('express');
const router = express.Router();

let tasks = []; // In-memory storage for tasks
let index = 1;

// GET /api/tasks - retrieve all tasks
router.get('/', (req,res) => {
    res.json(tasks);
})

// POST /api/tasks - create a new task
router.post('/', (req,res) => {
    const {title, description, priority} = req.body;

    if(!title || title.trim() === '') {
        return res.status(400).json({error: 'Title is required'});
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority.toLowerCase())) {
        return res.status(400).json({error: 'Priority must be low, medium or high'});
    }

    //create a new task object
    const newTask = {
        id: index++,
        title: title.trim(),
        description: description ? description.trim() : '',
        completed: false,
        priority: priority ? priority.toLowerCase() : 'low',
        createdAt: new Date()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /api/tasks/:id - update a task
router.put('/:id', (req,res)=> {
    const id = parseInt(req.params.id);
    const taskindex = tasks.findIndex(t => t.id === id);
    
    if(taskindex === -1) {
        return res.status(404).json({error: 'Task not found'});
    }

    const {title, description, completed, priority} = req.body;
    if (title !== undefined && title.trim() === '') {
        return res.status(400).json({error: 'Title cannot be empty'});
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority !== undefined && !validPriorities.includes(priority.toLowerCase())) {
        return res.status(400).json({error: 'Priority must be low, medium or high'});
    }

    // keeping the old values as they were if not provided in the request body
    tasks[taskindex] = {
        ...tasks[taskindex],
        ...(title!== undefined && {title: title.trim()}),
        ...(description !==undefined && {description: description.trim()}),
        ...(completed !== undefined && {completed: Boolean(completed)}),
        ...(priority !== undefined && {priority: priority.toLowerCase()})
    };

    res.json(tasks[taskindex]);
})

// DELETE /api/tasks/:id - delete a task
router.delete('/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const taskindex = tasks.findIndex(t => t.id === id);
    
    if(taskindex === -1) {
        return res.status(404).json({error: 'Task not found'});
    }

    tasks.splice(taskindex, 1);
    res.status(204).send();
});

//PATCH /api/tasks/:id/toggle - mark a task as completed
router.patch('/:id/toggle', (req,res)=> {
    const id = parseInt(req.params.id);
    const taskindex = tasks.findIndex(t=> t.id === id);

    if(taskindex === -1) {
        return res.status(404).json({error: 'Task not found'});
    }

    tasks[taskindex].completed = !tasks[taskindex].completed;
    res.json(tasks[taskindex]);
});

module.exports = router;
