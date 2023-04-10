import mongoose from 'mongoose';
import Group from '../models/groupModel.js';
import Task from '../models/taskModel.js';
import User from '../models/userModal.js';

class GroupService {
    static async getGroups(userId) {
        const user = await User.findById(userId).select('username');
        const groups = await Group.find({ 'members.userId': user._id });
        return groups;
    }

    static async createGroup(userId, { name, description }) {
        const user = await User.findById(userId).select('username');
        const member = { userId: userId, userName: user.username };
        const group = new Group({ name, description, members: [member], createdAt: Date.now() });
        await group.save();
        return group;
    }

    static async updateGroup({ groupId, userId, name, description }) {
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
        const member = { userId: userId, userName: user.username };
        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }

        group.name = name;
        group.description = description;
        await group.save();
        return group;
    }

    static async deleteGroup({ groupId, userId }) {
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
        const member = { userId: userId, userName: user.username };
        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }

        const tasks = await Task.find({ group: groupId });
        tasks.forEach(async task => await task.delete());

        await group.delete();
        return group;
    }

    static async inviteMember({ groupId, userId, username }) {
        const newUser = await User.findOne({ username });
        if (!newUser) {
            const error = new Error('Cannot find a user with the provided username!');
            error.status = 422; // Unprocessable Entity
            throw error;
        }

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
        const member = { userId: userId, userName: user.username };
        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }

        if (group.members.some(m => m.userId.equals(newUser._id))) {
            const error = new Error('User is already a member of this group');
            error.status = 409; // Conflict
            throw error;
        }
        group.members.push({ userId: newUser._id, userName: newUser.username });
        await group.save();
        return group;
    }

    static async removeMember({ groupId, userId, userIdToRemove }) {
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
        const member = { userId: userId, userName: user.username };
        const isMember = group.members.some(m => (
            m.userId.equals(member.userId) && m.userName === member.userName
        ));

        if (!isMember) {
            const error = new Error('User is not authorized to perform this action in this group');
            error.status = 403; // Forbidden
            throw error;
        }

        const userToRemove = await User.findById(userIdToRemove).select('username');
        if (!userToRemove) {
            const error = new Error('Invalid user ID');
            error.status = 422; // Unprocessable Entity
            throw error;
        }

        const memberToRemove = group.members.find(m => m.userId.equals(userToRemove._id));
        if (!memberToRemove) {
            const error = new Error('User is not a member of this group');
            error.status = 404; // Not Found
            throw error;
        }

        group.members.pull(memberToRemove);
        await group.save();
        return group;
    }

}

export default GroupService;
