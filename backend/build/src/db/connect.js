"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async (url) => {
    try {
        const conn = await mongoose_1.default.connect(url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`Error: ${error}`);
        throw new Error('Cannot connect to db.');
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    try {
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.log(`Error: ${error}`);
        throw new Error(' Could not disconnect db.');
    }
};
exports.disconnectDB = disconnectDB;
