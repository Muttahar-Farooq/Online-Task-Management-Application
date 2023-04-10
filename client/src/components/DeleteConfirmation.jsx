import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import useStore from '../store/store';

const DeleteConfirmation = () => {
  const type = useStore((state) => state.deleteConfirmationType);
  const open = useStore((state) => state.deleteConfirmation);
  const handleClose = () => {
    useStore.setState({deleteConfirmation: false});
  }
  const onClick = async () => {
    let res = null;
    switch (type) {
      case 'task':
        res = await useStore.getState().deleteTask();
        break;
      case 'group':
        res = await useStore.getState().deleteGroup();
        break;
      case 'user':
        res = await useStore.getState().removeFromGroup();
        break;
      default:
        break;
        
    }
    console.log(res);
    const alertMessage = (res.status === 200 ? `Deleted the selected ${type} successfully` : res.data.message) || `Cannot connect to the server!`;
    useStore.setState({openAlertBox: true, alertBoxMessage: alertMessage});
    handleClose();
  }

  const message = useStore((state) => state.deleteConfirmationMessage);
  
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete the selected ${type}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={onClick} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteConfirmation;