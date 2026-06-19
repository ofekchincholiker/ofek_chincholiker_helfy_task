const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

// Create an Express application
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRouter);

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
