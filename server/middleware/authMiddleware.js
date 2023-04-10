import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.ACCESS_TOKEN_SECRET;

export default (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: 'Send a valid JWT token!' });
    
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'JWT token is invalid or has expired!' });
        req.user = user;
        next();
    });
};

