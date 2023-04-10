import useStore from '../store/store';
import { apiGetGroups, apiCreateGroup, apiDeleteGroup, apiInviteUser, apiRemoveFromGroup, apiUpdateGroup } from '../api/api';

const fetchGroups = async () => {
  try {
    const response = await apiGetGroups();
    console.log("fetchGroups Called");
    console.log(response);
    useStore.setState({ groups: response.data });
  } catch (error) {
    console.error(error);
  }
};

const createGroup = async (name, description) => {
  try {
    const response = await apiCreateGroup(name, description);
    await useStore.getState().fetchGroups();
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

const updateGroup = async (name, description) => {
  try {
    const groupId = useStore.getState().currentGroup._id;
    const response = await apiUpdateGroup(groupId, name, description);
    await useStore.getState().fetchGroups();
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

const deleteGroup = async () => {
  try {
    const groupId = useStore.getState().currentGroup._id;
    const response = await apiDeleteGroup(groupId);
    await useStore.getState().fetchGroups();
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

const fetchGroupMembers = async () => {
  try {
    const membersIds = await useStore.getState().currentGroup.members; 
    const members = await Promise.all(membersIds.map( async (memberId) =>{
      const user = await useStore.getState().fetchUser(memberId);
      return user;
    }));
    useStore.setState({ groupMembers: members });
  } catch (error) {
    console.error(error);
  }
};

const inviteUser = async (username) => {
  try {
    const groupId = useStore.getState().currentGroup._id;
    const response = await apiInviteUser(groupId, username);
    await useStore.getState().fetchGroups();
    await useStore.getState().setCurrentGroup(groupId);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

const setCurrentGroup = (groupId) => {
    const group = useStore.getState().groups.find(g => g._id === groupId);
    useStore.setState({ currentGroup: group });
    useStore.getState().fetchTasks(groupId);
};

const removeFromGroup = async () => {
  try {
    const userId = useStore.getState().selectedMember.userId;
    console.log(userId);
    const groupId = useStore.getState().currentGroup._id;
    const response = await apiRemoveFromGroup(groupId, userId);
    await useStore.getState().fetchGroups();
    await useStore.getState().setCurrentGroup(groupId);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};



export { fetchGroups, createGroup, updateGroup, inviteUser, setCurrentGroup, deleteGroup, fetchGroupMembers, removeFromGroup };