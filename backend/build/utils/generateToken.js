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
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_js_1 = require("./constants.js");
const generateToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.signedCookies[`${constants_js_1.COOKIE_NAME}`];
    if (!token || token.trim() === '') {
        return res.status(401).json({ message: 'No token received' });
    }
    return new Promise((resolve, reject) => {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: 'Session Expired' });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=generateToken.js.map