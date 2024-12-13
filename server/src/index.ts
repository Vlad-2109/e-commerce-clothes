import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb';
import connectCloudinary from './config/cloudinary';
import userRouter from './routes/userRoute';
import productRouter from './routes/productRoute';

dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
