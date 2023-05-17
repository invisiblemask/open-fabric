import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  brand: { type: String, required: true },
  price: { type: String, required: true },
});

export const ProductModel = mongoose.model("Product", ProductSchema);

export const getSingleProduct = (id: string) => ProductModel.findById(id);
export const getAllProducts = () => ProductModel.find({});
export const createOneProduct = (values: Record<string, any>) =>
  new ProductModel(values).save().then((product) => product.toObject());
export const editProductById = (
  id: string,
  values: Record<string, any>,
  third: any
) => ProductModel.findByIdAndUpdate(id, values, third);
