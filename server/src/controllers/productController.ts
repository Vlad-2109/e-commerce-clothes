import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import ProductModel from '../models/productModel';

// Function for add product
const addProduct = async (req: Request | any, res: Response | any) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === 'true' ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new ProductModel(productData);
    await product.save();

    return res.json({ success: true, message: 'Product Added' });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for list product
const listProducts = async (req: Request, res: Response | any) => {
  try {
    const products = await ProductModel.find({});
    return res.json({ success: true, products });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for removing product
const removeProduct = async (req: Request, res: Response | any) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);
    return res.json({ success: true, message: 'Product removed' });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for sigle product info
const singleProduct = async (req: Request, res: Response | any) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);
    res.json({ success: true, product });
  } catch (error: any) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
