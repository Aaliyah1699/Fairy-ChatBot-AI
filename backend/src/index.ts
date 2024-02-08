import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import {connectDB} from './db/connect';
import cors from 'cors';

config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev')); // for development

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Api is running...');
});

// Connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
