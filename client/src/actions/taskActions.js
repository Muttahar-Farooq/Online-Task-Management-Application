import useStore from '../store/store';
import { apiCreateTask, apiGetTasks, apiDeleteTask, apiUpdateTask, apiAssignTask, apiUnassignTask } from '../api/api';

const setCurrentTask = (taskId) => {
    const task = useStore.getState().tasks.find(t => t._id === taskId);
    useStore.setState({ currentTask: task });
};

const createTask = async (name, desc, dueDate) => {
    try {
      const currentGroupID = useStore.getState().currentGroup._id;
      const response = await apiCreateTask(currentGroupID, name, desc, dueDate);
      await fetchTasks(currentGroupID);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
};

const deleteTask = async () => {
    try {
      const currentTaskID = useStore.getState().currentTask._id;
      const currentGroupID = useStore.getState().currentGroup._id;
      const response = await apiDeleteTask(currentTaskID);
      await fetchTasks(currentGroupID);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
};

const fetchTasks = async () => {
    try {
      const currentGroupID = useStore.getState().currentGroup._id;
      const response = await apiGetTasks(currentGroupID);
      useStore.setState({ tasks: response.data });
    } catch (error) {
      console.error(error);
    }
};

const updateTask = async (name, desc, dueDate) => {
    try {
      const currentTaskID = useStore.getState().currentTask._id;
      const currentGroupID = useStore.getState().currentGroup._id;
      const response = await apiUpdateTask(currentTaskID, name, desc, dueDate);
      await fetchTasks(currentGroupID);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
};

const updateCompleted = async (completed) => {
    try {
      const currentTaskID = useStore.getState().currentTask._id;
      const currentGroupID = useStore.getState().currentGroup._id;
      const name = useStore.getState().currentTask.title;
      const desc = useStore.getState().currentTask.description;
      const dueDate = useStore.getState().currentTask.dueDate;
      const response = await apiUpdateTask(currentTaskID, name, desc, dueDate, completed);
      await fetchTasks(currentGroupID);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
};

const assignTask = async () => {
    try {
      const currentTaskID = useStore.getState().currentTask._id;
      const currentGroupID = useStore.getState().currentGroup._id;
      const userId = useStore.getState().selectedMember.userId;
      const response = await apiAssignTask(currentTaskID, userId);
      await fetchTasks(currentGroupID);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
};

const unassignTask = async () => {
    try {
      const currentTaskID = useStore.getState().currentTask._id;
      const currentGroupID = useStore.getState().currentGroup._id;
      const response = await apiUnassignTask(currentTaskID);
      await fetchTasks(currentGroupID);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
};

export { createTask, fetchTasks, setCurrentTask, deleteTask, updateTask, updateCompleted, assignTask, unassignTask};