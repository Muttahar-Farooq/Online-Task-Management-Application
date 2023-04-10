import express from 'express';
import { getGroups, createGroup, updateGroup, deleteGroup, inviteMember, removeMember } from '../controllers/groupController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getGroups);
router.post('/', auth, createGroup);
router.patch('/:id', auth, updateGroup);
router.delete('/:id', auth, deleteGroup);
router.post('/:id/user/:userName', auth, inviteMember);
router.delete('/:id/user/:userId', auth, removeMember);

export default router;