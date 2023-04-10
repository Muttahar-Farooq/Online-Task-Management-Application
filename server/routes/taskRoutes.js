import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, assignTask, unassignTask } from '../controllers/taskController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:groupId', auth, getTasks);
router.post('/:groupId', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.patch('/:id/assign/:userId', auth, assignTask);
router.patch('/:id/unassign', auth, unassignTask);

export default router;