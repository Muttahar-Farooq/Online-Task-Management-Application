import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);
app.use('/group', groupRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Task Manager API');
});

const CONNECTION_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
