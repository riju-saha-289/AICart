
import { uploadCloudinary } from "../config/cloudinary.js";
import Product from "../model/productModel.js";
import fs from "fs/promises"; // Import fs promises API
import path from "path";

export const addProduct = async (req, res) => {
  try {
    const { description,name, price, category, subcategory, sizes, isBestseller } =
      req.body;
    let images_path = [];
    Object.values(req.files).forEach((fileArray) => {
      images_path.push(fileArray[0].path);
    });

    if (
      !description ||
      !category ||
      !subcategory ||
      !sizes ||
      sizes.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }
    if (images_path.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Upload all images in parallel
    const uploadedImages = await Promise.all(
      images_path.map((imagePath) => uploadCloudinary(imagePath))
    );
    // Delete all local files in parallel after upload
    await Promise.all(
      images_path.map((imagePath) => fs.unlink(path.resolve(imagePath)))
    );
    const newProduct = new Product({
      images: uploadedImages,
      price: Number(price),
      name,
      description,
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      isBestseller: isBestseller === true || isBestseller === "true"
    });

    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully.", product: savedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message:`listProduct error ${err}`});
  }
};

export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found." });

    res.status(200).json(product,{ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found." });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update a product
// @route PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found." });

    res
      .status(200)
      .json({ message: "Product updated.", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Delete a product
// @route DELETE /api/products/:id

