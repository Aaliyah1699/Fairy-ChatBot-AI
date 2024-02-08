import {Request, Response} from 'express';
import {compare} from 'bcrypt';
import User from '../models/UserModel.js';
import {COOKIE_NAME} from '../utils/constants.js';
import {generateToken} from '../utils/generateToken.js';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(200).json({users});
};

const userSignUp = async (req: Request, res: Response) => {
  try {
    const {name, email, password} = req.body;

    const userExist = await User.findOne({email});

    if (userExist) {
      return res.status(400).json({error: 'User already exists'});
    }

    const user = new User({name, email, password});
    await user.save();

    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      signed: true,
    }); // clear prev cookie
    const token = generateToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
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
  } catch (error) {
    console.error(error);
    return res.status(400).json({message: error});
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(401).send('User not registered');
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      return res.status(403).send('Invalid email or password');
    }

    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      signed: true,
    }); // clear prev cookie
    const token = generateToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
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
  } catch (error) {
    return res.status(401).json({message: error});
  }
};
const verifyUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

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
  } catch (error) {
    return res.status(401).json({message: error});
  }
};
const userLogout = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).send('User not registered or token malfunctioned');
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Could not verify user please login');
    }

    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      signed: true,
    }); // clear prev cookie

    return res.status(200).json({message: 'Logged out'});
  } catch (error) {
    return res.status(401).json({message: error});
  }
};

export {getAllUsers, userSignUp, userLogin, userLogout, verifyUser};
