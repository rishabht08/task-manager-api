const express = require('express')

const taskRouter = express.Router();
const taskHandler = require("../handlers/task.handler")

taskRouter.get('/', taskHandler.getTasks);
taskRouter.get('/:id', taskHandler.getTaskById);
taskRouter.post('/', taskHandler.createTask);
taskRouter.put('/:id', taskHandler.updateTaskById);
taskRouter.delete('/:id', taskHandler.deleteTaskById);
taskRouter.get('/priority/:level', taskHandler.getTasksByPriority);


module.exports = taskRouter