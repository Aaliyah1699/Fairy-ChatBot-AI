import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const ChatSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema(
  {
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
        validator: (value: string) => validator.isEmail(value),
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
  },
  {timestamps: true}
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);
export default User;
