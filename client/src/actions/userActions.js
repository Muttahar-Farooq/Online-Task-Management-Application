import { apiGetUser } from '../api/api';

const fetchUser = async (userId) => {
  try {
    const response = await apiGetUser(userId);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { fetchUser };