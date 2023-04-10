import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../store/store';

const AuthWrapper = ({ children }) => {
  const token = useStore(state => state.token);
  const checkToken = useStore(state => state.checkToken);

  if (token && checkToken()) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthWrapper;
