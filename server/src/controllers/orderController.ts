import { Request, Response } from 'express';
import OrderModel from '../models/orderModel';
import UserModel from '../models/userModel';

// Function for placing orders using COD Method
const placeOrder = async (req: Request | any, res: Response | any) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({ success: true, message: 'Order Placed' });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for placing orders using Stripe Method
const placeOrderStripe = async (req: Request | any, res: Response | any) => {
  try {
    return res.json({ success: true, message: 'Cart Updated' });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for placing orders using Razorpay Method
const placeOrderRazorpay = async (req: Request | any, res: Response | any) => {
  try {
    // return res.json({ success: true, cartData });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for All Orders data for Admin Panel
const allOrders = async (req: Request | any, res: Response | any) => {
  try {
    // return res.json({ success: true, cartData });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for User Order Data for Frontend
const userOrders = async (req: Request | any, res: Response | any) => {
  try {
    const { userId } = req.body;
    const orders = await OrderModel.find({ userId });
    
    return res.json({ success: true, orders });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for Update Order Status from Admin Panel
const updateStatus = async (req: Request | any, res: Response | any) => {
  try {
    // return res.json({ success: true, cartData });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
