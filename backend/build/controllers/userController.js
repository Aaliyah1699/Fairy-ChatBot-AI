"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.userLogout = exports.userLogin = exports.userSignUp = exports.getAllUsers = void 0;
const bcrypt_1 = require("bcrypt");
const UserModel_js_1 = __importDefault(require("../models/UserModel.js"));
const constants_js_1 = require("../utils/constants.js");
const generateToken_js_1 = require("../utils/generateToken.js");
const getAllUsers = async (req, res) => {
    const users = await UserModel_js_1.default.find({});
    res.status(200).json({ users });
};
exports.getAllUsers = getAllUsers;
const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await UserModel_js_1.default.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const user = new UserModel_js_1.default({ name, email, password });
        await user.save();
        res.clearCookie(constants_js_1.COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
        }); // clear prev cookie
        const token = (0, generateToken_js_1.generateToken)(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_js_1.COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
            expires,
        });
        return res.status(201).json({
            message: 'User signed up successfully',
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error });
    }
};
exports.userSignUp = userSignUp;
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel_js_1.default.findOne({ email });
        if (!user) {
            return res.status(401).send('User not registered');
        }
        const comparePassword = await (0, bcrypt_1.compare)(password, user.password);
        if (!comparePassword) {
            return res.status(403).send('Invalid email or password');
        }
        res.clearCookie(constants_js_1.COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
        }); // clear prev cookie
        const token = (0, generateToken_js_1.generateToken)(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_js_1.COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
            expires,
        });
        return res.status(200).json({
            message: 'User signed up successfully',
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
};
exports.userLogin = userLogin;
const verifyUser = async (req, res) => {
    try {
        const user = await UserModel_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered or token malfunctioned');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send('Could not verify user please login');
        }
        return res.status(200).json({
            message: 'OK',
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
};
exports.verifyUser = verifyUser;
const userLogout = async (req, res) => {
    try {
        const user = await UserModel_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered or token malfunctioned');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send('Could not verify user please login');
        }
        res.clearCookie(constants_js_1.COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
        }); // clear prev cookie
        return res.status(200).json({ message: 'Logged out' });
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
};
exports.userLogout = userLogout;
