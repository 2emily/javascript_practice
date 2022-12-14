import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
  async findByTitle(title) {
    const product = await Product.findOne({ title });
    return product;
  }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  async findOneByCategoryId(categoryId) {
    const product = await Product.findOne({ categoryId });
    return product;
  }

  async findAllByCategoryId(categoryId) {
    const products = await Product.find({ categoryId });
    return products;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAll() {
    const products = await Product.find({});
    return products;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }

  async deleteById(productId) {
    const result = await Product.deleteOne({ _id: productId });
    return result;
  }
}

const productModel = new ProductModel();

export { productModel };
