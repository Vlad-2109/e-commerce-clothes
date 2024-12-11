import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    default: [],
    required: true,
  },
  bestseller: {
    type: Boolean,
  },
  date: {
    type: Number,
    required: true,
  },
});

const ProductModel =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductModel;
