import React, {useState, useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';
import useStore from '../../store/store';

const TaskForm = () => {
    const isEditForm = useStore((state) => state.isEditForm);
    const values = useStore((state) => state.currentTask);
    const openForm = useStore((state) => state.openTaskForm);

    const [title, setTitle] = useState(isEditForm ? values?.title : '');
    const [description, setDescription] = useState(isEditForm ? values?.description : '');
    const [dueDate, setDueDate] = useState(isEditForm ? values?.dueDate : '');

    useEffect(() => {
      if (isEditForm) {
        setTitle(values?.title);
        setDescription(values?.description);
        setDueDate(values?.dueDate);
      } else {
        setTitle('');
        setDescription('');
        setDueDate('');
      }
    }, [isEditForm, values]);


    const getFormattedDate = (date) => {
      const currentDate = new Date(date);

      // get the date in the yyyy-mm-dd format
      const year = currentDate.getFullYear();
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
      const day = ('0' + currentDate.getDate()).slice(-2);

      // get the time in the hh:mm format
      const hours = ('0' + currentDate.getHours()).slice(-2);
      const minutes = ('0' + currentDate.getMinutes()).slice(-2);

      // set the date value in the input field
      const dateValue = `${year}-${month}-${day}T${hours}:${minutes}`;
      return dateValue;
    }
  
    const handleCreate = async () => {
      const res = !isEditForm ? await useStore.getState().createTask(title, description, dueDate): await useStore.getState().updateTask(title, description, dueDate);
      console.log(res);
      const alertBoxMessage = (res.status === 201 || res.status === 200 ? `${isEditForm ? 'Updated' : 'Created'} the task successfully` : res.data.message) || `Cannot connect to the server!`;
      useStore.setState({openAlertBox: true, alertBoxMessage: alertBoxMessage});
      
      if (res.status === 201 || res.status === 200) {
        setTitle('');
        setDescription('');
        setDueDate('');
        handleClose();
      }
      
    };
  
    const handleClose = () => {
        useStore.setState({isEditForm: false});
        useStore.setState({openTaskForm: false});
    };

  return (
    <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>{isEditForm ? "Edit " : "Create a new "} group</DialogTitle>
        <DialogContent>
            <DialogContentText>
            To create a new Task, please enter the following details here.
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
            <TextField
              margin="dense"
              id="dueDate"
              label="Due Date"
              type="datetime-local"
              fullWidth
              variant="standard"
              value={dueDate ? getFormattedDate(dueDate) : ''}
              onChange={(event) => setDueDate(new Date(event.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>{isEditForm ? "Update" : "Create"}</Button>
        </DialogActions>
    </Dialog>
  )
}

export default TaskForm