import useStore from '../store/store';
import { apiLogin, apiSignup } from '../api/api';

const login = async (username, password) => {
  try {
    const response = await apiLogin(username, password);
    console.log(response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('tokenExpiration', response.data.tokenExpiration);
    useStore.setState({ user: response.data.user, token: response.data.token });
    await useStore.getState().fetchGroups();
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

const signup = async (username, email, password) => {
  try {
    const response = await apiSignup(username, email, password);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};


export { login, signup };