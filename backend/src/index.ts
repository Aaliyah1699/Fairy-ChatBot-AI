import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import cors from 'cors';
import path from 'path';
import { connectDB } from './db/connect.js';


config();
const app = express();
const port = process.env.PORT || 4000;
const __dirname = path.resolve();

// Middleware
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev')); // for development

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


app.get('/', (req, res) => {
  res.send('Api is running...');
});

// Connection
const start = async () => {
  try {
    connectDB().then(() => {
      app.listen(port, () => console.log(`server listening on port ${port}`));
    })
    
  } catch (error) {
    console.log(error);
  }
};
start();
