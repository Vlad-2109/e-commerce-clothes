import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const mongo_uri = process.env.MONGO_URI || '';

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  await mongoose.connect(mongo_uri);
};

export default connectDB;
