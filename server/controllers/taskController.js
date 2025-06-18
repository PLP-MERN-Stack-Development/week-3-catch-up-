const Task = require("../Models/Task");

// Get All Tasks
const getTasks = async (req, res) =>{
    const tasks = await Task.find();
    res.json(tasks);
};

// Create a Task
const createTask = async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task); // <----This becomes res.data on the frontend
};

// Update a task
const updateTask = async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

// Delete a Task
const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };