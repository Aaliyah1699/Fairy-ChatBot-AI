import express from 'express';
const router = express.Router();
import {
    getAllUsers,
    userSignUp,
    userLogin,
    verifyUser,
    userLogout,
} from '../controllers/userController.js';
import { verifyToken } from '../utils/generateToken.js';

router.get('/', getAllUsers);
router.post('/signup', userSignUp);
router.post('/login', userLogin);
router.get('/auth-status', verifyToken, verifyUser);
router.get('/logout', verifyToken, userLogout);

export default router;
