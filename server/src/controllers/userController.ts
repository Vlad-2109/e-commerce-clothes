import { Request, Response } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET || '';

const createToken = (id: string) => {
  return jwt.sign({ id }, jwt_secret);
};

// Route for user login
const loginUser = async (req: Request, res: Response | any) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error: any) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user registration
const registerUser = async (req: Request, res: Response | any) => {
  try {
    const { name, email, password } = req.body;
    // checking user already exists or not
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Please enter a valid email' });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: 'Please enter a strong password' });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ name, email, password: hashedPassword });

    const user = await newUser.save();

    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error: any) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req: Request, res: Response) => {};

export { loginUser, registerUser, adminLogin };
