import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button} from '@mui/material';
import useStore from '../../store/store';

const GroupsForm = () => {
  const isEditForm = useStore((state) => state.isEditForm);
  const values = useStore((state) => state.currentGroup);
  const openForm = useStore((state) => state.openGroupForm);
  const [name, setName] = useState(isEditForm ? values.name : '');
  const [description, setDescription] = useState(isEditForm ? values.description : '');

  useEffect(() => {
    if (isEditForm) {
      setName(values.name);
      setDescription(values.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [isEditForm, values]);

  const handleCreate = async () => {
    const res = await useStore.getState().createGroup(name, description);
    const alertMessage = (res.status === 201 ? `Created the group successfully` : res.data.message) || `Cannot connect to the server!`;
    useStore.setState({openAlertBox: true, alertBoxMessage: alertMessage});
    
    if (res.status === 201) {
      setName('');
      setDescription('');
      handleClose();
    }
    
  };

  const handleEdit = async () => {
    const res = await useStore.getState().updateGroup(name, description);
    useStore.setState({openAlertBox: true, alertBoxMessage: res.message || 'Edited the group!'});
    setName('');
    setDescription('');
  };


    const handleClose = () => {
        useStore.setState({openGroupForm: false});
    };


  return (
    <>
    <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>{isEditForm ? "Edit" : "Create a new"} group</DialogTitle>
        <DialogContent>
            <DialogContentText>
            To {isEditForm ? "Edit" : "Create"} a group, please enter the following details here.
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => setName(event.target.value)}
            />
            <TextField
            margin="dense"
            id="desc"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={isEditForm ? handleEdit : handleCreate}> {isEditForm ? "Edit" : "Create"} </Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default GroupsForm