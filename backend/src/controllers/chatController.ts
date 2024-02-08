import { Response, NextFunction, Request } from 'express';
import User from '../models/UserModel';
import { configureOpenAI } from '../config/openai-config';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);

        if (!user)
            return res
                .status(401)
                .json({ message: 'User not registered or Session expired' });

        // Grab user chats
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        })) as ChatCompletionMessageParam[];
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });

        // Send all chats to openAI API
        const openai = configureOpenAI();
        // Get latest response
        const chatResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: chats,
        });
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const sendChatsToUser = async (req: Request, res: Response) => {
    try {
        // Verify token
        const user = await User.findById(res.locals.jwtData.id);

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
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

export const deleteChats = async (req: Request, res: Response) => {
    try {
        // Verify token
        const user = await User.findById(res.locals.jwtData.id);

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
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
