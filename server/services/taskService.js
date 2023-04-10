import mongoose from 'mongoose';
import Task from '../models/taskModel.js';
import Group from '../models/groupModel.js';
import User from '../models/userModal.js';

class TaskService {
    static async getTasks(userId, groupId) {
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            const error = new Error('Invalid Group ID');
            error.status = 422; // Unprocessable Entity
            throw error;
        }

        const group = await Group.findById(groupId);
        if (!group) {
            const error = new Error('Cannot find group');
            error.status = 404; // Not Found
            throw error;
        }

        const user = await User.findById(userId).select('username');
        const member = { userId, userName: user.username };

        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }

        const tasks = await Task.find({ group: groupId });
        return tasks;
    }

    static async createTask(userId, groupId, { title, description, dueDate }) {
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            const error = new Error('Invalid Group ID');
            error.status = 422; // Unprocessable Entity
            throw error;
        }

        const group = await Group.findById(groupId);
        if (!group) {
            const error = new Error('Cannot find group');
            error.status = 404; // Not Found
            throw error;
        }

        const user = await User.findById(userId).select('username');
        const member = { userId, userName: user.username };

        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }

        const task = new Task({ title, description, dueDate, group: groupId, createdBy: userId, createdAt: new Date().toISOString(), completed: false });
        await task.save();
        return task;
    }

    static async updateTask(userId, taskId, { title, description, dueDate, completed }) {
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const error = new Error('Invalid Task ID');
            error.status = 422; // Unprocessable Entity
            throw error;
        }

        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error('Cannot find task');
            error.status = 404; // Not Found
            throw error;
        }

        const group = await Group.findById(task.group);
        if (!group) {
            const error = new Error('Cannot find group');
            error.status = 404; // Not Found
            throw error;
        }

        const user = await User.findById(userId).select('username');
        const member = { userId, userName: user.username };

        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }

        
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.completed = completed || false;
        
        await task.save();
        return task;
    }

    static async deleteTask(userId, taskId) {
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const error = new Error('Invalid Task ID');
            error.status = 422; // Unprocessable Entity
            throw error;
        }

        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error('Cannot find task');
            error.status = 404; // Not Found
            throw error;
        }

        const group = await Group.findById(task.group);
        if (!group) {
            const error = new Error('Cannot find group');
            error.status = 404; // Not Found
            throw error;
        }

        const user = await User.findById(userId).select('username');
        const member = { userId, userName: user.username };

        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }
        await task.delete();
        return task;
    }

    static async assignTask(userId, taskId, assignTo) {
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const error = new Error('Invalid Task ID');
            error.status = 422; // Unprocessable Entity
            throw error;
        }
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error('Cannot find task');
            error.status = 404; // Not Found
            throw error;
        }

        const group = await Group.findById(task.group);
        if (!group) {
            const error = new Error('Cannot find group');
            error.status = 404; // Not Found
            throw error;
        }

        const user = await User.findById(userId).select('username');
        const member = { userId, userName: user.username };

        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }

        const assignee = group.members.find(m => (
            m.userId.equals(assignTo)
        ));

        if (!assignee) {
            const error = new Error('Assignee is not a member of this group');
            error.status = 400; // Bad Request
            throw error;
        }

        task.assignedTo = assignee;
        await task.save();
        return task;
    }

    static async unassignTask(userId, taskId) {
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const error = new Error('Invalid Task ID');
            error.status = 422; // Unprocessable Entity
            throw error;
        }
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error('Cannot find task');
            error.status = 404; // Not Found
            throw error;
        }

        const group = await Group.findById(task.group);
        if (!group) {
            const error = new Error('Cannot find group');
            error.status = 404; // Not Found
            throw error;
        }

        const user = await User.findById(userId).select('username');
        const member = { userId, userName: user.username };

        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }

        task.assignedTo = null;
        await task.save();
        return task;
    }
}

export default TaskService;