import User from '../models/userModal.js';
import bcrypt from 'bcrypt';

class UserService {
  static async findUserByUsername(username) {
    return await User.findOne({ username });
  }

  static async findUserByUsernameOrEmail(username, email) {
    return await User.findOne({ $or: [{ username }, { email }] });
  }

  static async isPasswordValid(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async createUser({ username, password, email }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
  }
}

export default UserService;