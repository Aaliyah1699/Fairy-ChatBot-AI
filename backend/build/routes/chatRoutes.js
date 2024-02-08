"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generateToken_js_1 = require("../utils/generateToken.js");
const chatController_js_1 = require("../controllers/chatController.js");
const router = express_1.default.Router();
router.post('/new', generateToken_js_1.verifyToken, chatController_js_1.generateChatCompletion);
router.get('/all-chats', generateToken_js_1.verifyToken, chatController_js_1.sendChatsToUser);
router.delete('/delete', generateToken_js_1.verifyToken, chatController_js_1.deleteChats);
exports.default = router;
//# sourceMappingURL=chatRoutes.js.map