import { Request, Response } from 'express';
import OrderModel from '../models/orderModel';
import UserModel from '../models/userModel';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// Global variables
const currency = 'usd';
const deliveryCharge = 10;

// Gateaway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

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
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (req: Request | any, res: Response | any) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === 'true') {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(userId, { cardData: {} });
      
      return res.json({success: true})
    } else {
      await OrderModel.findByIdAndDelete(orderId);

      return res.json({success: false})
    }
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

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
    const orders = await OrderModel.find({});

    return res.json({ success: true, orders });
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
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status });

    return res.json({ success: true, message: 'Status Updated' });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus,
};
