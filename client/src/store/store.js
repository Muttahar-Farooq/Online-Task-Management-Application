import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { login, signup} from '../actions/authActions'
import { fetchGroups, createGroup, updateGroup, fetchGroupMembers, inviteUser, setCurrentGroup, deleteGroup, removeFromGroup } from '../actions/groupActions';
import { createTask, fetchTasks, setCurrentTask, deleteTask, updateTask, updateCompleted, assignTask, unassignTask } from '../actions/taskActions';
import { fetchUser } from '../actions/userActions';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
    groups: [],
    currentGroup: null,
    tasks: [],
    currentTask: null,
    groupMembers: [],
    selectedMember: null,

    openGroupForm: false,
    openTaskForm: false,
    openMembersForm: false,
    openAlertBox: false,
    alertBoxMessage: '',
    deleteConfirmation: false,
    deleteConfirmationType: '',
    deleteConfirmationMessage: '',
    isInviteList: false,
    isEditForm: false,
}

const useStore = create(
    persist(
            (set, get) => ({
                ...initialState,
            
                login,
                signup,
                fetchGroups,
                createGroup,
                updateGroup,
                deleteGroup,
                setCurrentGroup,
                fetchGroupMembers,
                inviteUser,
                removeFromGroup,
                createTask,
                deleteTask,
                fetchTasks,
                setCurrentTask,
                updateTask,
                updateCompleted,
                fetchUser,
                assignTask,
                unassignTask,
                
                signout: () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                    set(initialState);
                }, 
                
                checkToken: () => {
                    const token = localStorage.getItem('token');
                    const tokenExpiration = localStorage.getItem('tokenExpiration');
                  
                    if (token && tokenExpiration && Date.now() <= tokenExpiration) {
                      return token;
                    } else {
                      localStorage.removeItem('token');
                      localStorage.removeItem('tokenExpiration');
                      useStore.setState({ user: null, token: null });
                      return false;
                    }
                  }

                
            }),
            {
                name: 'Todo-storage', // name of the item in the storage (must be unique)
                storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
            }
        )
    );

export default useStore;