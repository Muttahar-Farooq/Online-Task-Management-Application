import axios from 'axios';
import useStore from '../store/store';

const url = 'http://localhost:5000'; // local

const tokenHeader = () => ({ headers: { 'Authorization': `Bearer ${useStore.getState().token}` }});

export const apiLogin = (username,password) => axios.post(`${url}/auth/login`, { username, password });
export const apiSignup = (username,email,password) => axios.post(`${url}/auth/signup`, { username, email, password });

export const apiGetGroups = () => axios.get(`${url}/group`, tokenHeader());
export const apiCreateGroup = (name, description) => axios.post(`${url}/group`, { name, description }, tokenHeader());
export const apiUpdateGroup = (groupId, name, description) => axios.patch(`${url}/group/${groupId}`, { name, description }, tokenHeader());
export const apiDeleteGroup = (groupId) => axios.delete(`${url}/group/${groupId}`, tokenHeader());
export const apiInviteUser = (groupId, username) => axios.post(`${url}/group/${groupId}/user/${username}`, {}, tokenHeader());
export const apiRemoveFromGroup = (groupId, userId) => axios.delete(`${url}/group/${groupId}/user/${userId}`, tokenHeader());


export const apiCreateTask = (groupId, title, description, dueDate) => axios.post(`${url}/task/${groupId}`, { title, description, dueDate }, tokenHeader());
export const apiGetTasks = (groupId) => axios.get(`${url}/task/${groupId}`, tokenHeader());
export const apiUpdateTask = (taskId, title, description, dueDate, completed) => axios.put(`${url}/task/${taskId}`, { title, description, dueDate, completed }, tokenHeader());
export const apiDeleteTask = (taskId) => axios.delete(`${url}/task/${taskId}`,tokenHeader());
export const apiAssignTask = (taskId, userId) => axios.patch(`${url}/task/${taskId}/assign/${userId}`, {}, tokenHeader());
export const apiUnassignTask = (taskId) => axios.patch(`${url}/task/${taskId}/unassign`, {}, tokenHeader());

export const apiGetUser = (userId) => axios.get(`${url}/user/${userId}`);
export const apiUpdateUser = (userId, name, email) => axios.put(`${url}/user/${userId}`, { name, email }, tokenHeader());

