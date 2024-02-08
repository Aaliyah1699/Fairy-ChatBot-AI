"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const chatRoutes_js_1 = __importDefault(require("./routes/chatRoutes.js"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, morgan_1.default)('dev')); // for development
// Routes
app.use('/api/user', userRoutes_js_1.default);
app.use('/api/chat', chatRoutes_js_1.default);
app.get('/', (req, res, next) => {
    res.send('Api is running...');
});
exports.default = app;
//# sourceMappingURL=app.js.map