"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = exports.sendChatsToUser = exports.generateChatCompletion = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const openai_config_1 = require("../config/openai-config");
const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await UserModel_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: 'User not registered or Session expired' });
        // Grab user chats
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });
        // Send all chats to openAI API
        const openai = (0, openai_config_1.configureOpenAI)();
        // Get latest response
        const chatResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: chats,
        });
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.generateChatCompletion = generateChatCompletion;
const sendChatsToUser = async (req, res) => {
    try {
        // Verify token
        const user = await UserModel_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .send('User not registered or session expired');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send('Could not verify user please login');
        }
        return res.status(200).json({
            message: 'OK',
            chats: user.chats,
        });
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
exports.sendChatsToUser = sendChatsToUser;
const deleteChats = async (req, res) => {
    try {
        // Verify token
        const user = await UserModel_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .send('User not registered or session expired');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send('Could not verify user please login');
        }
        // @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({
            message: 'OK',
        });
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
exports.deleteChats = deleteChats;
//# sourceMappingURL=chatController.js.map