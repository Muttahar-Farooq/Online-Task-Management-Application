import { Snackbar } from '@mui/material';
import useStore from '../store/store';


const AlertBox = () => {

  const open = useStore((state) => state.openAlertBox);
  const message = useStore((state) => state.alertBoxMessage);
  const handleSnackBarClose = () => {
    useStore.setState({openAlertBox: false});
  }

  return (
    <Snackbar open={open} message={message} autoHideDuration={5000} onClose={handleSnackBarClose}/>
  )
}

export default AlertBox