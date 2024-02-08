"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generateToken_1 = require("../utils/generateToken");
const chatController_1 = require("../controllers/chatController");
const router = express_1.default.Router();
router.post('/new', generateToken_1.verifyToken, chatController_1.generateChatCompletion);
router.get('/all-chats', generateToken_1.verifyToken, chatController_1.sendChatsToUser);
router.delete('/delete', generateToken_1.verifyToken, chatController_1.deleteChats);
exports.default = router;
