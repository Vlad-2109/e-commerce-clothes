import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb';
import connectCloudinary from './config/cloudinary';
import userRouter from './routes/userRoute';
import productRouter from './routes/productRoute';
import cartRouter from './routes/cartRoute';
import orderRouter from './routes/orderRoute';

dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://e-commerce-clothesclient.vercel.app',
      'https://e-commerce-clothesadmin.vercel.app',
    ],
  }),
);

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
