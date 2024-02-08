"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAI = void 0;
const openai_1 = __importDefault(require("openai"));
const configureOpenAI = () => {
    const config = new openai_1.default({
        apiKey: process.env.OPEN_AI_KEY,
        organization: process.env.OPEN_AI_ORG,
    });
    return config;
};
exports.configureOpenAI = configureOpenAI;
