import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products";
import express from "express";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/products", getProducts);
  router.get("/products/:id", getProductById);
  router.post("/products/add", createProduct);
  router.put("/products/:id/edit", updateProduct);
};
