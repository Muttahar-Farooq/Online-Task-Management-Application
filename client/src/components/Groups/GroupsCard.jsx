import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Grid } from '@mui/material';
import useStore from '../../store/store';
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from '../DeleteConfirmation';


const GroupsCard = ({groupId, heading, desc, img}) => {

    const navigate = useNavigate();

    const handleView = () => {
        console.log("Viewing group " + groupId);
        useStore.getState().setCurrentGroup(groupId);
        navigate("/tasks");
    }

    const handleDelete = () => {
        return useStore.getState().deleteGroup();
    }

    const handleDeleteBtn = () => {
        console.log("Deleting group " + groupId);
        useStore.getState().setCurrentGroup(groupId);
        useStore.setState({deleteConfirmation: true, deleteConfirmationMessage: `Are you sure you want to delete group named ${heading}?`, deleteConfirmationType: "group"});
    }

    const handleEdit = () => {
        console.log("Editing group " + groupId);
        useStore.setState({isEditForm: true});
        useStore.setState({openGroupForm: true});
        useStore.getState().setCurrentGroup(groupId);
    }

  return (
    <>
    <Grid item key={groupId} xs={12} sm={6} md={4}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            {/* <CardMedia
            component="img"
            sx={{
                // 16:9
                pt: '56.25%',
            }}
            image={img}
            alt="random"
            /> */}
            <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
                {heading}
            </Typography>
            <Typography>
                {desc}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={handleView}>View</Button>
            <Button size="small" onClick={handleEdit}>Edit</Button>
            <Button size="small" onClick={handleDeleteBtn}>Delete</Button>
            </CardActions>
        </Card>
    </Grid>
    <DeleteConfirmation handleDelete={()=>handleDelete()} type={"group"}/>
    </>
  )
}

export default GroupsCard