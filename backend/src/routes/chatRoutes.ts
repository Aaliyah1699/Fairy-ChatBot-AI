import express from 'express';
import {verifyToken} from '../utils/generateToken.js';
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/new', verifyToken, generateChatCompletion);
router.get('/all-chats', verifyToken, sendChatsToUser);
router.delete('/delete', verifyToken, deleteChats);

export default router;
