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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const chatRoutes_js_1 = __importDefault(require("./routes/chatRoutes.js"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const connect_js_1 = require("./db/connect.js");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const __dirname = path_1.default.resolve();
// Middleware
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, morgan_1.default)('dev')); // for development
// Routes
app.use('/api/user', userRoutes_js_1.default);
app.use('/api/chat', chatRoutes_js_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'client', 'dist', 'index.html'));
});
app.get('/', (req, res) => {
    res.send('Api is running...');
});
// Connection
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, connect_js_1.connectDB)().then(() => {
            app.listen(port, () => console.log(`server listening on port ${port}`));
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
//# sourceMappingURL=index.js.map