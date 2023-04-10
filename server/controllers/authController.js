import UserService from '../services/userService.js';
import { createToken } from '../utils/token.js';

const tokenValidity = 3600; // 1 hour

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserService.findUserByUsername(username);

    if (!user || !(await UserService.isPasswordValid(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = createToken(user._id, tokenValidity);
    const tokenExpiration = Date.now() + tokenValidity * 1000; // convert to milliseconds
    res.status(200).json({ token, user: { id: user._id, username: user.username }, tokenExpiration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await UserService.findUserByUsernameOrEmail(username, email);
    if (existingUser) {
      const message = existingUser.username === username ? 'Username already taken!' : 'This email address is already associated with another account!';
      return res.status(409).json({ message });
    }

    await UserService.createUser({ username, password, email });
    res.status(201).json({ message: 'Sign up successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};