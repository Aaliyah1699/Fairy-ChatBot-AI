"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("./db/connect");
const app_js_1 = __importDefault(require("./app.js"));
const port = process.env.PORT || 4000;
// Connection
const start = async () => {
    try {
        await (0, connect_1.connectDB)(process.env.MONGO_URI);
        app_js_1.default.listen(port, () => console.log(`server listening on port ${port}`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=index.js.map