import * as dotenv from "dotenv";
import { Request, Response } from "express";
import {
  createOneProduct,
  editProductById,
  getAllProducts,
  getSingleProduct,
} from "../db/products";

dotenv.config();

// Get all product
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Get a single Product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getSingleProduct(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Create a product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, image, brand, price } = req.body;

    const newProduct = await createOneProduct({
      name,
      image,
      brand,
      price,
    });

    return res.status(201).json(newProduct).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Edit Post
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image, brand, price } = req.body;

    const product = await editProductById(
      id,
      {
        name,
        image,
        brand,
        price,
      },
      { new: true }
    );

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
