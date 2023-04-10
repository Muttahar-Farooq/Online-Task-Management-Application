import React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const TopBar = ({ heading, desc, primaryBtnName, secondaryBtnName, handlePrimaryBtn, handleSecondaryBtn}) => {

  const user = useStore(state => state.user);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log('Logging out!');
    useStore.getState().signout();
    navigate('/login');
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative">
        <Toolbar>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <CameraIcon /> */}
          </Avatar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Welcome {user?.username}!
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {heading}
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {desc}
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" onClick={() => handlePrimaryBtn()}>{primaryBtnName}</Button>
            {handleSecondaryBtn ? <Button variant="outlined" onClick={() => handleSecondaryBtn()}>{secondaryBtnName}</Button> : null}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TopBar;
