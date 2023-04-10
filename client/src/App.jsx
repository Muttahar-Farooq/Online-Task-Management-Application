import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import LoginForm from './components/Authentication/LoginForm';
import SignUp from './components/Authentication/SignupForm';
import GroupsGrid from './components/Groups/GroupsGrid';
import TasksGrid from './components/Tasks/TasksGrid';
import useStore from './store/store';
import AuthWrapper from './components/AuthWrapper';

function App() {
  const token = useStore(state => state.token);
  const checkToken = useStore(state => state.checkToken);
  const currentGroup = useStore(state => state.currentGroup);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Navigate to="/login" />} />
        <Route path="/login" exact element={!token && !checkToken() ? <LoginForm /> : <Navigate to="/groups" />} />
        <Route path="/signup" exact element={!token && !checkToken() ? <SignUp /> : <Navigate to="/groups" />} />
        <Route path="/groups" exact element={<AuthWrapper><GroupsGrid /></AuthWrapper>} />
        <Route path="/tasks" exact element={currentGroup ? <AuthWrapper><TasksGrid /></AuthWrapper> : <Navigate to="/groups" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
