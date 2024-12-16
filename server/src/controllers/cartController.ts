import { Request, Response } from 'express';
import UserModel from '../models/userModel';

// Function for adding products to user cart
const addToCart = async (req: Request | any, res: Response | any) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size].quantity += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: 'Added To Cart' });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for updating user cart
const updateCart = async (req: Request | any, res: Response | any) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await UserModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: 'Cart Updated' });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for getting user cart data
const getUserCart = async (req: Request | any, res: Response | any) => {
  try {
    const { userId } = req.body;

    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    return res.json({ success: true, cartData });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
