import TaskService from '../services/taskService.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getTasks(req.user.id, req.params.groupId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const createTask = async (req, res) => {
  try {
    const task = await TaskService.createTask(req.user.id, req.params.groupId, req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const updateTask = async (req, res) => {
  try {
    const task = await TaskService.updateTask(req.user.id, req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await TaskService.deleteTask(req.user.id, req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const assignTask = async (req, res) => {
  try {
    const task = await TaskService.assignTask(req.user.id, req.params.id, req.params.userId);
    res.status(200).json(task);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const unassignTask = async (req, res) => {
  try {
    const task = await TaskService.unassignTask(req.user.id, req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
}