import React from 'react';
import useStore from '../../store/store';
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, TextField, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const MembersList = () => {

  const members = useStore((state) => state.currentGroup.members);
  const open = useStore((state) => state.openMembersList);
  const isInviteList = useStore((state) => state.isInviteList);

  const [addMember, setAddMember] = React.useState(false);
  const [newMember, setNewMember] = React.useState('');

  const handleClose = () => {
    useStore.setState({openMembersList: false});
    setAddMember(false);
  };

  const handleAssignToTask = async (member) => {
    useStore.setState({selectedMember: member});
    const res = await useStore.getState().assignTask(member);
    if (res.status === 200) {
      useStore.setState({openAlertBox: true, alertBoxMessage: `Assigned ${member.userName} to task!`});
    } else {
      useStore.setState({openAlertBox: true, alertBoxMessage: res?.data.message || 'Cannot connect to backend!'});
    }
    handleClose();
  };

  const handleUnassignFromTask = async () => {
    const res = await useStore.getState().unassignTask();
    if (res.status === 200) {
      useStore.setState({openAlertBox: true, alertBoxMessage: 'Unassigned from task!'});
    } else {
      useStore.setState({openAlertBox: true, alertBoxMessage: res?.data.message || 'Cannot connect to backend!'});
    }
    handleClose();
  };

  const handleDeleteMember = (member) => {
    if (member.userId === useStore.getState().user.id ) {
      useStore.setState({openAlertBox: true, alertBoxMessage: 'You cannot delete yourself from the group!'});
      return;
    }
    useStore.setState({selectedMember: member});
    useStore.setState({deleteConfirmation: true, deleteConfirmationMessage: `Are you sure you want to delete ${member.userName} from the group?`, deleteConfirmationType: 'user'});
    useStore.setState({openMembersList: false});
  };

  const handleAddMember = async () => {
    setAddMember(false);
    const response = await useStore.getState().inviteUser(newMember);
    if (response.status === 200) {
      useStore.setState({openAlertBox: true, alertBoxMessage: `Invited ${newMember} to the group!`});
    } else {
      useStore.setState({openAlertBox: true, alertBoxMessage: response?.data.message || 'Cannot connect to backend!'});
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select the user to {isInviteList ? "invite" : "assign the task"}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {members.map((member) => (
          <ListItem secondaryAction={
            <ListItemButton onClick={() => {isInviteList ? handleDeleteMember(member) : handleAssignToTask(member)}} key={member}> {isInviteList ? <DeleteIcon /> : <AddIcon />}</ListItemButton>
          }>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={member.userName} />
          </ListItem>
        ))}

        {
          !isInviteList ?
          <ListItem>
            <ListItemButton sx={{ bgcolor: red[600], textAlign: "center", width: '100%', justifyContent: 'center' }} onClick={()=>handleUnassignFromTask()}>None</ListItemButton>
          </ListItem>: null
        }
        
        {
          isInviteList && !addMember?
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={() => setAddMember(true)}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add a user" />
            </ListItemButton>
          </ListItem>
          : null
        }{
          isInviteList && addMember?
          <ListItem >
            <Typography>Enter the username: &nbsp; </Typography>
            <TextField onChange={(e)=>setNewMember(e.target.value)}></TextField>
            <ListItemButton onClick={()=>handleAddMember()}><AddIcon/></ListItemButton>
         </ListItem>
          : null
        }
         
      </List>
    </Dialog>
  );
}

export default MembersList