"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = exports.sendChatsToUser = exports.generateChatCompletion = void 0;
const UserModel_js_1 = __importDefault(require("../models/UserModel.js"));
const openai_config_js_1 = require("../config/openai-config.js");
const generateChatCompletion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const user = yield UserModel_js_1.default.findById(res.locals.jwtData.id);
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
        const openai = (0, openai_config_js_1.configureOpenAI)();
        // Get latest response
        const chatResponse = yield openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: chats,
        });
        user.chats.push(chatResponse.choices[0].message);
        yield user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.generateChatCompletion = generateChatCompletion;
const sendChatsToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify token
        const user = yield UserModel_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered or session expired');
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
        return res.status(401).json({ message: 'Could not send chats to user' });
    }
});
exports.sendChatsToUser = sendChatsToUser;
const deleteChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify token
        const user = yield UserModel_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered or session expired');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send('Could not verify user please login');
        }
        // @ts-ignore
        user.chats = [];
        yield user.save();
        return res.status(200).json({
            message: 'OK',
        });
    }
    catch (error) {
        return res.status(401).json({ message: 'Could not delete chat' });
    }
});
exports.deleteChats = deleteChats;
//# sourceMappingURL=chatController.js.map