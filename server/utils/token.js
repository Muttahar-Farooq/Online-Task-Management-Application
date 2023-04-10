import jwt from 'jsonwebtoken';

export const createToken = (userId, expiresIn) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign({ id: userId }, secret, { expiresIn });
};