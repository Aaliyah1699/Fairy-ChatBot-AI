"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ChatSchema = new mongoose_1.default.Schema({
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        required: [
            true,
            'Please provide password that is more than 6 characters long',
        ],
        min: 6,
        max: 15,
    },
    chats: [ChatSchema],
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=UserModel.js.map