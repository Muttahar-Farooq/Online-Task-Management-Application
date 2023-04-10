import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Grid, Checkbox, FormControlLabel, Chip } from '@mui/material';
import useStore from '../../store/store';
import { green, pink } from '@mui/material/colors';

const formatter = new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
  });

const TaskCard = ({taskId,heading,desc,completed,dueDate,assignedTo}) => {

    const handleDeleteBtn = () => {
        console.log("Deleting task " + taskId);
        useStore.getState().setCurrentTask(taskId);
        useStore.setState({deleteConfirmationMessage: `Are you sure you want to delete task named ${heading}?`, deleteConfirmation: true, deleteConfirmationType: "task"});
    }

    const handleCheck = (e) => {
        console.log("Checking task " + taskId);
        useStore.getState().setCurrentTask(taskId);
        useStore.getState().updateCompleted(e.target.checked);
    }

    const handleEdit = () => {
        console.log("Editing task " + taskId);
        useStore.setState({isEditForm: true});
        useStore.setState({openTaskForm: true});
        useStore.getState().setCurrentTask(taskId);
    }

    const handleAssignment = () => {
        console.log("Assigning task " + taskId);
        useStore.setState({isInviteList: false, openMembersList: true});
        useStore.getState().setCurrentTask(taskId);
    }

  return (
    <>
    <Grid item key={taskId} xs={12} sm={6} md={4}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
            
                <Typography gutterBottom variant="h5" component="h2">
                    {heading}
                </Typography>
                
                <Typography>
                    {desc}
                </Typography>
                
                {dueDate ? <Chip label={`Date: ${formatter.format(new Date(dueDate))}`} sx={{margin: "0.5em" }}/> : null}

                {assignedTo ? <Chip label={`Assigned to: ${assignedTo.userName}`} sx={{margin: "0.5em" }}/> : null}
            
                <FormControlLabel control={<Checkbox sx={{
                color: pink[800],
                '&.Mui-checked': {
                    color: green[500],
                },
                }} />} label="Completed" onChange={handleCheck} checked={completed}/>

            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleEdit}>Edit</Button>
                <Button size="small" onClick={handleDeleteBtn}>Delete</Button>
                <Button size="small" onClick={handleAssignment}>Assign</Button>
            </CardActions>
        </Card>
    </Grid>
   
    </>
  )
}

export default TaskCard