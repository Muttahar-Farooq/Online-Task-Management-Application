import React, { useEffect } from 'react'
import TopBar from '../TopBar'
import TaskCard from './TaskCard'
import { Grid, Container } from '@mui/material';
import useStore from '../../store/store';
import TaskForm from './TaskForm';
import AlertBox from '../AlertBox';
import MembersList from './MembersList';
import DeleteConfirmation from '../DeleteConfirmation';

const heading = "Tasks";
const desc = "Here you can find all your tasks!";

const TasksGrid = () => {

  useEffect(() => {
    useStore.getState().fetchTasks();
  }, []);

  const tasks = useStore((state) => state.tasks);  

  const handleOpenForm = () => {
    useStore.setState({isEditForm: false});
    useStore.setState({openTaskForm: true});
  };

  const handleOpenMemberList = () => {
    useStore.setState({openMembersList: true});
    useStore.setState({isInviteList: true});
  };

  return (
    <>
        <TopBar heading={heading} desc={desc} primaryBtnName={"Create a new task"} handlePrimaryBtn={()=>handleOpenForm()} secondaryBtnName={"Invite to group"} handleSecondaryBtn={()=>handleOpenMemberList()}/>
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                {tasks.map((task) => (<TaskCard taskId={task._id} heading={task.title} desc={task.description} dueDate={task.dueDate} completed={task.completed} assignedTo={task.assignedTo}/>))}
            </Grid>
        </Container>
        <TaskForm/>
        <AlertBox/>
        <MembersList />
        <DeleteConfirmation  />
    </>
  )
}

export default TasksGrid