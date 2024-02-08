"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_js_1 = require("../controllers/userController.js");
const generateToken_js_1 = require("../utils/generateToken.js");
router.get('/', userController_js_1.getAllUsers);
router.post('/signup', userController_js_1.userSignUp);
router.post('/login', userController_js_1.userLogin);
router.get('/auth-status', generateToken_js_1.verifyToken, userController_js_1.verifyUser);
router.get('/logout', generateToken_js_1.verifyToken, userController_js_1.userLogout);
exports.default = router;
